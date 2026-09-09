import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amir Shamani — Architecture Portfolio",
  description: "Portfolio of Amir Shamani — architectural technologist and computational designer working across kinetic systems, digital fabrication and buildable architecture.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
