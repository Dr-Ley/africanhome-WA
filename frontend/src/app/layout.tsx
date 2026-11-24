import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/shared/JsonLd";
import { SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "African Home Adventure Safaris · Private Kenya & Tanzania Safaris",
    template: "%s · African Home Adventure Safaris",
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: SITE.domain },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: SITE.name,
    images: [{ url: "/images/destinations/maasai-mara.png", alt: "Elephants at sunset on the Maasai Mara" }],
  },
};

const agency = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE.name,
  url: SITE.domain,
  email: SITE.email,
  telephone: SITE.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: ["Kenya", "Tanzania"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="aha" className={`${inter.variable} ${display.variable}`}>
      <body className="min-w-0 overflow-x-hidden bg-cream text-charcoal antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:px-3 focus:py-2">
          Skip to content
        </a>
        <SiteChrome>
          <Header />
        </SiteChrome>
        <main id="main">{children}</main>
        <SiteChrome>
          <Footer />
          <WhatsAppButton />
        </SiteChrome>
        <JsonLd data={agency} />
      </body>
    </html>
  );
}
