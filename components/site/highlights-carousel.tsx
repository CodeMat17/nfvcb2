"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { ratings } from "@/lib/data/classification";
import type { HighlightSlide } from "@/lib/data/highlights";
import { cn } from "@/lib/utils";

/** Time each slide holds before advancing; drives the progress rail too. */
const HOLD_MS = 7000;
const SWIPE_PX = 48;

function formatDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });
}

/* ------------------------------------------------------------ Backdrops */

/** The seven classification plates fan open as the slide comes in. */
function RatingsFan({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[58%] items-center justify-center md:flex">
      <div className="relative h-44 w-32 -translate-y-[12%] lg:h-56 lg:w-44">
        {ratings.map((r, i) => {
          const offset = i - (ratings.length - 1) / 2;
          const style: CSSProperties = {
            transform: active
              ? `translateX(${offset * 58}%) translateY(${Math.abs(offset) * 7}%) rotate(${offset * 8}deg)`
              : "translateX(0) translateY(6%) rotate(0deg)",
            transitionDelay: active ? `${250 + i * 60}ms` : "0ms",
            zIndex: 10 - Math.abs(Math.round(offset)),
          };
          return (
            <div
              key={r.code}
              style={style}
              className="absolute inset-0 origin-bottom overflow-hidden rounded-xl border border-white/15 shadow-[0_24px_48px_-16px_rgb(0_0_0/0.8)] transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <Image src={r.image} alt="" fill sizes="176px" className="object-cover" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Oversized line icon over a coloured glow, for slides without a photo. */
function Emblem({ kind, active }: { kind: "licence" | "enforcement"; active: boolean }) {
  const Icon = kind === "licence" ? ScrollText : ShieldCheck;
  const glow = kind === "licence" ? "var(--gold)" : "var(--primary)";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(55% 70% at 78% 40%, color-mix(in oklab, ${glow} 30%, transparent), transparent 70%)`,
        }}
      />
      <div
        className="grid-overlay absolute inset-0 opacity-40"
        style={{
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(50% 65% at 78% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(50% 65% at 78% 40%, black, transparent)",
        }}
      />
      <Icon
        strokeWidth={0.6}
        className={cn(
          "absolute right-[4%] top-[8%] size-[min(26rem,60vw)] text-white/[0.11] transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          active ? "rotate-0 scale-100 opacity-100" : "-rotate-6 scale-90 opacity-0",
        )}
      />
    </div>
  );
}

function Backdrop({ slide, active }: { slide: HighlightSlide; active: boolean }) {
  if (slide.image) {
    return (
      <Image
        src={slide.image}
        alt=""
        fill
        sizes="100vw"
        className={cn(
          "-z-10 object-cover transition-transform duration-[9000ms] ease-out",
          active ? "scale-100" : "scale-110",
        )}
      />
    );
  }
  if (slide.art === "ratings") {
    return (
      <>
        <div className="spotlight absolute inset-0 -z-10 opacity-80" />
        <RatingsFan active={active} />
      </>
    );
  }
  if (slide.art === "licence" || slide.art === "enforcement") {
    return <Emblem kind={slide.art} active={active} />;
  }
  return null;
}

/* ------------------------------------------------------------ Carousel */

/** Staggered entrance for each line of copy as its slide becomes active. */
const enter =
  "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] translate-y-5 opacity-0 group-data-[active=true]/slide:translate-y-0 group-data-[active=true]/slide:opacity-100";

const control =
  "grid size-9 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

/**
 * All-in-one homepage carousel: the Board's latest stories and its standing
 * messages share one cinematic stage. It advances on its own, but holds while
 * the visitor hovers or focuses it, can be paused outright, and never
 * autoplays for visitors who prefer reduced motion.
 */
export function HighlightsCarousel({ slides }: { slides: HighlightSlide[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);
  const pointerX = useRef<number | null>(null);
  const count = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const autoplay = playing && !reduced;
  const running = autoplay && !held;

  const go = (i: number) => setActive(((i % count) + count) % count);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="NFVCB highlights"
      // Always the dark palette: copy sits on photography and film artwork.
      className="dark relative isolate h-[clamp(30rem,72vh,36rem)] w-full min-w-0 overflow-hidden rounded-3xl border border-border bg-background text-foreground shadow-[0_40px_90px_-40px_rgb(0_0_0/0.7)] grain"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1);
        else if (e.key === "ArrowLeft") go(active - 1);
      }}
      onPointerDown={(e) => {
        pointerX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (pointerX.current === null) return;
        const dx = e.clientX - pointerX.current;
        pointerX.current = null;
        if (Math.abs(dx) > SWIPE_PX) go(active + (dx < 0 ? 1 : -1));
      }}
      style={{ touchAction: "pan-y" }}
    >
      {slides.map((s, i) => {
        const isActive = i === active;
        const date = formatDate(s.date);
        return (
          <div
            key={s.id}
            data-active={isActive}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={!isActive}
            inert={!isActive}
            className={cn(
              "group/slide absolute inset-0 isolate transition-opacity duration-1000 ease-out",
              isActive ? "z-10 opacity-100" : "z-0 opacity-0",
            )}
          >
            <Backdrop slide={s} active={isActive} />

            {/* Scrims keep the copy legible over any photograph */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/45 to-black/5" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/15 to-transparent" />

            <div className="flex h-full flex-col justify-end px-6 pb-24 pt-8 sm:px-10 sm:pb-28 lg:px-14">
              <div className="max-w-2xl">
                <div className={cn(enter, "flex flex-wrap items-center gap-2 group-data-[active=true]/slide:delay-150")}>
                  <span className="eyebrow">
                    <span className="h-px w-6 bg-primary/60" />
                    {s.eyebrow}
                  </span>
                  {s.featured && (
                    <span className="rounded-full border border-gold/40 bg-gold/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                      Featured
                    </span>
                  )}
                </div>

                <h3
                  className={cn(
                    enter,
                    "mt-4 text-balance font-heading text-[1.75rem] font-black leading-[1.06] tracking-[-0.02em] text-white sm:text-4xl xl:text-[2.9rem] group-data-[active=true]/slide:delay-[250ms]",
                  )}
                >
                  {s.title}
                </h3>

                {s.body && (
                  <p
                    className={cn(
                      enter,
                      "mt-4 hidden max-w-xl text-base leading-relaxed text-white/75 sm:line-clamp-3 group-data-[active=true]/slide:delay-[350ms]",
                    )}
                  >
                    {s.body}
                  </p>
                )}

                {date && (
                  <p
                    className={cn(
                      enter,
                      "mt-3 flex items-center gap-1.5 text-xs text-white/60 group-data-[active=true]/slide:delay-[400ms]",
                    )}
                  >
                    <CalendarDays className="size-3.5 text-primary" />
                    {date}
                  </p>
                )}

                <div
                  className={cn(
                    enter,
                    "mt-6 flex flex-wrap gap-2.5 group-data-[active=true]/slide:delay-[450ms]",
                  )}
                >
                  <Link
                    href={s.primary.href}
                    className="group/btn inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    {s.primary.label}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                  {s.secondary && (
                    <Link
                      href={s.secondary.href}
                      className="hidden h-11 items-center rounded-full border border-white/25 bg-white/[0.06] px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:inline-flex"
                    >
                      {s.secondary.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Announce slide changes only when the visitor is driving */}
      <div className="sr-only" aria-live={autoplay ? "off" : "polite"} aria-atomic="true">
        Slide {active + 1} of {count}: {slides[active]?.title}
      </div>

      {/* Chapter rail + controls — nothing to page through with a single slide */}
      {count > 1 && (
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end gap-4 px-6 pb-5 sm:px-10 sm:pb-6 lg:px-14">
        <div className="flex min-w-0 flex-1 gap-1.5 sm:gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              aria-current={i === active}
              className="group/seg min-w-0 flex-1 py-3 text-left focus-visible:outline-none"
            >
              <span
                className={cn(
                  "mb-2 hidden truncate text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors lg:block",
                  i === active ? "text-white" : "text-white/40 group-hover/seg:text-white/70",
                )}
              >
                {s.eyebrow}
              </span>
              <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/20 group-focus-visible/seg:ring-2 group-focus-visible/seg:ring-white/70">
                {i < active && <span className="absolute inset-0 bg-white/70" />}
                {i === active &&
                  (autoplay ? (
                    <span
                      key={active}
                      className="hl-progress absolute inset-0 bg-primary"
                      style={{
                        animationDuration: `${HOLD_MS}ms`,
                        animationPlayState: running ? "running" : "paused",
                      }}
                      onAnimationEnd={() => go(active + 1)}
                    />
                  ) : (
                    <span className="absolute inset-0 bg-primary" />
                  ))}
              </span>
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 pb-0.5">
          <span className="hidden font-mono text-xs tabular-nums text-white/60 sm:block">
            {String(active + 1).padStart(2, "0")}
            <span className="text-white/30"> / {String(count).padStart(2, "0")}</span>
          </span>
          {!reduced && (
            <button
              type="button"
              className={control}
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            >
              {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            </button>
          )}
          <button type="button" className={control} onClick={() => go(active - 1)} aria-label="Previous slide">
            <ChevronLeft className="size-4" />
          </button>
          <button type="button" className={control} onClick={() => go(active + 1)} aria-label="Next slide">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
