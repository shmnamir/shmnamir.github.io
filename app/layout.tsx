import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://www.amirshamani.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amir Shamani — Architectural Technologist & Computational Designer",
    template: "%s — Amir Shamani",
  },
  description: "Portfolio of Amir Shamani — architectural technologist and computational designer working across kinetic systems, digital fabrication and buildable architecture.",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "fa-IR": "/fa/" },
  },
  authors: [{ name: "Amir Shamani", url: siteUrl }],
  creator: "Amir Shamani",
  keywords: [
    "Amir Shamani",
    "architectural technologist",
    "computational designer",
    "interactive architecture",
    "kinetic architecture",
    "digital fabrication",
    "Grasshopper",
    "Rhino",
    "امیر شامانی",
    "تکنولوژیست معماری",
    "طراح محاسباتی",
    "معماری تعاملی",
    "معماری پارامتریک",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Amir Shamani Portfolio",
    title: "Amir Shamani — Architectural Technologist & Computational Designer",
    description: "Architecture, computational design, kinetic systems, digital fabrication and buildable interactive environments.",
  },
  twitter: {
    card: "summary",
    title: "Amir Shamani — Architectural Technologist & Computational Designer",
    description: "Architecture, computational design, kinetic systems, digital fabrication and buildable interactive environments.",
  },
  verification: { google: "vP4OkV2Ul47faKEavBlZBrMuuNuFBtDJJaUzjCA9Qgs" },
  // Keep the raster icon first so Google Search can use a supported format.
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amir Shamani",
    alternateName: "امیر شامانی",
    url: siteUrl,
    jobTitle: "Architectural Technologist and Computational Designer",
    sameAs: [
      "https://www.linkedin.com/in/amirshamani/",
      "https://www.instagram.com/senstudio.tech/",
    ],
    knowsAbout: [
      "Interactive Architecture",
      "Computational Design",
      "Kinetic Architecture",
      "Digital Fabrication",
      "Architectural Technology",
      "معماری تعاملی",
      "طراحی محاسباتی",
      "تکنولوژی معماری",
      "معماری جنبشی",
      "طراحی پارامتریک",
    ],
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-P1GXT99RF2" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-P1GXT99RF2', { anonymize_ip: true });`}
        </Script>
      </body>
    </html>
  );
}
