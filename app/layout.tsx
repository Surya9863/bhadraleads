import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const title = `${siteConfig.name} | ${siteConfig.descriptor}`;
const description = `${siteConfig.subtitle} Enquire directly on WhatsApp.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  keywords: [
    "BADHRALEADS",
    "business development",
    "promotions",
    "digital marketing",
    "event organising",
    "printing services",
    "packaging manufacturing",
    "WhatsApp enquiry",
  ],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  alternateName: siteConfig.legalName,
  description: `${siteConfig.descriptor} — ${siteConfig.subtitle}`,
  url: siteConfig.url,
  slogan: siteConfig.tagline,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${siteConfig.whatsappPrimary}`,
      availableLanguage: ["en", "hi"],
      areaServed: "IN",
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: `+${siteConfig.whatsappSecondary}`,
      availableLanguage: ["en", "hi"],
      areaServed: "IN",
    },
  ],
} as const;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
