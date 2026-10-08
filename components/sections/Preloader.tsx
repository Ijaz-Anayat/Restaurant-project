"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useExperienceStore } from "@/store/useExperienceStore";

export function Preloader() {
  const pathname = usePathname();
  const loadProgress = useExperienceStore((state) => state.loadProgress);
  const progressRef = useRef(0);
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  progressRef.current = loadProgress;

  useEffect(() => {
    const waitForScene = pathname === "/";
    const start = performance.now();
    let frame = 0;
    let finished = false;
    let exitTimer = 0;

    const finish = () => {
      if (finished) return;
      finished = true;
      setShown(100);
      setLeaving(true);
      useExperienceStore.getState().setIntroReady(true);
      exitTimer = window.setTimeout(() => {
        setDone(true);
        useExperienceStore.getState().setPreloaderDone(true);
        ScrollTrigger.refresh();
      }, 1000);
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const timed = Math.min(100, (elapsed / 1500) * 100);
      const real = progressRef.current;
      const display = real >= 100 ? 100 : Math.min(94, Math.max(timed * 0.9, real));
      setShown(display);
      const sceneReady = !waitForScene || real >= 100 || elapsed > 4800;
      if (sceneReady && elapsed > 1400) {
        finish();
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
    };
  }, [pathname]);

  if (done) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading ${site.name}`}
      className={cn(
        "hero-stage fixed inset-0 z-[200] flex flex-col items-center justify-center text-hero-white transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]",
        leaving && "-translate-y-full",
      )}
    >
      <p className="font-display text-5xl tracking-[0.16em] text-hero-white md:text-7xl">
        {site.name.split("").map((char, index) => (
          <span key={`${char}-${index}`} className="preloader-char" style={{ animationDelay: `${index * 45}ms` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>
      <div className="mt-10 h-px w-48 bg-white/15">
        <div className="h-full bg-hero-white transition-[width] duration-200" style={{ width: `${shown}%` }} />
      </div>
      <p className="mt-4 font-sans text-xs tabular-nums tracking-[0.28em] text-hero-white">
        {Math.round(shown).toString().padStart(3, "0")}
      </p>
    </div>
  );
}
