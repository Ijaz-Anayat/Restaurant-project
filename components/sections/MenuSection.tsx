import Link from "next/link";
import { MenuBoard } from "@/components/sections/MenuBoard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function MenuSection() {
  return (
    <section id="menu" className="bg-shade-2 px-4 py-20 text-cream sm:px-6 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03">The menu</SectionLabel>
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-xl font-display text-5xl leading-[0.92] tracking-[-0.03em] text-cream md:text-7xl">
            A short list, written for tonight.
          </h2>
          <Link href="/menu" className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-hero-accent">
            Open the full menu
          </Link>
        </div>
        <MenuBoard />
      </div>
    </section>
  );
}
