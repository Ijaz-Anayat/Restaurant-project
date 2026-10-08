"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsap";

type SplitLineProps = {
  text: string;
  className?: string;
  play?: boolean;
  delay?: number;
};

export function SplitLine({ text, className, play = true, delay = 0 }: SplitLineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || !play || reduced) return;
    const words = root.querySelectorAll<HTMLElement>("[data-word]");
    const context = gsap.context(() => {
      gsap.from(words, {
        yPercent: 115,
        duration: 1.15,
        ease: "power4.out",
        stagger: 0.045,
        delay,
      });
    }, root);
    return () => context.revert();
  }, [play, reduced, text, delay]);

  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span data-word className="inline-block">
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
