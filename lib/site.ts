export const site = {
  name: "Salt & Fire",
  tagline: "Charcoal kitchen, Lahore",
  description:
    "Salt & Fire is a charcoal dining room on M.M. Alam Road. Nihari, karahi, and biryani cooked the long way, served without hurry.",
  menuDescription:
    "The Salt & Fire menu: biryani, pulao, tikka, karahi, roti, and naan. Prices in rupees.",
  reserveDescription:
    "Request a table at Salt & Fire in Gulberg, Lahore. Choose a date, time, and party size. This demo holds the request on screen only.",
  url: "https://namak-and-aag.vercel.app",
  locale: "en_PK",
  cuisine: "Pakistani charcoal",
  priceRange: "$$$",
  email: "reservations@namakandaag.example",
  phone: "+92 42 111 624 265",
  phoneHref: "tel:+9242111624265",
  chef: {
    name: "Hamza Qureshi",
    role: "Chef and founder",
  },
  address: {
    street: "48-B, M.M. Alam Road, Gulberg III",
    city: "Lahore",
    region: "Punjab",
    postal: "54660",
    country: "PK",
  },
  colors: {
    charcoal: "#0E0E0E",
    cream: "#F4EDE4",
    ember: "#E8590C",
    gold: "#C9A227",
    muted: "#B3A79D",
  },
  /**
   * "single" uses /public/images/hero/burger.png.
   * "layers" splits that burger when the layer PNGs exist.
   * "3d" is a hook for a later GLB in the persistent canvas. It still shows the PNG.
   */
  heroBurgerMode: "single" as "single" | "layers" | "3d",
  /**
   * Drop a Draco-compressed GLB in /public/models and set this path.
   * Leave null to use the built-in procedural dish.
   */
  modelPath: null as string | null,
  modelScale: 1.35,
  modelRotation: [0, 0.35, 0] as [number, number, number],
  heroPoster:
    "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=2000&q=80",
  ogImage:
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1600&q=80",
  /**
   * Demo ordering. Replace these before a real launch.
   * whatsapp is a placeholder in international format, with no + and no spaces.
   */
  order: {
    brand: "BURGY",
    currency: "Rs.",
    taxRate: 0.05,
    deliveryFee: 150,
    freeDeliveryMin: 2500,
    minOrder: 500,
    whatsapp: "923001234567",
    areas: ["Gulberg", "DHA", "Model Town", "Johar Town", "Cantt", "Bahria Town"],
    times: ["ASAP", "30 minutes", "45 minutes", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
  },
  hours: [
    {
      label: "Tuesday — Thursday",
      days: ["Tuesday", "Wednesday", "Thursday"],
      opens: "19:00",
      closes: "23:30",
    },
    {
      label: "Friday — Saturday",
      days: ["Friday", "Saturday"],
      opens: "19:00",
      closes: "00:30",
    },
    {
      label: "Sunday",
      days: ["Sunday"],
      opens: "13:00",
      closes: "23:00",
    },
    {
      label: "Monday",
      days: [] as string[],
      opens: undefined,
      closes: undefined,
    },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" as const },
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" as const },
  ],
  nav: [
    { label: "Menu", href: "/menu" },
    { label: "Story", href: "/#story" },
    { label: "Dishes", href: "/#dishes" },
    { label: "About", href: "/#about" },
    { label: "Visit", href: "/#visit" },
  ],
  stats: [
    { value: 18, suffix: "", label: "Years on the chulha" },
    { value: 64, suffix: "", label: "Seats in Gulberg" },
    { value: 1, suffix: "", label: "Deg that never rests" },
  ],
};

export type SiteSocialIcon = (typeof site.socials)[number]["icon"];

export function formatAddress() {
  const { street, city, region, postal } = site.address;
  return `${street}, ${city}, ${region} ${postal}`;
}

export function formatHours(slot: (typeof site.hours)[number]) {
  if (!slot.opens || !slot.closes) return "Closed";
  return `${slot.opens} — ${slot.closes}`;
}

export function getRestaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: site.description,
    url: site.url,
    image: site.ogImage,
    telephone: site.phone,
    email: site.email,
    servesCuisine: site.cuisine,
    priceRange: site.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: site.hours
      .filter((slot) => slot.opens && slot.closes)
      .flatMap((slot) =>
        slot.days.map((day) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: day,
          opens: slot.opens,
          closes: slot.closes,
        })),
      ),
  };
}
