import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { CalendarDays, Clapperboard, FileCheck2 } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { CTA, Callout, PageHero, Panel, SectionHeading } from "@/components/site/kit";
import { getApprovedMoviePosts } from "@/lib/convex-server";
import { PlaceholderNotice } from "@/components/site/placeholder-notice";
import {
  ratings,
  ratingStyle,
} from "@/lib/data/classification";

export const metadata: Metadata = pageMetadata({
  title: "Approved Movies Register — Films Classified in Nigeria",
  description:
    "Monthly listings of films and video works classified and approved by the National Film and Video Censors Board.",
  path: "/approved-movies",
});

export const revalidate = 300;

export default async function ApprovedMoviesPage() {
  const posts = await getApprovedMoviePosts();
  const totalFilms = posts.reduce((n, p) => n + p.count, 0);

  return (
    <>
      <PageHero
        eyebrow="Classification register"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Approved Movies", href: "/approved-movies" },
        ]}
        title={
          <>
            Films approved, <span className="text-gradient">month by month</span>
          </>
        }
        lead="A public record of films and video works classified and approved by the Board — with runtime, producer, director, cast, rating and consumer advice for each title."
      >
        <div className="flex flex-wrap gap-2.5">
          {ratings.map((r) => (
            <span
              key={r.code}
              title={r.label}
              className="grid h-9 min-w-9 place-items-center rounded-lg border px-3 font-heading text-xs font-bold"
              style={ratingStyle(r.tone)}
            >
              {r.code}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-x">
          <PlaceholderNotice what="listings" />
          {posts.length === 0 ? (
            <Reveal>
              <Panel className="py-16 text-center">
                <Clapperboard className="mx-auto size-8 text-muted-foreground" />
                <h2 className="mt-5 font-heading text-xl font-bold">
                  No monthly listings published yet
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Approved film listings are published here each month. Check back shortly, or
                  contact your nearest zonal office to confirm the status of a specific title.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <CTA href="/classification">Classification &amp; fees</CTA>
                  <CTA href="/about/zones" variant="ghost">
                    Find an office
                  </CTA>
                </div>
              </Panel>
            </Reveal>
          ) : (
            <>
              <SectionHeading
                eyebrow={`${posts.length} monthly listings · ${totalFilms} titles`}
                title="Browse the monthly register"
                lead="Each listing covers the films classified and approved by the Board in that month."
              />

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((p, i) => (
                  <Reveal key={p._id} delay={i * 70}>
                    <Link href={`/approved-movies/${p.slug}`} className="group block h-full">
                      <Panel hover className="flex h-full flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
                            <CalendarDays className="size-3.5" />
                            {p.month}
                          </span>
                          <span className="shrink-0 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[11px] font-semibold text-primary">
                            {p.count}
                          </span>
                        </div>

                        <h3 className="mt-5 flex-1 font-heading text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                          {p.title}
                        </h3>

                        <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                          <FileCheck2 className="size-3.5 text-primary" />
                          {p.count} {p.count === 1 ? "title" : "titles"} approved
                        </p>
                      </Panel>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </>
          )}

          <Reveal delay={200} className="mt-14">
            <Callout title="Verifying a classification" tone="primary">
              A film is approved only if it carries an NFVCB classification certificate and displays
              its classification symbol. If a title does not appear in these listings, contact your
              nearest zonal office before distributing or exhibiting it — it is illegal to
              distribute or exhibit any film not classified by the Board.
            </Callout>
          </Reveal>
        </div>
      </section>
    </>
  );
}
