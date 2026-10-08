import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { MenuCatalog } from "@/components/menu/MenuCatalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu",
  description: site.menuDescription,
  alternates: { canonical: "/menu" },
  openGraph: {
    title: `Menu — ${site.name}`,
    description: site.menuDescription,
  },
};

export default function MenuPage() {
  return (
    <main id="content" className="bg-shade-1 text-cream">
      <PageHeader
        kicker="The menu"
        title="Biryani, karahi, and the tandoor."
        lede="Chicken biryani, beef pulao, tikka, malai boti, karahi, roti, and naan. Add any dish to the cart."
      />
      <MenuCatalog />
      <Footer />
    </main>
  );
}
