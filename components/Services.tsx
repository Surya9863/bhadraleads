"use client";

import { useMemo, useState, createElement } from "react";
import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import {
  SERVICE_CATEGORIES,
  services,
  getServiceIcon,
  type Service,
  type ServiceCategory,
} from "@/data/services";
import { SectionHeading } from "@/components/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ServiceCard } from "@/components/ServiceCard";
import { EnquiryModal } from "@/components/EnquiryModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trackEvent } from "@/lib/analytics";
import type { AuthUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

type Filter = "All" | ServiceCategory;
const FILTERS: Filter[] = ["All", ...SERVICE_CATEGORIES];

/** Module-level icon renderer (static component — see ServiceCard). */
function ModalIcon({ icon, className }: { icon: string; className?: string }) {
  return createElement(getServiceIcon(icon), { className, "aria-hidden": true });
}

/* ========================================================================== */
/*  Service detail modal                                                      */
/* ========================================================================== */

type ServiceModalProps = {
  service: Service | null;
  onClose: () => void;
  onEnquire: (service: Service) => void;
};

function ServiceModal({ service, onClose, onEnquire }: ServiceModalProps) {
  return (
    <Dialog open={Boolean(service)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0">
        {service ? (
          <>
            {/* Media header */}
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-t-2xl bg-brand/5">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-strong/90 via-brand-strong/25 to-transparent" />

              <span className="absolute left-5 top-5 grid size-11 place-items-center rounded-xl bg-gradient-to-br from-gold-deep via-gold to-gold-light text-brand-strong shadow-gold">
                <ModalIcon icon={service.icon} className="size-5" />
              </span>

              <span className="absolute right-14 top-5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
                {service.number} / {service.category}
              </span>
            </div>

            <div className="px-6 pb-6 sm:px-8 sm:pb-8">
              <DialogHeader>
                <DialogTitle className="text-2xl sm:text-3xl">{service.title}</DialogTitle>
                <DialogDescription className="sr-only">
                  Details for {service.title}
                </DialogDescription>
              </DialogHeader>

              {/* Tagline */}
              <p className="mt-4 border-l-2 border-gold pl-4 font-display text-base font-semibold leading-relaxed whitespace-pre-line text-brand sm:text-lg">
                {service.tagline}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                {service.description}
              </p>


              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                {/* Provides */}
                <div className="rounded-2xl border border-line bg-surface-tint/60 p-5">
                  <h4 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-strong">
                    What we provide
                  </h4>
                  <ul className="mt-3.5 space-y-2.5">
                    {service.provides.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-brand"
                      >
                        <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-deep">
                          <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="rounded-2xl border border-line bg-surface p-5">
                  <h4 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand-strong">
                    Benefits
                  </h4>
                  <ul className="mt-3.5 space-y-3">
                    {service.benefits.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-muted"
                      >
                        <Sparkles className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted">
                  Interested? Enquire directly â€” no forms, no waiting.
                </p>
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onClose}
                    className="justify-center"
                  >
                    Close
                  </Button>
                  <Button
                    type="button"
                    variant="gold"
                    onClick={() => onEnquire(service)}
                    className="justify-center"
                  >
                    Enquire about this service
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}


/* ========================================================================== */
/*  Services section â€” category filter + grid + modal orchestration           */
/* ========================================================================== */

export function Services() {
  const [filter, setFilter] = useState<Filter>("All");
  const [detail, setDetail] = useState<Service | null>(null);
  const [enquiry, setEnquiry] = useState<Service | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? services : services.filter((s) => s.category === filter)),
    [filter]
  );

  const openDetail = (service: Service) => setDetail(service);

  const openEnquiry = (service: Service) => {
    trackEvent("service_enquiry_click", { service: service.id });
    setDetail(null);
    setEnquiry(service);
  };

  return (
    <section id="services" className="section-pad relative overflow-hidden bg-background">
      <div className="container-site">
        {/* Heading */}
        <ScrollReveal>
          <SectionHeading
            eyebrow="What we do"
            title="18 Services. One Trusted Partner."
            description="Explore our full range across business, marketing, manufacturing, agriculture and community initiatives. Tap any service to see details and enquire instantly."
          />
        </ScrollReveal>

        {/* Category filter */}
        <ScrollReveal delay={0.1}>
          <div
            className="mt-10 flex flex-wrap justify-center gap-2.5 sm:gap-3"
            role="tablist"
            aria-label="Filter services by category"
          >
            {FILTERS.map((item) => {
              const active = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(item)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[0.78rem] font-bold transition-all duration-300 sm:px-5 sm:text-sm",
                    active
                      ? "border-transparent bg-brand text-white shadow-[0_12px_28px_-14px_rgba(11,31,58,0.9)]"
                      : "border-line bg-surface text-muted hover:border-gold/50 hover:text-gold-deep"
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} onOpen={openDetail} />
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted">
            No services in this category yet â€” try another filter.
          </p>
        ) : null}
      </div>

      {/* Modals */}
      <ServiceModal
        service={detail}
        onClose={() => setDetail(null)}
        onEnquire={openEnquiry}
      />
      <EnquiryModal
        service={enquiry}
        onClose={() => setEnquiry(null)}
        user={user}
        onUserChange={setUser}
      />
    </section>
  );
}


