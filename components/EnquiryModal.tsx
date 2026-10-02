"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { getServiceIcon, type Service } from "@/data/services";
import { GoogleSignIn } from "@/components/GoogleSignIn";
import { WhatsAppGlyph } from "@/components/Navbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateWhatsAppMessage, openWhatsApp, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import type { AuthUser } from "@/lib/auth";
import { createElement } from "react";

/**
 * Module-level icon renderer. Component references are resolved inside a
 * statically-declared function (not assigned during render), keeping the
 * React compiler's `static-components` rule happy.
 */
function ServiceIcon({ icon, className }: { icon: string; className?: string }) {
  return createElement(getServiceIcon(icon), { className, "aria-hidden": true });
}

type EnquiryModalProps = {
  /** When provided, the modal is controlled by the caller (e.g. Contact CTA). */
  open?: boolean;
  service: Service | null;
  onClose: () => void;
  user: AuthUser | null;
  onUserChange: (user: AuthUser | null) => void;
};

/**
 * Core conversion modal.
 *
 * - Google sign-in is OPTIONAL and rendered only when Firebase is configured.
 * - "Continue Directly to WhatsApp" always works, sign-in or not.
 * - Shows the exact pre-filled message before opening WhatsApp.
 * - Falls back to the visible number if the popup is blocked.
 */
export function EnquiryModal({
  open,
  service,
  onClose,
  user,
  onUserChange,
}: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappError, setWhatsappError] = useState(false);

  const controlledOpen = open ?? Boolean(service);

  // Track the previously seen identity so pre-fill runs only when it changes.
  // (Derived-during-render pattern — no setState inside an effect.)
  const identity = user ? `${user.email}|${user.name}` : null;
  const lastIdentityRef = useRef<string | null>(null);

  if (identity && lastIdentityRef.current !== identity) {
    lastIdentityRef.current = identity;
    if (!name && user) setName(user.name ?? "");
    if (!email && user) setEmail(user.email ?? "");
  }

  const message = useMemo(
    () =>
      generateWhatsAppMessage({
        service: service
          ? { title: service.title, enquiryIntro: service.enquiryIntro }
          : null,
        user: {
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          picture: user?.picture,
        },
      }),
    [service, name, email, user]
  );

  const handleOpen = () => {
    const result = openWhatsApp({ service, user: { name, email } });
    setWhatsappError(!result.opened);
  };

  // Called by the (optional) Google widget — updates local pre-fill state
  // directly from the callback path (no effect involved).
  const handleUserChange = (next: AuthUser | null) => {
    onUserChange(next);
    if (next) {
      if (!name) setName(next.name ?? "");
      if (!email) setEmail(next.email ?? "");
    }
  };

  return (
    <Dialog
      open={controlledOpen}
      onOpenChange={(next) => {
        if (!next) {
          setWhatsappError(false);
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <span className="mb-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-gold-deep">
            <MessageCircle className="size-3.5" aria-hidden="true" />
            Enquiry
          </span>
          <DialogTitle className="text-xl leading-snug sm:text-2xl">
            {service ? service.title : "Talk to BADHRALEADS"}
          </DialogTitle>
          <DialogDescription>
            {service
              ? `Enquire about ${service.title} — we reply directly on WhatsApp.`
              : "Enquire about our services — we reply directly on WhatsApp."}
          </DialogDescription>
        </DialogHeader>

        {/* Service chip */}
        {service ? (
          <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-tint/70 p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-gold-deep via-gold to-gold-light text-brand-strong">
              <ServiceIcon icon={service.icon} className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-brand-strong">{service.title}</p>
              <p className="truncate text-[0.72rem] text-muted">{service.category}</p>
            </div>
          </div>
        ) : null}

        {/* Optional Google sign-in — never blocks WhatsApp */}
        <GoogleSignIn onUserChange={handleUserChange} className="pt-1" />

        {/* Optional identity fields */}
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">
              Name <span className="font-medium normal-case tracking-normal">(optional)</span>
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-brand placeholder:text-muted/60 transition focus:border-gold focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">
              Email <span className="font-medium normal-case tracking-normal">(optional)</span>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-brand placeholder:text-muted/60 transition focus:border-gold focus:outline-none"
            />
          </label>
        </div>

        {/* Message preview */}
        <div className="max-h-32 overflow-y-auto rounded-xl border border-dashed border-line bg-background p-3.5">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-gold-deep">
            Message preview
          </p>
          <pre className="mt-1.5 whitespace-pre-wrap font-sans text-[0.78rem] leading-relaxed text-muted">
            {message}
          </pre>
        </div>

        {/* Primary conversion */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleOpen}
            className="flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 text-[0.95rem] font-bold text-[#07321c] shadow-[0_16px_36px_-16px_rgba(37,211,102,0.95)] transition hover:-translate-y-0.5 hover:brightness-105"
          >
            <WhatsAppGlyph className="size-5" />
            Continue Directly to WhatsApp
          </button>

          <a
            href={`https://wa.me/${siteConfig.whatsappPrimary}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { source: "enquiry_direct_link" })}
            className="block rounded-full border border-line bg-surface px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-brand transition hover:border-gold hover:text-gold-deep"
          >
            Open WhatsApp link instead
          </a>
        </div>

        {whatsappError ? (
          <p
            role="alert"
            className="rounded-lg bg-amber-50 px-3.5 py-2.5 text-center text-xs font-medium text-amber-800"
          >
            Unable to open WhatsApp. Please use the WhatsApp number below.
          </p>
        ) : null}

        <div className="flex items-center justify-center gap-2 border-t border-line pt-4 text-xs text-muted">
          <span className="text-muted">Prefer to call?</span>
          <a
            href={`tel:+${siteConfig.whatsappPrimary}`}
            className="font-display font-bold text-brand hover:text-gold-deep"
          >
            {WHATSAPP_DISPLAY.primary}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

