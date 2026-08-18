import { brand } from "@/lib/brand";

export const siteContent = {
  hero: {
    titleTop: "SPINE",
    titleBottom: "STUDIO",
    description: brand.offer.support,
  },
  status: {
    line1: "STATUS: DESCENDING",
    line2: "MODE: THROUGH-SPINE",
    line3: "PATH: HEAD → END",
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
