"use client";

import Image from "next/image";
import { CheckCircle2, Compass, Lightbulb, UsersRound } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

const HIGHLIGHTS = [
  {
    icon: Compass,
    title: "Wide service range",
    body: "Business development, marketing, media, manufacturing, agriculture and community initiatives under one roof.",
  },
  {
    icon: Lightbulb,
    title: "Idea to execution",
    body: "We help shape the idea, structure the plan and then handle the work required to deliver it.",
  },
  {
    icon: UsersRound,
    title: "Relationship-first",
    body: "Our goal is a long working relationship — not a one-off transaction.",
  },
];

export function About() {
  return (
    <section id="about" className="section-pad bg-surface">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <ScrollReveal>
            <div className="relative">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-line shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
                  alt="BADHRALEADS style team collaborating in a workshop session"
                  width={1400}
                  height="933"
                  className="h-[20rem] w-full object-cover sm:h-[24rem]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-strong/45 to-transparent" />
              </div>

              {/* Accent card */}
              <div className="absolute -bottom-6 -right-3 w-56 rounded-2xl border border-gold/40 bg-surface p-4 shadow-card-hover sm:-right-6">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold-deep">
                  Our promise
                </p>
                <p className="font-display mt-1.5 text-sm font-bold leading-snug text-brand-strong">
                  Clear communication. Honest timelines. Work that ships.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Copy */}
          <div>
            <ScrollReveal delay={0.1}>
              <SectionHeading
                align="left"
                eyebrow="About us"
                title="BADHRALEADS — Business Developments & Promotions"
                description="We work with businesses, entrepreneurs and communities to turn plans into action — combining strategy, creative execution and reliable delivery."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
                From business development and digital marketing to events, printing, packaging
                manufacturing and community initiatives, BADHRALEADS brings a broad set of
                capabilities together so you deal with one dependable team instead of many vendors.
              </p>
            </ScrollReveal>

            <ul className="mt-7 space-y-5">
              {HIGHLIGHTS.map((item, index) => (
                <ScrollReveal key={item.title} delay={0.24 + index * 0.08}>
                  <li className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-soft text-gold">
                      <item.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-brand-strong">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>

            <ScrollReveal delay={0.5}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
                {[
                  "Business developments",
                  "Promotions & media",
                  "Products & manufacturing",
                ].map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand"
                  >
                    <CheckCircle2 className="size-4 text-gold" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
