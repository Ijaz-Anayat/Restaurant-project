"use client";

import { useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsap";
import { useUiStore } from "@/store/ui";

const crumbColors = ["--hero-deep", "--hero-green-mid", "--hero-accent", "--hero-green-bottom", "--hero-stat-from"];

function cartTarget() {
  const nodes = [...document.querySelectorAll<HTMLElement>("[data-cart-target]")];
  return (
    nodes.find((node) => {
      const rect = node.getBoundingClientRect();
      return rect.width > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
    }) ?? null
  );
}

function burst(x: number, y: number) {
  const root = getComputedStyle(document.documentElement);
  const colors = crumbColors.map((token) => root.getPropertyValue(token).trim() || "#1F6B2E");
  const count = 8;
  for (let index = 0; index < count; index += 1) {
    const dot = document.createElement("span");
    dot.style.position = "fixed";
    dot.style.left = "0";
    dot.style.top = "0";
    dot.style.width = "7px";
    dot.style.height = "7px";
    dot.style.borderRadius = "999px";
    dot.style.background = colors[index % colors.length];
    dot.style.zIndex = "130";
    dot.style.pointerEvents = "none";
    dot.style.willChange = "transform, opacity";
    document.body.appendChild(dot);
    const angle = (Math.PI * 2 * index) / count;
    gsap.set(dot, { x, y, scale: 1, opacity: 1 });
    gsap.to(dot, {
      x: x + Math.cos(angle) * (18 + (index % 3) * 8),
      y: y + Math.sin(angle) * (16 + (index % 4) * 6),
      scale: 0.4,
      opacity: 0,
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => dot.remove(),
    });
  }
}

function flyClone(source: HTMLElement, imageSrc: string) {
  return new Promise<void>((resolve) => {
    const target = cartTarget();
    const from = source.getBoundingClientRect();
    if (!target) {
      useUiStore.getState().requestBump();
      resolve();
      return;
    }
    const to = target.getBoundingClientRect();
    const clone = document.createElement("img");
    clone.src = imageSrc;
    clone.alt = "";
    clone.style.position = "fixed";
    clone.style.left = "0";
    clone.style.top = "0";
    clone.style.width = `${from.width}px`;
    clone.style.height = `${from.height}px`;
    clone.style.objectFit = "cover";
    clone.style.borderRadius = "18px";
    clone.style.zIndex = "120";
    clone.style.pointerEvents = "none";
    clone.style.willChange = "transform, opacity";
    document.body.appendChild(clone);

    const start = { x: from.left, y: from.top };
    const end = {
      x: to.left + to.width / 2 - from.width * 0.1,
      y: to.top + to.height / 2 - from.height * 0.1,
    };
    const control = {
      x: (start.x + end.x) / 2 - 40,
      y: Math.min(start.y, end.y) - 140,
    };
    const proxy = { t: 0 };

    gsap.set(clone, { x: start.x, y: start.y, scale: 1, rotation: 0, opacity: 1 });
    gsap.to(proxy, {
      t: 1,
      duration: 0.9,
      ease: "power3.inOut",
      onUpdate: () => {
        const t = proxy.t;
        const inv = 1 - t;
        const x = inv * inv * start.x + 2 * inv * t * control.x + t * t * end.x;
        const y = inv * inv * start.y + 2 * inv * t * control.y + t * t * end.y;
        gsap.set(clone, {
          x,
          y,
          scale: 1 - t * 0.8,
          rotation: t * 360,
          opacity: t > 0.82 ? 1 - (t - 0.82) / 0.18 : 1,
        });
      },
      onComplete: () => {
        const land = target.getBoundingClientRect();
        burst(land.left + land.width / 2, land.top + land.height / 2);
        clone.remove();
        useUiStore.getState().requestBump();
        resolve();
      },
    });
  });
}

let chain: Promise<void> = Promise.resolve();

export function useFlyToCart() {
  const reduced = useReducedMotion();

  const fly = useCallback(
    (source: HTMLElement, imageSrc: string) => {
      const job = chain.then(async () => {
        if (reduced) {
          useUiStore.getState().requestBump();
          return;
        }
        await flyClone(source, imageSrc);
      });
      chain = job.then(
        () => undefined,
        () => undefined,
      );
      return job;
    },
    [reduced],
  );

  return { fly };
}
