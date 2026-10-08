"use client";

import Link from "next/link";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { OrderTracker } from "@/components/checkout/OrderTracker";
import type { PlacedOrder } from "@/store/cart";

export function OrderSuccess({ order }: { order: PlacedOrder }) {
  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-6 py-28 md:grid-cols-[1.1fr_0.9fr] md:px-10">
      <div className="rounded-[28px] bg-hero-white p-6 text-hero-tagline shadow-sm md:p-8">
        <p className="text-5xl" aria-hidden>
          🍔
        </p>
        <h1 className="mt-4 font-display text-5xl text-hero-deep">Order placed!</h1>
        <p className="mt-2 text-lg">
          Order <span className="font-bold">{order.id}</span>
        </p>
        <p className="mt-1">Estimated time {order.eta}.</p>
        <OrderTracker />
        <Link href="/menu" className="mt-8 inline-flex h-12 items-center rounded-full bg-hero-deep px-6 text-sm font-bold uppercase tracking-[0.14em] text-hero-white">
          Back to menu
        </Link>
        <Link href={`/order/${order.id}`} className="ml-3 inline-flex h-12 items-center rounded-full border border-hero-deep px-6 text-sm font-bold text-hero-deep">
          Track order
        </Link>
      </div>
      <OrderSummary items={order.items} totals={order} />
    </section>
  );
}
