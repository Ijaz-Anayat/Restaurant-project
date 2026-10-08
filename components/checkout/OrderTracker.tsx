"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const steps = ["Received", "Preparing", "On the way", "Delivered"] as const;

export function OrderTracker() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStep(steps.length - 1);
      return;
    }
    const timer = window.setInterval(() => {
      setStep((current) => (current >= steps.length - 1 ? current : current + 1));
    }, 3500);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <ol className="mt-6 grid gap-3">
      {steps.map((label, index) => {
        const done = index <= step;
        return (
          <li key={label} className="flex items-center gap-3 text-sm">
            <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${done ? "bg-hero-deep text-hero-white" : "bg-hero-green-bottom/40 text-hero-tagline"}`}>
              {index + 1}
            </span>
            <span className={done ? "font-semibold text-hero-deep" : "text-hero-tagline"}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
