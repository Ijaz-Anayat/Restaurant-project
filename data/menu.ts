import { unsplash } from "@/lib/utils";

export type MenuCategory = "grills" | "mains" | "breads" | "drinks";

export type DietaryTag = "GF" | "V" | "VG" | "DF" | "N";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: DietaryTag[];
  category: MenuCategory;
  image: string;
};

export const tagLabels: Record<DietaryTag, string> = {
  GF: "Gluten free",
  V: "Vegetarian",
  VG: "Vegan",
  DF: "Dairy free",
  N: "Contains nuts",
};

export const menuCategories: { id: MenuCategory; label: string; copy: string }[] = [
  {
    id: "grills",
    label: "Grill",
    copy: "Tikka, boti, and kebabs off the coal.",
  },
  {
    id: "mains",
    label: "Mains",
    copy: "Biryani, pulao, karahi, and the burger.",
  },
  {
    id: "breads",
    label: "Breads",
    copy: "Roti and naan from the tandoor.",
  },
  {
    id: "drinks",
    label: "Drinks",
    copy: "Doodh patti and lassi for the table.",
  },
];

const menuSeed: Omit<MenuItem, "image">[] = [
  {
    id: "chicken-tikka",
    name: "Chicken tikka",
    description: "Yogurt, red chilli, and coal. Served with mint chutney.",
    price: 890,
    tags: ["GF"],
    category: "grills",
  },
  {
    id: "malai-boti",
    name: "Malai boti",
    description: "Cream, cheese, and white pepper. Soft, pale, and smoky.",
    price: 980,
    tags: ["GF"],
    category: "grills",
  },
  {
    id: "seekh-kebab",
    name: "Seekh kebab",
    description: "Minced beef, green chilli, and charcoal.",
    price: 750,
    tags: ["GF"],
    category: "grills",
  },
  {
    id: "chapli-kebab",
    name: "Chapli kebab",
    description: "Peshawari beef patty with coriander and pomegranate seed.",
    price: 480,
    tags: ["GF"],
    category: "grills",
  },
  {
    id: "chicken-shawarma",
    name: "Chicken shawarma",
    description: "Spiced chicken, garlic sauce, and salad in a paratha roll.",
    price: 450,
    tags: [],
    category: "grills",
  },
  {
    id: "chicken-biryani",
    name: "Chicken biryani",
    description: "Dum rice, whole spices, and chicken on the bone.",
    price: 650,
    tags: ["GF"],
    category: "mains",
  },
  {
    id: "beef-pulao",
    name: "Beef pulao",
    description: "Yakhni rice, tender beef, and fried onion.",
    price: 780,
    tags: ["GF"],
    category: "mains",
  },
  {
    id: "chicken-karahi",
    name: "Chicken karahi",
    description: "Tomato, ginger, and green chilli in a hot karahi.",
    price: 1450,
    tags: ["GF"],
    category: "mains",
  },
  {
    id: "mutton-karahi",
    name: "Mutton karahi",
    description: "Slow mutton, black pepper, and a spoon of desi ghee.",
    price: 2200,
    tags: ["GF"],
    category: "mains",
  },
  {
    id: "zinger-burger",
    name: "Zinger burger",
    description: "Crisp chicken fillet, slaw, and a soft bun.",
    price: 690,
    tags: [],
    category: "mains",
  },
  {
    id: "roti",
    name: "Roti",
    description: "Whole-wheat roti, hot off the tawa.",
    price: 40,
    tags: ["V"],
    category: "breads",
  },
  {
    id: "naan",
    name: "Naan",
    description: "Tandoor naan, brushed with butter.",
    price: 60,
    tags: ["V"],
    category: "breads",
  },
  {
    id: "garlic-naan",
    name: "Garlic naan",
    description: "Naan with garlic, coriander, and butter.",
    price: 90,
    tags: ["V"],
    category: "breads",
  },
  {
    id: "doodh-patti",
    name: "Doodh patti",
    description: "Strong milk tea, boiled the long way.",
    price: 180,
    tags: ["V"],
    category: "drinks",
  },
  {
    id: "mango-lassi",
    name: "Mango lassi",
    description: "Yogurt, mango, and a pinch of salt.",
    price: 280,
    tags: ["V", "GF"],
    category: "drinks",
  },
  {
    id: "sweet-lassi",
    name: "Sweet lassi",
    description: "Chilled yogurt, sugar, and cardamom.",
    price: 220,
    tags: ["V", "GF"],
    category: "drinks",
  },
];

const menuImages: Record<string, string> = {
  "chicken-tikka": unsplash("photo-1599487488170-d11ec9c172f0", 900),
  "malai-boti": unsplash("photo-1603894584373-5ac82b2ae398", 900),
  "seekh-kebab": unsplash("photo-1555939594-58d7cb561ad1", 900),
  "chapli-kebab": unsplash("photo-1558030006-450675393462", 900),
  "chicken-shawarma": unsplash("photo-1561651823-34feb02250e4", 900),
  "chicken-biryani": unsplash("photo-1589302168068-964664d93dc0", 900),
  "beef-pulao": unsplash("photo-1596797038530-2c107229654b", 900),
  "chicken-karahi": unsplash("photo-1631452180519-c014fe946bc7", 900),
  "mutton-karahi": unsplash("photo-1544025162-d76694265947", 900),
  "zinger-burger": "/images/hero/burger.png",
  roti: unsplash("photo-1565557623262-b51c2513a641", 900),
  naan: unsplash("photo-1601050690597-df0568f70950", 900),
  "garlic-naan": unsplash("photo-1626074353765-517a681e40be", 900),
  "doodh-patti": unsplash("photo-1571934811356-5cc061b6821f", 900),
  "mango-lassi": unsplash("photo-1572490122747-3968b75cc699", 900),
  "sweet-lassi": unsplash("photo-1470337458703-46ad1756a187", 900),
};

export const menu: MenuItem[] = menuSeed.map((item) => ({
  ...item,
  image: menuImages[item.id] ?? "/images/hero/burger.png",
}));

export const upsellIds = ["naan", "roti", "mango-lassi"] as const;

export function itemsFor(category: MenuCategory) {
  return menu.filter((item) => item.category === category);
}
