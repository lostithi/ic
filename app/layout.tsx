import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Illegalithi Creations",
    template: "%s | Illegalithi Creations",
  },
  description:
    "Illegalithi Creations is a digital studio building sharper websites, SEO systems, and marketing for ambitious brands.",
  metadataBase: new URL("https://illegalithi.com"),
  openGraph: {
    title: "Illegalithi Creations",
    description:
      "A digital studio building sharper websites, SEO systems, and marketing for ambitious brands.",
    url: "https://illegalithi.com",
    siteName: "Illegalithi Creations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Illegalithi Creations",
    description:
      "A digital studio building sharper websites, SEO systems, and marketing for ambitious brands.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}