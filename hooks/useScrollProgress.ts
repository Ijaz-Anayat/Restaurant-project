"use client";

import { useEffect, type RefObject } from "react";
import { storySteps } from "@/data/story";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { experienceRef, useExperienceStore } from "@/store/useExperienceStore";

export function useScrollProgress(triggerRef: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const element = triggerRef.current;
    if (!element || !enabled) {
      experienceRef.storyProgress = 0;
      useExperienceStore.getState().setActiveScene(0);
      return;
    }

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          experienceRef.storyProgress = self.progress;
          const scene =
            self.progress < 0.38 ? 0 : self.progress < 0.7 ? 1 : storySteps.length - 1;
          useExperienceStore.getState().setActiveScene(scene);
        },
      });
    }, element);

    return () => {
      context.revert();
      experienceRef.storyProgress = 0;
    };
  }, [enabled, triggerRef]);
}
