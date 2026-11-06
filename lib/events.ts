/**
 * Date helpers for event pages. Event dates are stored as Lagos calendar days
 * (YYYY-MM-DD) and Lagos is UTC+1 all year (no daylight saving).
 */

const LAGOS_OFFSET_MS = 60 * 60 * 1000;

export type EventStatus = "upcoming" | "live" | "ended";

export function lagosToday(now = Date.now()): string {
  return new Date(now + LAGOS_OFFSET_MS).toISOString().slice(0, 10);
}

export function eventStatus(
  e: { startDate: string; endDate: string },
  now = Date.now(),
): EventStatus {
  const today = lagosToday(now);
  if (today < e.startDate) return "upcoming";
  if (today > e.endDate) return "ended";
  return "live";
}

/** Midnight Lagos time at the start of a YYYY-MM-DD day, as epoch ms. */
export function lagosDayStart(day: string): number {
  return Date.parse(`${day}T00:00:00+01:00`);
}

function asDate(day: string) {
  // Noon UTC keeps the calendar day stable in any formatting timezone.
  return new Date(`${day}T12:00:00Z`);
}

/** "18 – 19 November 2026", "30 Nov – 1 Dec 2026" or "18 November 2026". */
export function formatDateRange(start: string, end: string): string {
  const s = asDate(start);
  const e = asDate(end);
  const opts = { timeZone: "UTC" } as const;
  const dayOf = (d: Date) => d.toLocaleDateString("en-GB", { ...opts, day: "numeric" });
  const monthLong = (d: Date) => d.toLocaleDateString("en-GB", { ...opts, month: "long" });
  const year = (d: Date) => d.getUTCFullYear();
  if (start === end) {
    return s.toLocaleDateString("en-GB", { ...opts, day: "numeric", month: "long", year: "numeric" });
  }
  if (s.getUTCFullYear() === e.getUTCFullYear() && s.getUTCMonth() === e.getUTCMonth()) {
    return `${dayOf(s)} – ${dayOf(e)} ${monthLong(e)} ${year(e)}`;
  }
  const short = (d: Date) => d.toLocaleDateString("en-GB", { ...opts, day: "numeric", month: "short" });
  if (year(s) === year(e)) return `${short(s)} – ${short(e)} ${year(e)}`;
  return `${short(s)} ${year(s)} – ${short(e)} ${year(e)}`;
}

/** "Wednesday, 18 November" */
export function formatDayLong(day: string): string {
  return asDate(day).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/** "09:30" → "9:30 AM" */
export function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return t;
  const suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Every YYYY-MM-DD from start to end inclusive. */
export function eventDays(start: string, end: string): string[] {
  const out: string[] = [];
  const d = asDate(start);
  const last = asDate(end);
  while (d <= last && out.length < 31) {
    out.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
}

/** Display order of guest roles; matches EVENT_ROLES in the CMS. */
export const roleOrder = [
  "Special Guest",
  "Keynote Speaker",
  "Speaker",
  "Panelist",
  "Moderator",
  "Host",
];

export function rolePlural(role: string, count: number): string {
  if (count === 1) return role;
  return role.endsWith("s") ? role : `${role}s`;
}

export function mapsUrl(venue: string, address?: string | null): string {
  const q = [venue, address].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
