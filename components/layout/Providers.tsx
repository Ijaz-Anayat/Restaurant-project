"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PersistentCanvas } from "@/components/canvas/PersistentCanvas";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartHydration } from "@/components/cart/CartHydration";
import { CartToast } from "@/components/cart/CartToast";
import { MiniCartPill } from "@/components/cart/MiniCartPill";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/sections/Preloader";
import { useLenis } from "@/hooks/useLenis";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollTrigger } from "@/lib/gsap";
import { experienceRef, useExperienceStore } from "@/store/useExperienceStore";

export function Providers({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  const preloaderDone = useExperienceStore((state) => state.preloaderDone);
  const pathname = usePathname();

  useLenis(reduced);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      experienceRef.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      experienceRef.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    experienceRef.reducedMotion = reduced;
    experienceRef.isMobile = mobile;
    if (mobile) experienceRef.quality = "low";
    useExperienceStore.getState().setFlags({
      reducedMotion: reduced,
      isMobile: mobile,
      quality: mobile ? "low" : experienceRef.quality,
    });
  }, [reduced, mobile]);

  useEffect(() => {
    if (!preloaderDone) return;
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(timer);
  }, [preloaderDone, pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Preloader />
      <div className="grain pointer-events-none fixed inset-0 z-[1]" aria-hidden />
      <PersistentCanvas />
      <CartHydration />
      <Navbar />
      <div className="relative z-10">{children}</div>
      <CartDrawer />
      <MiniCartPill />
      <CartToast />
    </MotionConfig>
  );
}
