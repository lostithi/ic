import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://illegalithi.com/sitemap.xml",
    host: "https://illegalithi.com",
  };
}
