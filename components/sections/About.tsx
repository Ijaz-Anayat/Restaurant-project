"use client";

import { useEffect, useRef } from "react";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsap";
import { site } from "@/lib/site";
import { unsplash } from "@/lib/utils";

const statement = "We cook with wood, patience, and the kind of quiet that lets a meal become a room.";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const counter = { n: 0 };
    const context = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: node, start: "top 85%" },
        onUpdate: () => {
          node.textContent = `${Math.round(counter.n)}${suffix}`;
        },
      });
    }, node);
    return () => context.revert();
  }, [suffix, value]);

  return (
    <div>
      <p className="font-display text-4xl text-cream sm:text-5xl md:text-6xl">
        <span ref={ref}>
          0{suffix}
        </span>
      </p>
      <p className="mt-2 text-[0.72rem] uppercase tracking-[0.2em] text-muted">{label}</p>
    </div>
  );
}

export function About() {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const words = statement.split(" ");

  useEffect(() => {
    const quote = quoteRef.current;
    const image = imageRef.current;
    if (reduced) return;

    const context = gsap.context(() => {
      if (quote) {
        gsap.from(quote.querySelectorAll("[data-word]"), {
          yPercent: 110,
          stagger: 0.035,
          ease: "none",
          scrollTrigger: {
            trigger: quote,
            start: "top 80%",
            end: "top 35%",
            scrub: true,
          },
        });
      }
      const portrait = image?.querySelector("img");
      if (image && portrait) {
        gsap.to(portrait, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => context.revert();
  }, [reduced]);

  return (
    <section id="about" className="bg-shade-1 px-4 py-20 sm:px-6 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div ref={imageRef} className="relative">
          <Photo
            src={unsplash("photo-1577219491135-ce391730fb2c", 1600)}
            alt="A cook finishing a plate in warm kitchen light"
            className="aspect-[4/5]"
            imageClassName="scale-110"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <p className="mt-4 text-[0.72rem] uppercase tracking-[0.22em] text-muted">
            {site.chef.role} — {site.chef.name}
          </p>
        </div>

        <div>
          <SectionLabel index="04">The kitchen</SectionLabel>
          <p ref={quoteRef} className="font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.05] tracking-[-0.03em] text-cream">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
                <span data-word className="inline-block pb-1">
                  {word}
                  {index < words.length - 1 ? "\u00A0" : ""}
                </span>
              </span>
            ))}
          </p>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted">
            {site.chef.name} opened the room to keep the fire in the center of the meal. Service is unhurried. The menu changes when the morning does.
          </p>
          <dl className="mt-12 grid grid-cols-3 gap-3 sm:gap-6">
            {site.stats.map((stat) => (
              <Stat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
