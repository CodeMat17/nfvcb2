import type { NewsArticle } from "@/lib/convex-server";

type Action = { label: string; href: string };

export type HighlightSlide = {
  id: string;
  eyebrow: string;
  title: string;
  body?: string;
  /** Photo behind the slide. Without one, `art` supplies the backdrop. */
  image?: string;
  art?: "ratings" | "licence" | "enforcement";
  primary: Action;
  secondary?: Action;
  date?: string;
  featured?: boolean;
};

/**
 * Standing messages in the homepage carousel. To swap an artwork backdrop for
 * a photo, drop the file in `public/highlights/` and set `image` on the slide.
 */
const standing: HighlightSlide[] = [
  {
    id: "ratings",
    eyebrow: "Classification",
    title: "Know before you watch",
    body: "Seven symbols tell every viewer — and every parent — what a film contains before the lights go down.",
    art: "ratings",
    primary: { label: "Understand the ratings", href: "/classification" },
    secondary: { label: "Approved films", href: "/approved-movies" },
  },
  {
    id: "licensing",
    eyebrow: "Licensing",
    title: "Distribute and exhibit films legally",
    body: "Distributor, exhibitor, premises and online licences across five categories — from a community cinema to a multinational streaming platform.",
    art: "licence",
    primary: { label: "Licence categories", href: "/services/licensing" },
    secondary: { label: "Download the forms", href: "/services/forms" },
  },
  {
    id: "enforcement",
    eyebrow: "Enforcement",
    title: "Protecting Nigeria's film market",
    body: "Field operations nationwide detect and prosecute unclassified content, forged certificates and unlicensed distribution.",
    art: "enforcement",
    primary: { label: "See infringements", href: "/law-enforcement" },
    secondary: { label: "Report an infringement", href: "/contact" },
  },
];

function storySlide(a: NewsArticle): HighlightSlide {
  return {
    id: a._id,
    eyebrow: a.category ?? "News",
    title: a.title,
    body: a.excerpt,
    image: a.coverImageUrl,
    primary: { label: "Read the story", href: `/news/${a.slug}` },
    secondary: { label: "All news", href: "/news" },
    date: a.publishedAt,
    featured: a.featured,
  };
}

/**
 * News stories, editor-featured first; only stories with a cover qualify, since
 * the slide is built on it. The standing messages restate the homepage's
 * "What the Board does" pillars, so they only fill in when there is no story.
 */
export function buildHighlights(news: NewsArticle[]): HighlightSlide[] {
  const withCover = news.filter((a) => a.coverImageUrl);
  const stories = [
    ...withCover.filter((a) => a.featured),
    ...withCover.filter((a) => !a.featured),
  ]
    .slice(0, 3)
    .map(storySlide);

  return stories.length > 0 ? stories : standing;
}
