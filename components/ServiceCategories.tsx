"use client";

import { motion } from "framer-motion";
import { SERVICE_CATEGORIES, getServiceIcon, services, type ServiceCategory } from "@/data/services";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

const CATEGORY_ICONS: Record<ServiceCategory, string> = {
  Business: "TrendingUp",
  "Marketing & Media": "Megaphone",
  "Products & Manufacturing": "Boxes",
  Agriculture: "Wheat",
  "Social & Community": "HeartHandshake",
};

const CATEGORY_BLURBS: Record<ServiceCategory, string> = {
  Business: "Partnerships, development, projects and talent.",
  "Marketing & Media": "Digital, print, photo, video and events.",
  "Products & Manufacturing": "Coins, gifts, packaging and bottles.",
  Agriculture: "Practical support for modern farming.",
  "Social & Community": "Charity drives and community initiatives.",
};

/**
 * Visual category overview — anchored at #categories and also acts as a
 * quick way to jump into the services grid.
 */
export function ServiceCategories() {
  return (
    <section id="categories" className="section-pad bg-surface">
      <div className="container-site">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Browse by category"
            title="Five Ways We Help You Grow"
            description="Whether you need a business partner, a marketing team, a packaging supplier or a community initiative — it starts here."
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICE_CATEGORIES.map((category, index) => {
            const Icon = getServiceIcon(CATEGORY_ICONS[category]);
            const count = services.filter((s) => s.category === category).length;

            return (
              <ScrollReveal key={category} delay={index * 0.07}>
                <motion.a
                  href="#services"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex h-full flex-col items-center rounded-2xl border border-line bg-background p-6 text-center shadow-card transition-colors hover:border-gold/50"
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-soft text-gold shadow-[0_14px_28px_-16px_rgba(11,31,58,0.9)] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>

                  <h3 className="font-display mt-4 text-[0.95rem] font-bold leading-snug text-brand-strong">
                    {category}
                  </h3>

                  <p className="mt-2 flex-1 text-[0.78rem] leading-relaxed text-muted">
                    {CATEGORY_BLURBS[category]}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-gold-deep">
                    {count} service{count === 1 ? "" : "s"}
                  </span>
                </motion.a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
