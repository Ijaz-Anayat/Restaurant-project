export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "lena",
    quote:
      "The room smells like a hearth and the plates arrive without ceremony. I have not tasted beef treated with this much patience.",
    name: "Lena Voss",
    title: "Guest, March",
  },
  {
    id: "marcus",
    quote:
      "It feels like a private dining room that forgot to close the door. The smoked old fashioned alone is worth the walk down Mercer.",
    name: "Marcus Hale",
    title: "Guest, January",
  },
  {
    id: "priya",
    quote:
      "Quiet service, serious fire. The squash dish is the one I keep describing to people who think wood-fire means smoke and nothing else.",
    name: "Priya Raman",
    title: "Guest, November",
  },
  {
    id: "jonah",
    quote:
      "We stayed long after the last plate. The light drops, the coals tick, and nobody rushes the table. That is the luxury.",
    name: "Jonah Ellis",
    title: "Guest, August",
  },
];
