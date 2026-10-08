"use client";

import { memo, useRef, useState, type RefObject } from "react";
import { useFlyToCart } from "@/hooks/useFlyToCart";
import { useCartStore, useItemQty, type CartItem } from "@/store/cart";
import { useUiStore } from "@/store/ui";

type Sellable = Pick<CartItem, "id" | "name" | "price" | "image">;

type AddButtonProps = {
  item: Sellable;
  sourceRef?: RefObject<HTMLElement | null>;
};

function AddButtonBase({ item, sourceRef }: AddButtonProps) {
  const qty = useItemQty(item.id);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [busy, setBusy] = useState(false);
  const pending = useRef(0);
  const { fly } = useFlyToCart();

  async function addFrom(source: HTMLElement) {
    pending.current += 1;
    if (busy) return;
    setBusy(true);
    try {
      while (pending.current > 0) {
        pending.current -= 1;
        await fly(source, item.image);
        useCartStore.getState().addItem(item);
        useUiStore.getState().showToast(`Added ${item.name} to cart`);
      }
    } finally {
      setBusy(false);
    }
  }

  if (qty > 0) {
    return (
      <div className="cart-count-pop inline-flex h-11 items-center rounded-full bg-hero-deep text-hero-white">
        <button
          type="button"
          className="grid h-11 w-11 place-items-center text-lg"
          aria-label={`Remove one ${item.name}`}
          onClick={() => useCartStore.getState().decrement(item.id)}
        >
          −
        </button>
        <span className="min-w-6 text-center text-sm font-bold tabular-nums">{qty}</span>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center text-lg"
          aria-label={`Add another ${item.name}`}
          onClick={() => {
            useCartStore.getState().increment(item.id);
            useUiStore.getState().showToast(`Added ${item.name} to cart`);
          }}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      disabled={busy}
      className="inline-flex h-11 items-center rounded-full bg-hero-deep px-5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-hero-white disabled:opacity-70"
      onClick={() => {
        const source = sourceRef?.current ?? buttonRef.current;
        if (!source) return;
        void addFrom(source);
      }}
    >
      Add
    </button>
  );
}

export const AddButton = memo(AddButtonBase);
