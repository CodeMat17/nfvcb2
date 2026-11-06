import type { MetadataRoute } from "next";
import { getApprovedMoviePosts, getEvents, getNews } from "@/lib/convex-server";
import { siteUrl } from "@/lib/seo";

// Picks up new articles, registers and events when the CMS publishes them.
// Static until the CMS changes it (on-demand revalidation, see lib/revalidation.ts);
// the daily timer is only a backstop.
export const revalidate = 86400;

type Entry = MetadataRoute.Sitemap[number];

/** Static routes, most important first. */
const pages: { path: string; priority: number; changeFrequency: Entry["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/approved-movies", priority: 0.9, changeFrequency: "weekly" },
  { path: "/classification", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/licensing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/news", priority: 0.8, changeFrequency: "daily" },
  { path: "/events", priority: 0.8, changeFrequency: "weekly" },
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
  const [news, posts, events] = await Promise.all([
    getNews(),
    getApprovedMoviePosts(),
    getEvents(),
  ]);
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
    ...events.map((e) => ({
      url: `${siteUrl}/events/${e.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
      ...(e.bannerUrl && { images: [e.bannerUrl] }),
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
