export type Rating = {
  code: string;
  label: string;
  short: string;
  desc: string;
  tone: string;
  /** Official classification symbol artwork in `public/ratings`. */
  image: string;
};

export const ratings: Rating[] = [
  { code: "G", label: "General Exhibition", short: "General", tone: "158", desc: "Suitable for all audiences. Content contains nothing that would harm or disturb any age group, including young children.", image: "/ratings/symbol_G.jpeg" },
  { code: "PG", label: "Parental Guidance", short: "Parental Guidance", tone: "140", desc: "General viewing, but some scenes may be unsuitable for young children. Parents are advised to watch with younger children.", image: "/ratings/symbol_PG.jpeg" },
  { code: "12", label: "12 Years and Above", short: "12 and Over", tone: "110", desc: "Suitable only for persons of 12 years and over. Not to be supplied to any person below that age.", image: "/ratings/symbol_12.jpeg" },
  { code: "12A", label: "12 Years and Above (Accompanied)", short: "12 Accompanied", tone: "85", desc: "Suitable for 12 years and above, but younger children may watch when accompanied by a responsible adult who has deemed the content appropriate.", image: "/ratings/symbol_12A.jpeg" },
  { code: "15", label: "15 Years and Above", short: "15 and Over", tone: "58", desc: "Suitable only for persons of 15 years and over. Content may include stronger language, themes, or references not appropriate for younger audiences.", image: "/ratings/symbol_15.jpeg" },
  { code: "18", label: "18 Years and Above", short: "Adults Only", tone: "30", desc: "Suitable only for adults aged 18 and over. Content may include adult themes, strong language, nudity, or violence.", image: "/ratings/symbol_18.jpeg" },
  { code: "RE", label: "Restricted Exhibition", short: "Restricted", tone: "15", desc: "Content is restricted to specific controlled exhibition settings only, such as licensed adult venues. Not for general public distribution.", image: "/ratings/symbol_RE.jpeg" },
];

export type FeeRow = {
  item: string;
  runtime: string;
  local: string;
  english: string;
  foreign: string;
};

export const filmFees: FeeRow[] = [
  { item: "Item 1", runtime: "0 – 15 min", local: "₦10,000", english: "₦20,000", foreign: "₦25,000" },
  { item: "Item 2", runtime: "16 – 30 min", local: "₦20,000", english: "₦30,000", foreign: "₦40,000" },
  { item: "Item 3", runtime: "31 – 60 min", local: "₦30,000", english: "₦40,000", foreign: "₦50,000" },
  { item: "Item 4", runtime: "61 – 90 min", local: "₦40,000", english: "₦50,000", foreign: "₦60,000" },
  { item: "Item 5", runtime: "91 – 120 min", local: "₦45,000", english: "₦60,000", foreign: "₦70,000" },
  { item: "Item 6", runtime: "121 – 150 min", local: "₦60,000", english: "₦70,000", foreign: "₦80,000" },
  { item: "Item 7", runtime: "151 – 200 min", local: "₦60,000", english: "₦80,000", foreign: "₦90,000" },
  { item: "Item 8", runtime: "201 – 300 min", local: "₦60,000", english: "₦90,000", foreign: "₦100,000" },
  { item: "Item 9", runtime: "300+ min", local: "₦75,000", english: "₦90,000", foreign: "₦150,000" },
];

export const trailerFees = [
  { label: "Nigerian (Local Language)", value: "₦5,000" },
  { label: "Nigerian (English Language)", value: "₦7,500" },
  { label: "Foreign Film Trailer", value: "₦7,500" },
];

export const otherFees = [
  { label: "Cost of Appeal", value: "₦5,000 application fee + cost of constituting a review committee" },
  { label: "Application for Exemption", value: "50% of the applicable classification fee" },
  { label: "Title Change", value: "₦10,000 (all categories)" },
];

export const onlineClassificationLetter = [
  "Title, genre, running time and synopsis",
  "Major cast and crew list",
  "Copyright authorisation",
  "Names of the producer and director",
  "Name of the producer or production company to appear on the certificate",
  "Guild or association the producer and/or director are affiliated to",
];

export const censorshipCriteria = [
  "Such a film or video work has educational or entertainment value apart from promoting the Nigerian culture, unity and interest.",
  "Not likely to undermine national security.",
  "Not likely to induce or reinforce the corruption of private or public morality.",
  "Not likely to encourage or glorify the use of violence.",
  "Not likely to expose the people of African heritage to ridicule or contempt.",
  "Not likely to encourage illegal or criminal acts.",
  "Not likely to encourage racial, religious or ethnic discrimination or conflict.",
  "Not likely by its contents to be blasphemous or obscene.",
  "Not likely to denigrate the dignity of womanhood.",
];

export const mainConsiderations = [
  "Is the film or video work in conflict with the law?",
  "That adults should be free to choose their entertainment, within the law.",
  "Is the film or video classified for a particular age group likely to be harmful?",
  "Is the material, at the age group concerned, clearly unacceptable to broad public opinion?",
];

export const regulations2025 = [
  "Community Exhibition Premises Licensing",
  "Community Exhibitor Licensing",
  "Mobile Exhibition Licensing",
  "Regional and National Mobile Exhibitor Licensing",
  "Exhibition Premises Licensing (Major, Medium, Small Hall, Drive-In, Mobile)",
  "Regional and National Exhibitor Licensing",
  "Online Exhibitor Licensing (Multi-National, Medium, Small, YouTube)",
  "Suburban Exhibitor Licensing",
  "Film Distribution Licensing (National, Regional, Suburban, Community, Online)",
];

/**
 * Inline styles for a classification chip in the rating's own hue.
 *
 * Lightness and alpha come from CSS custom properties so the same chip reads
 * correctly on both themes: a light, glowing badge on the dark theatre
 * background, and a deeper, solid one on the light background.
 */
export function ratingStyle(tone: string) {
  return {
    borderColor: `oklch(var(--rating-l) 0.14 ${tone} / var(--rating-border-a))`,
    background: `oklch(var(--rating-l) 0.14 ${tone} / var(--rating-bg-a))`,
    color: `oklch(var(--rating-l) 0.13 ${tone})`,
  };
}

/** Same hue, used for the oversized watermark numerals behind a card. */
export function ratingWatermark(tone: string) {
  return { color: `oklch(var(--rating-l) 0.13 ${tone})` };
}
