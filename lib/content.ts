import { brand } from "@/lib/brand";

export const siteContent = {
  hero: {
    code: brand.code,
    titleTop: "SPINE",
    titleBottom: "STRUCTURE",
    description: brand.offer.support,
  },
  rail: [
    { label: "SERVICES", href: "/#services" },
    { label: "WORK", href: "/work" },
    { label: "PROCESS", href: "/#process" },
    { label: "CONTACT", href: "/#contact" },
  ],
  status: {
    line1: "STATUS: UPRIGHT",
    line2: "MODE: STRUCTURE",
    line3: "SYSTEM: ALIGNED",
  },
  contact: {
    kicker: "[CONTACT]",
    headline: "Ready to start with structure?",
    description:
      "For brands that want a clearer backbone across website, search, and strategy — not another soft template layer.",
    email: brand.email,
    mailto: `mailto:${brand.email}`,
  },
  footer: {
    brand: brand.name,
    year: "2026",
  },
  share: {
    tagline: brand.tagline,
    url: brand.url,
  },
};
