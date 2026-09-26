import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { CTA, Callout } from "@/components/site/kit";
import { ApprovedMovieList } from "@/components/site/approved-movie-list";
import { getApprovedMoviePost, getApprovedMovieSlugs } from "@/lib/convex-server";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;
export const dynamicParams = true;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getApprovedMovieSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = await getApprovedMoviePost(slug);
  if (!data) return { title: "Listing not found", robots: { index: false } };
  return pageMetadata({
    title: data.post.title,
    description: `${data.items.length} films classified and approved by the National Film and Video Censors Board (NFVCB) in ${data.post.month}, with each title's rating, runtime and consumer advice.`,
    path: `/approved-movies/${data.post.slug}`,
  });
}

export default async function ApprovedMoviePostPage({ params }: Params) {
  const { slug } = await params;
  const data = await getApprovedMoviePost(slug);
  if (!data) notFound();

  const { post, items } = data;

  return (
    <>
      <header className="relative isolate overflow-hidden grain">
        <div className="absolute inset-0 -z-10 spotlight" />
        <div className="container-x pb-12 pt-28 sm:pb-16 sm:pt-36">
          <Reveal eager>
            <Link
              href="/approved-movies"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" />
              All monthly listings
            </Link>
          </Reveal>

          <Reveal eager delay={70}>
            <span className="eyebrow mt-7">
              <span className="h-px w-6 bg-primary/60" />
              {post.month}
            </span>
          </Reveal>

          <Reveal eager delay={120}>
            <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
          </Reveal>

          <Reveal eager delay={180}>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />
                {post.date ?? post.month}
              </span>
              <span className="flex items-center gap-2">
                <User className="size-4 text-primary" />
                {post.author}
              </span>
              <span className="font-semibold text-foreground">
                {items.length} {items.length === 1 ? "title" : "titles"} approved
              </span>
            </div>
          </Reveal>
        </div>
        <div className="hairline h-px w-full" />
      </header>

      <section className="py-14 sm:py-20">
        <div className="container-x">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-14 text-center">
              <p className="font-heading text-lg font-semibold">No titles in this listing yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Films for this month have not been published.
              </p>
            </div>
          ) : (
            <ApprovedMovieList items={items} />
          )}

          <Reveal delay={150} className="mt-14">
            <Callout title="About this register" tone="primary">
              Classification by the NFVCB is national — a film approved at any NFVCB office may be
              distributed and exhibited throughout the Federation, subject to the conditions of its
              classification. Exhibitors must display the classification symbol and consumer advice
              on all publicity material, and project the classification certificate before
              exhibition.
            </Callout>
          </Reveal>

          <Reveal delay={210} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTA href="/approved-movies" variant="ghost">
              Back to all listings
            </CTA>
            <CTA href="/classification" variant="ghost">
              Classification &amp; fees
            </CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
