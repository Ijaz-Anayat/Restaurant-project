"use client";

import { useEffect, useState } from "react";
import { useTotals } from "@/components/cart/CartTotals";
import { formatPrice } from "@/lib/utils";
import { useUiStore } from "@/store/ui";

export function MiniCartPill() {
  const totals = useTotals();
  const open = useUiStore((state) => state.drawerOpen);
  const openDrawer = useUiStore((state) => state.openDrawer);
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  if (!ready || open || totals.totalItems === 0) return null;

  return (
    <button
      type="button"
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-40 flex h-12 -translate-x-1/2 items-center gap-2 rounded-full bg-hero-deep px-5 text-sm font-bold text-hero-white shadow-lg md:hidden"
      onClick={openDrawer}
    >
      <span>{totals.totalItems} items</span>
      <span aria-hidden>·</span>
      <span>{formatPrice(totals.total)}</span>
      <span aria-hidden>·</span>
      <span>View cart</span>
    </button>
  );
}
