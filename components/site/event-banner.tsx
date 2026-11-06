import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import type { EventSummary } from "@/lib/convex-server";
import { eventStatus, formatDateRange } from "@/lib/events";
import { CTA } from "./kit";
import { Reveal } from "./reveal";
import { YouTubePlayer } from "./youtube-player";

/** Homepage promo for the current featured event; hidden once it has ended. */
export function EventBanner({ event }: { event: EventSummary }) {
  const status = eventStatus(event);
  if (status === "ended") return null;
  const href = `/events/${event.slug}`;
  const video = event.youtubeId;
  const actions = <Actions event={event} status={status} href={href} />;

  return (
    <section
      aria-label={`${event.title} announcement`}
      className="pb-4 pt-10 sm:pt-14"
    >
      <div className="container-x">
        <Reveal>
          <div className="card-surface sheen relative overflow-hidden border-gold/30 p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-gold/15 blur-3xl" />
            <div
              className={
                video
                  ? "relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center lg:gap-10"
                  : "relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
              }
            >
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
                  {status === "live" ? (
                    <>
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive opacity-60" />
                        <span className="relative inline-flex size-2 rounded-full bg-destructive" />
                      </span>
                      <span className="text-destructive">Happening now</span>
                    </>
                  ) : (
                    <>Upcoming event{event.edition && ` · ${event.edition}`}</>
                  )}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-bold leading-tight sm:text-3xl">
                  <Link
                    href={href}
                    className="transition-colors hover:text-primary"
                  >
                    {event.title}
                  </Link>
                </h2>
                {event.fullName && (
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {event.fullName}
                  </p>
                )}
                <div className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
                  <span className="flex items-center gap-2 font-semibold">
                    <CalendarDays className="size-4 text-primary" />
                    {formatDateRange(event.startDate, event.endDate)}
                  </span>
                  <span className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    {[event.venue, event.address].filter(Boolean).join(", ")}
                  </span>
                </div>
                {video && <div className="mt-6">{actions}</div>}
              </div>
              {video ? (
                <YouTubePlayer id={video} title={`${event.title} video`} />
              ) : (
                actions
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Actions({
  event,
  status,
  href,
}: {
  event: EventSummary;
  status: ReturnType<typeof eventStatus>;
  href: string;
}) {
  return (
    <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
      {event.registrationUrl && status === "upcoming" && (
        <CTA href={event.registrationUrl} variant="gold" external>
          Register
        </CTA>
      )}
      <Link
        href={href}
        className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-foreground/[0.04] px-6 text-sm font-semibold transition-colors hover:bg-foreground/[0.08]"
      >
        {status === "live" ? "Live updates" : "Speakers & programme"}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
