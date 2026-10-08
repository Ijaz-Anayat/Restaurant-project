import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Checkout",
  description: `Place a demo order at ${site.name}. Nothing is charged.`,
};

export default function CheckoutPage() {
  return (
    <main id="content" className="bg-charcoal text-cream">
      <CheckoutForm />
      <Footer />
    </main>
  );
}
