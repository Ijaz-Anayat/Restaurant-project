"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { MagneticButton } from "@/components/sections/hero/MagneticButton";
import { StatCounter } from "@/components/sections/hero/StatCounter";
import { heroCopy } from "@/data/hero";
import { menu } from "@/data/menu";
import { useFlyToCart } from "@/hooks/useFlyToCart";
import { gsap } from "@/lib/gsap";
import { useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";

export function HeroBottomCard() {
  const { fly } = useFlyToCart();

  async function orderHeroBurger(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const item = menu.find((entry) => entry.id === "zinger-burger");
    const source = document.querySelector<HTMLElement>("[data-burger-photo]");
    const pose = document.querySelector<HTMLElement>("[data-burger-pose]");
    if (!item || !source) return;
    if (pose) {
      gsap.fromTo(pose, { scale: 0.92 }, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
    }
    await fly(source, item.image);
    useCartStore.getState().addItem(item);
    useUiStore.getState().showToast(`Added ${item.name} to cart`);
    useUiStore.getState().openDrawer();
  }

  return (
    <div data-hero-card className="relative z-[4] mt-auto px-3 pb-3 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:px-5">
      <div className="hero-card-shadow relative rounded-t-[28px] bg-shade-0 px-4 pb-5 pt-8 text-cream md:px-8 md:pb-6 md:pt-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div data-order-now className="will-change-transform">
            <MagneticButton
              href={heroCopy.orderNowHref}
              className="hero-order-shadow rounded-full bg-hero-deep px-7 py-3 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-hero-white"
              onClick={(event) => {
                void orderHeroBurger(event);
              }}
            >
              {heroCopy.orderNow}
            </MagneticButton>
          </div>
        </div>

        <div className="grid items-end gap-6 lg:grid-cols-[1fr_minmax(12rem,16rem)_auto] lg:gap-4">
          <div className="flex items-end gap-3">
            <div data-notebook className="relative w-36 shrink-0 will-change-transform sm:w-44 md:w-52">
              <Image
                src={heroCopy.images.notebook}
                alt={heroCopy.images.notebookAlt}
                width={640}
                height={420}
                sizes="208px"
                className="h-auto w-full"
              />
              <p className="font-hero-serif pointer-events-none absolute left-[8%] top-[16%] w-[42%] text-xs font-semibold leading-tight text-hero-tagline">
                {heroCopy.notebookTitle}
              </p>
            </div>
            <Link
              href={heroCopy.orderHref}
              className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-hero-accent underline underline-offset-4"
            >
              {heroCopy.orderLink}
            </Link>
          </div>

          <p className="font-hero-serif text-center text-base font-medium leading-snug text-cream md:text-lg">
            {heroCopy.tagline}
          </p>

          <div className="flex justify-center lg:justify-end">
            <StatCounter />
          </div>
        </div>
      </div>
    </div>
  );
}
