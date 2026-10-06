"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { analyticsEnabled, GA_MEASUREMENT_ID, initializeAnalytics } from "@/lib/analytics";

export { trackEvent } from "@/lib/analytics";

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!analyticsEnabled()) return;
    try {
      initializeAnalytics();
      setEnabled(true);
    } catch {
      // Keep the portfolio usable if a browser extension replaces the tag API.
    }
  }, []);

  if (!enabled) return null;

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
  );
}
