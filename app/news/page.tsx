import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Newspaper, User } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { CTA, PageHero, Panel } from "@/components/site/kit";
import { getNews, type NewsArticle } from "@/lib/convex-server";
import { PlaceholderNotice } from "@/components/site/placeholder-notice";
import { ShareButton } from "@/components/site/share-menu";

export const metadata: Metadata = pageMetadata({
  title: "News & Press Releases",
  description:
    "Announcements, press releases and updates from the National Film and Video Censors Board.",
  path: "/news",
});

// Content is authored in Convex; revalidate so new posts appear without a redeploy.
export const revalidate = 300;

function formatDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Cover({ article, tall = false }: { article: NewsArticle; tall?: boolean }) {
  if (article.coverImageUrl) {
    return (
      <div
        className={
          (tall ? "h-full min-h-64" : "aspect-[16/10]") + " relative w-full overflow-hidden"
        }
      >
        <Image
          src={article.coverImageUrl}
          alt=""
          fill
          sizes={tall ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    );
  }
  return (
    <div
      className={
        (tall ? "h-full min-h-64" : "aspect-[16/10]") +
        " grid w-full place-items-center bg-gradient-to-br from-primary/18 via-surface to-gold/12"
      }
    >
      <Image
        src="/logo.webp"
        alt=""
        width={160}
        height={160}
        className="size-24 object-contain opacity-90 transition-transform duration-700 group-hover:scale-105 sm:size-28"
      />
    </div>
  );
}

function Meta({ article }: { article: NewsArticle }) {
  const date = formatDate(article.publishedAt);
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
      {date && (
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5 text-primary" />
          {date}
        </span>
      )}
      {article.author && (
        <span className="flex items-center gap-1.5">
          <User className="size-3.5 text-primary" />
          {article.author}
        </span>
      )}
    </div>
  );
}

export default async function NewsPage() {
  const articles = await getNews();
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }]}
        title={
          <>
            News &amp; <span className="text-gradient">press releases</span>
          </>
        }
        lead="Announcements, regulatory updates and press releases from the National Film and Video Censors Board."
      />

      <section className="section-y">
        <div className="container-x">
          <PlaceholderNotice what="articles" />
          {articles.length === 0 ? (
            <Reveal>
              <Panel className="py-16 text-center">
                <Newspaper className="mx-auto size-8 text-muted-foreground" />
                <h2 className="mt-5 font-heading text-xl font-bold">No articles published yet</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Press releases and announcements will appear here as soon as the Board publishes
                  them. In the meantime, our services and regulations are documented across the
                  site.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <CTA href="/services">Explore our services</CTA>
                  <CTA href="/contact" variant="ghost">
                    Contact the Board
                  </CTA>
                </div>
              </Panel>
            </Reveal>
          ) : (
            <>
              {/* Lead story */}
              <Reveal>
                <article className="group card-surface relative grid overflow-hidden lg:grid-cols-2">
                  {/* Stretched link keeps the whole card clickable while leaving
                      the share control interactive on top of it. */}
                  <Link
                    href={`/news/${lead.slug}`}
                    className="absolute inset-0 z-10"
                    aria-label={lead.title}
                  />
                  <div className="relative overflow-hidden">
                    <Cover article={lead} tall />
                  </div>
                  <div className="flex flex-col justify-center p-7 sm:p-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
                        {lead.featured ? "Featured" : "Latest"}
                      </span>
                      {lead.category && (
                        <span className="rounded-full border border-border px-3 py-1 text-[11px] font-medium text-muted-foreground">
                          {lead.category}
                        </span>
                      )}
                    </div>
                    <h2 className="mt-5 font-heading text-2xl font-bold leading-tight transition-colors group-hover:text-primary sm:text-3xl lg:text-4xl">
                      {lead.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {lead.excerpt}
                    </p>
                    <div className="mt-6">
                      <Meta article={lead} />
                    </div>
                    <div className="mt-7 flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-primary">
                        Read the full story →
                      </span>
                      <ShareButton
                        title={lead.title}
                        path={`/news/${lead.slug}`}
                        className="z-20"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>

              {/* Grid */}
              {rest.length > 0 && (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((a, i) => (
                    <Reveal key={a._id} delay={i * 70}>
                      <article className="group card-surface relative flex h-full flex-col transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-2xl hover:shadow-[color:var(--shadow-tint)]">
                        <Link
                          href={`/news/${a.slug}`}
                          className="absolute inset-0 z-10"
                          aria-label={a.title}
                        />
                        <div className="overflow-hidden">
                          <Cover article={a} />
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          {a.category && (
                            <span className="self-start rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                              {a.category}
                            </span>
                          )}
                          <h3 className="mt-4 font-heading text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                            {a.title}
                          </h3>
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {a.excerpt}
                          </p>
                          <div className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-4">
                            <Meta article={a} />
                            <ShareButton
                              title={a.title}
                              path={`/news/${a.slug}`}
                              className="z-20 shrink-0"
                            />
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
