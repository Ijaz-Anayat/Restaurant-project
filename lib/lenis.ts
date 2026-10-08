"use client";

import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function scrollToTarget(target: string | number | HTMLElement, offset = 0) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }

  if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
