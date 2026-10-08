"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { quickOrderSchema, type QuickOrderValues } from "@/lib/validations";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cartTotals, useCartStore } from "@/store/cart";
import { useUiStore } from "@/store/ui";

export function WhatsAppQuickOrder() {
  const items = useCartStore((state) => state.items);
  const close = useUiStore((state) => state.closeWhatsapp);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuickOrderValues>({ resolver: zodResolver(quickOrderSchema) });

  function onSubmit(values: QuickOrderValues) {
    const totals = cartTotals(items);
    const url = buildWhatsAppUrl({
      name: values.name,
      phone: values.phone,
      type: "pickup",
      items,
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      payment: "Cash on Delivery",
    });
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  }

  return (
    <form className="mt-4 space-y-3 rounded-2xl border border-hero-deep/15 p-4" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-sm font-semibold text-hero-tagline">Send this order on WhatsApp</p>
      <label className="block text-sm">
        <span className="mb-1 block text-hero-tagline">Full name</span>
        <input
          {...register("name")}
          autoComplete="name"
          className="h-11 w-full rounded-xl border border-hero-deep/20 px-3 text-hero-tagline"
        />
        {errors.name ? <span className="mt-1 block text-xs text-hero-accent">{errors.name.message}</span> : null}
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-hero-tagline">Phone</span>
        <input
          {...register("phone")}
          autoComplete="tel"
          inputMode="tel"
          placeholder="03XX-XXXXXXX"
          className="h-11 w-full rounded-xl border border-hero-deep/20 px-3 text-hero-tagline"
        />
        {errors.phone ? <span className="mt-1 block text-xs text-hero-accent">{errors.phone.message}</span> : null}
      </label>
      <div className="flex gap-2">
        <button type="submit" className="h-11 flex-1 rounded-full bg-hero-deep text-sm font-bold text-hero-white">
          Open WhatsApp
        </button>
        <button type="button" className="h-11 rounded-full border border-hero-deep px-4 text-sm font-bold text-hero-deep" onClick={close}>
          Cancel
        </button>
      </div>
    </form>
  );
}
