import type { DietaryTag } from "@/data/menu";
import { unsplash } from "@/lib/utils";

export type SignatureDish = {
  id: string;
  menuId: string;
  name: string;
  description: string;
  price: number;
  tags: DietaryTag[];
  image: string;
  imageAlt: string;
};

export const signatureDishes: SignatureDish[] = [
  {
    id: "chicken-biryani",
    menuId: "chicken-biryani",
    name: "Chicken biryani",
    description: "Dum rice, whole spices, and chicken on the bone.",
    price: 650,
    tags: ["GF"],
    image: unsplash("photo-1589302168068-964664d93dc0", 1400),
    imageAlt: "Chicken biryani in a serving dish with fried onion",
  },
  {
    id: "chicken-tikka",
    menuId: "chicken-tikka",
    name: "Chicken tikka",
    description: "Yogurt and red chilli, finished on coal.",
    price: 890,
    tags: ["GF"],
    image: unsplash("photo-1599487488170-d11ec9c172f0", 1400),
    imageAlt: "Chicken tikka pieces with charred edges",
  },
  {
    id: "malai-boti",
    menuId: "malai-boti",
    name: "Malai boti",
    description: "Creamy chicken boti, pale and smoky.",
    price: 980,
    tags: ["GF"],
    image: unsplash("photo-1603894584373-5ac82b2ae398", 1400),
    imageAlt: "Grilled chicken pieces on a plate",
  },
  {
    id: "chicken-karahi",
    menuId: "chicken-karahi",
    name: "Chicken karahi",
    description: "Tomato, ginger, and green chilli in a hot karahi.",
    price: 1450,
    tags: ["GF"],
    image: unsplash("photo-1631452180519-c014fe946bc7", 1400),
    imageAlt: "A tomato chicken curry in a metal karahi",
  },
  {
    id: "zinger-burger",
    menuId: "zinger-burger",
    name: "Zinger burger",
    description: "Crisp chicken fillet, slaw, and a soft bun.",
    price: 690,
    tags: [],
    image: "/images/hero/burger.png",
    imageAlt: "A chicken burger with lettuce and cheese",
  },
  {
    id: "mutton-karahi",
    menuId: "mutton-karahi",
    name: "Mutton karahi",
    description: "Slow mutton with black pepper and desi ghee.",
    price: 2200,
    tags: ["GF"],
    image: unsplash("photo-1544025162-d76694265947", 1400),
    imageAlt: "A rich mutton dish served in a dark bowl",
  },
];
