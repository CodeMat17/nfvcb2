import "server-only";
import { ConvexHttpClient } from "convex/browser";
import { anyApi } from "convex/server";

/**
 * Read-only server-side access to Convex.
 *
 * Pages call `fetchConvex` with a fallback value so the site still renders when
 * NEXT_PUBLIC_CONVEX_URL is not configured (local work, preview builds) or when
 * the deployment is briefly unreachable. Reads go through `anyApi`, which
 * addresses functions by path and therefore does not require the generated
 * `convex/_generated/api` module to be present at build time.
 */

const url = process.env.NEXT_PUBLIC_CONVEX_URL;

export const convexConfigured = Boolean(url);

let client: ConvexHttpClient | null = null;

function getClient(): ConvexHttpClient | null {
  if (!url) return null;
  client ??= new ConvexHttpClient(url);
  return client;
}

type QueryPath = `${string}.${string}`;

export async function fetchConvex<T>(
  path: QueryPath,
  args: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  const c = getClient();
  if (!c) return fallback;

  const [module, fn] = path.split(".") as [string, string];

  try {
    const result = await c.query(anyApi[module][fn], args);
    return (result ?? fallback) as T;
  } catch (error) {
    console.error(`[convex] query ${path} failed:`, error);
    return fallback;
  }
}

/* ------------------------------------------------------------------- Types */

/** Listing shape: `news.list` omits the body, which can be large. */
export type NewsArticle = {
  _id: string;
  _creationTime: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl?: string;
  category?: string;
  author?: string;
  featured?: boolean;
  publishedAt?: string;
  publish?: boolean;
};

export type NewsArticleWithBody = NewsArticle & { body: string };

export type ApprovedMoviePost = {
  _id: string;
  _creationTime: number;
  title: string;
  slug: string;
  month: string;
  author: string;
  date?: string;
};

/** `ratingCounts` is keyed by classification code (`G`, `PG`, `12`, …). */
export type ApprovedMoviePostWithCount = ApprovedMoviePost & {
  count: number;
  ratingCounts: Record<string, number>;
};

export type ApprovedMovieItem = {
  _id: string;
  postId: string;
  title: string;
  duration: string;
  producer: string;
  director: string;
  majorCast: string;
  rating: string;
  previewLocation: string;
  language: string;
  consumerAdvice: string;
  dateOfApproval: string;
  productionCompany: string;
  featured?: boolean;
  trailerUrl?: string;
  juryNote?: string;
  order: number;
};

export type ManagementStaff = {
  _id: string;
  _creationTime: number;
  name: string;
  designation: string;
  imageUrl: string | null;
  order: number;
  seniority?: number;
};

export type Leader = {
  _id: string;
  name: string;
  role: string;
  office: string;
  imageUrl: string | null;
  seniority: number;
};

export type ProfileEntry = { title: string; org: string; note?: string };

export type ExecutiveDirector = {
  name: string;
  shortName: string;
  role: string;
  office: string;
  postNominals: string;
  imageUrl: string | null;
  email: string;
  headOffice: string;
  highlights: string[];
  appointment: { label: string; value: string }[];
  vision: string;
  bio: string[];
  expertise: string[];
  achievements: { title: string; body: string }[];
  education: ProfileEntry[];
  career: ProfileEntry[];
  industryRoles: ProfileEntry[];
  programmes: ProfileEntry[];
  awards: ProfileEntry[];
  publications: ProfileEntry[];
  quotes: { text: string; context: string }[];
  foreword: string;
};

/* ----------------------------------------------------------------- Readers */

/**
 * PLACEHOLDER CONTENT: while no deployment is configured, the newsroom and
 * approved-movies pages are served from `lib/data/sample-content.ts` so they can
 * be reviewed before Convex exists. Setting NEXT_PUBLIC_CONVEX_URL switches every
 * reader below to live data and the samples are never read again.
 */
export async function getNews(
  args: { category?: string; limit?: number } = {},
): Promise<NewsArticle[]> {
  if (!convexConfigured) {
    const { sampleNews } = await import("@/lib/data/sample-content");
    const rows = args.category
      ? sampleNews.filter((n) => n.category === args.category)
      : sampleNews;
    return args.limit ? rows.slice(0, args.limit) : rows;
  }
  return fetchConvex<NewsArticle[]>("news.list", args, []);
}

export async function getNewsCategories(): Promise<string[]> {
  if (!convexConfigured) {
    const { sampleNews } = await import("@/lib/data/sample-content");
    return Array.from(
      new Set(sampleNews.map((n) => n.category).filter((c): c is string => Boolean(c))),
    ).sort();
  }
  return fetchConvex<string[]>("news.categories", {}, []);
}

