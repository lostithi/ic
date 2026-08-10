import type { Metadata } from "next";
import { IBM_Plex_Mono, Oswald } from "next/font/google";
import Analytics from "@/components/analytics/Analytics";
import JsonLd from "@/components/seo/JsonLd";
import { brand } from "@/lib/brand";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: brand.name,
    template: `%s | ${brand.name}`,
  },
  description: `${brand.tagline} ${brand.description}`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || brand.url),
  applicationName: brand.name,
  keywords: [
    "web design",
    "web development",
    "SEO",
    "digital strategy",
    "brand websites",
    brand.name,
  ],
  authors: [{ name: brand.name, url: brand.url }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: brand.name,
    description: brand.tagline,
    url: brand.url,
    siteName: brand.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${ibmPlexMono.variable}`}>
      <body>
        <JsonLd />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
