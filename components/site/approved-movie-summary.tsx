"use client";

import { Languages, ShieldCheck } from "lucide-react";
import type { ApprovedMovieItem } from "@/lib/convex-server";
import { ratings, ratingStyle } from "@/lib/data/classification";
import { cn } from "@/lib/utils";

/**
 * Split a free-text language field ("English / Igbo", "Hausa, English") into its spoken
 * languages. Subtitle notes are ignored, so "IGBO (SUBTITLED)", "Igbo in English",
 * "Igbo subtitled in English" and "Igbo with English subtitles" all count as Igbo only.
 */
export function splitLanguages(language: string): string[] {
  return (
    language
      // "(SUBTITLED IN ENGLISH)", "(SUB" — any bracketed qualifier
      .replace(/\([^)]*(?:\)|$)/g, " ")
      // "subtitled in English…", "sub-titled", "subbed", "sub", "subtitles in English…"
      .replace(/\bsub(?:-?titled?|bed)?\b.*$/i, " ")
      .replace(/\bsub-?titles?\s+(?:in|into)\b.*$/i, " ")
      // "with English subtitles", "English and French subs" — the subtitle language
      .replace(
        /(?:\bwith\s+)?(?:\p{L}+(?:\s+(?:and|&)\s+\p{L}+)?\s+)?\bsub(?:-?titles|s)\b/giu,
        " ",
      )
      .split(/\s*(?:\/|,|&|\+|;|\band\b)\s*/i)
      // "Igbo in English" is an Igbo film (English is the subtitle/translation)
      .map((l) => l.replace(/\s+(?:in|into)\b.*$/i, ""))
      .map((l) => l.replace(/^[\s\-–—:.]+|[\s\-–—:.]+$/g, ""))
      .filter(Boolean)
  );
}

function titleCase(s: string) {
  return s.toLowerCase().replace(/(^|[\s-])(\p{L})/gu, (_, sep, c) => sep + c.toUpperCase());
}

/**
 * The single language bucket a film belongs to, so every film is counted exactly once:
 * "IGBO (SUBTITLED)" → "Igbo", "Igbo / english" and "English, Igbo" → "English/Igbo".
 */
export function languageGroup(language: string): string {
  const langs = Array.from(new Set(splitLanguages(language).map(titleCase)));
  if (langs.length === 0) return "Unspecified";
  return langs.sort((a, b) => a.localeCompare(b)).join("/");
}

export function sameLabel(a: string, b: string) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

type Row = { key: string; label: string; count: number; tone?: string; title?: string };

function tally(values: string[]): Row[] {
  const map = new Map<string, Row>();
  for (const v of values) {
    const key = v.toLowerCase();
    const row = map.get(key);
    if (row) row.count += 1;
    else map.set(key, { key: v, label: v, count: 1 });
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function SummaryPanel({
  icon: Icon,
  title,
  note,
  rows,
  active,
  onSelect,
}: {
  icon: typeof Languages;
  title: string;
  note: string;
  rows: Row[];
  active: string;
  onSelect: (key: string) => void;
}) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-6 sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="flex items-center gap-2 font-heading text-base font-bold">
          <Icon className="size-4 text-primary" />
          {title}
        </h2>
        <span className="text-xs text-muted-foreground">{note}</span>
      </div>

      <ul className="mt-5 space-y-1">
        {rows.map((r) => {
          const isActive = sameLabel(active, r.key);
          const empty = r.count === 0;
          return (
            <li key={r.key}>
              <button
                type="button"
                disabled={empty}
                onClick={() => onSelect(isActive ? "all" : r.key)}
                aria-pressed={isActive}
                title={r.title}
                className={cn(
                  "grid w-full grid-cols-[8rem_1fr_2rem] items-center gap-3 rounded-lg px-2 py-1.5 text-left text-sm transition-colors",
                  empty ? "cursor-default opacity-45" : "hover:bg-foreground/[0.05]",
                  isActive && "bg-primary/10 ring-1 ring-primary/35",
                )}
              >
                {r.tone ? (
                  <span
                    className="grid h-7 w-fit min-w-7 place-items-center rounded-md border px-2 font-heading text-[11px] font-extrabold"
                    style={ratingStyle(r.tone)}
                  >
                    {r.label}
                  </span>
                ) : (
                  <span className="truncate font-medium">{r.label}</span>
                )}
                <span className="h-2 overflow-hidden rounded-full bg-foreground/[0.06]">
                  <span
                    className={cn("block h-full rounded-full", !r.tone && "bg-primary")}
                    style={{
                      width: `${(r.count / max) * 100}%`,
                      ...(r.tone && { background: `oklch(var(--rating-l) 0.13 ${r.tone})` }),
                    }}
                  />
                </span>
                <span className="text-right font-mono text-xs font-semibold tabular-nums">
                  {r.count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ApprovedMovieSummary({
  items,
  rating,
  language,
  onRating,
  onLanguage,
}: {
  items: ApprovedMovieItem[];
  rating: string;
  language: string;
  onRating: (r: string) => void;
  onLanguage: (l: string) => void;
}) {
  const ratingRows: Row[] = [
    ...ratings.map((r) => ({
      key: r.code,
      label: r.code,
      title: r.label,
      tone: r.tone,
      count: items.filter((i) => sameLabel(i.rating, r.code)).length,
    })),
    // Any non-standard ratings entered in the CMS, so nothing goes uncounted.
    ...tally(
      items.map((i) => i.rating.trim()).filter((v) => !ratings.some((r) => sameLabel(r.code, v))),
    ).map((r) => ({ ...r, tone: "160" })),
  ];

  // Single languages first (English, Igbo, …), then combinations (English/Igbo, …).
  const languageRows = tally(items.map((i) => languageGroup(i.language)))
    .sort((a, b) => Number(a.label.includes("/")) - Number(b.label.includes("/")))
    .map((r) => ({ ...r, title: r.label }));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SummaryPanel
        icon={ShieldCheck}
        title="By rating"
        note={`${items.length} ${items.length === 1 ? "title" : "titles"}`}
        rows={ratingRows}
        active={rating}
        onSelect={onRating}
      />
      <SummaryPanel
        icon={Languages}
        title="By language"
        note={`${items.length} ${items.length === 1 ? "title" : "titles"}`}
        rows={languageRows}
        active={language}
        onSelect={onLanguage}
      />
    </div>
  );
}
