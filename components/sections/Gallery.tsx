"use client";

import { useEffect, useRef } from "react";
import { gallery } from "@/data/gallery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsap";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Gallery() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const context = gsap.context(() => {
      const figures = gsap.utils.toArray<HTMLElement>("[data-gallery-item]");
      figures.forEach((figure) => {
        const speed = Number(figure.dataset.speed ?? 0);
        gsap.from(figure, {
          clipPath: "inset(14% 14% 14% 14%)",
          y: 36,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: figure, start: "top 85%" },
        });
        const image = figure.querySelector("img");
        if (image) {
          gsap.to(image, {
            yPercent: speed,
            ease: "none",
            scrollTrigger: {
              trigger: figure,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, root);

    return () => context.revert();
  }, [reduced]);

  return (
    <section id="gallery" ref={rootRef} className="bg-shade-2 px-4 py-20 sm:px-6 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="05">The room</SectionLabel>
        <h2 className="max-w-xl font-display text-5xl leading-[0.92] tracking-[-0.03em] text-cream md:text-7xl">
          Low light, oak, and a long table.
        </h2>
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {gallery.map((image) => (
            <li key={image.src} className={`relative ${image.className}`}>
              <figure data-gallery-item data-speed={image.speed} className="absolute inset-0 overflow-hidden">
                <Photo
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full"
                  imageClassName="scale-110"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
