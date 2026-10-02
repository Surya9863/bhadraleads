/**
 * Single source of truth for WhatsApp routing.
 * Change the numbers here only — nothing else in the app hardcodes them.
 */
export const WHATSAPP_CONFIG = {
  /** Used for all service enquiries by default. */
  primary: "919966003186",
  /** Reserved for future routing / overflow. */
  secondary: "917036969003",
  /** Human-readable display formats. */
  display: {
    primary: "+91 99660 03186",
    secondary: "+91 70369 69003",
  },
} as const;

/** Which number receives service enquiries today. */
export const ENQUIRY_ROUTE: "primary" | "secondary" = "primary";

export function getEnquiryNumber(): string {
  return WHATSAPP_CONFIG[ENQUIRY_ROUTE];
}
