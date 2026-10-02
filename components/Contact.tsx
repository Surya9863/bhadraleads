"use client";

import { useState } from "react";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { WHATSAPP_DISPLAY, generateWhatsAppMessage } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { EnquiryModal } from "@/components/EnquiryModal";
import { trackEvent } from "@/lib/analytics";
import type { AuthUser } from "@/lib/auth";

export function Contact() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const defaultMessage = generateWhatsAppMessage({});

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-brand-strong">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(55%_55%_at_20%_80%,rgba(28,74,134,0.5),transparent_65%),radial-gradient(45%_45%_at_85%_20%,rgba(201,151,43,0.2),transparent_65%)]"
      />

      <div className="container-site relative">
        <ScrollReveal>
          <SectionHeading
            tone="dark"
            eyebrow="Get in touch"
            title="Let's Start the Conversation"
            description="Tell us what you need — a service, a project or just some advice. The fastest way to reach us is WhatsApp."
          />
        </ScrollReveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
          {/* WhatsApp */}
          <ScrollReveal delay={0.05}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
              <span className="grid size-12 place-items-center rounded-xl bg-[#25D366] text-white">
                <MessageCircle className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-display mt-4 text-lg font-bold text-white">WhatsApp us</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                The quickest route — enquiries are read directly by our team.
              </p>
              <a
                href={`https://wa.me/${siteConfig.whatsappPrimary}?text=${encodeURIComponent(defaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "contact_card" })}
                className="font-display mt-4 text-xl font-extrabold text-gold hover:text-gold-light"
              >
                {WHATSAPP_DISPLAY.primary}
              </a>
              <span className="mt-auto pt-5 text-[0.72rem] text-white/45">
                Also available: {WHATSAPP_DISPLAY.secondary}
              </span>
            </div>
          </ScrollReveal>

          {/* Phone */}
          <ScrollReveal delay={0.14}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
              <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-gold-deep via-gold to-gold-light text-brand-strong shadow-gold">
                <Phone className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-display mt-4 text-lg font-bold text-white">Call us</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                Prefer to talk it through? Give us a call during business hours.
              </p>
              <a
                href={`tel:+${siteConfig.whatsappPrimary}`}
                className="font-display mt-4 text-xl font-extrabold text-gold hover:text-gold-light"
              >
                {WHATSAPP_DISPLAY.primary}
              </a>
              <span className="mt-auto pt-5 text-[0.72rem] text-white/45">
                Business hours, Mon–Sat
              </span>
            </div>
          </ScrollReveal>

          {/* Email (only when configured) */}
          <ScrollReveal delay={0.23}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
              <span className="grid size-12 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/20">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-display mt-4 text-lg font-bold text-white">Email us</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                For detailed briefs and documents, write to us.
              </p>
              {siteConfig.email ? (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-display mt-4 break-all text-lg font-extrabold text-gold hover:text-gold-light"
                >
                  {siteConfig.email}
                </a>
              ) : (
                <p className="mt-4 text-sm text-white/50">
                  Email address coming soon — WhatsApp is the fastest option.
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center gap-4 rounded-2xl border border-gold/30 bg-gradient-to-r from-gold/15 to-transparent p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-lg font-bold text-white">
                Not sure which service you need?
              </p>
              <p className="mt-1 text-sm text-white/60">
                Send us a message — we will point you in the right direction.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={() => setEnquiryOpen(true)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light px-6 text-sm font-bold text-brand-strong shadow-gold transition hover:-translate-y-0.5 hover:brightness-105"
              >
                Start an Enquiry
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>

              <a
                href={`https://wa.me/${siteConfig.whatsappPrimary}?text=${encodeURIComponent(defaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "contact_cta" })}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-bold text-[#07321c] transition hover:brightness-105"
              >
                <WhatsAppGlyph className="size-4.5" />
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <EnquiryModal
        open={enquiryOpen}
        service={null}
        onClose={() => setEnquiryOpen(false)}
        user={user}
        onUserChange={setUser}
      />
    </section>
  );
}

