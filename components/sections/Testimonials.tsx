"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { easeOut } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const current = testimonials[index];

  function go(next: number) {
    setIndex(Math.max(0, Math.min(testimonials.length - 1, next)));
  }

  return (
    <section className="bg-shade-0 px-4 py-20 sm:px-6 md:px-10 md:py-28" aria-roledescription="carousel" aria-label="Guest notes">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionLabel index="06">Notes</SectionLabel>
            <h2 className="font-display text-5xl tracking-[-0.03em] text-cream md:text-6xl">From the table.</h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-cream disabled:opacity-30"
              aria-label="Previous note"
              onClick={() => go(index - 1)}
              disabled={index === 0}
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-cream disabled:opacity-30"
              aria-label="Next note"
              onClick={() => go(index + 1)}
              disabled={index === testimonials.length - 1}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden">
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            animate={{ x: `${-index * (100 / testimonials.length)}%` }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(index + 1);
              if (info.offset.x > 60) go(index - 1);
            }}
            transition={{ duration: reduced ? 0 : 0.7, ease: easeOut }}
          >
            {testimonials.map((item) => (
              <blockquote key={item.id} className="w-full shrink-0 pr-6 md:pr-16">
                <p className="font-display text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.15] text-cream">“{item.quote}”</p>
              </blockquote>
            ))}
          </motion.div>
        </div>
        <p className="mt-8 text-sm uppercase tracking-[0.18em] text-hero-accent" aria-live="polite">
          {current.name} — {current.title}
        </p>
      </div>
    </section>
  );
}
