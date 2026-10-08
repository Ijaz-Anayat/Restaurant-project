"use client";

import Image from "next/image";
import { menu, upsellIds } from "@/data/menu";
import { AddButton } from "@/components/cart/AddButton";
import { formatPrice } from "@/lib/utils";

export function UpsellRow() {
  const items = upsellIds
    .map((id) => menu.find((item) => item.id === id))
    .filter((item): item is (typeof menu)[number] => Boolean(item));

  if (items.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-hero-deep">Add naan or a lassi?</p>
      <ul className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {items.map((item) => (
          <li key={item.id} className="w-36 shrink-0 rounded-2xl border border-hero-deep/15 p-2">
            <div className="relative mb-2 h-16 overflow-hidden rounded-xl">
              <Image src={item.image} alt="" fill sizes="144px" className="object-cover" />
            </div>
            <p className="text-sm font-semibold text-hero-tagline">{item.name}</p>
            <p className="text-xs text-hero-accent">{formatPrice(item.price)}</p>
            <div className="mt-2">
              <AddButton item={item} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
