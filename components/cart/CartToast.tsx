"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useUiStore } from "@/store/ui";

export function CartToast() {
  const toast = useUiStore((state) => state.toast);

  return (
    <div className="pointer-events-none fixed left-1/2 top-20 z-[90] -translate-x-1/2" aria-live="polite">
      <AnimatePresence>
        {toast ? (
          <motion.p
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-full bg-hero-white px-4 py-2 text-sm font-semibold text-hero-tagline shadow-lg"
          >
            {toast.message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
