"use client";

import { Bebas_Neue, Fraunces } from "next/font/google";
import { useLayoutEffect, useRef } from "react";
import { HeroBottomCard } from "@/components/sections/hero/HeroBottomCard";
import { HeroBurger } from "@/components/sections/hero/HeroBurger";
import { HeroText } from "@/components/sections/hero/HeroText";
import { heroCopy } from "@/data/hero";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { site } from "@/lib/site";
import { useExperienceStore } from "@/store/useExperienceStore";

const heroDisplay = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero",
  display: "swap",
});

const heroSerif = Fraunces({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-hero-serif",
  display: "swap",
});

function isMobile() {
  return window.matchMedia("(max-width: 767px)").matches;
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const introReady = useExperienceStore((state) => state.introReady);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !introReady) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let parallaxEnabled = false;
    const quick = { duration: 0.6, ease: "power3.out" } as const;
    let follow: {
      burgerX: (value: number) => void;
      burgerY: (value: number) => void;
      burgerR: (value: number) => void;
      solidX: (value: number) => void;
      solidY: (value: number) => void;
      ghostX: (value: number) => void;
      ghostY: (value: number) => void;
    } | null = null;

    const context = gsap.context(() => {
      const stage = root.querySelector<HTMLElement>("[data-hero-stage]");
      const ghosts = gsap.utils.toArray<HTMLElement>("[data-ghost]");
      const ghostParallax = root.querySelector<HTMLElement>("[data-ghost-parallax]");
      const solidParallax = root.querySelector<HTMLElement>("[data-solid-parallax]");
      const flavorChars = gsap.utils.toArray<HTMLElement>("[data-hero-char='flavor']");
      const popChars = gsap.utils.toArray<HTMLElement>("[data-hero-char='pop']");
      const flavorScroll = root.querySelector<HTMLElement>("[data-flavor-scroll]");
      const popScroll = root.querySelector<HTMLElement>("[data-pop-scroll]");
      const burgerIntro = root.querySelector<HTMLElement>("[data-burger-intro]");
      const burgerPose = root.querySelector<HTMLElement>("[data-burger-pose]");
      const burgerScroll = root.querySelector<HTMLElement>("[data-burger-scroll]");
      const burgerParallax = root.querySelector<HTMLElement>("[data-burger-parallax]");
      const burgerIdle = root.querySelector<HTMLElement>("[data-burger-idle]");
      const shadow = root.querySelector<HTMLElement>("[data-burger-shadow]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-hotspot-dot]");
      const rings = gsap.utils.toArray<HTMLElement>("[data-hotspot-ring]");
      const lines = gsap.utils.toArray<SVGPathElement>("[data-hotspot-line]");
      const labels = gsap.utils.toArray<HTMLElement>("[data-hotspot-label]");
      const card = root.querySelector<HTMLElement>("[data-hero-card]");
      const notebook = root.querySelector<HTMLElement>("[data-notebook]");
      const orderNow = root.querySelector<HTMLElement>("[data-order-now]");
      const stat = root.querySelector<HTMLElement>("[data-stat]");
      const avatars = gsap.utils.toArray<HTMLElement>("[data-avatar]");
      const statValue = root.querySelector<HTMLElement>("[data-stat-value]");
      const layers = gsap.utils.toArray<HTMLElement>("[data-burger-layer]");

      const showFinal = () => {
        if (statValue) statValue.textContent = String(heroCopy.stat.value);
        gsap.set([stage, card, notebook, orderNow, stat, ...ghosts, ...flavorChars, ...popChars, ...dots, ...labels, ...avatars, shadow], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          filter: "none",
        });
        gsap.set(ghosts, { autoAlpha: 1 });
        lines.forEach((line) => {
          gsap.set(line, { strokeDashoffset: 0 });
        });
      };

      if (reduced || !stage || !burgerIntro || !burgerPose) {
        showFinal();
        return;
      }

      lines.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      });

      if (burgerParallax && solidParallax && ghostParallax) {
        follow = {
          burgerX: gsap.quickTo(burgerParallax, "x", quick),
          burgerY: gsap.quickTo(burgerParallax, "y", quick),
          burgerR: gsap.quickTo(burgerParallax, "rotation", quick),
          solidX: gsap.quickTo(solidParallax, "x", quick),
          solidY: gsap.quickTo(solidParallax, "y", quick),
          ghostX: gsap.quickTo(ghostParallax, "x", { duration: 0.8, ease: "power3.out" }),
          ghostY: gsap.quickTo(ghostParallax, "y", { duration: 0.8, ease: "power3.out" }),
        };
      }

      const counter = { value: 0 };
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          startIdle();
          mountScroll();
        },
      });

      intro.fromTo(stage, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.7 }, 0);
      intro.fromTo(ghosts, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9 }, 0.3);
      if (ghosts[0]) intro.to(ghosts[0], { x: 40, duration: 1.6, ease: "sine.out" }, 0.3);
      if (ghosts[1]) intro.to(ghosts[1], { x: -40, duration: 1.6, ease: "sine.out" }, 0.3);
      intro.fromTo(
        burgerIntro,
        { y: 120, filter: "blur(8px)" },
        { y: 0, filter: "blur(0px)", duration: 1.2, ease: "expo.out" },
        0.5,
      );
      intro.fromTo(
        burgerPose,
        { scale: 0.85, rotation: -6 },
        { scale: 1, rotation: 0, duration: 0.9, ease: "expo.out" },
        0.5,
      );
      intro.fromTo(shadow, { scaleX: 0.2, scaleY: 0.2, autoAlpha: 0 }, { scaleX: 1, scaleY: 1, autoAlpha: 1, duration: 0.9, ease: "expo.out" }, 0.6);
      intro.fromTo(flavorChars, { x: -200, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.7, stagger: 0.03 }, 1.1);
      intro.fromTo(
        popChars,
        { x: 200, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.7, stagger: { each: 0.03, from: "end" } },
        1.1,
      );
      intro.to(burgerPose, { scale: 1.06, rotation: -2, duration: 0.22 }, 1.4);
      intro.to(burgerPose, { scale: 1, rotation: 0, duration: 0.32 }, 1.62);
      intro.fromTo(dots, { scale: 0 }, { scale: 1, duration: 0.35, ease: "back.out(2)" }, 1.9);
      intro.to(lines, { strokeDashoffset: 0, duration: 0.6 }, 2.15);
      intro.fromTo(labels, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 2.55);
      intro.call(() => {
        gsap.to(rings, {
          scale: 2,
          opacity: 0,
          duration: 1.35,
          repeat: -1,
          ease: "power1.out",
          transformOrigin: "center center",
        });
      }, undefined, 1.9);
      intro.fromTo(card, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 2.3);
      intro.fromTo(notebook, { y: -36, rotation: -8, autoAlpha: 0 }, { y: 0, rotation: 0, autoAlpha: 1, duration: 0.7 }, 2.4);
      intro.to(notebook, { rotation: 2.5, duration: 0.16 }, 3.0);
      intro.to(notebook, { rotation: 0, duration: 0.22 }, 3.16);
      intro.fromTo(orderNow, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(1.7)" }, 2.45);
      intro.fromTo(stat, { x: 90, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.7 }, 2.4);
      intro.to(
        counter,
        {
          value: heroCopy.stat.value,
          duration: 1.05,
          snap: { value: 1 },
          onUpdate: () => {
            if (statValue) statValue.textContent = String(counter.value);
          },
        },
        2.45,
      );
      intro.fromTo(avatars, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.08 }, 2.75);

      const startIdle = () => {
        if (!burgerIdle || !notebook) return;
        gsap.fromTo(
          burgerIdle,
          { y: -4, rotation: -0.35 },
          { y: 4, rotation: 0.35, duration: 6.5, ease: "sine.inOut", yoyo: true, repeat: -1 },
        );
        gsap.fromTo(notebook, { y: -6 }, { y: 6, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.8 });
        enableParallax();
      };

      const enableParallax = () => {
        if (!burgerParallax || !solidParallax || !ghostParallax) return;
        if (isMobile()) return;
        parallaxEnabled = true;
      };

      const mountScroll = () => {
        if (!burgerScroll || !flavorScroll || !popScroll || !card) return;

        const scroll = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        scroll.to(
          burgerScroll,
          {
            scale: () => (isMobile() ? 0.96 : 0.98),
            rotation: () => (isMobile() ? 2 : 4),
            y: () => (isMobile() ? 18 : 28),
            ease: "none",
            duration: 1,
            immediateRender: false,
          },
          0,
        );
        scroll.to(
          flavorScroll,
          {
            x: () => (isMobile() ? -60 : -120),
            autoAlpha: 0,
            ease: "none",
            duration: 1,
            immediateRender: false,
          },
          0,
        );
        scroll.to(
          popScroll,
          {
            x: () => (isMobile() ? 60 : 120),
            autoAlpha: 0,
            ease: "none",
            duration: 1,
            immediateRender: false,
          },
          0,
        );
        scroll.to(card, { y: () => (isMobile() ? 48 : 90), autoAlpha: 0, ease: "none", duration: 0.75, immediateRender: false }, 0);
        scroll.to("[data-hotspot]", { autoAlpha: 0, y: 16, ease: "none", duration: 0.45, immediateRender: false }, 0);

        if (site.heroBurgerMode === "layers" && layers.length > 0) {
          layers.forEach((layer, index) => {
            const mid = (layers.length - 1) / 2;
            scroll.to(
              layer,
              {
                y: () => (index - mid) * (isMobile() ? 22 : 42),
                ease: "none",
                duration: 1,
                immediateRender: false,
              },
              0,
            );
          });
        }

        ScrollTrigger.refresh();
      };
    }, root);

    const resetParallax = () => {
      if (!follow) return;
      follow.burgerX(0);
      follow.burgerY(0);
      follow.burgerR(0);
      follow.solidX(0);
      follow.solidY(0);
      follow.ghostX(0);
      follow.ghostY(0);
    };

    const onPointer = (event: PointerEvent) => {
      if (!parallaxEnabled || !follow || isMobile()) return;
      const stage = root.querySelector<HTMLElement>("[data-hero-stage]");
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      follow.burgerX(px * 30);
      follow.burgerY(py * 30);
      follow.burgerR(px * 6);
      follow.solidX(px * -16);
      follow.solidY(py * -16);
      follow.ghostX(px * 40);
      follow.ghostY(py * 40);
    };

    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktopChange = () => {
      if (!desktop.matches) resetParallax();
    };

    root.addEventListener("pointermove", onPointer);
    root.addEventListener("pointerleave", resetParallax);
    desktop.addEventListener("change", onDesktopChange);

    return () => {
      root.removeEventListener("pointermove", onPointer);
      root.removeEventListener("pointerleave", resetParallax);
      desktop.removeEventListener("change", onDesktopChange);
      context.revert();
    };
  }, [introReady]);

  return (
    <section ref={rootRef} id="hero" className={`${heroDisplay.variable} ${heroSerif.variable} relative h-svh bg-charcoal`}>
      <div className="h-full px-2 pb-2 pt-[4.5rem] sm:px-3 sm:pb-3 md:px-4 md:pb-4 md:pt-20">
        <div
          data-hero-stage
          className="hero-stage relative flex h-full flex-col overflow-hidden rounded-[28px] md:block md:rounded-[32px]"
        >
          <div className="hero-grain pointer-events-none absolute inset-0 z-[5]" aria-hidden />
          <HeroText />
          <HeroBurger />
          <HeroBottomCard />
        </div>
      </div>
    </section>
  );
}
