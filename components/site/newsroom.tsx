import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/lib/convex-server";
import { cn } from "@/lib/utils";
import { buttonStyles, Eyebrow } from "./kit";
import { Reveal } from "./reveal";

function formatDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });
}

function Meta({ article }: { article: NewsArticle }) {
  const date = formatDate(article.publishedAt);
  const category = article.category?.replace(/-/g, " ");
  if (!date && !category) return null;
  return (
    <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {category && <span className="text-gold">{category}</span>}
      {category && date && <span aria-hidden className="h-px w-5 bg-border" />}
      {date && <span className="tabular-nums">{date}</span>}
    </p>
  );
}

/**
 * Cover photo, or a quiet logo plate when the story has none. With `natural`
 * the photo keeps its own aspect ratio, so it is shown whole and uncropped.
 */
function Cover({
  article,
  className,
  sizes = "100vw",
  natural = false,
}: {
  article: NewsArticle;
  className?: string;
  sizes?: string;
  natural?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-2",
        // A natural cover spans the column on mobile; from md up its frame shrinks to the photo.
        natural && article.coverImageUrl && "w-full md:w-fit md:max-w-full",
        className,
      )}
    >
      {article.coverImageUrl ? (
        <Image
          src={article.coverImageUrl}
          alt=""
          {...(natural ? { width: 1600, height: 900 } : { fill: true })}
          sizes={sizes}
          className={cn(
            // Natural covers keep their aspect ratio (height-capped from md up), so nothing is cropped.
            natural
              ? "block h-auto w-full md:max-h-80 md:w-auto md:max-w-full lg:max-h-104"
              : "size-full object-cover",
            "transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
          )}
        />
      ) : (
        <div className="grid size-full place-items-center bg-gradient-to-br from-primary/10 via-transparent to-gold/10">
          <Image src="/logo.webp" alt="" width={96} height={96} className="size-1/4 max-w-24 object-contain opacity-60" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-foreground/10" />
    </div>
  );
}

/**
 * Editorial newsroom: one lead story told through its photograph, and a short
 * index of the next headlines separated by hairlines — no card chrome.
 */
export function Newsroom({ articles }: { articles: NewsArticle[] }) {
  // The lead is the image slot, so it goes to the newest story with a photo.
  const lead = articles.find((a) => a.coverImageUrl) ?? articles[0];
  if (!lead) return null;
  const more = articles.filter((a) => a !== lead).slice(0, 3);

  return (
    <section className="section-y">
      <div className="container-x">
        <Reveal className="flex items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <Eyebrow>Newsroom</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
              From the Board
            </h2>
          </div>
          <Link href="/news" className={cn(buttonStyles.link, "shrink-0 pb-1")}>
            All news <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <div className={cn("mt-10 grid gap-12", more.length > 0 && "lg:grid-cols-[1.45fr_1fr] lg:gap-16")}>
          {/* Lead story */}
          <Reveal>
            <Link href={`/news/${lead.slug}`} className="group block">
              <Cover
                article={lead}
                className={cn("rounded-xl", !lead.coverImageUrl && "aspect-[16/10] lg:aspect-[16/9]")}
                sizes="(min-width: 1024px) 50vw, 100vw"
                natural
              />
              <div className="mt-7">
                <Meta article={lead} />
                <h3 className="mt-4 max-w-2xl font-heading text-2xl font-bold leading-tight transition-colors duration-300 group-hover:text-primary sm:text-3xl lg:text-[2.1rem]">
                  {lead.title}
                </h3>
                {lead.excerpt && (
                  <p className="mt-4 line-clamp-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                    {lead.excerpt}
                  </p>
                )}
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  Read the story
                  <span aria-hidden className="h-px w-6 bg-foreground/40 transition-all duration-500 group-hover:w-10 group-hover:bg-primary" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Index of further headlines */}
          {more.length > 0 && (
            <div>
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  More from the Board
                </p>
              </Reveal>
              <ol className="mt-4 divide-y divide-border border-y border-border">
                {more.map((a, i) => (
                  <Reveal as="li" key={a._id} delay={(i + 1) * 90}>
                    <Link href={`/news/${a.slug}`} className="group flex items-start gap-5 py-6">
                      <span className="pt-1 font-mono text-xs tabular-nums text-muted-foreground">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-primary">
                          {a.title}
                        </h3>
                        <div className="mt-2.5">
                          <Meta article={a} />
                        </div>
                      </div>
                      {a.coverImageUrl && (
                        <Cover article={a} className="aspect-[4/3] w-24 shrink-0 rounded-md sm:w-28" sizes="112px" />
                      )}
                    </Link>
                  </Reveal>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
