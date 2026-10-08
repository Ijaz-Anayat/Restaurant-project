import { Mail, MapPin, Phone } from "lucide-react";
import { formatAddress, formatHours, site } from "@/lib/site";

export function VisitAside() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-hero-accent">Hours</p>
        <ul className="mt-4 space-y-3">
          {site.hours.map((slot) => (
            <li key={slot.label} className="flex justify-between gap-6 border-b border-white/15 pb-3 text-sm">
              <span className="text-cream">{slot.label}</span>
              <span className="text-muted">{formatHours(slot)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3 text-sm text-cream/85">
        <p className="flex items-start gap-3">
          <MapPin size={16} className="mt-0.5 text-hero-accent" aria-hidden />
          {formatAddress()}
        </p>
        <p className="flex items-center gap-3">
          <Phone size={16} className="text-hero-accent" aria-hidden />
          <a href={site.phoneHref} className="hover:text-hero-accent">
            {site.phone}
          </a>
        </p>
        <p className="flex items-center gap-3">
          <Mail size={16} className="text-hero-accent" aria-hidden />
          <a href={`mailto:${site.email}`} className="hover:text-hero-accent">
            {site.email}
          </a>
        </p>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="visit" className="bg-shade-1 px-4 py-20 sm:px-6 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-hero-accent">Visit</p>
          <h2 className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.03em] text-cream md:text-7xl">
            {site.address.street}
            <span className="block text-cream/70">{site.address.city}</span>
          </h2>
          <div className="map-grid relative mt-10 min-h-72 overflow-hidden border border-white/15">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="mx-auto block h-3 w-3 rounded-full bg-hero-accent" />
              <p className="mt-4 font-display text-2xl text-cream">{site.name}</p>
              <p className="mt-1 text-sm text-muted">{formatAddress()}</p>
            </div>
          </div>
        </div>
        <VisitAside />
      </div>
    </section>
  );
}
