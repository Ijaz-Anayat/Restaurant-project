import { unsplash } from "@/lib/utils";

export type GalleryImage = {
  src: string;
  alt: string;
  className: string;
  speed: number;
};

export const gallery: GalleryImage[] = [
  {
    src: unsplash("photo-1517248135467-4c7edcad34c4", 1600),
    alt: "A dim dining room with set tables and warm pendant light",
    className: "col-span-2 row-span-2 min-h-[18rem] md:min-h-[34rem]",
    speed: 10,
  },
  {
    src: unsplash("photo-1559339352-11d035aa65de", 1200),
    alt: "Close table setting with glassware in a restaurant",
    className: "min-h-[14rem] md:min-h-[16rem]",
    speed: 16,
  },
  {
    src: unsplash("photo-1550966871-3ed3cdb5ed0c", 1200),
    alt: "Dark restaurant interior with leather banquettes",
    className: "min-h-[14rem] md:min-h-[16rem]",
    speed: -12,
  },
  {
    src: unsplash("photo-1414235077428-338989a2e8c0", 1400),
    alt: "A fine-dining plate photographed from above",
    className: "col-span-2 min-h-[16rem] md:min-h-[20rem]",
    speed: 8,
  },
  {
    src: unsplash("photo-1514933651103-005eec06c04b", 1200),
    alt: "A moody bar with bottles and low warm light",
    className: "min-h-[16rem] md:min-h-[22rem]",
    speed: 14,
  },
  {
    src: unsplash("photo-1555939594-58d7cb561ad1", 1400),
    alt: "Food cooking over an open flame",
    className: "min-h-[16rem] md:min-h-[22rem]",
    speed: -10,
  },
];
