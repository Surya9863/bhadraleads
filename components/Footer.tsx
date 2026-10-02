"use client";

import { ArrowUp, Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { Wordmark } from "@/components/Navbar";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/SocialIcons";
import { ScrollReveal } from "@/components/ScrollReveal";
import { services } from "@/data/services";

const SOCIAL_LINKS = [
  {
    key: "instagramUrl",
    label: "Instagram",
    href: siteConfig.social.instagramUrl,
    Icon: InstagramIcon,
  },
  {
    key: "facebookUrl",
    label: "Facebook",
    href: siteConfig.social.facebookUrl,
    Icon: FacebookIcon,
  },
  { key: "youtubeUrl", label: "YouTube", href: siteConfig.social.youtubeUrl, Icon: YoutubeIcon },
].filter((link) => Boolean(link.href));

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-strong pt-16 pb-8 text-white">
      {/* Accent top rule */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 gold-rule" />

      <div className="container-site">
        <ScrollReveal>
          <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            {/* Brand */}
            <div>
              <Wordmark invert className="text-xl" />
              <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">
                {siteConfig.descriptor}
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
                {siteConfig.subtitle}
              </p>

              {/* Socials — only rendered when a real URL is configured */}
              {SOCIAL_LINKS.length > 0 ? (
                <div className="mt-5 flex items-center gap-3">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.key}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-gold/60 hover:text-gold"
                    >
                      <link.Icon className="size-4" />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Links */}
            <nav aria-label="Footer">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-gold">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#categories"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    Categories
                  </a>
                </li>
              </ul>
            </nav>

            {/* Services */}
            <nav aria-label="Services">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-gold">
                Services
              </h3>
              <ul className="mt-4 space-y-2.5">
                {services.slice(0, 6).map((service) => (
                  <li key={service.id}>
                    <a
                      href="#services"
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#services"
                    className="text-sm font-semibold text-gold transition-colors hover:text-gold-light"
                  >
                    View all {services.length} services →
                  </a>
                </li>
              </ul>
            </nav>


            {/* Contact */}
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-gold">
                Contact
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-white/60">
                <li>
                  <WhatsAppLink
                    message="Hi BADHRALEADS Team, I would like to know more about your services."
                    meta={{ source: "footer_whatsapp" }}
                    className="inline-flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <MessageCircle className="size-4 text-gold" aria-hidden="true" />
                    {WHATSAPP_DISPLAY.primary}
                  </WhatsAppLink>
                </li>
                <li>
                  <a
                    href={`tel:+${siteConfig.whatsappSecondary}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <Phone className="size-4 text-gold" aria-hidden="true" />
                    {WHATSAPP_DISPLAY.secondary}
                  </a>
                </li>
                {siteConfig.email ? (
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex items-center gap-2 break-all transition-colors hover:text-white"
                    >
                      <Mail className="size-4 text-gold" aria-hidden="true" />
                      {siteConfig.email}
                    </a>
                  </li>
                ) : null}
                <li className="pt-1 text-xs text-white/40">
                  Enquiries answered on WhatsApp during business hours.
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5">
            <span className="text-white/35">Enquiry-driven · No unsupported claims</span>
            <a
              href="#home"
              aria-label="Back to top"
              className="grid size-9 place-items-center rounded-full border border-white/15 text-white/60 transition hover:border-gold/60 hover:text-gold"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
