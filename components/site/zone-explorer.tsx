"use client";

import { useState } from "react";
import { MapPin, Phone, User } from "lucide-react";
import { zones } from "@/lib/data/zones";
import { cn } from "@/lib/utils";

export function ZoneExplorer() {
  const [active, setActive] = useState(zones[0].id);
  const zone = zones.find((z) => z.id === active) ?? zones[0];

  return (
    <div className="mt-12">
      {/* Tabs */}
      <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div
          role="tablist"
          aria-label="Zonal offices"
          className="flex w-max gap-2 rounded-full border border-border bg-foreground/[0.03] p-1.5"
        >
          {zones.map((z) => (
            <button
              key={z.id}
              role="tab"
              aria-selected={z.id === active}
              onClick={() => setActive(z.id)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300",
                z.id === active
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
              )}
            >
              {z.zone.replace(" Zonal Office", "").replace(" (Annex)", "")}
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <div className="mt-10">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-heading text-2xl font-bold sm:text-3xl">{zone.zone}</h3>
          <p className="text-sm text-gold">{zone.location}</p>
        </div>

        <div key={zone.id} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {zone.offices.map((o, i) => (
            <article
              key={o.name}
              className="reveal is-in flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-primary/35 hover:bg-card"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <h4 className="font-heading text-base font-bold">{o.name}</h4>

              {o.officer && (
                <p className="mt-4 flex items-start gap-2.5 text-sm text-foreground/90">
                  <User className="mt-0.5 size-4 shrink-0 text-primary" />
                  {o.officer}
                </p>
              )}

              {o.phone && (
                <a
                  href={`tel:${o.phone}`}
                  className="mt-2.5 flex items-start gap-2.5 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                  {o.phone}
                </a>
              )}

              <p className="mt-4 flex items-start gap-2.5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                {o.address}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
