import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Clapperboard,
  ShieldCheck,
  FileText,
  Building2,
  Globe2,
  ScrollText,
  Play,
  CalendarDays,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { HeroBackdrop } from "@/components/site/hero-backdrop";
import { RatingSpotlight } from "@/components/site/rating-spotlight";
import { NewsTicker } from "@/components/site/news-ticker";
import { Newsroom } from "@/components/site/newsroom";
import { HighlightsCarousel } from "@/components/site/highlights-carousel";
import { highlightSlides } from "@/lib/data/highlights";
import { CTA, Eyebrow, Panel, SectionHeading, NumberedItem, Quote } from "@/components/site/kit";
import {
  ratings,
  ratingStyle,
} from "@/lib/data/classification";
import { timeline } from "@/lib/data/board";
import { submissionSteps, licenceCategories } from "@/lib/data/licensing";
import { zones } from "@/lib/data/zones";
import { NfvcbPick } from "@/components/site/nfvcb-pick";
import {
  getApprovedMoviePosts,
  getExecutiveDirector,
  getNews,
  getNfvcbPick,
} from "@/lib/convex-server";

const pillars = [
  {
    icon: Clapperboard,
    title: "Classification & Censorship",
    body: "Every film, music video, skit and video game exhibited or distributed in Nigeria must be classified by the Board — whether produced locally or imported.",
    href: "/classification",
    cta: "View ratings & fees",
  },
  {
    icon: ScrollText,
    title: "Licensing & Documentation",
    body: "Distributor, exhibitor, premises, mobile and online licences across five categories — from a community cinema to a multinational streaming platform.",
    href: "/services/licensing",
    cta: "Browse licence categories",
  },
  {
    icon: ShieldCheck,
    title: "Enforcement & Compliance",
    body: "Field operations nationwide detect and prosecute infringement — unclassified content, forged certificates and unlicensed distribution.",
    href: "/law-enforcement",
    cta: "See infringements",
  },
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** The monthly register is live content, so the homepage revalidates with it. */
export const revalidate = 300;

export default async function Home() {
  const centres = zones.reduce((n, z) => n + z.offices.length, 0);

  // Newest monthly batches first; the register page carries the complete list.
  // No args, like /news: a deployment whose news.list validator lacks `limit`
  // rejects the call outright, which would silently empty the ticker.
  const [posts, news, executiveDirector, pick] = await Promise.all([
    getApprovedMoviePosts(),
    getNews(),
    getExecutiveDirector(),
    getNfvcbPick(),
  ]);
  const recent = news.slice(0, 12);
  // News is published rarely, so a short rotation keeps the strip current.
  const headlines = recent.slice(0, 3);
  const months = posts.slice(0, 3);
  const monthsTotal = months.reduce((n, m) => n + m.count, 0);

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className='relative isolate overflow-hidden grain'>
        <div className='absolute inset-0 -z-20 spotlight' />
        <HeroBackdrop />
        <div
          className='grid-overlay absolute inset-0 -z-10 opacity-20'
          style={{
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(75% 70% at 50% 10%, black, transparent)",
            WebkitMaskImage:
              "radial-gradient(75% 70% at 50% 10%, black, transparent)",
          }}
        />
        {/* letterbox bars */}
        <div className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-20 bg-gradient-to-b from-background to-transparent' />

        {/* Latest headlines: under the nav on small screens, where the stacked
            hero would push a bottom strip below the fold. */}
        <NewsTicker articles={headlines} className='lg:hidden' />

        <div className='container-x relative pb-20 pt-16 lg:pt-24'>
          <div className='grid items-start gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-14'>
            <div>
              <Reveal eager>
                <span className='inline-flex items-center gap-2.5 rounded-full border border-border bg-foreground/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur'>
                  <span className='relative flex size-2'>
                    <span className='absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60' />
                    <span className='relative inline-flex size-2 rounded-full bg-primary' />
                  </span>
                  ...because movies matter.
                </span>
              </Reveal>

              <Reveal eager delay={90}>
                <h1 className='mt-7 text-[2.6rem] font-black leading-[1.02] tracking-[-0.02em] sm:text-[3.4rem] lg:text-6xl xl:text-[4.3rem]'>
                  <span className='text-gradient'> Classifying Stories.</span>
                  <br />
                  Shaping the Industry.
                </h1>
              </Reveal>

              <Reveal eager delay={170}>
                <p className='mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg'>
                  The National Film and Video Censors Board classifies every
                  film and video work shown in Nigeria and licences those who
                  distribute and exhibit them — protecting the viewing public
                  while giving Nollywood a trusted framework to grow in.
                </p>
              </Reveal>

              <Reveal eager delay={250}>
                <div className='mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
                  <CTA href='/services'>Submit a film for classification</CTA>
                  <CTA href='/services/licensing' variant='ghost'>
                    Apply for a licence
                  </CTA>
                </div>
              </Reveal>
            </div>

            {/* Classification symbols — the Board's most public-facing output */}
            <Reveal eager
              delay={210}
              className='mx-auto w-full max-w-[18rem] sm:max-w-[21rem] lg:mr-0 lg:ml-auto'>
              <RatingSpotlight />
            </Reveal>
          </div>
        </div>

        {/* Latest headlines: the hero's lower third on large screens. */}
        <NewsTicker articles={headlines} className='hidden lg:block' />
      </section>

      {/* ------------------------------------------------ Recent approvals */}
      {months.length > 0 && (
        <section className='section-y'>
          <div className='container-x'>
            <div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
              <SectionHeading
                eyebrow='Recently classified'
                title='Films approved, month by month'
                lead={`The Board publishes every classified title in a monthly register — ${monthsTotal} titles across the last ${months.length} ${months.length === 1 ? "listing" : "listings"}, each with its rating, runtime and consumer advice.`}
                className='sm:max-w-2xl'
              />
              <Reveal delay={120}>
                <CTA href='/approved-movies' variant='ghost'>
                  Full register
                </CTA>
              </Reveal>
            </div>

            <div className='mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {months.map((m, i) => {
                const [name, year] = m.month.split(" ");
                return (
                  <Reveal key={m._id} delay={i * 90}>
                    <Link
                      href={`/approved-movies/${m.slug}`}
                      className='block h-full'>
                      <Panel hover className='flex h-full flex-col'>
                        <div className='flex items-start justify-between gap-4'>
                          <div>
                            <p className='font-heading text-2xl font-bold'>
                              {name}
                            </p>
                            <p className='mt-0.5 text-sm tabular-nums text-muted-foreground'>
                              {year}
                            </p>
                          </div>
                          <CalendarDays className='size-5 shrink-0 text-muted-foreground' />
                        </div>

                        <p className='mt-6 font-heading text-4xl font-bold tabular-nums text-primary'>
                          {m.count}
                        </p>
                        <p className='mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground'>
                          {m.count === 1 ? "title approved" : "titles approved"}
                        </p>

                        {/* Per-classification split for the month */}
                        <div className='mt-5 flex flex-wrap gap-1.5'>
                          {ratings.map((r) => {
                            const n = m.ratingCounts?.[r.code] ?? 0;
                            return (
                              <div
                                key={r.code}
                                title={`${n} ${n === 1 ? "title" : "titles"} rated ${r.code} — ${r.label}`}
                                // Empty ratings recede to neutral rather than fading, keeping text contrast.
                                className={`flex items-center gap-1 rounded-md border px-1.5 py-1 font-heading text-[11px] font-extrabold leading-none${n === 0 ? " border-border text-muted-foreground" : ""}`}
                                style={n === 0 ? undefined : ratingStyle(r.tone)}>
                                <span>{r.code}</span>
                                <span className='tabular-nums'>
                                  {n}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        <span className='mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary'>
                          View listing <span aria-hidden>→</span>
                        </span>
                      </Panel>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------- NFVCB Pick */}
      {pick && <NfvcbPick pick={pick} />}

      {/* ------------------------------------------------------ Highlights */}
      {highlightSlides.length > 0 && (
        <section className='py-16 sm:py-24'>
          <div className='container-x'>
            <Reveal>
              <HighlightsCarousel slides={highlightSlides} />
            </Reveal>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------- Pillars */}
      <section className='section-y'>
        <div className='container-x'>
          <SectionHeading
            eyebrow='What the Board does'
            title='Three statutory duties, one mandate'
            lead='Empowered by the NFVCB Act 85 of 1993 to classify all films and video works — whether imported or produced locally — and to register every film and video outlet in the country.'
          />

          <div className='mt-12 grid gap-5 md:grid-cols-3'>
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 110}>
                <Panel hover className='flex h-full flex-col'>
                  <span className='grid size-12 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary'>
                    <p.icon className='size-6' />
                  </span>
                  <h3 className='mt-6 font-heading text-xl font-bold'>
                    {p.title}
                  </h3>
                  <p className='mt-3 flex-1 text-sm leading-relaxed text-muted-foreground'>
                    {p.body}
                  </p>
                  <Link
                    href={p.href}
                    className='mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-gold'>
                    {p.cta} <span aria-hidden>→</span>
                  </Link>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Newsroom */}
      <Newsroom articles={recent} />

      {/* ------------------------------------------------------- Ratings */}
      <section className='relative isolate overflow-hidden border-y border-border bg-surface section-y'>
        <div className='absolute inset-0 -z-10 opacity-60 spotlight' />
        <div className='container-x'>
          <div className='grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center'>
            <div>
              <SectionHeading
                eyebrow='Classification system'
                title='Seven symbols that tell every viewer what they are about to watch'
                lead="Classification restricts access to adult content by minors and gives parents advance information about a film's suitability. Every approved work must display its symbol on packaging, advertising and on screen."
              />
              <Reveal
                delay={140}
                className='mt-8 flex flex-col gap-3 sm:flex-row'>
                <CTA href='/classification'>Ratings &amp; fee schedule</CTA>
                <CTA href='/policy' variant='ghost'>
                  Our policy
                </CTA>
              </Reveal>
            </div>

            <div className='grid gap-3 sm:grid-cols-2'>
              {ratings.map((r, i) => (
                <Reveal key={r.code} delay={i * 60}>
                  <div className='group flex h-full items-start gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card'>
                    <span
                      className='grid size-12 shrink-0 place-items-center rounded-xl border font-heading text-base font-extrabold tabular-nums'
                      style={ratingStyle(r.tone)}>
                      {r.code}
                    </span>
                    <div className='min-w-0'>
                      <h3 className='text-sm font-bold'>{r.label}</h3>
                      <p className='mt-1.5 text-xs leading-relaxed text-muted-foreground'>
                        {r.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Timeline */}
      {/* Always-dark reel: each era is a frame on one strip of film, which
          scrolls sideways on small screens. */}
      <section className='dark theatre letterbox relative isolate overflow-hidden text-foreground section-y'>
        <div className='container-x'>
          <SectionHeading
            eyebrow='Three decades'
            title='From a nascent regulator to a world-class institution'
            lead='Over thirty years NFVCB has grown alongside the industry it regulates — meeting each new format, market and platform with a framework built for it.'
          />
        </div>

        <div className='mt-14 border-y border-border bg-black/30'>
          <div className='sprockets' />
          <div className='no-scrollbar snap-x snap-mandatory overflow-x-auto'>
            <ol className='container-x flex gap-3 lg:grid lg:grid-cols-4'>
              {timeline.map((t, i) => (
                <Reveal
                  as='li'
                  key={t.year}
                  delay={i * 110}
                  className='w-[78%] shrink-0 snap-start sm:w-[22rem] lg:w-auto'>
                  <div className='flex h-full flex-col rounded-md border border-border bg-foreground/[0.03] p-6 sm:p-7'>
                    <p className='font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground'>
                      Frame {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className='mt-6 font-heading text-4xl font-bold tabular-nums text-gold'>
                      {t.year}
                    </p>
                    <h3 className='mt-3 text-base font-semibold'>{t.title}</h3>
                    <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                      {t.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className='sprockets' />
        </div>
      </section>

      {/* ------------------------------------------------------ Licensing */}
      <section className='relative isolate overflow-hidden border-y border-border bg-surface section-y'>
        <div className='container-x'>
          <div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
            <SectionHeading
              eyebrow='Licensing'
              title='Five licence families. Every scale of operation.'
              lead='Whether you run a community cinema in a rural LGA or a streaming service reaching millions, there is a licence category defined for you — with published fees and requirements.'
              className='sm:max-w-2xl'
            />
            <Reveal delay={120}>
              <CTA href='/services/licensing' variant='gold'>
                View all categories
              </CTA>
            </Reveal>
          </div>

          <div className='mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {licenceCategories.map((c, i) => (
              <Reveal key={c.id} delay={i * 90}>
                <Link
                  href={`/services/licensing#${c.id}`}
                  className='block h-full'>
                  <Panel hover className='flex h-full flex-col'>
                    <div className='flex items-start justify-between gap-4'>
                      <h3 className='font-heading text-lg font-bold'>
                        {c.title}
                      </h3>
                      <span className='shrink-0 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-[11px] font-semibold text-gold'>
                        {c.licences.length}
                      </span>
                    </div>
                    <p className='mt-3 flex-1 text-sm leading-relaxed text-muted-foreground'>
                      {c.blurb}
                    </p>
                    <p className='mt-5 text-xs text-muted-foreground'>
                      From{" "}
                      <span className='font-mono text-sm font-semibold text-primary'>
                        {c.licences.reduce(
                          (min, l) =>
                            Number(l.fee.replace(/[^\d]/g, "")) <
                            Number(min.replace(/[^\d]/g, ""))
                              ? l.fee
                              : min,
                          c.licences[0].fee,
                        )}
                      </span>
                    </p>
                  </Panel>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={450}>
              <div className='flex h-full flex-col justify-center rounded-2xl border border-dashed border-primary/30 bg-primary/[0.05] p-8 text-center'>
                <Play className='mx-auto size-7 text-primary' />
                <p className='mt-4 text-sm leading-relaxed text-muted-foreground'>
                  Licences renew annually. Renew before expiry and pay 20% of
                  the new fee.
                </p>
                <Link
                  href='/services/licensing#renewal'
                  className='mt-4 text-sm font-semibold text-primary hover:text-gold'>
                  Renewal terms →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Steps */}
      <section className='section-y'>
        <div className='container-x grid gap-14 lg:grid-cols-[1fr_1.2fr]'>
          <div>
            <SectionHeading
              eyebrow='How it works'
              title='Six steps from finished cut to classification certificate'
              lead='Valid applications are classified within 20 working days, and certificates issued within 5 working days of the decision.'
            />
            <Reveal delay={160} className='mt-8'>
              <div className='rounded-2xl border border-gold/20 bg-gold/[0.06] p-6'>
                <p className='text-sm font-bold text-gold'>
                  NFVCB Business Online — Coming Soon
                </p>
                <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                  A full online application will bring electronic submission,
                  application tracking and digital certificate download to every
                  stakeholder.
                </p>
              </div>
            </Reveal>
            <Reveal delay={220} className='mt-6'>
              <CTA href='/services/forms' variant='ghost'>
                Download the forms
              </CTA>
            </Reveal>
          </div>

          <div className='space-y-7'>
            {submissionSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <NumberedItem n={i + 1} title={s.title}>
                  {s.body}
                </NumberedItem>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Network */}
      <section className='relative overflow-hidden border-y border-border bg-surface section-y'>
        <div className='container-x'>
          <div className='grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center'>
            <div>
              <SectionHeading
                eyebrow='Nationwide presence'
                title='A head office, six zones, and a centre close to you'
                lead='From Jos to Port Harcourt, Kano to Ikorodu, the Board maintains zonal offices and state centres so that no filmmaker, distributor or exhibitor is far from a classification desk.'
              />
              <Reveal delay={140} className='mt-8'>
                <CTA href='/about/zones'>Find your nearest office</CTA>
              </Reveal>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {[
                {
                  icon: Building2,
                  value: "1",
                  label: "Head office, Abuja FCT",
                },
                {
                  icon: Globe2,
                  value: "6",
                  label: "Geo-political zonal offices",
                },
                {
                  icon: FileText,
                  value: `${centres}`,
                  label: "Offices & state centres",
                },
                {
                  icon: ShieldCheck,
                  value: "9",
                  label: "Verification email desks",
                },
              ].map((s, i) => (
                <Reveal key={s.label} delay={i * 90}>
                  <div className='card-surface h-full p-6'>
                    <s.icon className='size-5 text-gold' />
                    <p className='mt-5 font-heading text-4xl font-bold tabular-nums'>
                      {s.value}
                    </p>
                    <p className='mt-2 text-xs leading-snug text-muted-foreground'>
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Quote */}
      <section className='section-y'>
        <div className='container-x'>
          <Reveal className='mx-auto max-w-4xl'>
            <Quote
              cite={
                <span className='flex items-center gap-4'>
                  {executiveDirector.imageUrl && (
                    <Image
                      src={executiveDirector.imageUrl}
                      alt=''
                      width={56}
                      height={56}
                      className='size-14 shrink-0 rounded-full border border-border object-cover object-top'
                    />
                  )}
                  <span>
                    <span className='block font-semibold text-foreground'>
                      {executiveDirector.shortName} &mdash; Executive Director
                    </span>
                    {executiveDirector.highlights.join(" · ")}
                  </span>
                </span>
              }>
              {executiveDirector.vision}
            </Quote>
          </Reveal>

          <Reveal
            delay={140}
            className='mx-auto mt-6 flex max-w-4xl flex-col gap-3 sm:flex-row'>
            <CTA href='/about/management/executive-director'>Full Profile</CTA>
            <CTA href='/service-charter' variant='ghost'>
              Read the Service Charter
            </CTA>
            <CTA href='/action-plan' variant='ghost'>
              The 8-Point Action Plan
            </CTA>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className='pb-20 sm:pb-28'>
        <div className='container-x'>
          <Reveal>
            <div className='relative isolate overflow-hidden rounded-3xl border border-border p-10 text-center sm:p-16 grain'>
              <div className='absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-background to-gold/15' />
              <Eyebrow className='justify-center'>Compliance matters</Eyebrow>
              <h2 className='mx-auto mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl'>
                It is illegal to distribute or exhibit any film not classified
                by the NFVCB
              </h2>
              <p className='mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base'>
                It is equally illegal to distribute films and video works
                without a distributor&rsquo;s licence. Get classified, get
                licensed, and trade with confidence.
              </p>
              <div className='mt-9 flex flex-col justify-center gap-3 sm:flex-row'>
                <CTA href='/services'>Start your application</CTA>
                <CTA href='/contact' variant='ghost'>
                  Talk to the Board
                </CTA>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
