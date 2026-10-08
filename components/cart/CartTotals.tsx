"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { cartTotals, useCartStore } from "@/store/cart";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

export function useTotals() {
  const items = useCartStore((state) => state.items);
  return useMemo(() => cartTotals(items), [items]);
}

function Money({ value }: { value: number }) {
  return (
    <motion.span key={value} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="tabular-nums">
      {formatPrice(value)}
    </motion.span>
  );
}

export function CartTotals() {
  const totals = useTotals();
  const remaining = Math.max(site.order.freeDeliveryMin - totals.subtotal, 0);
  const progress = Math.min(totals.subtotal / site.order.freeDeliveryMin, 1);

  return (
    <div className="space-y-2 text-sm text-hero-tagline">
      <div>
        <div className="mb-1 flex justify-between text-xs font-semibold">
          <span>{remaining > 0 ? `Add ${formatPrice(remaining)} more for free delivery` : "Free delivery unlocked"}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-hero-green-bottom/40">
          <div className="h-full rounded-full bg-hero-deep" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
      <div className="flex justify-between">
        <span>Subtotal</span>
        <Money value={totals.subtotal} />
      </div>
      <div className="flex justify-between">
        <span>Delivery</span>
        <Money value={totals.deliveryFee} />
      </div>
      <div className="flex justify-between">
        <span>Tax</span>
        <Money value={totals.tax} />
      </div>
      <div className="flex justify-between text-base font-bold">
        <span>Total</span>
        <Money value={totals.total} />
      </div>
    </div>
  );
}
