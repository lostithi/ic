export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  type: string;
  summary: string;
  year: string;
  role: string;
  services: string[];
  challenge: string;
  approach: string[];
  outcome: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "01",
    slug: "cg-investment-holdings",
    title: "CG INVESTMENT HOLDINGS",
    type: "CORPORATE WEBSITE / DIGITAL POSITIONING",
    summary:
      "A structured digital presence for a multi-venture group, built to feel credible, modern, and strategically clear.",
    year: "2025",
    role: "Web architecture, messaging, visual system",
    services: ["WEB.DEV", "STRATEGY"],
    challenge:
      "A multi-venture group needed one digital front door that felt institutional without becoming generic. Existing materials were fragmented across companies, so visitors could not quickly understand the group, its focus, or why it was trustworthy.",
    approach: [
      "Mapped the venture structure into a clearer information hierarchy.",
      "Wrote positioning that sounded decisive instead of brochure-generic.",
      "Built a fast, restrained website system with stronger typography and cleaner navigation.",
      "Designed page logic around credibility first: who they are, what they operate, why it matters.",
    ],
    outcome:
      "A sharper corporate presence that reads as one coherent group, easier to understand in the first scroll, and structured to support future venture pages without losing clarity.",
  },
  {
    id: "02",
    slug: "studio-concept-system",
    title: "STUDIO CONCEPT SYSTEM",
    type: "BRAND SYSTEM / WEB EXPERIMENT",
    summary:
      "A concept-led identity and interface direction exploring sharper typography, coded layouts, and anti-template storytelling.",
    year: "2025",
    role: "Identity direction, interface prototyping",
    services: ["STRATEGY", "WEB.DEV"],
    challenge:
      "The brief was to push past safe creative-studio patterns. Most studio sites look interchangeable: soft cards, polite spacing, and zero point of view. The system needed attitude without becoming unreadable.",
    approach: [
      "Built a typography-led visual language around contrast, code cues, and hard edges.",
      "Developed layout rules that prioritize hierarchy over card grids.",
      "Prototyped interaction patterns that create presence without noise.",
      "Stress-tested the system across landing, work, and manifesto-style pages.",
    ],
    outcome:
      "A reusable anti-template direction that later informed Spine's own site language: radical red, mono signals, and structure-first storytelling.",
  },
  {
    id: "03",
    slug: "seo-landing-page-framework",
    title: "SEO + LANDING PAGE FRAMEWORK",
    type: "SEARCH STRUCTURE / CONVERSION DESIGN",
    summary:
      "A modular page system designed to align messaging, search visibility, and lead capture into one sharper digital flow.",
    year: "2026",
    role: "SEO structure, conversion architecture",
    services: ["SEO.OPT", "STRATEGY", "WEB.DEV"],
    challenge:
      "Campaign pages were being built as one-offs. Messaging drifted, search intent was ignored, and lead capture sat disconnected from the story. The system needed to scale without becoming templated mush.",
    approach: [
      "Defined intent-based page modules for offer, proof, objection handling, and conversion.",
      "Aligned heading structure and copy blocks with search queries that actually mattered.",
      "Designed a reusable landing architecture that stays flexible but coherent.",
      "Connected CTA logic to clearer next steps instead of vague 'contact us' dead ends.",
    ],
    outcome:
      "A modular framework that makes new landing pages faster to ship, easier to rank against, and clearer at converting attention into qualified inquiries.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAllCaseStudySlugs() {
  return caseStudies.map((study) => study.slug);
}
