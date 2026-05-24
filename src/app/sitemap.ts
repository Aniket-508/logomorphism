import type { MetadataRoute } from "next";

import { categories, logos } from "@/constants/logos";
import { SITE } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 1,
      url: SITE.URL,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: 0.9,
    url: `${SITE.URL}/${cat.key}`,
  }));

  const brandPages: MetadataRoute.Sitemap = logos.map((logo) => ({
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: 0.8,
    url: `${SITE.URL}/${logo.category}/${logo.id}`,
  }));

  return [...staticPages, ...categoryPages, ...brandPages];
}
