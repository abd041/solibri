import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { SITE_ORIGIN } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1 },
    { path: "/shop", priority: 0.8 },
    { path: "/guides", priority: 0.8 },
    { path: "/guides/reconstitution", priority: 0.7 },
    { path: "/guides/storage", priority: 0.7 },
    { path: "/guides/safety", priority: 0.7 },
    { path: "/how-it-works", priority: 0.7 },
    { path: "/science", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/verify", priority: 0.7 },
    { path: "/affiliate", priority: 0.7 },
    ...products.map((product) => ({ path: `/product/${product.slug}`, priority: 0.6 })),
  ];

  const seen = new Set<string>();
  return pages
    .filter((page) => {
      if (seen.has(page.path)) return false;
      seen.add(page.path);
      return true;
    })
    .map((page) => ({
      url: `${SITE_ORIGIN}${page.path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: page.priority,
    }));
}
