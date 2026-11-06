"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const UNITS = [
  ["Days", 86_400_000],
  ["Hours", 3_600_000],
  ["Minutes", 60_000],
  ["Seconds", 1000],
] as const;

/**
 * Countdown to an epoch-ms start time. Renders dashes on the server and
 * fills in after hydration, so the markup never mismatches.
 */
export function EventCountdown({ startsAt, className }: { startsAt: number; className?: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const left = now === null ? null : Math.max(0, startsAt - now);

  if (left === 0) {
    return (
      <p className={cn("text-sm font-semibold text-primary", className)}>
        The event is under way — follow the live updates below.
      </p>
    );
  }

  return (
    <div className={cn("flex gap-2 sm:gap-3", className)} role="timer" aria-label="Time until the event starts">
      {UNITS.map(([label, ms], i) => {
        // Remainder after the larger units, then whole units of this one.
        const above = i === 0 ? Infinity : UNITS[i - 1][1];
        const value = Math.floor(((left ?? 0) % above) / ms);
        return (
          <div
            key={label}
            className="min-w-16 rounded-2xl border border-border bg-foreground/[0.04] px-3 py-2.5 text-center backdrop-blur sm:min-w-20"
          >
            <p className="font-heading text-2xl font-bold tabular-nums sm:text-3xl" suppressHydrationWarning>
              {left === null ? "––" : String(value).padStart(2, "0")}
            </p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
