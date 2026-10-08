"use client";

import Image from "next/image";
import type { CartItem } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

type SummaryTotals = {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
};

export function OrderSummary({ items, totals }: { items: CartItem[]; totals: SummaryTotals }) {
  return (
    <div className="rounded-[24px] border border-hero-deep/15 bg-hero-white p-5 text-hero-tagline">
      <h2 className="font-display text-3xl text-hero-deep">Your order</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <span className="relative h-12 w-12 overflow-hidden rounded-xl">
              <Image src={item.image} alt="" fill sizes="48px" className="object-cover" />
            </span>
            <span className="flex-1 text-sm">
              <span className="block font-semibold">
                {item.qty}× {item.name}
              </span>
              {item.note ? <span className="block text-xs">Note: {item.note}</span> : null}
            </span>
            <span className="text-sm font-semibold">{formatPrice(item.price * item.qty)}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-4 space-y-1 border-t border-hero-deep/10 pt-3 text-sm">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>{formatPrice(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Delivery</dt>
          <dd>{formatPrice(totals.deliveryFee)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Tax</dt>
          <dd>{formatPrice(totals.tax)}</dd>
        </div>
        <div className="flex justify-between text-base font-bold">
          <dt>Total</dt>
          <dd>{formatPrice(totals.total)}</dd>
        </div>
      </dl>
    </div>
  );
}
