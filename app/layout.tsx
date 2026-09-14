import type { Metadata } from "next";
import { GoogleAnalytics } from "./analytics";
import "./globals.css";

const siteUrl = "https://www.amirshamani.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amir Shamani | Interactive Architecture & Computational Design",
    template: "%s — Amir Shamani",
  },
  description: "Amir Shamani is an architectural technologist and computational designer focused on interactive architecture, kinetic systems, prototyping and buildable research.",
  alternates: {
    canonical: "/",
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
    title: "Amir Shamani | Interactive Architecture & Computational Design",
    description: "Interactive architecture, computational design, kinetic systems, prototyping and buildable research by Amir Shamani.",
    images: [{
      url: "/images/homepage-interactive-system-wide-connected-clean.png",
      width: 1672,
      height: 941,
      alt: "Amir Shamani interactive architecture and computational design portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amir Shamani | Interactive Architecture & Computational Design",
    description: "Interactive architecture, computational design, kinetic systems, prototyping and buildable research by Amir Shamani.",
    images: ["/images/homepage-interactive-system-wide-connected-clean.png"],
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
    "@id": `${siteUrl}/#person`,
    name: "Amir Shamani",
    alternateName: "امیر شامانی",
    url: siteUrl,
    mainEntityOfPage: siteUrl,
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
        <GoogleAnalytics />
      </body>
    </html>
  );
}
