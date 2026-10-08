"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { site } from "@/lib/site";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  note?: string;
  modifiers?: string[];
};

export type OrderCustomer = {
  name: string;
  phone: string;
  type: "delivery" | "pickup";
  address: string;
  area: string;
  time: string;
  notes: string;
  payment: "cod";
};

export type PlacedOrder = {
  id: string;
  createdAt: string;
  items: CartItem[];
  customer: OrderCustomer;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  eta: string;
};

type CartInput = Omit<CartItem, "qty" | "note" | "modifiers"> & {
  qty?: number;
  note?: string;
  modifiers?: string[];
};

type CartState = {
  items: CartItem[];
  lastOrder: PlacedOrder | null;
  addItem: (item: CartInput) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  setNote: (id: string, note: string) => void;
  clear: () => void;
  placeOrder: (customer: OrderCustomer) => PlacedOrder | null;
};

export function cartTotals(items: CartItem[]) {
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal === 0 || subtotal >= site.order.freeDeliveryMin ? 0 : site.order.deliveryFee;
  const tax = Math.round(subtotal * site.order.taxRate);
  const total = subtotal + deliveryFee + tax;
  return { totalItems, subtotal, deliveryFee, tax, total };
}

function orderId() {
  const stamp = Math.floor(1000 + Math.random() * 9000);
  return `BRG-${stamp}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      lastOrder: null,
      addItem: (item) =>
        set((state) => {
          const qty = item.qty ?? 1;
          const existing = state.items.find((entry) => entry.id === item.id);
          if (!existing) {
            return {
              items: [
                ...state.items,
                {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                  qty,
                  note: item.note,
                  modifiers: item.modifiers,
                },
              ],
            };
          }
          return {
            items: state.items.map((entry) =>
              entry.id === item.id
                ? {
                    ...entry,
                    qty: entry.qty + qty,
                    note: item.note ?? entry.note,
                    modifiers: item.modifiers ?? entry.modifiers,
                  }
                : entry,
            ),
          };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      increment: (id) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)),
        })),
      decrement: (id) =>
        set((state) => ({
          items: state.items.flatMap((item) => {
            if (item.id !== id) return [item];
            if (item.qty <= 1) return [];
            return [{ ...item, qty: item.qty - 1 }];
          }),
        })),
      setNote: (id, note) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, note } : item)),
        })),
      clear: () => set({ items: [] }),
      placeOrder: (customer) => {
        const { items } = get();
        if (items.length === 0) return null;
        const { subtotal, deliveryFee, tax, total } = cartTotals(items);
        const order: PlacedOrder = {
          id: orderId(),
          createdAt: new Date().toISOString(),
          items,
          customer,
          subtotal,
          deliveryFee,
          tax,
          total,
          eta: "30–40 min",
        };
        set({ items: [], lastOrder: order });
        return order;
      },
    }),
    {
      name: "burgy-cart",
      skipHydration: true,
      partialize: (state) => ({ items: state.items, lastOrder: state.lastOrder }),
    },
  ),
);

export function useCartCount() {
  return useCartStore((state) => state.items.reduce((sum, item) => sum + item.qty, 0));
}

export function useItemQty(id: string) {
  return useCartStore((state) => state.items.find((item) => item.id === id)?.qty ?? 0);
}
