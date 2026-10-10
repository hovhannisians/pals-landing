import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// The same pairing as the Pals apps: Geist for everything, JetBrains Mono for the small labels.
const geist = localFont({ src: "../fonts/Geist-Variable.woff2", weight: "100 900", variable: "--font-geist" });
const mono = localFont({ src: "../fonts/JetBrainsMono-Variable.woff2", weight: "400 600", variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL("https://pals.robiai.com"),
  title: { default: "Pals: personal agents with their own computers", template: "%s | Pals" },
  description:
    "Pals are personal agents that keep working in the background on their own computers. They browse, use your apps, follow your rules and ask before anything important. For Mac, Windows, iPhone and Android.",
  authors: [{ name: "Robi Labs" }],
  creator: "Robi Labs",
  openGraph: { type: "website", siteName: "Pals", images: ["/art/hero-wide.webp"] },
  twitter: { card: "summary_large_image", site: "@palsbyrobi", images: ["/art/hero-wide.webp"] },
};

export const viewport: Viewport = { themeColor: "#f6f6f6", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
