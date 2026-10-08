"use client";

import type { HeroHotspot } from "@/data/hero";
import { cn } from "@/lib/utils";

type HotspotProps = {
  hotspot: HeroHotspot;
  className?: string;
};

export function Hotspot({ hotspot, className }: HotspotProps) {
  const left = hotspot.side === "left";

  return (
    <div
      data-hotspot={hotspot.id}
      className={cn("group absolute z-[3]", className)}
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
    >
      <div className={cn("absolute top-1/2 hidden -translate-y-1/2 md:block", left ? "right-4" : "left-4")}>
        <svg className="h-3 w-28 overflow-visible md:w-36" viewBox="0 0 144 8" fill="none" aria-hidden>
          <path
            data-hotspot-line
            d={left ? "M144 4 H0" : "M0 4 H144"}
            stroke="var(--hero-white)"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <button
        type="button"
        className="group relative grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
        aria-label={`${hotspot.title}. ${hotspot.subtitle}`}
      >
        <span
          data-hotspot-ring
          className="absolute h-3.5 w-3.5 rounded-full border border-hero-white opacity-60"
        />
        <span data-hotspot-dot className="grid h-3.5 w-3.5 place-items-center">
          <span className="h-2.5 w-2.5 rounded-full bg-hero-white shadow-[0_0_0_4px_var(--hero-ghost)] transition-transform duration-300 group-hover:scale-125 group-focus-visible:scale-125" />
        </span>
      </button>

      <div
        data-hotspot-label
        className={cn(
          "pointer-events-none absolute top-1/2 hidden w-max -translate-y-1/2 md:block",
          left ? "right-[calc(100%+8.5rem)] text-right" : "left-[calc(100%+8.5rem)] text-left",
        )}
      >
        <p className="text-sm font-semibold text-hero-tagline underline-offset-4 group-hover:underline group-focus-within:underline">
          {hotspot.title}
        </p>
        <p className="text-xs font-semibold text-hero-tagline">{hotspot.subtitle}</p>
      </div>

      <div data-hotspot-label className="absolute left-1/2 top-7 w-max max-w-[9rem] -translate-x-1/2 text-center md:hidden">
        <p className="text-xs font-semibold text-hero-tagline">{hotspot.title}</p>
      </div>
    </div>
  );
}
