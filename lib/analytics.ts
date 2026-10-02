/**
 * Lightweight analytics event layer.
 *
 * Events are emitted to the `dataLayer` (Google Analytics style) when present
 * and always logged to a local registry so they can be wired to any provider
 * later. No credentials are hardcoded — connect GA via env variables.
 *
 * Tracked events:
 *  - service_view
 *  - service_enquiry_click
 *  - whatsapp_click
 *  - google_login_started
 *  - google_login_completed
 */
export type AnalyticsEvent =
  | "service_view"
  | "service_enquiry_click"
  | "whatsapp_click"
  | "google_login_started"
  | "google_login_completed";

type EventParams = Record<string, string | number | boolean | undefined>;

const recentEvents: Array<{ event: AnalyticsEvent; params?: EventParams; at: number }> = [];

export function trackEvent(event: AnalyticsEvent, params?: EventParams): void {
  if (typeof window === "undefined") return;

  recentEvents.push({ event, params, at: Date.now() });
  // Keep only the latest 50 events in memory.
  if (recentEvents.length > 50) recentEvents.shift();

  const w = window as unknown as {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  };

  const payload = { event, ...params };

  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push(payload);
  }
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params ?? {});
  }

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, params ?? {});
  }
}

/** Exposed for debugging / future provider wiring. */
export function getRecentEvents() {
  return [...recentEvents];
}
