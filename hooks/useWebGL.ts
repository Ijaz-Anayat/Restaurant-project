"use client";

import { useEffect, useState } from "react";

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function useWebGL() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(detectWebGL());
  }, []);

  return supported;
}
