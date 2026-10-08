"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartTotals, useTotals } from "@/components/cart/CartTotals";
import { UpsellRow } from "@/components/cart/UpsellRow";
import { WhatsAppQuickOrder } from "@/components/cart/WhatsAppQuickOrder";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getLenis } from "@/lib/lenis";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/utils";
import { useCartCount, useCartStore } from "@/store/cart";
import { useExperienceStore } from "@/store/useExperienceStore";
import { useUiStore } from "@/store/ui";

export function CartDrawer() {
  const open = useUiStore((state) => state.drawerOpen);
  const closeDrawer = useUiStore((state) => state.closeDrawer);
  const whatsappOpen = useUiStore((state) => state.whatsappOpen);
  const openWhatsapp = useUiStore((state) => state.openWhatsapp);
  const items = useCartStore((state) => state.items);
  const count = useCartCount();
  const totals = useTotals();
  const panelRef = useRef<HTMLElement>(null);
  const mobile = useMediaQuery("(max-width: 767px)");
  useFocusTrap(open, panelRef, closeDrawer);
  const belowMinimum = totals.subtotal > 0 && totals.subtotal < site.order.minOrder;

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      if (!useExperienceStore.getState().menuOpen) getLenis()?.start();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80]">
          <motion.button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 bg-hero-stat-to/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="absolute inset-x-0 bottom-0 flex max-h-[92svh] flex-col rounded-t-[28px] bg-hero-white text-hero-tagline shadow-2xl md:inset-y-0 md:left-auto md:right-0 md:w-[min(100%,28rem)] md:rounded-none"
            initial={mobile ? { y: "100%" } : { x: "100%" }}
            animate={mobile ? { y: 0 } : { x: 0 }}
            exit={mobile ? { y: "100%" } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <header className="flex items-center justify-between border-b border-hero-deep/10 px-5 py-4">
              <div>
                <h2 id="cart-title" className="font-display text-4xl tracking-wide text-hero-deep">
                  Your Order
                </h2>
                <p className="text-sm">{count} {count === 1 ? "item" : "items"}</p>
              </div>
              <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-hero-deep/20" onClick={closeDrawer} aria-label="Close">
                ×
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <div className="grid min-h-64 place-items-center text-center">
                  <div>
                    <p className="text-5xl" aria-hidden>
                      🍔
                    </p>
                    <p className="mt-3 font-semibold">Your cart is hungry</p>
                    <Link href="/menu" className="mt-4 inline-flex h-11 items-center rounded-full bg-hero-deep px-5 text-sm font-bold text-hero-white" onClick={closeDrawer}>
                      Browse Menu
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <ul>
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <CartItemRow key={item.id} item={item} />
                      ))}
                    </AnimatePresence>
                  </ul>
                  <UpsellRow />
                  {whatsappOpen ? <WhatsAppQuickOrder /> : null}
                </>
              )}
            </div>

            {items.length > 0 ? (
              <footer className="sticky bottom-0 space-y-3 border-t border-hero-deep/10 bg-hero-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <CartTotals />
                {belowMinimum ? (
                  <p className="text-xs text-hero-accent">Minimum order is {formatPrice(site.order.minOrder)}.</p>
                ) : null}
                <Link
                  href="/checkout"
                  aria-disabled={belowMinimum}
                  className={`flex h-12 items-center justify-center rounded-full bg-hero-deep text-sm font-bold uppercase tracking-[0.16em] text-hero-white ${belowMinimum ? "pointer-events-none opacity-50" : ""}`}
                  onClick={closeDrawer}
                >
                  Checkout
                </Link>
                <button
                  type="button"
                  disabled={belowMinimum}
                  className="flex h-12 w-full items-center justify-center rounded-full border border-hero-deep text-sm font-bold uppercase tracking-[0.14em] text-hero-deep disabled:opacity-50"
                  onClick={openWhatsapp}
                >
                  Order via WhatsApp
                </button>
              </footer>
            ) : null}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
