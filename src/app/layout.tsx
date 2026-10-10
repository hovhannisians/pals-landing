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
  keywords: [
    "Pals",
    "personal AI agents",
    "AI agents",
    "computer-use agents",
    "AI automation",
    "Robi Labs",
    "OpenAI Dots alternative",
    "Grokbot alternative",
    "Meta Muse alternative",
    "OpenMaus alternative",
  ],
  authors: [{ name: "Robi Labs" }],
  creator: "Robi Labs",
  category: "technology",
  alternates: { canonical: "./" },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  openGraph: {
    type: "website",
    siteName: "Pals",
    title: "Pals: personal agents with their own computers",
    description:
      "Personal AI agents that work in the background on their own computers, use your apps, follow your rules and ask before important actions.",
    url: "https://pals.robiai.com",
    images: [{ url: "/art/hero-wide.webp", width: 1600, height: 900, alt: "Pals personal AI agents" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@palsbyrobi",
    title: "Pals: personal agents with their own computers",
    description: "Personal AI agents that keep working in the background on their own computers.",
    images: ["/art/hero-wide.webp"],
  },
};

export const viewport: Viewport = { themeColor: "#f6f6f6", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://pals.robiai.com/#organization",
        name: "Robi Labs",
        url: "https://robiai.com",
        logo: "https://pals.robiai.com/art/logo.png",
        sameAs: ["https://github.com/Robi-Labs", "https://www.linkedin.com/company/robilabsai", "https://x.com/RobiLabsAI"],
      },
      {
        "@type": "WebSite",
        "@id": "https://pals.robiai.com/#website",
        name: "Pals",
        url: "https://pals.robiai.com",
        publisher: { "@id": "https://pals.robiai.com/#organization" },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://pals.robiai.com/#software",
        name: "Pals",
        description:
          "Personal AI agents that work in the background on their own computers, use your apps, follow your rules and ask before important actions.",
        url: "https://pals.robiai.com",
        applicationCategory: "BusinessApplication",
        operatingSystem: "macOS, Windows, iOS, Android, Web",
        creator: { "@id": "https://pals.robiai.com/#organization" },
        image: "https://pals.robiai.com/art/hero-wide.webp",
      },
    ],
  };

  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
