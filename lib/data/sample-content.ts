/**
 * PLACEHOLDER CONTENT — remove once Convex holds the real records.
 *
 * These samples are served ONLY when `NEXT_PUBLIC_CONVEX_URL` is unset, so the
 * newsroom and approved-movies pages can be reviewed before the Convex
 * deployment exists. As soon as the env var is set, every read goes to Convex
 * and nothing in this file is used. See `lib/convex-server.ts`.
 */

import type {
  ApprovedMovieItem,
  ApprovedMoviePost,
  ApprovedMoviePostWithCount,
  NewsArticle,
} from "@/lib/convex-server";

/** Small self-contained cover art so the image layout can be reviewed. */
function cover(from: string, to: string, label: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="1200" height="750" fill="${from}"/><rect width="1200" height="750" fill="url(#g)"/><g fill="#ffffff" opacity="0.10"><circle cx="600" cy="375" r="190" fill="none" stroke="#ffffff" stroke-width="16"/><circle cx="600" cy="280" r="38"/><circle cx="695" cy="375" r="38"/><circle cx="600" cy="470" r="38"/><circle cx="505" cy="375" r="38"/></g><text x="60" y="690" font-family="Segoe UI,Arial,sans-serif" font-size="34" font-weight="700" fill="#ffffff" opacity="0.5">${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* --------------------------------------------------------------------- News */

export const sampleNews: NewsArticle[] = [
  {
    _id: "sample_news_1",
    _creationTime: Date.parse("2026-09-18T09:00:00Z"),
    title:
      "NFVCB classifies 148 films in August as online submissions overtake walk-ins",
    slug: "nfvcb-classifies-148-films-august-2026",
    excerpt:
      "For the first time since the online classification route opened, more than half of all works submitted to the Board arrived by digital upload rather than at a classification desk.",
    body: `The National Film and Video Censors Board classified 148 films and video works in August 2026, of which 79 were submitted through the online classification route introduced for producers distributing digitally.

It is the first month in which online submissions have overtaken physical submissions at the Board's offices. The Board attributes the shift to the flat ₦50,000 rate for works of 1–120 minutes and the 24-hour turnaround that follows confirmed payment.

"Producers told us the journey to a classification desk was itself a barrier, particularly for those working outside Lagos and Abuja," the Board said. "The numbers now show what happens when that barrier is removed."

All nine verification desks recorded submissions during the month. The Board reminded producers that the online route requires an application letter on company letterhead carrying the title, genre, running time and synopsis, the major cast and crew list, copyright authorisation, and the guild affiliation of the producer and director.

Works submitted online must still be copied to nfvcbonline@gmail.com regardless of which zonal desk receives them.`,
    coverImageUrl: cover("#0f2f24", "#1d6b4a", "Classification"),
    category: "Press Release",
    author: "Corporate Affairs Department",
    featured: true,
    publishedAt: "2026-09-18",
    publish: true,
  },
  {
    _id: "sample_news_2",
    _creationTime: Date.parse("2026-09-11T10:30:00Z"),
    title:
      "Board opens enforcement sweep on unlicensed exhibition premises in five states",
    slug: "enforcement-sweep-unlicensed-premises-2026",
    excerpt:
      "Field officers from four zonal offices began a coordinated compliance exercise targeting viewing centres operating without a premises licence.",
    body: `The Operations Department has commenced a coordinated enforcement exercise across Lagos, Rivers, Kano, Anambra and Plateau States, targeting exhibition premises operating without a valid NFVCB licence.

Field officers are verifying premises licences, checking that classification certificates are projected before exhibition, and confirming that classification symbols and consumer advice appear on posters, handbills and advertising material.

The Board reminded operators that exhibiting films in unlicensed premises, exhibiting restricted classifications to underage persons, and failing to display the rating given to a film are each listed infringements under the NFVCB Act 85 of 1993.

Premises licences start at ₦150,000 for a small hall or community exhibition premises and are processed at any zonal office. Operators who come forward voluntarily during the exercise will be guided through regularisation rather than prosecuted.

Obstructing a field officer in the course of statutory duties is itself an infringement.`,
    coverImageUrl: cover("#2a1a0c", "#7a5216", "Enforcement"),
    category: "Enforcement",
    author: "Operations Department",
    featured: false,
    publishedAt: "2026-09-11",
    publish: true,
  },
  {
    _id: "sample_news_3",
    _creationTime: Date.parse("2026-09-02T08:00:00Z"),
    title: "Online exhibitor licensing: first streaming platforms complete registration",
    slug: "online-exhibitor-licensing-first-platforms",
    excerpt:
      "Three operators have completed licensing under the Online Exhibition categories created by the Regulations and Scale of Charges 2025.",
    body: `Three online operators have completed registration under the Online Exhibition Licence categories introduced by the Regulations and Scale of Charges for Film Distribution and Exhibition 2025.

The categories range from YouTube Operator at ₦1,000,000 through Small Platform / Start-up and Medium Operator / Aggregator, to Multi-National Operator for large international streaming platforms engaging Nigerian audiences.

The Board says the framework is deliberately tiered so that a Nigerian start-up streaming to a domestic audience is not assessed on the same basis as a global platform.

Licences are renewable annually. Renewal before expiry attracts 20% of the new licence fee; renewal after expiry attracts 50%.

Enquiries on online exhibition licensing should be directed to nfvcb_ldd@nfvcb.gov.ng.`,
    category: "Regulation",
    author: "Licensing & Documentation Department",
    featured: false,
    publishedAt: "2026-09-02",
    publish: true,
  },
  {
    _id: "sample_news_4",
    _creationTime: Date.parse("2026-08-21T11:15:00Z"),
    title: "Executive Director inaugurates zonal consultative forum in Jos",
    slug: "zonal-consultative-forum-jos-2026",
    excerpt:
      "The North Central forum is the fourth of six to be inaugurated under Action Point 6 of the Board's 8-Point Action Plan.",
    body: `The Executive Director has inaugurated the North Central Zonal Consultative Forum at the Board's zonal office in Jos, Plateau State.

The forum brings together guild representatives, producers, distributors, exhibitors, educators and community representatives from the zone to comment on classification decisions, proposed regulatory changes and reviews of the classification guidelines.

It is the fourth of six zonal fora to be inaugurated under Action Point 6 of the Board's 8-Point Action Plan, which commits the Board to ensuring that its decisions reflect community standards and that communities understand the implications of those decisions.

"A classification system that nobody outside this building understands is not doing its job," the Executive Director told delegates. "These fora exist so that the standards we apply are standards the community recognises as its own."

The remaining two fora are scheduled before the end of the year, after which a national consultative body will be constituted.`,
    coverImageUrl: cover("#111d2e", "#2f5a86", "Stakeholders"),
    category: "Events",
    author: "Corporate Affairs Department",
    featured: false,
    publishedAt: "2026-08-21",
    publish: true,
  },
  {
    _id: "sample_news_5",
    _creationTime: Date.parse("2026-08-07T09:45:00Z"),
    title: "Public advisory: forged classification certificates in circulation",
    slug: "advisory-forged-classification-certificates",
    excerpt:
      "The Board has warned distributors and exhibitors to verify certificates directly with any zonal office after forged documents were detected in two markets.",
    body: `The Board has issued a public advisory following the detection of forged classification certificates and forged classification symbols in circulation in two markets.

Forging the Board's logo, its classification symbols, its receipts or its certificates are each separate infringements under the NFVCB Act 85 of 1993, and are pursued by the Legal Department.

Distributors and exhibitors are advised to verify any certificate presented to them directly with the nearest zonal office or state centre. The Board maintains a register of classified works, video outlets and distributors which is updated periodically.

Members of the public who encounter suspect material may write to complaint@nfvcb.gov.ng.

The Board reiterated that it is illegal to distribute or exhibit any film or video work not classified by the NFVCB, and illegal to distribute films and video works without a distributor's licence.`,
    category: "Advisory",
    author: "Legal Department",
    featured: false,
    publishedAt: "2026-08-07",
    publish: true,
  },
];

/* ---------------------------------------------------------- Approved movies */

const septemberItems: ApprovedMovieItem[] = [
  {
    _id: "sample_item_s1",
    postId: "sample_post_sep",
    title: "The Salt Roads",
    duration: "118 min",
    producer: "Adaeze Nwachukwu",
    director: "Bode Àkànbí",
    majorCast: "Genevieve Okonkwo, Timini Bassey, Rita Edochie, Gabriel Afolayan",
    rating: "15",
    previewLocation: "Lagos",
    language: "English",
    consumerAdvice: "Contains moderate violence, scenes of grief and infrequent strong language.",
    dateOfApproval: "4 September 2026",
    productionCompany: "Harmattan Pictures Ltd.",
    featured: true,
    juryNote:
      "A confident, carefully observed drama that treats its subject and its audience with equal seriousness.",
    order: 1,
  },
  {
    _id: "sample_item_s2",
    postId: "sample_post_sep",
    title: "Kudi Da Zuciya",
    duration: "132 min",
    producer: "Hauwa Ibrahim Danjuma",
    director: "Sani Muhammad Garba",
    majorCast: "Ali Nuhu Bala, Maryam Sadiq, Adam Zango Yusuf",
    rating: "PG",
    previewLocation: "Kano",
    language: "Hausa",
    consumerAdvice: "Mild thematic elements. Parental guidance suggested for younger children.",
    dateOfApproval: "9 September 2026",
    productionCompany: "Tudun Wada Films",
    order: 2,
  },
  {
    _id: "sample_item_s3",
    postId: "sample_post_sep",
    title: "Owerri By Night",
    duration: "96 min",
    producer: "Chidinma Eze",
    director: "Chidinma Eze",
    majorCast: "Uzoamaka Obi, Stan Nze Kalu, Blessing Amadi",
    rating: "18",
    previewLocation: "Owerri",
    language: "English / Igbo",
    consumerAdvice: "Strong violence, drug references and strong language throughout. Adults only.",
    dateOfApproval: "12 September 2026",
    productionCompany: "Nightline Studios",
    order: 3,
  },
  {
    _id: "sample_item_s4",
    postId: "sample_post_sep",
    title: "Little Lagos",
    duration: "84 min",
    producer: "Funmilayo Adeyemi",
    director: "Tunde Oyelaran",
    majorCast: "Ayo Makun Jr., Kehinde Bankole, Zainab Balogun",
    rating: "G",
    previewLocation: "Lagos",
    language: "English",
    consumerAdvice: "Suitable for all audiences. Nothing that would disturb any age group.",
    dateOfApproval: "16 September 2026",
    productionCompany: "Sunrise Family Media",
    featured: true,
    trailerUrl: "https://www.youtube.com/",
    order: 4,
  },
  {
    _id: "sample_item_s5",
    postId: "sample_post_sep",
    title: "The Benin Bronze",
    duration: "144 min",
    producer: "Osaretin Igbinedion",
    director: "Efe Omoregie",
    majorCast: "Richard Mofe Aigbe, Ini Edo Bassey, Patrick Doyle, Nse Ikpe",
    rating: "12A",
    previewLocation: "Benin",
    language: "English / Edo",
    consumerAdvice:
      "Moderate violence and historical themes. Under 12s may watch with a responsible adult.",
    dateOfApproval: "22 September 2026",
    productionCompany: "Oba Gate Productions",
    trailerUrl: "https://www.youtube.com/",
    order: 5,
  },
];

const augustItems: ApprovedMovieItem[] = [
  {
    _id: "sample_item_a1",
    postId: "sample_post_aug",
    title: "Harmattan Wedding",
    duration: "107 min",
    producer: "Ngozi Okafor-Bello",
    director: "Lanre Shittu",
    majorCast: "Sola Sobowale Adeniyi, Deyemi Okanlawon, Bimbo Ademoye",
    rating: "PG",
    previewLocation: "Ibadan",
    language: "English / Yoruba",
    consumerAdvice: "Mild language and family conflict. Parental guidance suggested.",
    dateOfApproval: "5 August 2026",
    productionCompany: "Agodi Film House",
    featured: true,
    order: 1,
  },
  {
    _id: "sample_item_a2",
    postId: "sample_post_aug",
    title: "Delta Crude",
    duration: "126 min",
    producer: "Emmanuel Tonye",
    director: "Preye Ogbuehi",
    majorCast: "Sambasa Nzeribe Obi, Bimbo Manuel Ade, Efe Irele",
    rating: "18",
    previewLocation: "Port Harcourt",
    language: "English / Pidgin",
    consumerAdvice: "Strong violence, strong language and scenes of intimidation. Adults only.",
    dateOfApproval: "8 August 2026",
    productionCompany: "Creek Road Pictures",
    juryNote:
      "Unflinching but never gratuitous; the committee noted the restraint shown in its most difficult sequences.",
    order: 2,
  },
  {
    _id: "sample_item_a3",
    postId: "sample_post_aug",
    title: "Aunty Bisi's Kitchen",
    duration: "22 min",
    producer: "Yemisi Ogundipe",
    director: "Yemisi Ogundipe",
    majorCast: "Toyin Abraham Ajeyemi, Mr Macaroni Ade",
    rating: "G",
    previewLocation: "Lagos",
    language: "Yoruba",
    consumerAdvice: "Suitable for general exhibition. Appropriate for all ages.",
    dateOfApproval: "13 August 2026",
    productionCompany: "Skit House Africa",
    order: 3,
  },
  {
    _id: "sample_item_a4",
    postId: "sample_post_aug",
    title: "Jos Plateau",
    duration: "113 min",
    producer: "Danjuma Pam",
    director: "Grace Longjohn",
    majorCast: "Kate Henshaw Nuttal, Daniel Etim Effiong, Nancy Isime",
    rating: "15",
    previewLocation: "Jos",
    language: "English",
    consumerAdvice: "Moderate violence, communal conflict themes and infrequent strong language.",
    dateOfApproval: "19 August 2026",
    productionCompany: "Highland Frame",
    order: 4,
  },
  {
    _id: "sample_item_a5",
    postId: "sample_post_aug",
    title: "Midnight Hostel",
    duration: "91 min",
    producer: "Kelechi Anyanwu",
    director: "Kelechi Anyanwu",
    majorCast: "Sophie Alakija Cole, Uche Montana Obi, Tobi Bakre",
    rating: "RE",
    previewLocation: "Enugu",
    language: "English",
    consumerAdvice:
      "Restricted exhibition only, in specially licensed venues. Not approved for general exhibition or broadcast.",
    dateOfApproval: "26 August 2026",
    productionCompany: "Nightwatch Media",
    order: 5,
  },
  {
    _id: "sample_item_a6",
    postId: "sample_post_aug",
    title: "Sokoto Sunrise",
    duration: "138 min",
    producer: "Aisha Bello Maccido",
    director: "Ibrahim Sarki",
    majorCast: "Rahama Sadau Ali, Umar Gombe, Hadiza Aliyu",
    rating: "12",
    previewLocation: "Kano",
    language: "Hausa",
    consumerAdvice:
      "Mild violence and thematic content. Suitable for persons aged 12 and above.",
    dateOfApproval: "28 August 2026",
    productionCompany: "Rima Valley Films",
    trailerUrl: "https://www.youtube.com/",
    order: 6,
  },
];

const septemberPost: ApprovedMoviePost = {
  _id: "sample_post_sep",
  _creationTime: Date.parse("2026-09-23T08:00:00Z"),
  title: "Films Approved — September 2026",
  slug: "films-approved-september-2026",
  month: "September 2026",
  author: "Film Censorship & Classification Department",
  date: "2026-09-23",
};

const augustPost: ApprovedMoviePost = {
  _id: "sample_post_aug",
  _creationTime: Date.parse("2026-08-31T08:00:00Z"),
  title: "Films Approved — August 2026",
  slug: "films-approved-august-2026",
  month: "August 2026",
  author: "Film Censorship & Classification Department",
  date: "2026-08-31",
};

function ratingCounts(items: ApprovedMovieItem[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const code = item.rating.trim().toUpperCase();
    counts[code] = (counts[code] ?? 0) + 1;
  }
  return counts;
}

export const sampleApprovedMoviePosts: ApprovedMoviePostWithCount[] = [
  {
    ...septemberPost,
    count: septemberItems.length,
    ratingCounts: ratingCounts(septemberItems),
  },
  {
    ...augustPost,
    count: augustItems.length,
    ratingCounts: ratingCounts(augustItems),
  },
];

export const sampleApprovedMovies: Record<
  string,
  { post: ApprovedMoviePost; items: ApprovedMovieItem[] }
> = {
  [septemberPost.slug]: { post: septemberPost, items: septemberItems },
  [augustPost.slug]: { post: augustPost, items: augustItems },
};
