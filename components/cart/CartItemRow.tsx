"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCartStore, type CartItem } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartItemRow({ item }: { item: CartItem }) {
  const decrement = useCartStore((state) => state.decrement);
  const increment = useCartStore((state) => state.increment);
  const removeItem = useCartStore((state) => state.removeItem);
  const setNote = useCartStore((state) => state.setNote);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.28 }}
      className="grid grid-cols-[4.5rem_1fr] gap-3 border-b border-hero-deep/10 py-4"
    >
      <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-hero-green-bottom/30">
        <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
      </div>
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-hero-tagline">{item.name}</p>
            <p className="text-sm text-hero-accent">{formatPrice(item.price)}</p>
          </div>
          <button
            type="button"
            className="text-xs font-bold uppercase tracking-[0.14em] text-hero-accent"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </div>
        <div className="mt-3 inline-flex h-11 items-center rounded-full border border-hero-deep/20">
          <button type="button" className="grid h-11 w-11 place-items-center" aria-label={`Decrease ${item.name}`} onClick={() => decrement(item.id)}>
            −
          </button>
          <span className="min-w-6 text-center text-sm font-bold tabular-nums">{item.qty}</span>
          <button type="button" className="grid h-11 w-11 place-items-center" aria-label={`Increase ${item.name}`} onClick={() => increment(item.id)}>
            +
          </button>
        </div>
        <label className="mt-3 block">
          <span className="sr-only">Note for {item.name}</span>
          <input
            value={item.note ?? ""}
            placeholder="Note, e.g. no onions"
            className="h-11 w-full rounded-xl border border-hero-deep/15 px-3 text-sm text-hero-tagline outline-none focus-visible:outline-hero-accent"
            onChange={(event) => setNote(item.id, event.target.value)}
          />
        </label>
      </div>
    </motion.li>
  );
}
