"use client";

import { AdaptiveDpr, ContactShadows, Environment, PerformanceMonitor, useProgress } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { CameraRig } from "@/components/canvas/CameraRig";
import { Effects } from "@/components/canvas/Effects";
import { HeroDish } from "@/components/canvas/HeroDish";
import { Particles } from "@/components/canvas/Particles";
import { site } from "@/lib/site";
import { experienceRef, useExperienceStore } from "@/store/useExperienceStore";

function ProgressBridge() {
  const { progress } = useProgress();
  const setLoadProgress = useExperienceStore((state) => state.setLoadProgress);

  useEffect(() => {
    setLoadProgress(progress);
  }, [progress, setLoadProgress]);

  return null;
}

function Atmosphere() {
  const scratch = useMemo(() => new THREE.Color(), []);
  const base = useMemo(() => new THREE.Color(site.colors.charcoal), []);
  const ember = useMemo(() => new THREE.Color("#1c100c"), []);
  const coal = useMemo(() => new THREE.Color("#140c09"), []);

  useFrame((state) => {
    const t = experienceRef.storyProgress;
    if (t < 0.5) scratch.copy(base).lerp(ember, t / 0.5);
    else scratch.copy(ember).lerp(coal, (t - 0.5) / 0.5);

    if (state.scene.background instanceof THREE.Color) {
      state.scene.background.copy(scratch);
    }
    if (state.scene.fog instanceof THREE.Fog) {
      state.scene.fog.color.copy(scratch);
    }
  });

  return null;
}

export function Scene() {
  const quality = useExperienceStore((state) => state.quality);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const rich = quality === "high" && !reducedMotion;

  return (
    <>
      <color attach="background" args={[site.colors.charcoal]} />
      <fog attach="fog" args={[site.colors.charcoal, 8, 18]} />
      <Atmosphere />
      <ambientLight intensity={0.22} />
      <hemisphereLight color="#f4ede4" groundColor="#1a0d09" intensity={0.32} />
      <spotLight
        position={[2.5, 5.5, 2.4]}
        angle={0.4}
        penumbra={0.9}
        intensity={22}
        color="#ffb067"
        castShadow={rich}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.00015}
      />
      <spotLight position={[-3.6, 2.4, -2]} angle={0.7} penumbra={1} intensity={7} color={site.colors.gold} />
      <pointLight position={[1.2, 1.4, 1.6]} intensity={0.35} distance={5} decay={2} color="#ffb067" />
      <Environment preset="sunset" environmentIntensity={0.52} />
      <CameraRig />
      <HeroDish />
      <Particles dense={rich} />
      <ContactShadows
        position={[1.15, -1.15, 0]}
        opacity={0.48}
        scale={8}
        blur={2.5}
        far={3}
        frames={rich ? Infinity : 1}
        color="#050505"
      />
      {rich ? <Effects /> : null}
      <ProgressBridge />
      <AdaptiveDpr pixelated />
      <PerformanceMonitor
        onDecline={() => {
          if (experienceRef.quality === "low") return;
          experienceRef.quality = "low";
          useExperienceStore.setState({ quality: "low" });
        }}
      />
    </>
  );
}