export async function getArticle(slug: string): Promise<NewsArticleWithBody | null> {
  if (!convexConfigured) {
    const { sampleNews } = await import("@/lib/data/sample-content");
    return sampleNews.find((n) => n.slug === slug) ?? null;
  }
  return fetchConvex<NewsArticleWithBody | null>("news.getBySlug", { slug }, null);
}

export async function getNewsSlugs(): Promise<string[]> {
  if (!convexConfigured) {
    const { sampleNews } = await import("@/lib/data/sample-content");
    return sampleNews.map((n) => n.slug);
  }
  return fetchConvex<string[]>("news.allSlugs", {}, []);
}

export async function getApprovedMoviePosts(): Promise<ApprovedMoviePostWithCount[]> {
  if (!convexConfigured) {
    const { sampleApprovedMoviePosts } = await import("@/lib/data/sample-content");
    return sampleApprovedMoviePosts;
  }
  return fetchConvex<ApprovedMoviePostWithCount[]>("approvedMovies.listPosts", {}, []);
}

export async function getApprovedMoviePost(
  slug: string,
): Promise<{ post: ApprovedMoviePost; items: ApprovedMovieItem[] } | null> {
  if (!convexConfigured) {
    const { sampleApprovedMovies } = await import("@/lib/data/sample-content");
    return sampleApprovedMovies[slug] ?? null;
  }
  return fetchConvex<{ post: ApprovedMoviePost; items: ApprovedMovieItem[] } | null>(
    "approvedMovies.getPostWithItems",
    { slug },
    null,
  );
}

export async function getApprovedMovieSlugs(): Promise<string[]> {
  if (!convexConfigured) {
    const { sampleApprovedMoviePosts } = await import("@/lib/data/sample-content");
    return sampleApprovedMoviePosts.map((p) => p.slug);
  }
  return fetchConvex<string[]>("approvedMovies.allSlugs", {}, []);
}

/** Management staff, most senior first (the Convex query does the sorting). */
export async function getManagementStaff(): Promise<ManagementStaff[]> {
  if (!convexConfigured) {
    const { managementTeam } = await import("@/lib/data/board");
    return managementTeam.map((m, i) => ({
      _id: m.initials,
      _creationTime: 0,
      name: m.name,
      designation: m.dept,
      imageUrl: null,
      order: i,
      seniority: i + 1,
    }));
  }
  return fetchConvex<ManagementStaff[]>("managementStaff.list", {}, []);
}

/**
 * Federal Government leadership. Falls back to `lib/data/board.ts` until the
 * CMS has rows, so the section never renders empty.
 */
export async function getLeadership(): Promise<Leader[]> {
  const { leadership } = await import("@/lib/data/board");
  const fallback: Leader[] = leadership.map((l, i) => ({
    _id: l.initials,
    name: l.name,
    role: l.role,
    office: l.office,
    imageUrl: null,
    seniority: i + 1,
  }));
  if (!convexConfigured) return fallback;
  const rows = await fetchConvex<Leader[]>("leadership.list", {}, []);
  return rows.length ? rows : fallback;
}

/**
 * Executive Director profile. Falls back to `lib/data/board.ts` until the CMS
 * has created one.
 */
export async function getExecutiveDirector(): Promise<ExecutiveDirector> {
  const { executiveDirector: ed } = await import("@/lib/data/board");
  const fallback: ExecutiveDirector = {
    ...ed,
    imageUrl: ed.photo,
    email: "dgoffice@nfvcb.gov.ng",
    headOffice: "Room B913, Federal Secretariat Complex Phase II, Abuja FCT",
    appointment: ed.appointment.map(([label, value]) => ({ label, value })),
  };
  if (!convexConfigured) return fallback;
  return (
    (await fetchConvex<ExecutiveDirector | null>("executiveDirector.get", {}, null)) ?? fallback
  );
}

/** The Board's recommended film, joined with its approved-register details. */
export type NfvcbPick = {
  month: string;
  /** Slug of the monthly register post the film belongs to. */
  slug: string;
  posterUrl: string | null;
  note: string | null;
  trailerUrl: string | null;
  title: string;
  rating: string;
  duration: string;
  language: string;
  director: string;
  producer: string;
  majorCast: string;
  productionCompany: string;
  consumerAdvice: string;
};

/** The published pick from the most recent batch, or null (section hides). */
export async function getNfvcbPick(): Promise<NfvcbPick | null> {
  if (!convexConfigured) return null;
  return fetchConvex<NfvcbPick | null>("nfvcbPicks.current", {}, null);
}
