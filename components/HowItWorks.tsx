"use client";

import { MessageCircle, SearchCheck, Send, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

const STEPS = [
  {
    step: "01",
    icon: SearchCheck,
    title: "Choose a Service",
    body: "Browse the 18 services across five categories and open the one that fits your need.",
  },
  {
    step: "02",
    icon: MessageCircle,
    title: "Enquire on WhatsApp",
    body: "One tap opens WhatsApp with your enquiry pre-filled — add your name if you like.",
  },
  {
    step: "03",
    icon: Send,
    title: "We Respond & Plan",
    body: "Our team replies directly, asks the right questions and shares the next steps.",
  },
  {
    step: "04",
    icon: Sparkles,
    title: "We Deliver",
    body: "Work moves forward with clear communication from kickoff through completion.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad bg-background">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How it works"
            title="From Enquiry to Delivery in Four Steps"
            description="No lengthy forms. No back-and-forth forms. The whole journey starts with a single WhatsApp message."
          />
        </ScrollReveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.step} delay={index * 0.1}>
                <li className="relative h-full rounded-2xl border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-hover">
                  {/* Connector line (desktop) */}
                  {index < STEPS.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute -right-4 top-12 hidden h-px w-4 bg-gold/40 lg:block"
                    />
                  ) : null}

                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-soft text-gold">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-3xl font-extrabold text-line">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-display mt-4 text-lg font-bold text-brand-strong">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                </li>
              </ScrollReveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
