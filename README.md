# Ember & Oak

A cinematic restaurant demo for client presentations. One scrolling home page, plus dedicated menu and reservation routes. Mock data only: no database, auth, or payments.

## Stack

- Next.js 15 (App Router) and TypeScript
- Tailwind CSS 4, with brand colors as CSS variables
- three.js, React Three Fiber, Drei, and postprocessing
- GSAP ScrollTrigger, Lenis, and Framer Motion

## Setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
```

## Brand

Change the name, palette, address, hours, chef, and copy in [`lib/site.ts`](lib/site.ts). Color tokens are written onto the document from that file, so the Tailwind theme follows them.

Menu, signatures, testimonials, and gallery copy live in `data/`.

## Hero photos

Copy and hotspot text live in [`data/hero.ts`](data/hero.ts). Hero colors are CSS variables in [`app/globals.css`](app/globals.css), mapped to Tailwind in [`tailwind.config.ts`](tailwind.config.ts). `heroBurgerMode` lives in [`lib/site.ts`](lib/site.ts) (`"single"` | `"layers"` | `"3d"`).

The demo ships with a stand-in cutout. Replace these files in `public/images/hero/` when you have final art:

| File | Size | Notes |
| --- | --- | --- |
| `burger.png` | 1600–2400px wide, transparent PNG or WebP | Shoot or download a stock burger (Pexels or Unsplash), then remove the background with [remove.bg](https://www.remove.bg). The current file is a smaller generated stand-in. |
| `notebook.png` | about 1200px wide, transparent | Open notebook plus a small burger-and-fries plate. |
| `avatar-1.jpg`, `avatar-2.jpg` | 256×256 | Two circular portraits. They are cropped with CSS. |
| `layers/top-bun.png`, `lettuce.png`, `tomato.png`, `cheese.png`, `patty.png`, `bottom-bun.png` | same frame as the burger, transparent | Optional. Set `heroBurgerMode` to `"layers"` only after these exist. Scroll then separates the stack. If a file is missing, the hero falls back to `burger.png`. |

`"3d"` keeps the same text, hotspots, and card. Drop a photoreal GLB later and render it in the persistent canvas inside `HeroBurger`; until then that mode still shows `burger.png`.

## 3D model

The opening hero is a photo composition. The scroll story still uses the procedural plated burger when `public/models` is empty.

To swap in a real dish:

1. Download a CC0 model from [Poly Pizza](https://poly.pizza), [Sketchfab](https://sketchfab.com) (CC0 filter), or [Quaternius](https://quaternius.com).
2. Compress it with Draco:

```bash
npx @gltf-transform/cli optimize input.glb public/models/dish.glb --compress draco --texture-compress webp
```

3. Set `modelPath` to `"/models/dish.glb"` in `lib/site.ts`.
4. Adjust `modelScale` and `modelRotation` until the dish sits on the pedestal.

The canvas stays mounted across routes and pauses when the hero scrolls away. Postprocessing and extra particles turn off on small screens, when `prefers-reduced-motion` is set, or if the performance monitor steps down. If WebGL is missing, the hero uses a still photograph.

## Deploy

On Vercel, set the project root to `frontend` if this folder is not the repository root. No environment variables are required.

Update `site.url` before launch so canonical URLs, Open Graph, the sitemap, and `robots.txt` point at the real domain.
