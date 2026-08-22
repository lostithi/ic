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
    services: ["WEB", "STRATEGY"],
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
    services: ["STRATEGY", "WEB"],
    challenge:
      "The brief was to push past safe creative-studio patterns. Most studio sites look interchangeable: soft cards, polite spacing, and zero point of view. The system needed attitude without becoming unreadable.",
    approach: [
      "Built a typography-led visual language around contrast, code cues, and hard edges.",
      "Developed layout rules that prioritize hierarchy over card grids.",
      "Prototyped interaction patterns that create presence without noise.",
      "Stress-tested the system across landing, work, and manifesto-style pages.",
    ],
    outcome:
      "A reusable anti-template direction that became the foundation for Spine's live site: xerox contrast, mono signals, and structure-first storytelling.",
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
    services: ["SEO", "STRATEGY", "WEB"],
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
  {
    id: "04",
    slug: "spine-studio-site",
    title: "SPINE STUDIO SITE",
    type: "MARKETING SITE / BRAND EXPERIENCE",
    summary:
      "The studio's own presence rebuilt as a black-and-white xerox one-pager — structure-first sections, animated hero lockup, horizontal process strip, and contact-to-footer conversion path.",
    year: "2026",
    role: "Art direction, front-end system, content architecture, deploy",
    services: ["WEB", "STRATEGY", "SEO"],
    challenge:
      "The previous site read like a template with a metaphor pasted on top. Navigation, services, process, and contact all competed for attention without a single vertical logic. The studio needed its own offer to feel as structured as what it sells.",
    approach: [
      "Rebuilt the homepage as vertebra stops: services, manifesto, work, process, and contact on one descent.",
      "Replaced legacy chrome with a spine-index header, sticky logo treatment on inner pages, and a terminus footer with the contact headline.",
      "Standardized section kickers, removed specimen clutter, and tightened copy around web, SEO, and strategy as one system.",
      "Shipped on Cloudflare Workers via OpenNext with Formspree intake and edge-ready static generation for work routes.",
    ],
    outcome:
      "A live studio site that demonstrates the backbone offer in its own layout — clearer hierarchy, faster path to brief, and a visual language the team can extend without reverting to card-grid defaults.",
  },
  {
    id: "05",
    slug: "spine-descent-journey",
    title: "SPINE DESCENT JOURNEY",
    type: "3D EXPERIENCE / SCROLL NARRATIVE",
    summary:
      "Scroll-driven anatomy from skull through vertebrae — Three.js models, ink-threshold post-processing, and section-synced navigation that turns the homepage into a physical descent.",
    year: "2026",
    role: "3D direction, interaction design, WebGL implementation",
    services: ["WEB", "STRATEGY"],
    challenge:
      "A static marketing page could not carry the spine metaphor. The experience needed to feel like movement through a system, not a parallax wallpaper, while staying performant on real devices and respecting reduced-motion preferences.",
    approach: [
      "Built a scroll-scrubbed 3D path with skull, spine, and pin-driven staging tied to homepage sections.",
      "Applied xerox and chalk ink passes so renders read as photocopied anatomy instead of glossy 3D.",
      "Synced the spine nav dock to active sections and hid fixed chrome on inner routes where the metaphor would clash.",
      "Added grain, void backgrounds, and fallbacks so content stays readable when WebGL or motion is unavailable.",
    ],
    outcome:
      "A brand mechanism that earns the studio name — visitors descend the column instead of scanning another flat landing page, with navigation that reflects where they are in the system.",
  },
  {
    id: "06",
    slug: "work-specimen-archive",
    title: "WORK SPECIMEN ARCHIVE",
    type: "PORTFOLIO INDEX / CASE SYSTEM",
    summary:
      "An inverted xerox work index with specimen staging, pinned case rows, and detail pages that carry the same structural tone as the homepage spine.",
    year: "2026",
    role: "Portfolio architecture, UI system, case template",
    services: ["WEB"],
    challenge:
      "Work pages often break the main site's visual world — white boxes, generic grids, and case studies that read like PDF exports. The archive needed to feel like part of the same specimen file, not a separate template.",
    approach: [
      "Built a dedicated work stage with inverted xerox rendering and grain so the index reads as a pinned specimen sheet.",
      "Designed list rows with index IDs, type lines, and invert-on-hover interaction consistent with the site's editorial tone.",
      "Templated case detail pages for challenge, approach, and outcome blocks with shared mono and display hierarchy.",
      "Connected the homepage work preview, work index, and case routes through one data source for easier updates as projects ship.",
    ],
    outcome:
      "A portfolio system that scales with new case studies without redesigning each launch — and keeps selected work inside the same structural language as the studio site itself.",
  },
  {
    id: "07",
    slug: "skull-navigation-system",
    title: "SKULL NAVIGATION SYSTEM",
    type: "NAVIGATION / INTERACTIVE CHROME",
    summary:
      "A spine-index navigation layer with 3D skull staging, mobile sheet, and route-aware logo treatment — chrome that orients without overpowering the descent.",
    year: "2026",
    role: "Navigation design, WebGL micro-experience, responsive shell",
    services: ["WEB", "STRATEGY"],
    challenge:
      "Standard sticky navbars flatten the spine metaphor into another hamburger menu. The studio needed wayfinding that felt like index marks on the column — visible on the homepage, restrained elsewhere, and usable on phone widths.",
    approach: [
      "Designed a spine dock with section-linked nodes and a mobile index toggle tied to the same section map.",
      "Built a nav skull canvas with glitch and energy states that respond to scroll speed and interaction without blocking content.",
      "Split chrome behavior by route: fixed spine nav and logo on home, sticky mark and simplified header on work and case pages.",
      "Resolved logo overlap on inner pages with void gradients and shell padding tuned to the mark footprint.",
    ],
    outcome:
      "Navigation that reads as part of the anatomy system — orienting visitors through the descent on home and getting out of the way when they open work or send a brief.",
  },
];

const previewSlugs = [
  "spine-studio-site",
  "spine-descent-journey",
  "cg-investment-holdings",
  "seo-landing-page-framework",
  "work-specimen-archive",
];

export function getPreviewCaseStudies() {
  return previewSlugs
    .map((slug) => caseStudies.find((study) => study.slug === slug))
    .filter((study): study is CaseStudy => Boolean(study));
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAllCaseStudySlugs() {
  return caseStudies.map((study) => study.slug);
}
