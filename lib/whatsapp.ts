import { getEnquiryNumber, WHATSAPP_CONFIG } from "@/config/whatsapp";
import { trackEvent } from "@/lib/analytics";

/** Optional identity captured after an optional Google sign-in. */
export type WhatsAppUser = {
  name?: string;
  email?: string;
  picture?: string;
};

export type WhatsAppServiceLike = {
  title: string;
  /** Optional service-specific enquiry sentence (falls back to generic copy). */
  enquiryIntro?: string;
};

export type GenerateMessageOptions = {
  service?: WhatsAppServiceLike | null;
  user?: WhatsAppUser | null;
  /** Override the generic enquiry sentence for non-service chats. */
  genericMessage?: string;
};

const DEFAULT_SERVICE_LINE =
  "Please share more details, pricing and available options.";
const DEFAULT_GENERIC_LINE =
  "I would like to know more about your services.\n\nPlease share more information.";

/**
 * Builds the pre-filled WhatsApp enquiry message.
 *
 * Example output for "Digital Marketing":
 *
 *   Hi BADHRALEADS Team,
 *
 *   I am interested in your Digital Marketing service.
 *
 *   Please share more details, pricing and available options.
 *
 *   Name: John
 *   Email: john@example.com
 *
 *   Thank you.
 */
export function generateWhatsAppMessage(options: GenerateMessageOptions = {}): string {
  const { service, user, genericMessage } = options;

  const lines: string[] = ["Hi BADHRALEADS Team,", ""];

  if (service) {
    lines.push(`I am interested in your ${service.title} service.`);
    lines.push("");
    lines.push(service.enquiryIntro ?? DEFAULT_SERVICE_LINE);
  } else {
    lines.push(genericMessage ?? DEFAULT_GENERIC_LINE);
  }

  if (user) {
    lines.push("");
    if (user.name) lines.push(`Name: ${user.name}`);
    if (user.email) lines.push(`Email: ${user.email}`);
  }

  lines.push("");
  lines.push("Thank you.");

  return lines.join("\n");
}

/**
 * Generates a wa.me deep link for the given message.
 * Uses the enquiry route number (primary by default) from config/whatsapp.
 */
export function generateWhatsAppUrl(
  message: string,
  number: string = getEnquiryNumber()
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export type OpenWhatsAppOptions = GenerateMessageOptions & {
  number?: string;
};

export type OpenWhatsAppResult = {
  url: string;
  opened: boolean;
};

/**
 * Generates the message, opens WhatsApp in a new tab and emits a
 * `whatsapp_click` analytics event. Returns `opened: false` when the popup
 * was blocked or the environment blocked navigation, so callers can show the
 * fallback ("Unable to open WhatsApp. Please use the WhatsApp number below.").
 */
export function openWhatsApp(options: OpenWhatsAppOptions = {}): OpenWhatsAppResult {
  const { number, ...messageOptions } = options;
  const message = generateWhatsAppMessage(messageOptions);
  const url = generateWhatsAppUrl(message, number);

  trackEvent("whatsapp_click", {
    service: messageOptions.service?.title ?? "general",
    authenticated: Boolean(messageOptions.user),
  });

  if (typeof window === "undefined") return { url, opened: false };

  let opened = false;
  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    opened = win !== null;
    if (!opened) {
      // Popup blocked — fall back to in-page navigation.
      window.location.href = url;
      opened = true;
    }
  } catch {
    opened = false;
  }

  return { url, opened };
}

/** Display-formatted WhatsApp numbers for fallback UI. */
export const WHATSAPP_DISPLAY = WHATSAPP_CONFIG.display;
