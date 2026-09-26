"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ratings } from "@/lib/data/classification";

const CYCLE_MS = 4200;
/** First advance waits longer, so the hero is settled before anything moves. */
const FIRST_CYCLE_MS = 9000;

/**
 * Hybrid hero panel for the classification symbols: one plate shown large with
 * its label and description, the full set of seven available as thumbnails.
 *
 * It cycles on its own so the whole scheme is seen over time, and stops as soon
 * as the visitor takes over by hovering, focusing or tapping a thumbnail — the
 * autoplay should never fight someone reading a specific rating.
 */
export function RatingSpotlight() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  // Autoplay lives entirely in the effect: it never runs during a server render,
  // it stops while the visitor is in control, and it respects reduced motion.
  useEffect(() => {
    if (held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let interval: number | undefined;
    const advance = () => setActive((i) => (i + 1) % ratings.length);
    const timeout = window.setTimeout(() => {
      advance();
      interval = window.setInterval(advance, CYCLE_MS);
    }, started.current ? CYCLE_MS : FIRST_CYCLE_MS);
    started.current = true;
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [held]);

  const current = ratings[active];

  /** Arrow keys walk the set, matching the tablist role on the thumbnails. */
  function onKeyDown(e: React.KeyboardEvent) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + ratings.length) % ratings.length;
    setActive(next);
    setHeld(true);
    const nodes = listRef.current?.querySelectorAll<HTMLButtonElement>("button");
    nodes?.[next]?.focus();
  }

  return (
    <div
      className="w-full"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
    >
      {/* Spotlit plate */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_50px_-28px_rgb(0_0_0/0.55)]">
        <div className="relative aspect-[1280/1170]">
          {ratings.map((r, i) => (
            <Image
              key={r.code}
              src={r.image}
              alt={`${r.code} — ${r.label} classification symbol`}
              fill
              sizes="(min-width: 640px) 21rem, 90vw"
              priority={i === 0}
              className={cn(
                "object-cover transition-opacity duration-700 ease-out",
                i === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>

        {/* Caption rides over the foot of the plate */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-4 pt-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
            Classification {active + 1} of {ratings.length}
          </p>
          <h2 className="mt-1 font-heading text-base font-bold leading-snug text-white">
            {current.code} · {current.label}
          </h2>
          <p
            key={current.code}
            className="mt-1.5 line-clamp-3 text-[11px] leading-relaxed text-white/75"
          >
            {current.desc}
          </p>
        </div>
      </div>

      {/* The full set, always visible */}
      <div
        ref={listRef}
        role="tablist"
        aria-label="Classification symbols"
        onKeyDown={onKeyDown}
        className="mt-3 grid grid-cols-7 gap-1.5"
      >
        {ratings.map((r, i) => (
          <button
            key={r.code}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`${r.code} — ${r.label}`}
            title={r.label}
            tabIndex={i === active ? 0 : -1}
            onClick={() => {
              setActive(i);
              setHeld(true);
            }}
            onFocus={() => {
              setActive(i);
              setHeld(true);
            }}
            className={cn(
              "group relative overflow-hidden rounded border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              i === active
                ? "border-primary/70 ring-1 ring-primary/40"
                : "border-border opacity-55 hover:opacity-100",
            )}
          >
            <span className="relative block aspect-[1280/1170]">
              <Image
                src={r.image}
                alt=""
                fill
                sizes="48px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.06]"
              />
            </span>
            <span className="sr-only">{r.short}</span>
          </button>
        ))}
      </div>

      <Link
        href="/classification"
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-gold"
      >
        All seven symbols &amp; what they mean <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
