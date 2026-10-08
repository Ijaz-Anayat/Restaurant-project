import { ReservationForm } from "@/components/sections/ReservationForm";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Reservation() {
  return (
    <section id="reserve" className="bg-shade-2 px-4 py-20 sm:px-6 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionLabel index="07">Reservations</SectionLabel>
          <h2 className="font-display text-5xl leading-[0.92] tracking-[-0.03em] text-cream md:text-7xl">
            Ask for the fire.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
            Two sittings most nights. Tell us the hour and how many places to set.
          </p>
        </div>
        <ReservationForm />
      </div>
    </section>
  );
}
