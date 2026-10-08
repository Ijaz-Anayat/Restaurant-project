"use client";

import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export function Effects() {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom mipmapBlur luminanceThreshold={0.82} intensity={0.38} radius={0.65} />
      <Vignette eskil={false} offset={0.18} darkness={0.78} />
      <Noise opacity={0.14} blendFunction={BlendFunction.SOFT_LIGHT} />
    </EffectComposer>
  );
}
