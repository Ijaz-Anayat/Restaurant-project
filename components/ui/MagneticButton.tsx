"use client";

import Link from "next/link";
import { motion, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "ghost";
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants = {
  solid: "bg-hero-deep text-hero-white hover:bg-hero-stat-to",
  ghost: "border border-hero-deep text-hero-deep hover:bg-hero-deep hover:text-hero-white",
};

export function MagneticButton({
  children,
  className,
  variant = "solid",
  href,
  onClick,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 240, damping: 18, mass: 0.35 });
  const y = useSpring(0, { stiffness: 240, damping: 18, mass: 0.35 });

  function onMove(event: MouseEvent<HTMLElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.28);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(
    "inline-flex rounded-full text-[0.72rem] uppercase tracking-[0.22em] transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    className,
  );

  const face = (
    <motion.span
      className="inline-flex items-center justify-center gap-2 px-7 py-3.5"
      style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} data-cursor="hover" className={classes} onClick={onClick}>
        {face}
      </Link>
    );
  }

  return (
    <button type={type} data-cursor="hover" className={classes} onClick={onClick} disabled={disabled}>
      {face}
    </button>
  );
}
