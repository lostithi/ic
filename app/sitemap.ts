import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const workEntries = caseStudies.map((study) => ({
    url: `https://illegalithi.com/work/${study.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://illegalithi.com",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://illegalithi.com/work",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...workEntries,
  ];
}
