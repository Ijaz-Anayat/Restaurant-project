"use client";

import Link from "next/link";
import { useEffect, useRef, type MouseEvent } from "react";
import { tagLabels } from "@/data/menu";
import { signatureDishes } from "@/data/dishes";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { formatPrice, cn } from "@/lib/utils";
import { AddButton } from "@/components/cart/AddButton";
import { Photo } from "@/components/ui/Photo";
import { SectionLabel } from "@/components/ui/SectionLabel";

function TiltCard({ dish }: { dish: (typeof signatureDishes)[number] }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  function onMove(event: MouseEvent<HTMLElement>) {
    const card = ref.current;
    if (!card || reduced) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg)`;
  }

  return (
    <article
      ref={ref}
      data-cursor="hover"
      onMouseMove={onMove}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "rotateX(0deg) rotateY(0deg)";
      }}
      className="w-[min(78vw,20rem)] shrink-0 snap-start rounded-[24px] border border-white/10 bg-shade-3 text-cream transition-transform duration-300 [transform-style:preserve-3d] md:w-[22rem]"
    >
      <Photo
        src={dish.image}
        alt={dish.imageAlt}
        className="aspect-[4/5]"
        imageClassName="transition-transform duration-700 hover:scale-105"
        sizes="(min-width: 768px) 22rem, 78vw"
      />
      <div className="space-y-3 p-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-3xl text-cream">
            <Link href={`/menu#${dish.menuId}`} className="hover:text-hero-accent">
              {dish.name}
            </Link>
          </h3>
          <p className="text-sm font-semibold text-hero-accent">{formatPrice(dish.price)}</p>
        </div>
        <p className="text-sm leading-relaxed text-cream/75">{dish.description}</p>
        {dish.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {dish.tags.map((tag) => (
              <li key={tag}>
                <span title={tagLabels[tag]} className="border border-white/20 px-2 py-1 text-[0.65rem] tracking-[0.16em] text-cream">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        <AddButton
          item={{ id: dish.menuId, name: dish.name, price: dish.price, image: dish.image }}
          sourceRef={ref}
        />
      </div>
    </article>
  );
}

export function SignatureDishes() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!section || !viewport || !track || reduced) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const setHeight = () => {
        const distance = Math.max(track.scrollWidth - viewport.clientWidth, 0);
        section.style.height = `${window.innerHeight + distance}px`;
      };
      setHeight();

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - viewport.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      const barTween = bar
        ? gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
              },
            },
          )
        : null;

      const onResize = () => {
        setHeight();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);
      const timer = window.setTimeout(onResize, 400);

      return () => {
        window.removeEventListener("resize", onResize);
        window.clearTimeout(timer);
        tween.scrollTrigger?.kill();
        tween.kill();
        barTween?.scrollTrigger?.kill();
        barTween?.kill();
        section.style.height = "";
      };
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section id="dishes" ref={sectionRef} className="relative overflow-x-clip bg-shade-0">
      <div
        className={cn(
          "flex flex-col gap-10 px-4 py-20 sm:px-6 md:px-10 md:py-24",
          !reduced && "md:sticky md:top-0 md:h-svh md:flex-row md:items-center md:gap-0 md:overflow-hidden md:px-0 md:py-0",
        )}
      >
        <div className="md:flex md:w-[34vw] md:shrink-0 md:flex-col md:justify-center md:px-10 lg:px-16">
          <SectionLabel index="02">Signatures</SectionLabel>
          <h2 className="font-display text-5xl leading-[0.92] tracking-[-0.03em] text-cream md:text-6xl">
            Plates we are known for.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/75 md:text-base">
            Six dishes from the current fire. Hover a card, then open the full menu for the rest of the table.
          </p>
          <span ref={barRef} className="mt-8 hidden h-px w-24 origin-left bg-hero-accent md:block" />
        </div>
        <div ref={viewportRef} className={cn("min-w-0", !reduced && "snap-x snap-mandatory overflow-x-auto md:flex-1 md:snap-none md:overflow-hidden")}>
          <div
            ref={trackRef}
            className={cn(
              "flex gap-5",
              reduced ? "flex-col md:flex-row md:flex-wrap" : "items-center pr-8 md:h-svh md:items-center md:pr-16",
            )}
            style={{ perspective: "1200px" }}
          >
            {signatureDishes.map((dish) => (
              <TiltCard key={dish.id} dish={dish} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
