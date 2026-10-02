"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageCircle, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { WhatsAppGlyph } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";

const HERO_STATS = [
  { value: "18+", label: "Services" },
  { value: "5", label: "Categories" },
  { value: "100%", label: "Enquiry-driven" },
];

const HERO_POINTS = [
  "Business, media, manufacturing & more",
  "Direct WhatsApp response",
  "No obligation enquiry",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-brand-strong pt-28 pb-20 sm:pt-36 lg:min-h-[92vh] lg:pt-40 lg:pb-28"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(75%_60%_at_15%_10%,rgba(28,74,134,0.55),transparent_60%),radial-gradient(50%_50%_at_90%_85%,rgba(201,151,43,0.22),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 size-[26rem] rounded-full border border-white/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-24 size-[34rem] rounded-full border border-gold/10"
      />

      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* ------------------------------ Copy ------------------------------ */}
        <div>
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold-light">
              <Star className="size-3.5 fill-gold-light text-gold-light" aria-hidden="true" />
              {siteConfig.descriptor}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display mt-6 text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.1rem]">
              Dream Big.
              <br />
              <span className="bg-gradient-to-r from-gold-light via-gold to-gold-deep bg-clip-text text-transparent">
                We Make It Real.
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {siteConfig.subtitle} From planning to execution — one team for the whole journey.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.26}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppLink
                message={`Hi BADHRALEADS Team, I would like to know more about your services.\n\nMy contact: ${WHATSAPP_DISPLAY.primary}`}
                meta={{ source: "hero_primary" }}
                className="w-full sm:w-auto"
              >
                <span className="inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 text-[0.95rem] font-bold text-[#07321c] shadow-[0_18px_40px_-18px_rgba(37,211,102,0.95)] transition hover:-translate-y-0.5 hover:brightness-105 sm:w-auto">
                  <WhatsAppGlyph className="size-5" />
                  Enquire on WhatsApp
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </WhatsAppLink>

              <a
                href="#services"
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 text-[0.95rem] font-semibold text-white backdrop-blur transition hover:border-gold/60 hover:bg-white/10 sm:w-auto"
              >
                Explore Services
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.34}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
              {HERO_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-[0.82rem] font-medium text-white/60"
                >
                  <CheckCircle2 className="size-4 text-gold" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.42}>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-7">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-extrabold text-gold sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/50">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>


        {/* ----------------------------- Visual ---------------------------- */}
        <ScrollReveal delay={0.2} className="relative">
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
            >
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80"
                alt="Business team collaborating on growth strategy"
                width={1400}
                height={933}
                priority
                className="h-[22rem] w-full object-cover sm:h-[26rem] lg:h-[30rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-strong/80 via-brand-strong/10 to-transparent" />
            </motion.div>

            {/* Floating card — services */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="absolute -left-3 bottom-6 w-44 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:-left-6 sm:w-52"
            >
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold-light">
                18 Services
              </p>
              <p className="mt-1.5 text-xs font-medium leading-snug text-white/80">
                Business, media, manufacturing, agriculture &amp; community.
              </p>
            </motion.div>

            {/* Floating card — response */}
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="absolute -right-3 top-6 flex items-center gap-2.5 rounded-2xl border border-gold/30 bg-brand/85 px-4 py-3 backdrop-blur-xl sm:-right-6"
            >
              <span className="grid size-9 place-items-center rounded-full bg-[#25D366] text-white">
                <MessageCircle className="size-4.5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-white/60">
                  Quick response
                </p>
                <p className="font-display text-sm font-bold text-white">Direct WhatsApp</p>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
