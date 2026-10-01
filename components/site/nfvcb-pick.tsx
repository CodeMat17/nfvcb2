import Image from "next/image";
import { Star } from "lucide-react";
import type { NfvcbPick as Pick } from "@/lib/convex-server";
import { ratings, ratingStyle } from "@/lib/data/classification";
import { CTA, Eyebrow } from "./kit";
import { Reveal } from "./reveal";

/**
 * The Board's recommended film of the month: poster on one side, credits and
 * the Board's note on the other, over an ambient wash of the poster itself.
 * Always theatre-dark (the `dark` class re-scopes the colour tokens).
 */
export function NfvcbPick({ pick }: { pick: Pick }) {
  const rating = ratings.find((r) => r.code === pick.rating.trim().toUpperCase());
  const credits = [
    { label: "Director", value: pick.director },
    { label: "Producer", value: pick.producer },
    { label: "Starring", value: pick.majorCast },
    { label: "Production", value: pick.productionCompany },
  ].filter((c) => c.value?.trim());
  const facts = [pick.duration, pick.language].filter((f) => f?.trim());

  return (
    <section className='dark theatre letterbox relative isolate overflow-hidden text-foreground section-y'>
      {/* Ambient wash: the poster, blurred to pure colour. Static, so the blur
          is rasterised once. */}
      {pick.posterUrl && (
        <div aria-hidden className='absolute inset-0 -z-10 overflow-hidden'>
          {/* Blurred to pure colour, so a tiny rendition is plenty. */}
          <Image
            src={pick.posterUrl}
            alt=''
            fill
            sizes='256px'
            quality={40}
            className='scale-125 object-cover opacity-25 blur-3xl'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-[oklch(0.115_0.01_168)] via-[oklch(0.115_0.01_168/0.75)] to-[oklch(0.115_0.01_168/0.4)]' />
        </div>
      )}

      <div className='container-x'>
        <div className='grid items-center gap-12 md:grid-cols-[minmax(0,17rem)_1fr] lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20'>
          {/* Poster */}
          <Reveal className='w-full'>
            <div className='relative'>
              <div
                aria-hidden
                className='absolute -inset-6 -z-10 rounded-[2rem] bg-gold/15 blur-2xl'
              />
              <div className='relative aspect-[2/3] overflow-hidden rounded-xl bg-surface-2 shadow-[0_40px_80px_-24px_rgb(0_0_0/0.9)] ring-1 ring-white/10'>
                {pick.posterUrl ? (
                  <Image
                    src={pick.posterUrl}
                    alt={`${pick.title} poster`}
                    fill
                    sizes='(min-width: 1024px) 22rem, (min-width: 768px) 17rem, 100vw'
                    className='object-cover'
                  />
                ) : (
                  <div className='grid size-full place-items-center'>
                    <Image
                      src='/logo.webp'
                      alt=''
                      width={96}
                      height={96}
                      className='size-20 opacity-60'
                    />
                  </div>
                )}
                <span className='absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold-foreground shadow-lg shadow-black/40'>
                  <Star aria-hidden className='size-3 fill-current' />
                  Movie of the Month
                </span>
              </div>
            </div>
          </Reveal>

          {/* Details */}
          <div>
            <Reveal>
              <Eyebrow>
                NFVCB Pick 
              </Eyebrow>
              <p className='mt-3 font-semibold text-sm text-gold'>
                Movie of the Month - {pick.month}
              </p>
              <h2 className='mt-5 text-4xl font-black leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-6xl'>
                {pick.title}
              </h2>
            </Reveal>

            <Reveal
              delay={80}
              className='mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground'>
              <span className='flex items-center gap-2.5'>
                <span
                  className='grid h-10 min-w-10 place-items-center rounded-lg border px-2.5 font-heading text-sm font-extrabold'
                  style={ratingStyle(rating?.tone ?? "160")}>
                  <span className='sr-only'>Rated </span>
                  {rating?.code ?? pick.rating.trim()}
                </span>
                {rating && (
                  <span className='font-semibold text-foreground'>
                    {rating.label}
                  </span>
                )}
              </span>
              {facts.map((f) => (
                <span key={f} className='flex items-center gap-5'>
                  <span aria-hidden className='h-4 w-px bg-border' />
                  {f}
                </span>
              ))}
            </Reveal>

            {pick.note && (
              <Reveal delay={140}>
                <blockquote className='mt-8 max-w-2xl border-l-2 border-gold pl-5 font-heading text-lg leading-relaxed text-foreground/90 sm:text-xl'>
                  &ldquo;{pick.note}&rdquo;
                </blockquote>
              </Reveal>
            )}

            {credits.length > 0 && (
              <Reveal delay={200}>
                <dl className='mt-9 grid max-w-2xl gap-x-10 gap-y-5 border-t border-border pt-7 sm:grid-cols-2'>
                  {credits.map((c) => (
                    <div key={c.label}>
                      <dt className='text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
                        {c.label}
                      </dt>
                      <dd className='mt-1.5 text-sm leading-relaxed'>
                        {c.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}

            {pick.consumerAdvice?.trim() && (
              <Reveal delay={240}>
                <p className='mt-6 max-w-2xl text-xs leading-relaxed text-muted-foreground'>
                  <span className='font-semibold text-foreground/80'>
                    Consumer advice:
                  </span>{" "}
                  {pick.consumerAdvice}
                </p>
              </Reveal>
            )}

            <Reveal
              delay={280}
              className='mt-9 flex flex-col gap-3 sm:flex-row'>
              {pick.trailerUrl && (
                <CTA href={pick.trailerUrl} external>
                  Watch the trailer
                </CTA>
              )}
              <CTA
                href={`/approved-movies/${pick.slug}`}
                variant={pick.trailerUrl ? "ghost" : "primary"}>
                {pick.month} register
              </CTA>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
