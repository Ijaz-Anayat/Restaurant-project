import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      colors: {
        hero: {
          "green-top": "var(--hero-green-top)",
          "green-mid": "var(--hero-green-mid)",
          "green-bottom": "var(--hero-green-bottom)",
          deep: "var(--hero-deep)",
          "stat-from": "var(--hero-stat-from)",
          "stat-to": "var(--hero-stat-to)",
          white: "var(--hero-white)",
          accent: "var(--hero-accent)",
          tagline: "var(--hero-tagline)",
          ghost: "var(--hero-ghost)",
        },
      },
    },
  },
} satisfies Config;

export default config;
