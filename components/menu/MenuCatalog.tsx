"use client";

import { useMemo, useRef, useState, type RefObject } from "react";
import { AddButton } from "@/components/cart/AddButton";
import { Photo } from "@/components/ui/Photo";
import { menu, menuCategories, tagLabels, type MenuCategory, type MenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/utils";

type FilterId = MenuCategory | "all";

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  ...menuCategories.map((category) => ({ id: category.id, label: category.label })),
];

function MenuCard({ item, photoRef }: { item: MenuItem; photoRef: RefObject<HTMLDivElement | null> }) {
  const category = menuCategories.find((entry) => entry.id === item.category);

  return (
    <article
      id={item.id}
      className="flex h-full scroll-mt-32 flex-col overflow-hidden rounded-2xl border border-white/10 bg-shade-3 text-cream shadow-[0_22px_50px_-32px_rgba(0,0,0,0.8)] sm:rounded-[28px]"
    >
      <div ref={photoRef} className="relative">
        <Photo
          src={item.image}
          alt={item.name}
          className="aspect-[5/4] bg-hero-green-mid/20"
          imageClassName="transition-transform duration-500 hover:scale-105"
          sizes="(min-width: 1280px) 22rem, 45vw"
        />
        <p className="absolute bottom-2 left-2 rounded-full bg-shade-0 px-2 py-1 text-xs font-bold text-cream sm:bottom-3 sm:left-3 sm:px-3 sm:py-1.5 sm:text-sm">
          {formatPrice(item.price)}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-5">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-hero-green-bottom sm:text-[0.65rem] sm:tracking-[0.18em]">{category?.label}</p>
        <h2 className="font-display text-xl leading-none text-cream sm:text-[2rem]">{item.name}</h2>
        <p className="text-xs leading-relaxed text-cream/75 sm:text-sm">{item.description}</p>
        {item.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li key={tag}>
                <span title={tagLabels[tag]} className="rounded-full border border-white/20 px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.14em] text-cream">
                  {tagLabels[tag]}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto pt-2">
          <AddButton item={item} sourceRef={photoRef} />
        </div>
      </div>
    </article>
  );
}

function CatalogCard({ item }: { item: MenuItem }) {
  const photoRef = useRef<HTMLDivElement>(null);
  return <MenuCard item={item} photoRef={photoRef} />;
}

export function MenuCatalog() {
  const [active, setActive] = useState<FilterId>("all");
  const items = useMemo(
    () => (active === "all" ? menu : menu.filter((item) => item.category === active)),
    [active],
  );
  const copy = menuCategories.find((category) => category.id === active)?.copy ?? "The full Salt & Fire list, ready to order.";

  return (
    <section aria-labelledby="menu-catalog-heading" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 md:px-10 md:pb-28">
      <div className="sticky top-[4.25rem] z-30 -mx-4 border-b border-white/10 bg-shade-1/95 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 md:mx-0 md:rounded-none md:px-0">
        <div className="flex items-end justify-between gap-4">
          <h2 id="menu-catalog-heading" className="font-display text-2xl text-cream sm:text-4xl">
            Order from the menu
          </h2>
          <p className="shrink-0 text-sm font-semibold text-hero-green-bottom">
            {items.length} {items.length === 1 ? "dish" : "dishes"}
          </p>
        </div>
        <p className="mt-1 hidden text-sm text-cream/70 sm:block">{copy}</p>
        <div role="tablist" aria-label="Menu categories" className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => {
            const selected = filter.id === active;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`shrink-0 rounded-full px-3.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] sm:px-4 sm:py-2.5 sm:text-[0.72rem] sm:tracking-[0.14em] ${
                  selected ? "bg-hero-deep text-hero-white" : "border border-white/20 bg-shade-3 text-cream"
                }`}
                onClick={() => setActive(filter.id)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-2 items-stretch gap-3 sm:mt-8 sm:gap-6 xl:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="min-w-0">
            <CatalogCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
