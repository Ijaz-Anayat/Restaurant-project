"use client";

import { useRef } from "react";
import { storySteps } from "@/data/story";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";
import { useExperienceStore } from "@/store/useExperienceStore";

export function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const activeScene = useExperienceStore((state) => state.activeScene);
  useScrollProgress(sectionRef, !reduced);
  const steps = reduced ? storySteps : [storySteps[activeScene] ?? storySteps[0]];

  return (
    <section
      id="story"
      ref={sectionRef}
      className={cn("relative overflow-x-clip", reduced ? "px-4 py-20 sm:px-6 md:px-10" : "h-[300vh] sm:h-[340vh]")}
    >
      <div className={cn(reduced ? "space-y-16" : "sticky top-0 h-svh")}>
        {steps.map((step) => (
          <article
            key={step.id}
            className={cn(
              "z-20 max-w-xl text-cream",
              reduced
                ? "relative"
                : "absolute inset-x-0 bottom-0 bg-gradient-to-t from-shade-0 via-shade-0/95 to-transparent px-4 pb-8 pt-20 sm:inset-y-0 sm:right-auto sm:flex sm:w-[min(26rem,40vw)] sm:items-center sm:bg-gradient-to-r sm:from-shade-0 sm:via-shade-0/88 sm:to-transparent sm:px-8 sm:py-0 md:w-[min(30rem,36vw)] md:px-12",
            )}
          >
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.32em] text-gold">
                {step.index} — {step.kicker}
              </p>
              <h2 className="mt-3 font-display text-[clamp(2.6rem,8vw,5.5rem)] leading-none tracking-[-0.04em]">
                {step.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80 sm:text-base">{step.body}</p>
            </div>
          </article>
        ))}
        <ol
          className="absolute right-4 top-24 z-20 flex gap-3 sm:bottom-8 sm:right-8 sm:top-auto"
          aria-label="Story progress"
        >
          {storySteps.map((step, index) => (
            <li key={step.id}>
              <span
                className={cn("block h-1 w-8 rounded-full", index === activeScene ? "bg-hero-green-bottom" : "bg-cream/25")}
              />
              <span className="sr-only">
                {step.title}
                {index === activeScene ? ", current" : ""}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
