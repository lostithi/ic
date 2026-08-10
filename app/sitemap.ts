import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/work";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://spine.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const workEntries = caseStudies.map((study) => ({
    url: `${siteUrl}/work/${study.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/work`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...workEntries,
  ];
}
