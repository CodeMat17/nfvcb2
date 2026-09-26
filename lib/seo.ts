import type { Metadata } from "next";

/** Canonical origin. Override per environment with NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nfvcb.gov.ng").replace(
  /\/+$/,
  "",
);

export const siteName = "National Film and Video Censors Board";
export const siteShortName = "NFVCB";
export const siteDescription =
  "The National Film and Video Censors Board (NFVCB) is Nigeria's film regulatory body, established by Act No.85 of 1993 to classify films, music videos and video games and to licence film distribution and exhibition across Nigeria.";

export const siteKeywords = [
  "NFVCB",
  "National Film and Video Censors Board",
  "Nigeria film regulation",
  "Nollywood",
  "film classification Nigeria",
  "film censorship Nigeria",
  "film licensing Nigeria",
  "Nigerian movies",
  "film rating Nigeria",
  "Nigerian film industry",
  "Nollywood regulation",
  "film distribution licence Nigeria",
  "film exhibitor licence Nigeria",
  "approved movies Nigeria",
  "movie rating board Nigeria",
  "Nigerian film board",
  "Dr Shaibu Husseini",
  "NFVCB director general",
  "film censor Nigeria",
  "video censor Nigeria",
  "Nigerian cinema regulation",
  "film submission Nigeria",
  "film classification fee Nigeria",
  "NFVCB online portal",
  "Nigerian film law",
  "G-rated films Nigeria",
  "PG films Nigeria",
  "film censorship board Nigeria",
  "video games rating Nigeria",
  "music video classification Nigeria",
  "Nollywood governance",
  "film regulatory body Nigeria",
  "NFVCB zonal offices",
  "Lagos film censors",
  "Abuja film censors",
  "NFVCB Act 85 of 1993",
  "film classification symbols Nigeria",
  "movie age rating Nigeria",
  "online streaming licence Nigeria",
  "cinema licence Nigeria",
];

/** The shared social card (app/opengraph-image.jpg, served at /opengraph-image.jpg). */
export const ogImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 675,
  type: "image/jpeg",
  alt: "NFVCB — National Film and Video Censors Board, Nigeria",
};

/**
 * Per-page metadata with a canonical URL and a complete Open Graph / Twitter card.
 *
 * A page that sets `openGraph` replaces the layout's card wholesale in Next.js,
 * so the shared image is always passed explicitly rather than inherited.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  /** Absolute or root-relative image; defaults to the shared OG card. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = `${title} · ${siteShortName}`;
  const images = image ? [{ url: image, alt: title }] : [ogImage];
  return {
    title,
    description,
    ...(keywords && { keywords: [...new Set([...keywords, ...siteKeywords])] }),
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName,
      locale: "en_NG",
      title: fullTitle,
      description,
      images,
      ...(type === "article" && publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/** Serialises JSON-LD safely for a <script> tag (no `</script>` break-out). */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  alternateName: siteShortName,
  url: siteUrl,
  logo: `${siteUrl}/logo.webp`,
  image: `${siteUrl}${ogImage.url}`,
  description: siteDescription,
  foundingDate: "1993",
  slogan: "...because movies matter.",
  email: "info@nfvcb.gov.ng",
  areaServed: { "@type": "Country", name: "Nigeria" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Room B913, Federal Secretariat Complex Phase II",
    addressLocality: "Abuja",
    addressRegion: "FCT",
    addressCountry: "NG",
  },
  parentOrganization: { "@type": "GovernmentOrganization", name: "Federal Government of Nigeria" },
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  alternateName: siteShortName,
  inLanguage: "en-NG",
  publisher: { "@id": `${siteUrl}/#organization` },
};
