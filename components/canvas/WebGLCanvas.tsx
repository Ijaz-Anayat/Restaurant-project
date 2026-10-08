"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { Scene } from "@/components/canvas/Scene";
import { useExperienceStore } from "@/store/useExperienceStore";

type WebGLCanvasProps = {
  active: boolean;
};

export function WebGLCanvas({ active }: WebGLCanvasProps) {
  const quality = useExperienceStore((state) => state.quality);

  return (
    <Canvas
      shadows={quality === "high"}
      dpr={quality === "high" ? [1, 2] : [1, 1.25]}
      // The dish, embers, and camera ease every frame while the hero is on screen.
      // Offscreen we stop the loop instead of switching to demand.
      frameloop={active ? "always" : "never"}
      camera={{ position: [-0.35, 0.95, 4.15], fov: 32, near: 0.1, far: 48 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
