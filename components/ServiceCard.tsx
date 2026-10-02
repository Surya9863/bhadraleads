"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { createElement } from "react";
import { motion } from "framer-motion";
import { getServiceIcon, type Service } from "@/data/services";
import { Badge } from "@/components/ui/badge";
import { trackEvent } from "@/lib/analytics";

/**
 * Module-level icon renderer: the icon component reference is resolved
 * inside a statically-declared function rather than during render
 * (keeps react-compiler `static-components` happy).
 */
function CardIcon({ icon, className }: { icon: string; className?: string }) {
  return createElement(getServiceIcon(icon), { className, "aria-hidden": true });
}

type ServiceCardProps = {
  service: Service;
  index: number;
  onOpen: (service: Service) => void;
};

/** Premium service card — opens the detail modal on click / Enter. */
export function ServiceCard({ service, index, onOpen }: ServiceCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.05, 0.3) }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-card-hover"
    >
      <button
        type="button"
        onClick={() => {
          trackEvent("service_view", { service: service.id, source: "card" });
          onOpen(service);
        }}
        className="flex h-full flex-col text-left focus-visible:outline-2 focus-visible:outline-gold"
        aria-label={`View details for ${service.title}`}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand/5">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-strong/70 via-brand-strong/10 to-transparent" />

          <span className="absolute left-4 top-4 font-display text-xs font-bold tracking-[0.2em] text-white/85">
            {service.number}
          </span>

          <span className="absolute bottom-4 left-4 grid size-11 place-items-center rounded-xl bg-gradient-to-br from-gold-deep via-gold to-gold-light text-brand-strong shadow-gold">
            <CardIcon icon={service.icon} className="size-5" />
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <Badge variant="gold" className="w-fit">
            {service.category}
          </Badge>

          <h3 className="font-display mt-3 text-lg font-bold leading-snug text-brand-strong transition-colors group-hover:text-brand-light sm:text-xl">
            {service.title}
          </h3>

          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
            {service.shortDescription}
          </p>

          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
            Enquire now
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </button>
    </motion.article>
  );
}
