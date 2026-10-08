import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { MenuSection } from "@/components/sections/MenuSection";
import { Reservation } from "@/components/sections/Reservation";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { SignatureDishes } from "@/components/sections/SignatureDishes";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <main id="content">
      <div id="experience">
        <Hero />
        <ScrollStory />
      </div>
      <SignatureDishes />
      <MenuSection />
      <About />
      <Gallery />
      <Testimonials />
      <Reservation />
      <Contact />
      <Footer />
    </main>
  );
}
