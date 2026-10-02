import type { MetadataRoute } from "next"

import { componentDocs } from "@/docs/components"
import { guideNav, siteConfig } from "@/docs/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: siteConfig.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/docs/components`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/templates/landing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/templates/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...guideNav.map((item) => ({
      url: `${siteConfig.url}${item.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...componentDocs.map((doc) => ({
      url: `${siteConfig.url}/docs/components/${doc.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
