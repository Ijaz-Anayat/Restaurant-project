export const heroCopy = {
  words: {
    lead: "FLAVOR",
    tail: "POP",
  },
  nav: [
    { label: "About", href: "/#about" },
    { label: "Locations", href: "/#visit" },
    { label: "Delivery", href: "/menu" },
    { label: "Contact", href: "/#visit" },
  ],
  viewMenu: "View menu",
  viewMenuHref: "/menu",
  hotspots: [
    {
      id: "flavor",
      x: 30,
      y: 62,
      side: "left" as const,
      title: "Choose your flavor",
      subtitle: "crafted your way",
    },
    {
      id: "moment",
      x: 74,
      y: 64,
      side: "right" as const,
      title: "Enjoy the moment",
      subtitle: "we handle the rest",
    },
  ],
  notebookTitle: "Place your order",
  orderLink: "Order your burger",
  orderHref: "/menu",
  orderNow: "Order now",
  orderNowHref: "/menu",
  tagline: "Premium burgers made for those who crave more than just food.",
  stat: {
    value: 100,
    suffix: "K+",
    label: "Happy bites delivered",
  },
  images: {
    burger: "/images/hero/burger.png",
    burgerAlt: "Sesame cheeseburger with lettuce, tomato, and melted cheddar",
    burgerWidth: 839,
    burgerHeight: 788,
    notebook: "/images/hero/notebook.png",
    notebookAlt: "Open notebook beside a small burger and fries",
    avatars: [
      { src: "/images/hero/avatar-1.jpg", alt: "" },
      { src: "/images/hero/avatar-2.jpg", alt: "" },
    ],
    /**
     * TODO: add transparent cutouts before setting heroBurgerMode to "layers".
     * Expected files: top-bun, lettuce, tomato, cheese, patty, bottom-bun.
     */
    layers: [
      { src: "/images/hero/layers/top-bun.png", alt: "Top bun" },
      { src: "/images/hero/layers/lettuce.png", alt: "Lettuce" },
      { src: "/images/hero/layers/tomato.png", alt: "Tomato" },
      { src: "/images/hero/layers/cheese.png", alt: "Cheese" },
      { src: "/images/hero/layers/patty.png", alt: "Beef patty" },
      { src: "/images/hero/layers/bottom-bun.png", alt: "Bottom bun" },
    ],
  },
};

export type HeroHotspot = (typeof heroCopy.hotspots)[number];
