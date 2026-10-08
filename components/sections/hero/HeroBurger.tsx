"use client";

import Image from "next/image";
import { useState } from "react";
import { Hotspot } from "@/components/sections/hero/Hotspot";
import { heroCopy } from "@/data/hero";
import { site } from "@/lib/site";

const burgerSize = {
  width: heroCopy.images.burgerWidth,
  height: heroCopy.images.burgerHeight,
};

function BurgerPhoto({ priority = true }: { priority?: boolean }) {
  return (
    <Image
      src={heroCopy.images.burger}
      alt={heroCopy.images.burgerAlt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 48vw, 36vw"
      className="object-contain [filter:drop-shadow(0_22px_16px_rgba(8,20,8,0.45))]"
    />
  );
}

function BurgerLayers() {
  const [useSingle, setUseSingle] = useState(false);

  if (useSingle) return <BurgerPhoto />;

  return (
    <>
      {heroCopy.images.layers.map((layer) => (
        <div key={layer.src} data-burger-layer className="absolute inset-0 will-change-transform">
          <Image
            src={layer.src}
            alt={layer.alt}
            fill
            sizes="(max-width: 768px) 48vw, 36vw"
            className="object-contain"
            onError={() => setUseSingle(true)}
          />
        </div>
      ))}
    </>
  );
}

/**
 * "3d" keeps this same frame so a photoreal GLB can replace BurgerPhoto
 * inside the persistent canvas later. The PNG stays until that model exists.
 */
function BurgerModelSlot() {
  return (
    <div data-hero-burger-mode="3d" className="absolute inset-0">
      <BurgerPhoto />
    </div>
  );
}

export function HeroBurger() {
  const mode = site.heroBurgerMode;

  return (
    <div className="pointer-events-none absolute left-1/2 top-[48%] z-[2] w-[48%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 sm:w-[44%] md:top-[50%] md:w-[34%] lg:w-[36%]">
      <div data-burger-scroll className="will-change-transform">
        <div data-burger-parallax className="will-change-transform">
          <div data-burger-intro className="will-change-transform">
            <div data-burger-pose className="will-change-transform">
            <div data-burger-idle className="relative will-change-transform">
              <div className="absolute left-1/2 top-[94%] h-[7%] w-[54%] -translate-x-1/2">
                <div data-burger-shadow className="hero-shadow h-full w-full rounded-[100%] opacity-80" />
              </div>
              <div
                data-burger-photo
                className="relative"
                style={{ aspectRatio: `${burgerSize.width} / ${burgerSize.height}` }}
              >
                {mode === "layers" ? <BurgerLayers /> : null}
                {mode === "3d" ? <BurgerModelSlot /> : null}
                {mode === "single" ? <BurgerPhoto /> : null}
                {heroCopy.hotspots.map((hotspot, index) => (
                  <Hotspot
                    key={hotspot.id}
                    hotspot={hotspot}
                    className={index > 0 ? "pointer-events-auto max-md:hidden" : "pointer-events-auto"}
                  />
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
