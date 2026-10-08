"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";
import { experienceRef } from "@/store/useExperienceStore";

const keys: { t: number; pos: [number, number, number]; look: [number, number, number] }[] = [
  { t: 0, pos: [1.35, 1.2, 4.7], look: [-1.25, 0.38, 0] },
  { t: 0.42, pos: [2.2, 1.65, 3.7], look: [-0.85, 0.58, 0] },
  { t: 0.67, pos: [1.15, 2.15, 3.6], look: [-1.05, 0.78, 0] },
  { t: 1, pos: [1.7, 2.5, 4.05], look: [-0.75, 1.02, 0] },
];

function sample(progress: number) {
  const t = THREE.MathUtils.clamp(progress, 0, 1);
  let index = 0;
  while (index < keys.length - 2 && t > keys[index + 1].t) index += 1;
  const from = keys[index];
  const to = keys[index + 1];
  const span = to.t - from.t || 1;
  const amount = THREE.MathUtils.smoothstep((t - from.t) / span, 0, 1);

  return {
    pos: from.pos.map((value, axis) => THREE.MathUtils.lerp(value, to.pos[axis], amount)) as [
      number,
      number,
      number,
    ],
    look: from.look.map((value, axis) => THREE.MathUtils.lerp(value, to.look[axis], amount)) as [
      number,
      number,
      number,
    ],
  };
}

export function CameraRig() {
  const target = useRef(new THREE.Vector3(1.35, 1.2, 4.7));
  const lookTarget = useRef(new THREE.Vector3(-1.25, 0.38, 0));
  const look = useRef(new THREE.Vector3(-1.25, 0.38, 0));

  useFrame((state, delta) => {
    const progress = experienceRef.storyProgress;
    const next = sample(progress);
    const influence = experienceRef.reducedMotion ? 0 : 1 - Math.min(progress * 1.4, 1);
    const x = next.pos[0] + experienceRef.pointerX * 0.28 * influence;
    const y = next.pos[1] + experienceRef.pointerY * -0.1 * influence;
    const z = next.pos[2] + (experienceRef.isMobile ? 0.35 : 0);

    target.current.set(x, y, z);
    lookTarget.current.set(next.look[0], next.look[1], next.look[2]);
    easing.damp3(state.camera.position, target.current, 0.32, delta);
    easing.damp3(look.current, lookTarget.current, 0.32, delta);
    state.camera.lookAt(look.current);
  });

  return null;
}
