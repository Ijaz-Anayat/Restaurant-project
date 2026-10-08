"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type KeyboardEvent } from "react";
import { AddButton } from "@/components/cart/AddButton";
import { itemsFor, menuCategories, tagLabels, type MenuCategory } from "@/data/menu";
import { formatPrice, easeOut } from "@/lib/utils";

type MenuBoardProps = {
  initial?: MenuCategory;
};

export function MenuBoard({ initial = "grills" }: MenuBoardProps) {
  const [active, setActive] = useState<MenuCategory>(initial);
  const current = menuCategories.find((category) => category.id === active) ?? menuCategories[0];
  const items = itemsFor(active);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = menuCategories.findIndex((category) => category.id === active);
    if (event.key === "ArrowRight") {
      setActive(menuCategories[(index + 1) % menuCategories.length].id);
    }
    if (event.key === "ArrowLeft") {
      setActive(menuCategories[(index - 1 + menuCategories.length) % menuCategories.length].id);
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Menu categories"
          className="flex gap-6 overflow-x-auto border-b border-white/15"
        onKeyDown={onKeyDown}
      >
        {menuCategories.map((category) => {
          const selected = category.id === active;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              id={`tab-${category.id}`}
              aria-selected={selected}
              aria-controls={`panel-${category.id}`}
              tabIndex={selected ? 0 : -1}
              className={`relative min-h-11 pb-4 text-[0.72rem] font-bold uppercase tracking-[0.16em] ${selected ? "text-hero-green-bottom" : "text-cream/70"}`}
              onClick={() => setActive(category.id)}
            >
              {category.label}
              {selected ? <motion.span layoutId="menu-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-hero-green-bottom" /> : null}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-cream/75">{current.copy}</p>

      <AnimatePresence mode="wait">
        <motion.ul
          key={active}
          id={`panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className="mt-8 divide-y divide-white/10"
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
          }}
        >
          {items.map((item) => (
            <motion.li
              key={item.id}
              id={item.id}
              className="scroll-mt-28 py-6"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
              }}
            >
              <div className="flex items-start gap-4">
                <div className="relative mt-1 h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                  <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-3xl text-cream">{item.name}</h3>
                    <span className="mb-1 hidden flex-1 border-b border-dotted border-hero-deep/20 sm:block" />
                    <p className="text-sm font-semibold text-hero-accent">{formatPrice(item.price)}</p>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <p className="text-sm text-cream/75">{item.description}</p>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        title={tagLabels[tag]}
                        className="border border-white/25 px-2 py-1 text-[0.62rem] tracking-[0.16em] text-cream"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <AddButton item={item} />
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
