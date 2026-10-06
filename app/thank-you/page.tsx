import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message received",
  description: "Confirmation that a portfolio enquiry was sent to Amir Shamani.",
  alternates: { canonical: "/thank-you/" },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="thank-you-page">
      <p>CONTACT / CONFIRMATION</p>
      <h1>Thank you.</h1>
      <p>Your message has been sent. I will respond as soon as possible.</p>
      <a href="/#contact">Return to the portfolio</a>
    </main>
  );
}
