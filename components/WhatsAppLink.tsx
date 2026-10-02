"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";

/**
 * Direct-to-WhatsApp anchor (works without JS) that also emits an analytics
 * event. The href is always a valid wa.me link, so the conversion path never
 * depends on scripts running.
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
