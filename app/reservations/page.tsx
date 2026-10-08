import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { VisitAside } from "@/components/sections/Contact";
import { ReservationForm } from "@/components/sections/ReservationForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reservations",
  description: site.reserveDescription,
  alternates: { canonical: "/reservations" },
  openGraph: {
    title: `Reservations — ${site.name}`,
    description: site.reserveDescription,
  },
};

export default function ReservationsPage() {
  return (
    <main id="content" className="bg-charcoal text-cream">
      <PageHeader
        kicker="Reservations"
        title="Hold a place by the fire."
        lede="Choose an evening. The request stays on this screen — the demo does not send it anywhere."
      />
      <div className="mx-auto grid max-w-6xl gap-16 px-6 pb-28 md:px-10 lg:grid-cols-[1.15fr_0.85fr]">
        <ReservationForm />
        <VisitAside />
      </div>
      <Footer />
    </main>
  );
}
