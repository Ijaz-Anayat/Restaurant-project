import { heroCopy } from "@/data/hero";

function SplitWord({ word, marker }: { word: string; marker: "flavor" | "pop" }) {
  return (
    <span className="inline-flex" aria-hidden>
      {word.split("").map((char, index) => (
        <span key={`${marker}-${char}-${index}`} className="inline-block overflow-hidden">
          <span data-hero-char={marker} className="inline-block">
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}

export function HeroText() {
  const { lead, tail } = heroCopy.words;

  return (
    <>
      <h1 className="sr-only">
        {lead} {tail}
      </h1>

      <div data-ghost-parallax className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-[8%] -translate-x-1/2 md:left-[2%] md:top-[11%] md:translate-x-0">
          <p data-ghost="lead" aria-hidden className="font-hero text-[clamp(2.8rem,16vw,5.2rem)] text-hero-ghost opacity-0 md:text-[clamp(5.6rem,15.6vw,14.4rem)]">
            {lead}
          </p>
        </div>
        <div className="absolute bottom-[34%] left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:right-[3%] md:top-[36%] md:translate-x-0">
          <p data-ghost="tail" aria-hidden className="font-hero text-[clamp(2.8rem,16vw,5.2rem)] text-hero-ghost opacity-0 md:text-[clamp(5.6rem,15.6vw,14.4rem)]">
            {tail}
          </p>
        </div>
      </div>

      <div data-solid-parallax className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 md:left-[4%] md:top-[11%] md:translate-x-0">
          <div data-flavor-scroll className="will-change-transform">
            <p className="font-hero text-[clamp(2.6rem,14vw,4.8rem)] text-hero-white md:text-[clamp(4.5rem,8vw,8rem)]">
              <SplitWord word={lead} marker="flavor" />
            </p>
          </div>
        </div>
        <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:right-[5%] md:top-[17%] md:translate-x-0">
          <div data-pop-scroll className="will-change-transform">
            <p className="font-hero text-[clamp(2.6rem,14vw,4.8rem)] text-hero-tagline md:text-[clamp(4.5rem,8vw,8rem)] md:text-hero-white">
              <SplitWord word={tail} marker="pop" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
