import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { CTA } from "@/components/site/kit";
import { ShareBar } from "@/components/site/share-menu";
import { getArticle, getNews, getNewsSlugs } from "@/lib/convex-server";
import { jsonLd, ogImage, pageMetadata, siteName, siteUrl } from "@/lib/seo";
import { cleanArticleHtml, isHtml, textParagraphs } from "@/lib/rich-text";

export const revalidate = 300;
// Articles added in Convex after a build are rendered on demand.
export const dynamicParams = true;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article not found", robots: { index: false } };
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${article.slug}`,
    image: article.coverImageUrl,
    type: "article",
    publishedTime: article.publishedAt,
  });
}

function formatDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = (await getNews({ limit: 4 })).filter((a) => a.slug !== slug).slice(0, 3);
  const date = formatDate(article.publishedAt);
  const bodyHtml = isHtml(article.body) ? cleanArticleHtml(article.body) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          description: article.excerpt,
          image: [article.coverImageUrl ?? `${siteUrl}${ogImage.url}`],
          ...(article.publishedAt && { datePublished: article.publishedAt }),
          author: article.author
            ? { "@type": "Person", name: article.author }
            : { "@type": "Organization", name: siteName, url: siteUrl },
          publisher: { "@id": `${siteUrl}/#organization` },
          mainEntityOfPage: `${siteUrl}/news/${article.slug}`,
        })}
      />
      <header className="relative isolate overflow-hidden grain">
        <div className="absolute inset-0 -z-10 spotlight" />
        <div className="container-x pb-12 pt-28 sm:pt-36">
          <Reveal eager>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" />
              All news
            </Link>
          </Reveal>

          <Reveal eager delay={70} className="mt-7 flex flex-wrap items-center gap-2">
            {article.category && (
              <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
                {article.category}
              </span>
            )}
            {article.featured && (
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                Featured
              </span>
            )}
          </Reveal>

          <Reveal eager delay={120}>
            <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
          </Reveal>

          <Reveal eager delay={180}>
            <div className="mt-7 flex flex-col gap-5 border-t border-border pt-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {date && (
                  <span className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-primary" />
                    {date}
                  </span>
                )}
                {article.author && (
                  <span className="flex items-center gap-2">
                    <User className="size-4 text-primary" />
                    {article.author}
                  </span>
                )}
              </div>
              <ShareBar title={article.title} path={`/news/${article.slug}`} />
            </div>
          </Reveal>
        </div>

        <div className="container-x">
          <Reveal eager delay={220}>
            {article.coverImageUrl ? (
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl border border-border">
                <Image
                  src={article.coverImageUrl}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1280px) 1280px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              // No cover supplied: fall back to the Board logo on a soft brand wash.
              <div className="grid aspect-[21/9] w-full place-items-center rounded-3xl border border-border bg-gradient-to-br from-primary/18 via-surface to-gold/12">
                <Image
                  src="/logo.webp"
                  alt=""
                  width={240}
                  height={240}
                  className="size-28 object-contain opacity-90 sm:size-40"
                />
              </div>
            )}
          </Reveal>
        </div>
      </header>

      <article className="py-14 sm:py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl">
            <p className="border-l-2 border-primary/50 pl-6 text-lg font-medium leading-relaxed text-foreground/90 sm:text-xl">
              {article.excerpt}
            </p>

            {bodyHtml ? (
              <div
                className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:border-primary/50 [&_blockquote]:pl-5 [&_blockquote]:italic [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_img]:rounded-2xl [&_li]:mt-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            ) : (
              <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
                {textParagraphs(article.body).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={140} className="mx-auto mt-14 max-w-3xl border-t border-border pt-10">
            <ShareBar title={article.title} path={`/news/${article.slug}`} />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTA href="/news" variant="ghost">
                Back to newsroom
              </CTA>
              <CTA href="/contact" variant="ghost">
                Press enquiries
              </CTA>
            </div>
          </Reveal>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border py-14 sm:py-20">
          <div className="container-x">
            <h2 className="font-heading text-2xl font-bold">More from the newsroom</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a, i) => (
                <Reveal key={a._id} delay={i * 80}>
                  <Link href={`/news/${a.slug}`} className="group block h-full">
                    <div className="card-surface h-full p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/35">
                      {a.category && (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                          {a.category}
                        </span>
                      )}
                      <h3 className="mt-3 font-heading text-base font-bold leading-snug transition-colors group-hover:text-primary">
                        {a.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {a.excerpt}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
