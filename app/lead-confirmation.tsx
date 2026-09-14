"use client";

import { useEffect } from "react";
import { trackEvent } from "./analytics";

export function LeadConfirmation() {
  useEffect(() => {
    const pendingSubmission = window.sessionStorage.getItem("portfolioContactSubmitPending");
    if (pendingSubmission !== "1") return;

    window.sessionStorage.removeItem("portfolioContactSubmitPending");
    trackEvent("generate_lead", {
      form_id: "portfolio_contact",
      method: "formsubmit",
    });
  }, []);

  return null;
}
