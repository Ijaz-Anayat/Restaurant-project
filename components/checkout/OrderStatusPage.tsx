"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { OrderSuccess } from "@/components/checkout/OrderSuccess";
import { useCartStore } from "@/store/cart";

export function OrderStatusPage({ id }: { id: string }) {
  const lastOrder = useCartStore((state) => state.lastOrder);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void useCartStore.persist.rehydrate();
    setReady(true);
  }, []);

  if (!ready) return <main className="min-h-svh bg-charcoal" />;

  if (!lastOrder || lastOrder.id !== id) {
    return (
      <main className="mx-auto max-w-xl px-6 py-32 text-cream">
        <h1 className="font-display text-5xl text-cream">Order not on this device</h1>
        <p className="mt-4">This demo only keeps the latest order in your browser.</p>
        <Link href="/menu" className="mt-6 inline-flex h-12 items-center rounded-full bg-hero-deep px-5 text-sm font-bold text-hero-white">
          Back to menu
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-charcoal">
      <OrderSuccess order={lastOrder} />
    </main>
  );
}
