"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

/**
 * Direct-to-WhatsApp anchor (server-renderable fallback link) that upgrades
 * itself to an analytics-tracked popup open. The href is always valid, so the
 * conversion path works even if JavaScript fails.
 */
type WhatsAppLinkProps = {
  children: React.ReactNode;
  className?: string;
  message?: string;
  /** Extra analytics context, e.g. { service: "digital-marketing" }. */
  meta?: Record<string, string>;
  number?: string;
};

export function WhatsAppLink({
  children,
  className,
  message,
  meta,
  number = siteConfig.whatsappPrimary,
}: WhatsAppLinkProps) {
  const url = `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackEvent("whatsapp_click", { source: "link", ...meta })}
    >
      {children}
    </a>
  );
}

/* --------------------------- Floating action ----------------------------- */

/**
 * Mobile: compact pill. Desktop: fixed bubble that expands to a small
 * contact card. Always visible, never covering primary content.
 */
export function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Expanded card (desktop hover / always on small screens via tap) */}
      <div
        className={cn(
          "absolute bottom-16 right-0 w-64 origin-bottom-right rounded-2xl border border-line bg-surface p-4 shadow-card-hover transition-all duration-300",
          hovered ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        )}
      >
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-2 rounded-full p-1 text-muted transition-colors hover:bg-brand/5 hover:text-brand"
        >
          <X className="size-3.5" />
        </button>

        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold-deep">
          BADHRALEADS
        </p>
        <p className="mt-1.5 text-sm font-semibold leading-snug text-brand-strong">
          Have a project in mind? Chat with us on WhatsApp.
        </p>
        <p className="mt-2 font-display text-lg font-bold text-brand">{WHATSAPP_DISPLAY.primary}</p>

        <WhatsAppLink
          message="Hi BADHRALEADS Team, I would like to know more about your services."
          meta={{ source: "floating_card" }}
          className="mt-3 block rounded-full bg-[#25D366] px-4 py-2 text-center text-xs font-bold text-[#07321c] shadow-[0_8px_20px_-10px_rgba(37,211,102,0.9)] transition hover:brightness-105"
        >
          Start Chat
        </WhatsAppLink>
      </div>

      {/* Trigger */}
      <button
        type="button"
        aria-label="Enquire on WhatsApp"
        onClick={() => trackEvent("whatsapp_click", { source: "floating_trigger" })}
        className={cn(
          "group relative grid place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_36px_-12px_rgba(37,211,102,0.9)] transition-transform duration-300 hover:scale-105 animate-float"
        )}
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/60 animate-pulse-soft" aria-hidden="true" />
        <span className="relative grid size-13 place-items-center sm:size-14">
          <svg viewBox="0 0 32 32" aria-hidden="true" className="size-7 fill-white">
            <path d="M16.04 3C9.42 3 4.06 8.36 4.06 14.98c0 2.1.55 4.15 1.6 5.96L4 29l8.26-1.6a12.9 12.9 0 0 0 3.78.57h.01c6.61 0 11.97-5.36 11.97-11.98C28.02 8.36 22.66 3 16.04 3Zm0 21.85h-.01c-1.19 0-2.35-.32-3.37-.92l-.24-.15-4.9.96.98-4.78-.16-.25a9.85 9.85 0 0 1-1.51-5.24c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.46-4.44 9.39-9.68 9.39Zm5.43-7.03c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
