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
export const highlightSlides: HighlightSlide[] = [
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
