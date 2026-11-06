import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { isContentTag } from "@/lib/revalidation";

/**
 * Called by Convex after the CMS changes content.
 *
 *   POST /api/revalidate
 *   Authorization: Bearer <REVALIDATE_SECRET>
 *   { "tags": ["news"] }
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ error: "REVALIDATE_SECRET is not configured" }, { status: 503 });
  }
  if (!authorized(request.headers.get("authorization"), secret)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body must be JSON" }, { status: 400 });
  }

  const raw = (body as { tags?: unknown })?.tags;
  const tags = Array.isArray(raw) ? [...new Set(raw.filter(isContentTag))] : [];
  if (tags.length === 0) {
    return Response.json({ error: "No known tags" }, { status: 400 });
  }

  // expire: 0 — the next visitor gets the fresh page, not one stale view first,
  // so editors see their change as soon as they open the site.
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return Response.json({ revalidated: tags, now: Date.now() });
}

function authorized(header: string | null, secret: string): boolean {
  const given = Buffer.from(header?.replace(/^Bearer\s+/i, "") ?? "");
  const expected = Buffer.from(secret);
  return given.length === expected.length && timingSafeEqual(given, expected);
}
