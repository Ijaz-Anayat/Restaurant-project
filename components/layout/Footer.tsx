import Link from "next/link";
import { site, type SiteSocialIcon } from "@/lib/site";

function SocialIcon({ icon }: { icon: SiteSocialIcon }) {
  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 8h3V5h-3a4 4 0 0 0-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13V9a1 1 0 0 1 1-1z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const loop = `${site.name}  ·  Fire  ·  Fresh  ·  Craft  ·  `;

  return (
    <footer className="border-t border-hero-white/15 bg-hero-stat-to text-hero-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-display text-3xl text-hero-white">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted">{site.tagline}. A presentation demo with no live bookings.</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-hero-white">
          <Link href="/menu" className="hover:text-hero-green-bottom">
            Menu
          </Link>
          <Link href="/reservations" className="hover:text-hero-green-bottom">
            Reservations
          </Link>
          <a href={site.phoneHref} className="hover:text-hero-green-bottom">
            {site.phone}
          </a>
          <div className="flex gap-3">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hero-white/30 hover:border-hero-green-bottom hover:text-hero-green-bottom"
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-t border-white/10 py-6">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => (
            <p
              key={copy}
              className="px-4 font-display text-[clamp(4.5rem,14vw,10rem)] leading-none tracking-[-0.04em] text-hero-white"
              aria-hidden={copy === 1}
            >
              {loop}
              <span className="text-hero-green-bottom"> {loop}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs uppercase tracking-[0.18em] text-muted md:flex-row md:justify-between md:px-10">
        <p>
          © {year} {site.name}
        </p>
        <p>Demo — replace copy, menu, and models before launch</p>
      </div>
    </footer>
  );
}
