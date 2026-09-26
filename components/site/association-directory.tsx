"use client";

import { useMemo, useState } from "react";
import { Globe, Mail, MapPin, Phone, Search, X } from "lucide-react";
import { associations } from "@/lib/data/associations";
import { cn } from "@/lib/utils";

const locations = Array.from(new Set(associations.map((a) => a.location))).sort();

export function AssociationDirectory() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [sort, setSort] = useState<"acronym" | "name" | "location">("acronym");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return associations
      .filter((a) => {
        if (location !== "all" && a.location !== location) return false;
        if (!q) return true;
        return [
          a.acronym,
          a.name,
          a.location,
          a.president.name,
          a.secretary.name,
          ...a.addresses,
          ...a.emails,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) =>
        sort === "acronym"
          ? a.acronym.localeCompare(b.acronym)
          : sort === "name"
            ? a.name.localeCompare(b.name)
            : a.location.localeCompare(b.location) || a.acronym.localeCompare(b.acronym),
      );
  }, [query, location, sort]);

  const letters = useMemo(
    () => Array.from(new Set(results.map((a) => a.acronym[0]))).sort(),
    [results],
  );

  return (
    <div className="mt-12">
      {/* Controls */}
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guild, acronym, official or location…"
            aria-label="Search associations"
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

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Filter by location"
          className="h-12 rounded-full border border-border bg-foreground/[0.04] px-5 text-sm outline-none transition-colors focus:border-primary/50"
        >
          <option value="all">All locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          aria-label="Sort directory"
          className="h-12 rounded-full border border-border bg-foreground/[0.04] px-5 text-sm outline-none transition-colors focus:border-primary/50"
        >
          <option value="acronym">Sort: Acronym</option>
          <option value="name">Sort: Full name</option>
          <option value="location">Sort: Location</option>
        </select>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{results.length}</span> of{" "}
          {associations.length} registered bodies
        </p>
        {letters.length > 1 && sort === "acronym" && (
          <div className="no-scrollbar flex gap-1 overflow-x-auto">
            {letters.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="grid size-7 shrink-0 place-items-center rounded-md border border-border text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {l}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="mt-14 rounded-2xl border border-dashed border-border p-14 text-center">
          <p className="font-heading text-lg font-semibold">No matching bodies</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different acronym, official or location.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((a, i) => {
            const isFirstOfLetter =
              sort === "acronym" && (i === 0 || results[i - 1].acronym[0] !== a.acronym[0]);
            return (
              <article
                key={a.acronym}
                id={isFirstOfLetter ? `letter-${a.acronym[0]}` : undefined}
                className={cn(
                  "group flex h-full scroll-mt-28 flex-col rounded-2xl border border-border bg-card/60 p-6",
                  "transition-all duration-400 hover:-translate-y-1 hover:border-primary/35 hover:bg-card hover:shadow-xl hover:shadow-[color:var(--shadow-tint)]",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-1.5 font-heading text-sm font-bold text-primary">
                    {a.acronym}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 text-gold" />
                    {a.location}
                  </span>
                </div>

                <h2 className="mt-5 text-base font-semibold leading-snug">{a.name}</h2>

                <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
                  {[a.president, a.secretary].map((p) => (
                    <div key={p.role}>
                      <dt className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        {p.role}
                      </dt>
                      <dd className="mt-0.5 font-medium">{p.name}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5 text-sm text-muted-foreground">
                  {a.addresses.map((addr) => (
                    <p key={addr} className="flex gap-2.5 leading-relaxed">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-gold/70" />
                      {addr}
                    </p>
                  ))}
                </div>

                <div className="mt-5 space-y-2 border-t border-border pt-5">
                  {a.emails.map((e) => (
                    <a
                      key={e}
                      href={`mailto:${e}`}
                      className="flex items-center gap-2.5 break-all text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Mail className="size-3.5 shrink-0 text-primary" />
                      {e}
                    </a>
                  ))}
                  {a.phones?.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p}`}
                      className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Phone className="size-3.5 shrink-0 text-primary" />
                      {p}
                    </a>
                  ))}
                  {a.website && (
                    <a
                      href={`https://${a.website.replace(/^https?:\/\//, "")}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-2.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Globe className="size-3.5 shrink-0 text-primary" />
                      {a.website}
                    </a>
                  )}
                  {a.emails.length === 0 && !a.phones && !a.website && (
                    <p className="text-xs text-muted-foreground">
                      No contact details published.
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
