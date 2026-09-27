"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import type { NewsArticle } from "@/lib/convex-server";
import { cn } from "@/lib/utils";

/**
 * Tone per editorial category. Anything unrecognised falls back to the neutral
 * border treatment, so a new category authored in Convex still renders cleanly.
 */
const categoryTone: Record<string, string> = {
  "press release": "border-gold/30 bg-gold/10 text-gold",
  announcement: "border-gold/30 bg-gold/10 text-gold",
  advisory: "border-gold/30 bg-gold/10 text-gold",
  enforcement: "border-destructive/30 bg-destructive/10 text-destructive",
  regulation: "border-primary/30 bg-primary/10 text-primary",
  events: "border-primary/30 bg-primary/10 text-primary",
};

function toneFor(category?: string) {
  const tone = category && categoryTone[category.toLowerCase()];
  return tone ?? "border-border bg-foreground/[0.06] text-muted-foreground";
}

function shortDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "short" });
}

/** Long enough to read a headline twice before the next one slides in. */
const INTERVAL_MS = 6000;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}

/**
 * Latest headlines as a slim one-line strip. News is published rarely, so a
 * looping marquee would only repeat the same few titles; instead one headline
 * shows at a time and rotates gently. Rotation stops on hover or focus, behind
 * the pause button (WCAG 2.2.2), and entirely under reduced motion.
 */
export function NewsTicker({
  articles,
  className,
}: {
  articles: NewsArticle[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const reduced = usePrefersReducedMotion();

  const count = articles.length;
  const rotating = count > 1 && !reduced;
  const running = rotating && !paused && !held;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % count),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [running, count]);

  if (count === 0) return null;

  return (
    <section
      aria-label="Latest news"
      className={cn("border-y border-border bg-foreground/[0.03]", className)}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false);
      }}
    >
      <div className="container-x flex h-11 items-center gap-3 sm:gap-4">
        <span className="flex shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          Latest
        </span>
        <span aria-hidden className="h-4 w-px shrink-0 bg-border" />

        {/* Every headline is stacked in one cell; only the active one is visible
            and reachable, so the strip never changes height between titles. */}
        <div className="grid min-w-0 flex-1 overflow-hidden">
          {articles.map((a, i) => {
            const active = i === index;
            const date = shortDate(a.publishedAt);
            return (
              <Link
                key={a._id}
                href={`/news/${a.slug}`}
                inert={!active}
                aria-hidden={!active}
                className={cn(
                  "group col-start-1 row-start-1 flex min-w-0 items-center gap-2.5 transition-all duration-500",
                  active
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0",
                )}
              >
                <span
                  className={cn(
                    "hidden shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] sm:inline",
                    toneFor(a.category),
                  )}
                >
                  {a.category ?? "News"}
                </span>
                <span className="truncate text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  {a.title}
                </span>
                {date && (
                  <span className="hidden shrink-0 text-xs tabular-nums text-muted-foreground md:inline">
                    {date}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {rotating && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume headlines" : "Pause headlines"}
            className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {paused ? <Play className="size-3" /> : <Pause className="size-3" />}
          </button>
        )}

        <Link
          href="/news"
          className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-gold sm:inline-flex"
        >
          All news <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
