/**
 * On-demand revalidation.
 *
 * Pages are static. Each Convex read is cached under a tag named after its
 * Convex module. When the CMS writes, Convex POSTs the affected tags to
 * `/api/revalidate` (see `nfvcb-website-admin/convex/site.ts`), and only the
 * pages that used those tags are rebuilt, on their next visit.
 *
 * Keep this list in sync with `SITE_TAGS` in the admin repo.
 */
export const CONTENT_TAGS = [
  "news",
  "approvedMovies",
  "nfvcbPicks",
  "events",
  "managementStaff",
  "leadership",
  "executiveDirector",
] as const;

export type ContentTag = (typeof CONTENT_TAGS)[number];

export function isContentTag(value: unknown): value is ContentTag {
  return typeof value === "string" && (CONTENT_TAGS as readonly string[]).includes(value);
}

/**
 * Backstop only: if a revalidation call is ever lost, cached data still
 * refreshes within a day. Day-to-day freshness comes from the CMS webhook.
 * Route segments use the literal `86400` because `revalidate` exports must be
 * statically analysable.
 */
export const SAFETY_REVALIDATE_SECONDS = 86_400;
