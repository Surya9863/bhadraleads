export type NavItem = {
  label: string;
  href: string;
};

/**
 * Centralised site configuration.
 * Never duplicate brand strings across components — import from here.
 */
export const siteConfig = {
  name: "BADHRALEADS",
  legalName: "BADHRALEADS",
  description: "Business Developments & Promotions",
  tagline: "Dream Big. We Make It Real.",
  descriptor: "Business Developments & Promotions",
  subtitle:
    "Business development, marketing, events, media, manufacturing and promotional solutions — all under one roof.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://badhraleads.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  whatsappPrimary: "919966003186",
  whatsappPrimaryDisplay: "+91 99660 03186",
  whatsappSecondary: "917036969003",
  whatsappSecondaryDisplay: "+91 70369 69003",
  copyright: "© 2026 BADHRALEADS. All Rights Reserved.",
  nav: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],
  /**
   * Social profiles. Leave the URL empty ("") until the real profile is
   * provided — empty links are never rendered in the UI.
   */
  social: {
    instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
