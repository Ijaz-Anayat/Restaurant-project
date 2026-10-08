"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { site } from "@/lib/site";
import { experienceRef } from "@/store/useExperienceStore";

const dummy = new THREE.Object3D();

type EmberProps = {
  count: number;
};

function Embers({ count }: EmberProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.SphereGeometry(1, 6, 6), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: site.colors.ember,
        transparent: true,
        opacity: 0.85,
        toneMapped: false,
      }),
    [],
  );
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 3.4,
        z: (Math.random() - 0.5) * 2.4,
        speed: 0.12 + Math.random() * 0.28,
        offset: Math.random(),
        scale: 0.012 + Math.random() * 0.028,
      })),
    [count],
  );

  useLayoutEffect(() => {
    const current = mesh.current;
    if (!current) return;
    current.frustumCulled = false;
  }, []);

  useFrame(({ clock }) => {
    const current = mesh.current;
    if (!current || experienceRef.reducedMotion) return;
    const time = clock.elapsedTime;
    seeds.forEach((seed, index) => {
      const rise = (seed.offset + time * seed.speed) % 1;
      const y = rise * 2.4 - 0.2;
      dummy.position.set(seed.x, y, seed.z);
      dummy.scale.setScalar(seed.scale * (1.15 - rise));
      dummy.updateMatrix();
      current.setMatrixAt(index, dummy.matrix);
    });
    current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, material, count]} />
  );
}

type ParticlesProps = {
  dense: boolean;
};

export function Particles({ dense }: ParticlesProps) {
  const count = dense ? 42 : 14;

  return (
    <group position={[0.2, 0.2, 0]}>
      <Embers count={count} />
      {dense ? (
        <Sparkles
          count={36}
          scale={[5.2, 3.4, 4]}
          size={2}
          speed={0.28}
          color={site.colors.gold}
          opacity={0.35}
          noise={0.45}
        />
      ) : null}
    </group>
  );
}
