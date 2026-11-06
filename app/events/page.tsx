import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { CTA, PageHero, Panel } from "@/components/site/kit";
import { getEvents, type EventSummary } from "@/lib/convex-server";
import { eventStatus, formatDateRange } from "@/lib/events";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Events",
  description:
    "Conferences and industry events organised by the National Film and Video Censors Board: speakers, programmes and live updates.",
  path: "/events",
});

// Static until the CMS changes it (on-demand revalidation, see lib/revalidation.ts);
// the daily timer is only a backstop.
export const revalidate = 86400;

function EventCard({ event, lead }: { event: EventSummary; lead?: boolean }) {
  const status = eventStatus(event);
  return (
    <article
      className={cn(
        "group card-surface relative h-full overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-2xl hover:shadow-[color:var(--shadow-tint)]",
        lead && event.bannerUrl && "grid lg:grid-cols-2",
      )}
    >
      <Link href={`/events/${event.slug}`} className="absolute inset-0 z-10" aria-label={event.title} />
      {event.bannerUrl && (
        // Flyers come in any shape (often portrait), so show the whole image
        // (object-contain) over a blurred, zoomed copy of itself that fills the frame —
        // nothing gets cropped and cards keep a uniform size.
        <div
          className={cn(
            "relative overflow-hidden bg-surface",
            lead ? "aspect-[16/10] lg:aspect-auto lg:min-h-96" : "aspect-[16/10]",
          )}
        >
          <Image
            src={event.bannerUrl}
            alt=""
            aria-hidden
            fill
            sizes="64px"
            className="scale-125 object-cover opacity-60 blur-2xl transition-transform duration-700 group-hover:scale-150"
          />
          <Image
            src={event.bannerUrl}
            alt=""
            fill
            sizes={lead ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
            className="object-contain drop-shadow-xl"
          />
        </div>
      )}
      <div className={cn("flex flex-col p-6", lead && "justify-center sm:p-10")}>
        <span
          className={cn(
            "self-start rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
            status === "live" && "border-destructive/30 bg-destructive/10 text-destructive",
            status === "upcoming" && "border-gold/25 bg-gold/10 text-gold",
            status === "ended" && "border-border text-muted-foreground",
          )}
        >
          {status === "live" ? "Happening now" : status === "upcoming" ? "Upcoming" : "Past event"}
        </span>
        <h2
          className={cn(
            "mt-4 font-heading font-bold leading-tight transition-colors group-hover:text-primary",
            lead ? "text-3xl sm:text-4xl" : "text-xl",
          )}
        >
          {event.title}
        </h2>
        {event.fullName && <p className="mt-2 text-sm font-medium text-muted-foreground">{event.fullName}</p>}
        <div className="mt-5 space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 text-primary" />
            {formatDateRange(event.startDate, event.endDate)}
          </p>
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            {[event.venue, event.address].filter(Boolean).join(", ")}
          </p>
        </div>
        <span className="mt-6 text-sm font-semibold text-primary">
          {status === "ended" ? "See highlights →" : "Speakers & programme →"}
        </span>
      </div>
    </article>
  );
}

export default async function EventsPage() {
  const events = await getEvents();
  // Upcoming / live events first (soonest first), then past events (newest first).
  const current = events
    .filter((e) => eventStatus(e) !== "ended")
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const past = events.filter((e) => eventStatus(e) === "ended");
  const [lead, ...others] = [...current, ...past];

  return (
    <>
      <PageHero
        eyebrow="Events"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
        ]}
        title={
          <>
            Board <span className="text-gradient">events</span>
          </>
        }
        lead="Conferences and industry gatherings convened by the National Film and Video Censors Board — with speakers, programmes and updates from the floor."
      />

      <section className="section-y">
        <div className="container-x">
          {!lead ? (
            <Reveal>
              <Panel className="py-16 text-center">
                <CalendarDays className="mx-auto size-8 text-muted-foreground" />
                <h2 className="mt-5 font-heading text-xl font-bold">No events announced yet</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Upcoming Board events will be announced here.
                </p>
                <div className="mt-8 flex justify-center">
                  <CTA href="/news" variant="ghost">
                    Read the latest news
                  </CTA>
                </div>
              </Panel>
            </Reveal>
          ) : (
            <>
              <Reveal>
                <EventCard event={lead} lead />
              </Reveal>
              {others.length > 0 && (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {others.map((e, i) => (
                    <Reveal key={e._id} delay={i * 70}>
                      <EventCard event={e} />
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
