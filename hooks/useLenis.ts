"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToTarget, setLenisInstance } from "@/lib/lenis";
import { useExperienceStore } from "@/store/useExperienceStore";

export function useLenis(reducedMotion: boolean) {
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion) {
      let last = window.scrollY;
      const onScroll = () => {
        const y = window.scrollY;
        const direction: 1 | -1 = y > last ? 1 : -1;
        last = y;
        useExperienceStore.getState().syncNav(y, direction);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      lerp: 0.085,
      duration: 1.25,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
      syncTouch: true,
      autoRaf: false,
    });

    setLenisInstance(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", (instance) => {
      useExperienceStore.getState().syncNav(instance.animatedScroll, instance.direction);
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const fontsReady = document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      void fontsReady?.then(() => undefined);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const hash = window.location.hash;
    const timer = window.setTimeout(() => {
      if (hash) {
        const node = document.getElementById(hash.slice(1));
        if (node) {
          scrollToTarget(node, -8);
          ScrollTrigger.refresh();
          return;
        }
      }
      scrollToTarget(0);
      ScrollTrigger.refresh();
    }, 60);

    return () => window.clearTimeout(timer);
  }, [pathname]);
}
