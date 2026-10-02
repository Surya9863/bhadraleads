"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { GoogleUserChip } from "@/components/GoogleSignIn";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { cn } from "@/lib/utils";

/** Wordmark: BADHRA + LEADS with gold accent split. */
export function Wordmark({ className, invert }: { className?: string; invert?: boolean }) {
  return (
    <span className={cn("font-display text-lg font-extrabold tracking-tight", className)}>
      <span className={invert ? "text-white" : "text-brand-strong"}>BADHRA</span>
      <span className="text-gold">LEADS</span>
    </span>
  );
}

/** Small WhatsApp glyph used inside CTAs. */
export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className ?? "size-4 fill-current"}>
      <path d="M16.04 3C9.42 3 4.06 8.36 4.06 14.98c0 2.1.55 4.15 1.6 5.96L4 29l8.26-1.6a12.9 12.9 0 0 0 3.78.57h.01c6.61 0 11.97-5.36 11.97-11.98C28.02 8.36 22.66 3 16.04 3Zm0 21.85h-.01c-1.19 0-2.35-.32-3.37-.92l-.24-.15-4.9.96.98-4.78-.16-.25a9.85 9.85 0 0 1-1.51-5.24c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.46-4.44 9.39-9.68 9.39Zm5.43-7.03c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-surface/95 backdrop-blur-xl transition-all duration-300",
        scrolled ? "shadow-nav" : "shadow-none"
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        {/* Logo */}
        <Link
          href="#home"
          className="flex items-center gap-2"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/bhadraleads-logo.png"
            alt={`${siteConfig.name} logo`}
            width={2172}
            height={724}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-[0.92rem] font-semibold text-brand transition-colors hover:text-gold-deep after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <GoogleUserChip />
          </div>

          <WhatsAppLink
            message={`Hi BADHRALEADS Team, I would like to know more about your services.\n\nContact: ${WHATSAPP_DISPLAY.primary}`}
            meta={{ source: "navbar" }}
            className="hidden sm:inline-flex"
          >
            <span className="inline-flex h-10 items-center gap-2 rounded-full bg-[#25D366] px-5 text-xs font-bold uppercase tracking-wider text-[#07321c] shadow-[0_10px_26px_-14px_rgba(37,211,102,0.9)] transition hover:brightness-105">
              <WhatsAppGlyph className="size-4" />
              Enquire on WhatsApp
            </span>
          </WhatsAppLink>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-line text-brand transition-colors hover:border-gold hover:text-gold-deep lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>


      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-surface/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="container-site flex flex-col gap-1 py-5" aria-label="Mobile">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-semibold text-brand transition-colors hover:bg-brand/5 hover:text-gold-deep"
                >
                  {item.label}
                </a>
              ))}

              <div className="mt-3 flex flex-col gap-3 border-t border-line pt-4">
                <WhatsAppLink
                  message={`Hi BADHRALEADS Team, I would like to know more about your services.\n\nContact: ${WHATSAPP_DISPLAY.primary}`}
                  meta={{ source: "navbar_mobile" }}
                >
                  <span className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-bold uppercase tracking-wider text-[#07321c] shadow-[0_10px_26px_-14px_rgba(37,211,102,0.9)]">
                    <WhatsAppGlyph className="size-5" />
                    Enquire on WhatsApp
                  </span>
                </WhatsAppLink>

                <a
                  href={`tel:+${siteConfig.whatsappPrimary}`}
                  className="text-center text-sm font-semibold text-muted hover:text-gold-deep"
                >
                  Call {WHATSAPP_DISPLAY.primary}
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
