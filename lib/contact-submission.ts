import { trackEvent } from "./analytics";

export const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/amir.shamani@gmail.com";

// Resolve only when the provider explicitly accepts the submission. This is not
// a guarantee of email delivery; no form content is included in analytics.
export async function submitContact(formData: FormData) {
  if (String(formData.get("_honey") || "").trim()) {
    throw new Error("Submission rejected");
  }

  trackEvent("contact_submit_attempt", { form_id: "portfolio_contact" });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
      signal: controller.signal,
    });
    const result: unknown = await response.json();
    if (!response.ok || !result || typeof result !== "object" ||
        !("success" in result) || (result.success !== true && result.success !== "true")) {
      throw new Error("The provider did not confirm acceptance");
    }
    trackEvent("generate_lead", { form_id: "portfolio_contact", method: "formsubmit_ajax" });
  } finally {
    clearTimeout(timeout);
  }
}
