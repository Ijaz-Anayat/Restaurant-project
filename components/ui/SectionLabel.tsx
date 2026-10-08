import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: ReactNode;
  index?: string;
  className?: string;
};

export function SectionLabel({ children, index, className }: SectionLabelProps) {
  return (
    <p className={cn("mb-6 flex items-center gap-4 text-[0.72rem] font-bold uppercase tracking-[0.28em] text-hero-accent", className)}>
      {index ? <span>{index}</span> : null}
      <span className="h-px w-8 bg-hero-accent" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
