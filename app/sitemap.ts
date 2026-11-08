import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/data/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...PROJECTS.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
