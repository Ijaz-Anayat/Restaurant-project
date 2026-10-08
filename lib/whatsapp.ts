import type { CartItem } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { site } from "@/lib/site";

export type WhatsAppOrder = {
  name: string;
  phone: string;
  type: "delivery" | "pickup";
  address?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  payment: string;
  notes?: string;
};

export function buildWhatsAppMessage(order: WhatsAppOrder) {
  const lines = [
    `New Order - ${site.order.brand}`,
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Type: ${order.type === "delivery" ? "Delivery" : "Pickup"}`,
    `Address: ${order.address?.trim() || "—"}`,
    "----",
    ...order.items.map((item) => {
      const row = `${item.qty}x ${item.name} - ${formatPrice(item.price * item.qty)}`;
      return item.note?.trim() ? `${row}\n(note: ${item.note.trim()})` : row;
    }),
    "----",
    `Subtotal: ${formatPrice(order.subtotal)}`,
    `Delivery: ${formatPrice(order.deliveryFee)}`,
    `Total: ${formatPrice(order.total)}`,
    `Payment: ${order.payment}`,
    `Notes: ${order.notes?.trim() || "—"}`,
  ];
  return lines.join("\n");
}

export function buildWhatsAppUrl(order: WhatsAppOrder) {
  const text = encodeURIComponent(buildWhatsAppMessage(order));
  return `https://wa.me/${site.order.whatsapp}?text=${text}`;
}
