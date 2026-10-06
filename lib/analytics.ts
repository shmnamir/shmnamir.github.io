export const GA_MEASUREMENT_ID = "G-P1GXT99RF2";

type AnalyticsParameters = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __amirAnalyticsInitialized?: boolean;
  }
}

export function analyticsEnabled() {
  return typeof window !== "undefined" &&
    ["www.amirshamani.com", "amirshamani.com"].includes(window.location.hostname);
}

export function initializeAnalytics() {
  if (!analyticsEnabled()) return;

  window.dataLayer = window.dataLayer || [];
  // gtag processes Arguments objects as commands; plain arrays have other semantics.
  window.gtag = window.gtag || function gtag() {
    window.dataLayer?.push(arguments);
  };

  if (window.__amirAnalyticsInitialized) return;
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: true });
  window.__amirAnalyticsInitialized = true;
}

export function trackEvent(name: string, parameters: AnalyticsParameters = {}) {
  if (!analyticsEnabled()) return;
  try {
    initializeAnalytics();
    window.gtag?.("event", name, parameters);
  } catch {
    // Analytics must never stop a project opening or a contact form submission.
  }
}
