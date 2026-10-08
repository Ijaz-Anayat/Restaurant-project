import { SectionLabel } from "@/components/ui/SectionLabel";

type PageHeaderProps = {
  kicker: string;
  title: string;
  lede: string;
};

export function PageHeader({ kicker, title, lede }: PageHeaderProps) {
  return (
    <header className="mx-auto max-w-6xl px-4 pb-2 pt-28 sm:px-6 sm:pt-32 md:px-10 md:pt-36">
      <SectionLabel>{kicker}</SectionLabel>
      <h1 className="max-w-4xl font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.03em] text-cream">
        {title}
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/80 sm:text-base md:mt-6 md:text-lg">{lede}</p>
    </header>
  );
}
