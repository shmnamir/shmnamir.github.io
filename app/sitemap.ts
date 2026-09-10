import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.amirshamani.com/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: "https://www.amirshamani.com/",
          fa: "https://www.amirshamani.com/fa/",
        },
      },
    },
    {
      url: "https://www.amirshamani.com/fa/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: "https://www.amirshamani.com/",
          fa: "https://www.amirshamani.com/fa/",
        },
      },
    },
  ];
}
