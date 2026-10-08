"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, type MouseEvent } from "react";
import { CartButton } from "@/components/cart/CartButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getLenis, scrollToTarget } from "@/lib/lenis";
import { site } from "@/lib/site";
import { cn, easeOut } from "@/lib/utils";
import { useExperienceStore } from "@/store/useExperienceStore";

function navigateHash(event: MouseEvent<HTMLAnchorElement>, href: string, pathname: string) {
  if (!href.startsWith("/#") || pathname !== "/") return;
  const id = href.slice(2);
  const node = document.getElementById(id);
  if (!node) return;
  event.preventDefault();
  scrollToTarget(node, -8);
}

export function Navbar() {
  const pathname = usePathname();
  const navHidden = useExperienceStore((state) => state.navHidden);
  const menuOpen = useExperienceStore((state) => state.menuOpen);
  const setMenuOpen = useExperienceStore((state) => state.setMenuOpen);

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500",
        navHidden && !menuOpen && "-translate-y-full",
      )}
    >
      <div
        className={cn(
          "relative z-50 flex items-center justify-between px-5 py-4 transition-colors duration-500 md:px-10",
          "border-b border-white/10 bg-charcoal/95 text-cream backdrop-blur-xl",
        )}
      >
        <Link
          href="/"
          className="font-display text-xl tracking-[0.14em] text-cream"
          onClick={(event) => {
            setMenuOpen(false);
            if (pathname !== "/") return;
            event.preventDefault();
            scrollToTarget(0);
          }}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-cream hover:text-hero-accent"
              onClick={(event) => navigateHash(event, item.href, pathname)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CartButton />
          <MagneticButton href="/reservations" className="hidden sm:inline-flex">
            Reserve
          </MagneticButton>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-cream lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-menu"
            key="mobile-menu"
            aria-label="Mobile"
            className="fixed inset-0 z-40 flex flex-col justify-end gap-6 overflow-y-auto bg-charcoal px-6 pb-16 pt-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {site.nav.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * index, duration: 0.5, ease: easeOut }}
              >
                <Link
                  href={item.href}
                  className="font-display text-5xl text-cream"
                  onClick={(event) => {
                    setMenuOpen(false);
                    navigateHash(event, item.href, pathname);
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <MagneticButton href="/reservations" onClick={() => setMenuOpen(false)}>
              Reserve a table
            </MagneticButton>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
