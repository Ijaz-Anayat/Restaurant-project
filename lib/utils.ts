import { site } from "@/lib/site";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function unsplash(photoId: string, width = 1800) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

export function formatPrice(value: number) {
  const amount = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(Math.round(value));
  return `${site.order.currency} ${amount}`;
}

export const easeOut = [0.22, 1, 0.36, 1] as const;

export function todayISO() {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}
