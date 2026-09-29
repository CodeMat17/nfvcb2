"use client";

import { useMemo, useState } from "react";
import { Clock, Play, Search, Star, X } from "lucide-react";
import type { ApprovedMovieItem } from "@/lib/convex-server";
import {
  ratings,
  ratingStyle,
} from "@/lib/data/classification";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ApprovedMovieSummary,
  sameLabel,
  splitLanguages,
} from "@/components/site/approved-movie-summary";

function toneFor(rating: string) {
  const match = ratings.find(
    (r) => r.code.toLowerCase() === rating.trim().toLowerCase(),
  );
  return match?.tone ?? "160";
}

function RatingChip({ rating }: { rating: string }) {
  const tone = toneFor(rating);
  return (
    <span
      className="grid h-9 min-w-9 shrink-0 place-items-center rounded-lg border px-2.5 font-heading text-xs font-extrabold"
      style={ratingStyle(tone)}
    >
      {rating}
    </span>
  );
}

function FilterSelect({
  label,
  allLabel,
  value,
  options,
  onChange,
}: {
  label: string;
  allLabel: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const items = [
    { value: "all", label: allLabel },
    ...options.map((o) => ({ value: o, label: o })),
  ];
  return (
    <Select items={items} value={value} onValueChange={(v) => onChange(v ?? "all")}>
      <SelectTrigger
        aria-label={label}
        className="h-12! w-full rounded-full border-border bg-foreground/[0.04] px-5 sm:min-w-48"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((i) => (
          <SelectItem key={i.value} value={i.value}>
            {i.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function ApprovedMovieList({ items }: { items: ApprovedMovieItem[] }) {
  const [query, setQuery] = useState("");
  const [rating, setRating] = useState("all");
  const [language, setLanguage] = useState("all");

  const usedRatings = useMemo(
    () => Array.from(new Set(items.map((i) => i.rating.trim()))).sort(),
    [items],
  );

  const usedLanguages = useMemo(() => {
    const seen = new Map<string, string>();
    for (const l of items.flatMap((i) => splitLanguages(i.language))) {
      if (!seen.has(l.toLowerCase())) seen.set(l.toLowerCase(), l);
    }
    return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
  }, [items]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (rating !== "all" && !sameLabel(i.rating, rating)) return false;
      if (language !== "all" && !splitLanguages(i.language).some((l) => sameLabel(l, language)))
        return false;
      if (!q) return true;
      return [
        i.title,
        i.producer,
        i.director,
        i.majorCast,
        i.productionCompany,
        i.language,
        i.consumerAdvice,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [items, query, rating, language]);

  // Summary keys (e.g. canonical "PG") may differ in case from the raw values in the select.
  const ratingValue =
    rating === "all" ? "all" : (usedRatings.find((r) => sameLabel(r, rating)) ?? rating);
  const languageValue =
    language === "all" ? "all" : (usedLanguages.find((l) => sameLabel(l, language)) ?? language);

  return (
    <div>
      {/* Summary */}
      <ApprovedMovieSummary
        items={items}
        rating={rating}
        language={language}
        onRating={setRating}
        onLanguage={setLanguage}
      />

      {/* Controls */}
      <div className="mt-10 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, producer, director, cast…"
            aria-label="Search approved films"
            className="h-12 w-full rounded-full border border-border bg-foreground/[0.04] pl-11 pr-11 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:bg-foreground/[0.07]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <FilterSelect
          label="Filter by classification"
          allLabel="All classifications"
          value={ratingValue}
          options={usedRatings}
          onChange={setRating}
        />

        <FilterSelect
          label="Filter by language"
          allLabel="All languages"
          value={languageValue}
          options={usedLanguages}
          onChange={setLanguage}
        />
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{results.length}</span> of{" "}
        {items.length} approved titles
      </p>

      {results.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border p-14 text-center">
          <p className="font-heading text-lg font-semibold">No matching titles</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different title, producer, classification or language.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {results.map((film) => (
            <article
              key={film._id}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 sm:p-7",
                "transition-all duration-400 hover:border-primary/35 hover:bg-card",
              )}
            >
              {film.featured && (
                <span className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">
                  <Star className="size-3" /> Featured
                </span>
              )}

              <div className="flex items-start gap-4">
                <RatingChip rating={film.rating} />
                <div className="min-w-0 pr-20 sm:pr-24">
                  <h2 className="font-heading text-lg font-bold leading-snug">{film.title}</h2>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-primary" />
                      {film.duration}
                    </span>
                    <span>{film.language}</span>
                    <span>Approved {film.dateOfApproval}</span>
                  </div>
                </div>
              </div>

              <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Producer", film.producer],
                  ["Director", film.director],
                  ["Production company", film.productionCompany],
                  ["Preview location", film.previewLocation],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {k}
                    </dt>
                    <dd className="mt-1 text-sm">{v}</dd>
                  </div>
                ))}

                <div className="sm:col-span-2 lg:col-span-3">
                  <dt className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Major cast
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {film.majorCast}
                  </dd>
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <dt className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    Consumer advice
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-foreground/90">
                    {film.consumerAdvice}
                  </dd>
                </div>
              </dl>

              {(film.juryNote || film.trailerUrl) && (
                <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-5">
                  {film.juryNote && (
                    <p className="flex-1 text-sm italic leading-relaxed text-muted-foreground">
                      “{film.juryNote}”
                    </p>
                  )}
                  {film.trailerUrl && (
                    <a
                      href={film.trailerUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-border bg-foreground/[0.04] px-5 text-sm font-semibold transition-colors hover:border-primary/40 hover:bg-primary hover:text-primary-foreground"
                    >
                      <Play className="size-4" />
                      Watch trailer
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
