import type { MetadataRoute } from "next";
import { getApprovedMoviePosts, getNews } from "@/lib/convex-server";
import { siteUrl } from "@/lib/seo";

// Picks up new articles and monthly registers published in Convex.
export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

/** Static routes, most important first. */
const pages: { path: string; priority: number; changeFrequency: Entry["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/approved-movies", priority: 0.9, changeFrequency: "weekly" },
  { path: "/classification", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/licensing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/news", priority: 0.8, changeFrequency: "daily" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/forms", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/payments", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/vision", priority: 0.6, changeFrequency: "yearly" },
  { path: "/about/management", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about/management/executive-director", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about/departments", priority: 0.5, changeFrequency: "yearly" },
  { path: "/about/zones", priority: 0.7, changeFrequency: "monthly" },
  { path: "/policy", priority: 0.6, changeFrequency: "yearly" },
  { path: "/law-enforcement", priority: 0.6, changeFrequency: "yearly" },
  { path: "/service-charter", priority: 0.5, changeFrequency: "yearly" },
  { path: "/action-plan", priority: 0.5, changeFrequency: "yearly" },
  { path: "/associations", priority: 0.5, changeFrequency: "monthly" },
];

function toDate(value: string | number | undefined) {
  if (value === undefined) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, posts] = await Promise.all([getNews(), getApprovedMoviePosts()]);
  const now = new Date();

  return [
    ...pages.map((p) => ({
      url: `${siteUrl}${p.path === "/" ? "" : p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...posts.map((p) => ({
      url: `${siteUrl}/approved-movies/${p.slug}`,
      lastModified: toDate(p.date) ?? toDate(p._creationTime),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...news.map((a) => ({
      url: `${siteUrl}/news/${a.slug}`,
      lastModified: toDate(a.publishedAt) ?? toDate(a._creationTime),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(a.coverImageUrl && { images: [a.coverImageUrl] }),
    })),
  ];
}
