"use client";

import Script from "next/script";
import { useEffect } from "react";

export const GA_MEASUREMENT_ID = "G-P1GXT99RF2";

type AnalyticsParameters = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __amirAnalyticsInitialized?: boolean;
  }
}

function initializeAnalytics() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer?.push(args));

  if (window.__amirAnalyticsInitialized) return;
  window.__amirAnalyticsInitialized = true;
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });
}

export function trackEvent(name: string, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined") return;
  initializeAnalytics();
  window.gtag?.("event", name, parameters);
}

export function GoogleAnalytics() {
  useEffect(() => initializeAnalytics(), []);

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
  );
}
