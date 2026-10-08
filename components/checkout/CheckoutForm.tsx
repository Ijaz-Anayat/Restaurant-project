"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { OrderSuccess } from "@/components/checkout/OrderSuccess";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { useTotals } from "@/components/cart/CartTotals";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { site } from "@/lib/site";
import { checkoutSchema, type CheckoutValues } from "@/lib/validations";
import { formatPrice } from "@/lib/utils";
import { useCartStore, type PlacedOrder } from "@/store/cart";

const fieldClass = "h-12 w-full rounded-2xl border border-hero-deep/20 bg-hero-white px-4 text-hero-tagline outline-none";

function ErrorText({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.span
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-1 block text-xs text-hero-accent"
        >
          {message}
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
}

export function CheckoutForm() {
  const items = useCartStore((state) => state.items);
  const placeOrder = useCartStore((state) => state.placeOrder);
  const totals = useTotals();
  const [pending, setPending] = useState(false);
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      type: "delivery",
      address: "",
      area: "",
      time: "ASAP",
      notes: "",
      payment: "cod",
    },
  });
  const orderType = watch("type");
  const belowMinimum = totals.subtotal < site.order.minOrder;

  if (order) return <OrderSuccess order={order} />;

  function openWhatsapp(values: CheckoutValues) {
    const url = buildWhatsAppUrl({
      name: values.name,
      phone: values.phone,
      type: values.type,
      address: values.type === "delivery" ? `${values.address}, ${values.area}` : "",
      items,
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      payment: "Cash on Delivery",
      notes: values.notes,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function onPlace(values: CheckoutValues) {
    if (belowMinimum || items.length === 0) return;
    setPending(true);
    window.setTimeout(() => {
      const placed = placeOrder(values);
      setPending(false);
      if (placed) setOrder(placed);
    }, 1500);
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-6 py-28 md:grid-cols-[1.15fr_0.85fr] md:px-10">
      <form className="space-y-4 text-cream" onSubmit={handleSubmit(onPlace)}>
        <h1 className="font-display text-5xl text-cream">Checkout</h1>
        <label className="block text-sm">
          Full name
          <input {...register("name")} autoComplete="name" className={fieldClass} />
          <ErrorText message={errors.name?.message} />
        </label>
        <label className="block text-sm">
          Phone
          <input {...register("phone")} autoComplete="tel" inputMode="tel" placeholder="03XX-XXXXXXX" className={fieldClass} />
          <ErrorText message={errors.phone?.message} />
        </label>
        <fieldset>
          <legend className="mb-2 text-sm">Order type</legend>
          <div className="grid grid-cols-2 gap-2">
            {(["delivery", "pickup"] as const).map((type) => (
              <label key={type} className="flex h-12 items-center justify-center rounded-full border border-white/25 has-[:checked]:bg-hero-deep has-[:checked]:text-hero-white">
                <input type="radio" value={type} className="sr-only" {...register("type")} />
                {type === "delivery" ? "Delivery" : "Pickup"}
              </label>
            ))}
          </div>
        </fieldset>
        {orderType === "delivery" ? (
          <>
            <label className="block text-sm">
              Address
              <input {...register("address")} autoComplete="street-address" className={fieldClass} />
              <ErrorText message={errors.address?.message} />
            </label>
            <label className="block text-sm">
              Area
              <select {...register("area")} className={fieldClass}>
                <option value="">Choose an area</option>
                {site.order.areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <ErrorText message={errors.area?.message} />
            </label>
          </>
        ) : null}
        <label className="block text-sm">
          Delivery time
          <select {...register("time")} className={fieldClass}>
            {site.order.times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <ErrorText message={errors.time?.message} />
        </label>
        <label className="block text-sm">
          Special instructions
          <textarea {...register("notes")} rows={3} className={`${fieldClass} h-auto py-3`} />
          <ErrorText message={errors.notes?.message} />
        </label>
        <fieldset className="space-y-2">
          <legend className="text-sm">Payment</legend>
          <label className="flex h-12 items-center gap-3 rounded-2xl border border-white/25 px-4">
            <input type="radio" value="cod" {...register("payment")} />
            Cash on Delivery
          </label>
          <p className="flex h-12 items-center rounded-2xl border border-white/10 px-4 text-sm text-cream/60">
            Card / JazzCash / Easypaisa — Coming soon
          </p>
        </fieldset>
        {belowMinimum ? <p className="text-sm text-hero-accent">Add {formatPrice(site.order.minOrder - totals.subtotal)} to reach the minimum order.</p> : null}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={pending || belowMinimum || items.length === 0}
            className="h-12 flex-1 rounded-full bg-hero-deep text-sm font-bold uppercase tracking-[0.14em] text-hero-white disabled:opacity-50"
          >
            {pending ? "Placing order…" : "Place Order"}
          </button>
          <button
            type="button"
            disabled={belowMinimum || items.length === 0}
            className="h-12 flex-1 rounded-full border border-cream text-sm font-bold text-cream disabled:opacity-50"
            onClick={handleSubmit(openWhatsapp)}
          >
            Order via WhatsApp
          </button>
        </div>
      </form>
      <div className="md:sticky md:top-28 md:self-start">
        <details className="md:hidden" open>
          <summary className="cursor-pointer text-sm font-bold text-cream">Order summary</summary>
          <div className="mt-3">
            <OrderSummary items={items} totals={totals} />
          </div>
        </details>
        <div className="hidden md:block">
          <OrderSummary items={items} totals={totals} />
        </div>
      </div>
    </div>
  );
}
