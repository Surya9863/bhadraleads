"use client";

import {
  BadgeCheck,
  Clock3,
  Handshake,
  Headphones,
  MessageCircle,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

const REASONS = [
  {
    icon: Target,
    title: "One Partner, Many Needs",
    body: "Business, marketing, events, manufacturing and community work — coordinated by a single team.",
  },
  {
    icon: MessageCircle,
    title: "Direct WhatsApp Response",
    body: "No long forms and no ticket queues. Your enquiry reaches us directly on WhatsApp.",
  },
  {
    icon: Handshake,
    title: "Practical, Structured Approach",
    body: "Every engagement starts with clarity — scope, expectations and next steps agreed upfront.",
  },
  {
    icon: Users,
    title: "Skilled, Accessible Team",
    body: "Experienced professionals who communicate clearly and keep you updated at every stage.",
  },
  {
    icon: Clock3,
    title: "Responsive From Day One",
    body: "Enquiries are picked up quickly so your project keeps moving instead of waiting.",
  },
  {
    icon: BadgeCheck,
    title: "No Unsupported Promises",
    body: "We commit only to what we can deliver — clear scope, honest timelines and transparent communication.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="section-pad relative overflow-hidden bg-brand-strong">
      {/* Decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_50%_at_85%_15%,rgba(201,151,43,0.18),transparent_65%)]"
      />

      <div className="container-site relative">
        <ScrollReveal>
          <SectionHeading
            tone="dark"
            eyebrow="Why choose us"
            title="Built for Businesses That Want Momentum"
            description="We combine a broad service range with a simple, responsive way of working — so you spend less time coordinating and more time growing."
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <ScrollReveal key={reason.title} delay={Math.min(index * 0.08, 0.4)}>
                <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:border-gold/40 hover:bg-white/[0.07]">
                  <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-gold-deep via-gold to-gold-light text-brand-strong shadow-gold transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>

                  <h3 className="font-display mt-4 text-lg font-bold text-white">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{reason.body}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Trust strip */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5">
            {[
              { icon: TrendingUp, label: "Growth-focused engagements" },
              { icon: Headphones, label: "Responsive communication" },
              { icon: Handshake, label: "Long-term relationships" },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/70"
              >
                <item.icon className="size-4 text-gold" aria-hidden="true" />
                {item.label}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
