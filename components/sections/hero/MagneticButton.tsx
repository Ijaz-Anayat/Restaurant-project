"use client";

import Link from "next/link";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function MagneticButton({ children, href, className, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    const xTo = gsap.quickTo(node, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (event: globalThis.MouseEvent) => {
      const rect = node.getBoundingClientRect();
      xTo((event.clientX - rect.left - rect.width / 2) * 0.35);
      yTo((event.clientY - rect.top - rect.height / 2) * 0.35);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <Link
      ref={ref}
      href={href}
      data-cursor="hover"
      className={cn("inline-flex will-change-transform", className)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
