import type { Metadata } from "next";
import { IBM_Plex_Mono, Oswald } from "next/font/google";
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
    default: "Illegalithi Creations",
    template: "%s | Illegalithi Creations",
  },
  description:
    "Web / SEO / Strategy for brands that refuse template mode. Illegalithi Creations builds sharper websites and digital systems.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://illegalithi.com",
  ),
  applicationName: "Illegalithi Creations",
  keywords: [
    "web design",
    "web development",
    "SEO",
    "digital strategy",
    "brand websites",
    "Illegalithi Creations",
  ],
  authors: [{ name: "Illegalithi Creations", url: "https://illegalithi.com" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Illegalithi Creations",
    description:
      "Web / SEO / Strategy for brands that refuse template mode.",
    url: "https://illegalithi.com",
    siteName: "Illegalithi Creations",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Illegalithi Creations",
    description:
      "Web / SEO / Strategy for brands that refuse template mode.",
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
      <body>{children}</body>
    </html>
  );
}
