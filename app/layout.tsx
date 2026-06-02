import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import { SoundProvider } from "@/components/SoundProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const SITE_URL = "https://www.kowloon.dk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kowloon Aarhus | Kinesisk, Thai & Vietnamesisk restaurant",
    template: "%s | Kowloon Aarhus",
  },
  description:
    "Restaurant Kowloon i Aarhus C serverer autentisk kinesisk, thailandsk og vietnamesisk mad siden 1999. Over 50 retter à la carte. Spis i restauranten eller take-away.",
  keywords: [
    "Kowloon",
    "Aarhus",
    "asiatisk restaurant",
    "kinesisk mad",
    "thai mad",
    "vietnamesisk mad",
    "take-away Aarhus",
    "Frederiksgade",
    "Banegårdsgade",
  ],
  authors: [{ name: "Kowloon Aarhus" }],
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: SITE_URL,
    siteName: "Kowloon Aarhus",
    title: "Kowloon Aarhus | Asiatisk køkken siden 1999",
    description:
      "Autentisk kinesisk, thailandsk og vietnamesisk mad i hjertet af Aarhus.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kowloon Aarhus | Asiatisk køkken siden 1999",
    description:
      "Autentisk kinesisk, thailandsk og vietnamesisk mad i hjertet af Aarhus.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Restaurant Kowloon",
  servesCuisine: ["Chinese", "Thai", "Vietnamese"],
  priceRange: "$$",
  url: SITE_URL,
  telephone: "+4586191998",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Frederiksgade 78",
    addressLocality: "Aarhus C",
    postalCode: "8000",
    addressCountry: "DK",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "12:00",
      closes: "21:00",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LangProvider>
          <SoundProvider>{children}</SoundProvider>
        </LangProvider>
      </body>
    </html>
  );
}
