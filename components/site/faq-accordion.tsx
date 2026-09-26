"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, Search, X } from "lucide-react";
import { faqGroups } from "@/lib/data/faq";
import { cn } from "@/lib/utils";

export function FaqAccordion() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqGroups;
    return faqGroups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  const count = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="mt-12">
      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the questions…"
          aria-label="Search frequently asked questions"
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

      {query && (
        <p className="mt-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{count}</span>{" "}
          {count === 1 ? "question" : "questions"} match your search
        </p>
      )}

      {groups.length === 0 ? (
        <div className="mt-14 rounded-2xl border border-dashed border-border p-14 text-center">
          <p className="font-heading text-lg font-semibold">No matching questions</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try different wording, or contact the Board directly.
          </p>
        </div>
      ) : (
        <div className="mt-12 space-y-14">
          {groups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-28">
              <div className="flex items-baseline gap-4">
                <h2 className="font-heading text-2xl font-bold sm:text-3xl">{group.title}</h2>
                <span className="text-sm text-muted-foreground">{group.items.length}</span>
              </div>

              <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/50">
                {group.items.map((item) => {
                  const id = `${group.id}-${item.q.slice(0, 24)}`;
                  const expanded = open === id;
                  return (
                    <div key={item.q}>
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(expanded ? null : id)}
                          aria-expanded={expanded}
                          className="flex w-full items-start gap-4 px-6 py-5 text-left transition-colors hover:bg-foreground/[0.03]"
                        >
                          <span
                            className={cn(
                              "mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border transition-colors",
                              expanded
                                ? "border-primary/40 bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground",
                            )}
                          >
                            {expanded ? (
                              <Minus className="size-3.5" />
                            ) : (
                              <Plus className="size-3.5" />
                            )}
                          </span>
                          <span
                            className={cn(
                              "text-sm font-semibold leading-relaxed transition-colors sm:text-base",
                              expanded && "text-primary",
                            )}
                          >
                            {item.q}
                          </span>
                        </button>
                      </h3>
                      <div
                        className={cn(
                          "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="px-6 pb-6 pl-16 text-sm leading-relaxed text-muted-foreground">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
