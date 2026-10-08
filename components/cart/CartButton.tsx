"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useCartCount } from "@/store/cart";
import { useUiStore } from "@/store/ui";

type CartButtonProps = {
  variant?: "light" | "green";
};

export function CartButton({ variant = "light" }: CartButtonProps) {
  const count = useCartCount();
  const bumpToken = useUiStore((state) => state.bumpToken);
  const toggleDrawer = useUiStore((state) => state.toggleDrawer);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const seen = useRef(0);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ready || seen.current === bumpToken) return;
    seen.current = bumpToken;
    const icon = iconRef.current;
    const ring = ringRef.current;
    if (!icon || reduced) return;
    const timeline = gsap.timeline();
    timeline
      .to(icon, { scale: 1.25, duration: 0.16, ease: "power2.out" })
      .to(icon, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.35)" });
    if (ring) {
      gsap.fromTo(ring, { scale: 0.8, opacity: 0.7 }, { scale: 1.8, opacity: 0, duration: 0.55, ease: "power2.out" });
    }
    return () => {
      timeline.kill();
    };
  }, [bumpToken, ready, reduced]);

  const shown = ready ? count : 0;

  return (
    <button
      type="button"
      data-cart-target
      className={cn(
        "relative inline-flex h-11 w-11 items-center justify-center rounded-full",
        variant === "light" ? "bg-hero-deep text-hero-white" : "bg-hero-white text-hero-deep",
      )}
      aria-label={shown > 0 ? `Open cart, ${shown} items` : "Open cart"}
      onClick={toggleDrawer}
    >
      <span ref={ringRef} className="pointer-events-none absolute inset-0 rounded-full border border-hero-accent opacity-0" />
      <span ref={iconRef} className="inline-flex will-change-transform">
        <ShoppingBag size={18} aria-hidden />
      </span>
      {shown > 0 ? (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-hero-accent px-1 text-[0.65rem] font-bold text-hero-white">
          <span key={shown} className="cart-count-pop">
            {shown}
          </span>
        </span>
      ) : null}
    </button>
  );
}
