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
  repo?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "01",
    slug: "pitchiq",
    title: "PITCHIQ",
    type: "AI PRODUCT / FOOTBALL ANALYSIS PLATFORM",
    summary:
      "An analyst-grade football platform — upload a match, run an async video pipeline, and surface evidence-first tactical insights, timelines, and reports for coaches and scouts.",
    year: "2026",
    role: "Product design, full-stack architecture, video analytics pipeline",
    services: ["WEB", "STRATEGY"],
    repo: "https://github.com/lostithi/pitchiq",
    challenge:
      "Football analysis tools often blur raw tracking data with AI interpretation, inventing stats or hiding uncertainty. Coaches and analysts need a workstation that separates what was detected from what it means — and scales from demo review to uploaded match video without breaking trust.",
    approach: [
      "Built a dark analyst UI in Next.js with role-based access for coach, analyst, and player workflows.",
      "Designed a modular async pipeline from preprocess through pitch calibration, detection, tracking, events, and tactical interpretation.",
      "Stored raw tracking separately from interpreted insights and reports so evidence stays inspectable.",
      "Shipped a demo match path for pitch, timeline, heatmaps, and AI report review without waiting on computer vision.",
      "Abstracted external football data behind a provider interface with mock defaults for local development.",
    ],
    outcome:
      "A structured MVP for match upload, processing status, manual correction, and evidence-first reporting — ready to extend toward production video analytics without collapsing detections into black-box summaries.",
  },
  {
    id: "02",
    slug: "cadence-hf",
    title: "CADENCE HF",
    type: "HEALTH TECH DEMO / CARE CONTINUITY WORKSPACE",
    summary:
      "A synthetic heart-failure continuity demo — patient index, routed alerts with clinician feedback, source-linked summaries, timelines, and a lightweight knowledge graph.",
    year: "2026",
    role: "Product design, front-end system, synthetic clinical data modelling",
    services: ["WEB", "STRATEGY"],
    repo: "https://github.com/lostithi/cadence-hf",
    challenge:
      "Post-discharge heart-failure care breaks across notes, labs, referrals, and handoffs. Clinicians need continuity gaps surfaced early — not another dashboard of unrelated widgets — while demos must stay fully synthetic and free of real PHI.",
    approach: [
      "Designed a brand-first landing flow into a workspace for patient index and alert inbox review.",
      "Built patient detail views for alerts, gaps, summaries, timelines, graphs, and linked sources in one case surface.",
      "Modelled synthetic patients and continuity artifacts through a pipeline that assembles timeline, gap, graph, summary, and alert data.",
      "Wired alert feedback to API routes so clinician actions can be captured and reflected in the demo state.",
      "Used Fraunces and Plus Jakarta Sans with motion for a calm clinical product tone distinct from generic admin UI.",
    ],
    outcome:
      "An interactive continuity prototype that shows how routed alerts, gap detection, and source-linked summaries could sit in one workspace — built entirely on de-identified synthetic data for safe demonstration.",
  },
  {
    id: "03",
    slug: "ar-surgical-nav-prototype",
    title: "AR SURGICAL NAV PROTOTYPE",
    type: "RESEARCH PROTOTYPE / SURGICAL NAVIGATION SIMULATION",
    summary:
      "A simulation-based dynamic AR map for soft-tissue liver tumour surgery — anatomy overlays, instrument tracking, phase recognition, deformation, and registration confidence warnings.",
    year: "2026",
    role: "Research prototyping, 3D simulation, registration experiment design",
    services: ["WEB", "STRATEGY"],
    repo: "https://github.com/lostithi/ar-surgical-nav-prototype",
    challenge:
      "Surgical navigation systems must communicate planned paths, instrument position, and registration drift without pretending to be clinical-grade devices. The prototype needed to demonstrate patient-specific overlays, soft-tissue deformation, and recalibration logic in a research-safe simulation environment.",
    approach: [
      "Generated synthetic CT anatomy through an offline Python pipeline feeding a Three.js/Vite viewer.",
      "Built interactive controls for orbit, instrument movement, organ deformation, retraction, and recalibration baking.",
      "Surfaced target registration error and confidence states when deformation pushes the map out of alignment.",
      "Added surgical-phase recognition, planned resection paths, and structured post-op JSON export for session review.",
      "Documented research-only boundaries clearly — simulation and education, not clinical decision support.",
    ],
    outcome:
      "A working research prototype that makes registration uncertainty visible instead of hidden — useful for exploring AR navigation concepts, offline registration experiments, and surgeon-facing warning patterns before any real-device path.",
  },
  {
    id: "04",
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
    id: "05",
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
      "A reusable anti-template direction for structure-first studio sites: high-contrast type, mono signals, and hierarchy over card-grid defaults.",
  },
  {
    id: "06",
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
];

const previewSlugs = [
  "pitchiq",
  "cadence-hf",
  "ar-surgical-nav-prototype",
  "cg-investment-holdings",
  "seo-landing-page-framework",
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
