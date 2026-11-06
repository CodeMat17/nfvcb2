import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin, Mic2, Radio, Ticket, UserRound } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { CTA, Eyebrow, Panel, SectionHeading } from "@/components/site/kit";
import { ShareBar } from "@/components/site/share-menu";
import { EventCountdown } from "@/components/site/event-countdown";
import {
  getEvent,
  getEventSlugs,
  type EventPerson,
  type EventSession,
  type EventUpdate,
} from "@/lib/convex-server";
import {
  eventDays,
  eventStatus,
  formatDateRange,
  formatDayLong,
  formatTime,
  lagosDayStart,
  mapsUrl,
  roleOrder,
  rolePlural,
} from "@/lib/events";
import { jsonLd, pageMetadata, siteName, siteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

// Static until the CMS changes it (on-demand revalidation, see lib/revalidation.ts);
// the daily timer is only a backstop.
export const revalidate = 86400;
export const dynamicParams = true;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = await getEvent(slug);
  if (!data) return { title: "Event not found", robots: { index: false } };
  const { event } = data;
  const when = formatDateRange(event.startDate, event.endDate);
  return pageMetadata({
    title: event.title,
    description:
      [event.fullName, event.theme].filter(Boolean).join(" — ") ||
      `${event.title}, ${when} at ${event.venue}. Speakers, programme and live updates.`,
    path: `/events/${event.slug}`,
    image: event.bannerUrl ?? undefined,
  });
}

function paragraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function postedTime(ms: number) {
  return new Date(ms).toLocaleString("en-GB", {
    timeZone: "Africa/Lagos",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

/* ------------------------------------------------------------------ Pieces */

function StatusPill({ status }: { status: ReturnType<typeof eventStatus> }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-destructive">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-destructive" />
        </span>
        Happening now
      </span>
    );
  }
  if (status === "ended") {
    return (
      <span className="inline-flex rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Concluded
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
      Upcoming
    </span>
  );
}

function Poster({ person, large }: { person: EventPerson; large?: boolean }) {
  const sizes = large
    ? "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
    : "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";
  return (
    <figure className="group card-surface flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-2xl hover:shadow-[color:var(--shadow-tint)]">
      {person.posterUrl ? (
        person.posterWidth && person.posterHeight ? (
          <Image
            src={person.posterUrl}
            alt={`${person.name} — ${person.role}`}
            width={person.posterWidth}
            height={person.posterHeight}
            sizes={sizes}
            className="h-auto w-full"
          />
        ) : (
          <div className="relative aspect-[4/5] w-full bg-surface">
            <Image
              src={person.posterUrl}
              alt={`${person.name} — ${person.role}`}
              fill
              sizes={sizes}
              className="object-contain"
            />
          </div>
        )
      ) : (
        <div className="grid aspect-[4/5] w-full place-items-center bg-gradient-to-br from-primary/15 via-surface to-gold/10">
          <UserRound className="size-14 text-muted-foreground/60" />
        </div>
      )}
      <figcaption className="flex flex-1 flex-col border-t border-border p-4 sm:p-5">
        <p className={cn("font-heading font-bold leading-snug", large ? "text-lg sm:text-xl" : "text-base")}>
          {person.name}
        </p>
        {person.title && (
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{person.title}</p>
        )}
      </figcaption>
    </figure>
  );
}

function Guests({ people }: { people: EventPerson[] }) {
  const known = new Set(roleOrder);
  const roles = [...roleOrder, ...new Set(people.map((p) => p.role).filter((r) => !known.has(r)))];
  const groups = roles
    .map((role) => ({ role, items: people.filter((p) => p.role === role) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="mt-12 space-y-14">
      {groups.map((g) => {
        const large = g.role === "Special Guest" || g.role === "Keynote Speaker";
        return (
          <div key={g.role}>
            <Reveal>
              <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="h-px w-6 bg-gold/70" />
                {rolePlural(g.role, g.items.length)}
              </h3>
            </Reveal>
            <div
              className={cn(
                "mt-6 grid items-start gap-5",
                large ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
              )}
            >
              {g.items.map((p, i) => (
                <Reveal key={p._id} delay={(i % 4) * 70} className="h-full">
                  <Poster person={p} large={large} />
                </Reveal>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Programme({ days, sessions }: { days: string[]; sessions: EventSession[] }) {
  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-2">
      {days.map((day, i) => {
        const items = sessions.filter((s) => s.day === day);
        if (items.length === 0) return null;
        return (
          <Reveal key={day} delay={i * 80}>
            <Panel className="h-full">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">Day {i + 1}</p>
              <h3 className="mt-1 font-heading text-xl font-bold">{formatDayLong(day)}</h3>
              <ol className="mt-6 space-y-5 border-l border-border pl-5">
                {items.map((s) => (
                  <li key={s._id} className="relative">
                    <span className="absolute -left-[1.6rem] top-1.5 size-2.5 rounded-full border-2 border-background bg-primary" />
                    <p className="flex items-center gap-1.5 text-xs font-semibold tabular-nums text-muted-foreground">
                      <Clock className="size-3.5 text-primary" />
                      {formatTime(s.startTime)}
                      {s.endTime && ` – ${formatTime(s.endTime)}`}
                    </p>
                    <p className="mt-1 font-semibold leading-snug">{s.title}</p>
                    {s.speakers && (
                      <p className="mt-1 flex gap-1.5 text-sm text-muted-foreground">
                        <Mic2 className="mt-0.5 size-3.5 shrink-0 text-gold" />
                        {s.speakers}
                      </p>
                    )}
                    {s.description && (
                      <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </Panel>
          </Reveal>
        );
      })}
    </div>
  );
}

function Updates({ updates }: { updates: EventUpdate[] }) {
  return (
    <ol className="mt-10 space-y-5">
      {updates.map((u, i) => (
        <Reveal as="li" key={u._id} delay={Math.min(i, 3) * 60}>
          <article className="card-surface overflow-hidden sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            {u.imageUrl && (
              <div className="relative aspect-video bg-surface sm:aspect-auto sm:min-h-full">
                <Image
                  src={u.imageUrl}
                  alt={u.title ?? ""}
                  fill
                  sizes="(min-width: 640px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className={cn("p-6 sm:p-7", !u.imageUrl && "sm:col-span-2")}>
              <time
                dateTime={new Date(u.postedAt).toISOString()}
                className="text-xs font-semibold text-primary"
              >
                {postedTime(u.postedAt)}
              </time>
              {u.title && <h3 className="mt-2 font-heading text-lg font-bold leading-snug">{u.title}</h3>}
              <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {paragraphs(u.body).map((p, j) => (
                  <p key={j} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </ol>
  );
}

/* -------------------------------------------------------------------- Page */

export default async function EventPage({ params }: Params) {
  const { slug } = await params;
  const data = await getEvent(slug);
  if (!data) notFound();

  const { event, people, sessions, updates } = data;
  const status = eventStatus(event);
  const when = formatDateRange(event.startDate, event.endDate);
  const days = eventDays(event.startDate, event.endDate);
  const path = `/events/${event.slug}`;
  const canRegister = Boolean(event.registrationUrl) && status !== "ended";

  // Count down to the first session if the programme is in, else 9 AM day one.
  const firstSession = sessions.find((s) => s.day === event.startDate);
  const startsAt =
    lagosDayStart(event.startDate) +
    (firstSession
      ? (Number(firstSession.startTime.slice(0, 2)) * 60 + Number(firstSession.startTime.slice(3, 5))) * 60_000
      : 9 * 3_600_000);

  const sections = [
    updates.length > 0 && { id: "updates", label: status === "ended" ? "Highlights" : "Live updates" },
    event.description && { id: "about", label: "About" },
    people.length > 0 && { id: "guests", label: "Speakers & guests" },
    sessions.length > 0 && { id: "programme", label: "Programme" },
    { id: "venue", label: "Venue" },
  ].filter(Boolean) as { id: string; label: string }[];

  const updatesSection = updates.length > 0 && (
    <section id="updates" className="section-y scroll-mt-24">
      <div className="container-x max-w-4xl">
        <SectionHeading
          eyebrow={status === "live" ? "Live from the venue" : status === "ended" ? "Highlights" : "Updates"}
          title={status === "ended" ? "How it happened" : "Latest from the event"}
        />
        <Updates updates={updates} />
      </div>
    </section>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "Event",
          name: event.fullName ? `${event.title} — ${event.fullName}` : event.title,
          ...(event.description && { description: paragraphs(event.description)[0] }),
          startDate: event.startDate,
          endDate: event.endDate,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: event.venue,
            address: event.address ?? event.venue,
          },
          ...(event.bannerUrl && { image: [event.bannerUrl] }),
          organizer: { "@type": "Organization", name: siteName, url: siteUrl },
          ...(people.length > 0 && {
            performer: people.map((p) => ({ "@type": "Person", name: p.name })),
          }),
          url: `${siteUrl}${path}`,
        })}
      />

      {/* ---------------------------------------------------------- Hero */}
      <header className="relative isolate overflow-hidden grain">
        <div className="absolute inset-0 -z-10 spotlight" />
        <div
          className="grid-overlay absolute inset-0 -z-10 opacity-[0.16]"
          style={{
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(70% 70% at 50% 0%, black, transparent)",
            WebkitMaskImage: "radial-gradient(70% 70% at 50% 0%, black, transparent)",
          }}
        />
        <div className="container-x pb-14 pt-28 sm:pb-20 sm:pt-36">
          <Reveal eager className="mb-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <li>
                  <Link href="/" className="transition-colors hover:text-primary">
                    Home
                  </Link>
                </li>
                <li aria-hidden className="text-foreground/20">/</li>
                <li>
                  <Link href="/events" className="transition-colors hover:text-primary">
                    Events
                  </Link>
                </li>
                <li aria-hidden className="text-foreground/20">/</li>
                <li aria-current="page" className="text-foreground/70">
                  {event.title}
                </li>
              </ol>
            </nav>
          </Reveal>

          <div
            className={cn(
              "grid items-center gap-10 lg:gap-14",
              event.bannerUrl && "lg:grid-cols-[1.1fr_0.9fr]",
            )}
          >
            <div className="min-w-0">
              <Reveal eager className="flex flex-wrap items-center gap-3">
                <StatusPill status={status} />
                {event.edition && <Eyebrow>{event.edition}</Eyebrow>}
              </Reveal>
              <Reveal eager delay={80}>
                <h1 className="mt-5 break-words text-4xl font-black leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="text-gradient">{event.title}</span>
                </h1>
              </Reveal>
              {event.fullName && (
                <Reveal eager delay={130}>
                  <p className="mt-4 max-w-2xl text-lg font-semibold leading-snug sm:text-xl">{event.fullName}</p>
                </Reveal>
              )}
              {event.theme && (
                <Reveal eager delay={170}>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    <span className="font-semibold text-foreground">Theme: </span>
                    {event.theme}
                  </p>
                </Reveal>
              )}

              <Reveal eager delay={210}>
                <dl className="mt-7 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-8">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="size-4 shrink-0 text-primary" />
                    <dt className="sr-only">Date</dt>
                    <dd className="font-semibold">{when}</dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                    <dt className="sr-only">Venue</dt>
                    <dd className="font-semibold">
                      {event.venue}
                      {event.address && (
                        <span className="font-normal text-muted-foreground">, {event.address}</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </Reveal>

              {status === "upcoming" && (
                <Reveal eager delay={250}>
                  <EventCountdown startsAt={startsAt} className="mt-8" />
                </Reveal>
              )}

              <Reveal eager delay={290} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {canRegister && (
                  <CTA href={event.registrationUrl!} variant="gold" external>
                    <Ticket className="size-4" /> Register to attend
                  </CTA>
                )}
                {status === "live" && updates.length > 0 && (
                  <CTA href="#updates" variant={canRegister ? "ghost" : "primary"}>
                    <Radio className="size-4" /> Follow live updates
                  </CTA>
                )}
                {status !== "live" && sessions.length > 0 && (
                  <CTA href="#programme" variant="ghost">
                    View programme
                  </CTA>
                )}
              </Reveal>
              {canRegister && (
                <Reveal eager delay={320}>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Register to be invited to attend.
                  </p>
                </Reveal>
              )}
            </div>

            {event.bannerUrl && (
              <Reveal eager delay={160}>
                <div className="card-surface overflow-hidden p-2 shadow-2xl shadow-[color:var(--shadow-tint)]">
                  {event.bannerWidth && event.bannerHeight ? (
                    <Image
                      src={event.bannerUrl}
                      alt={`${event.title} flyer`}
                      width={event.bannerWidth}
                      height={event.bannerHeight}
                      priority
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="h-auto w-full rounded-xl"
                    />
                  ) : (
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={event.bannerUrl}
                        alt={`${event.title} flyer`}
                        fill
                        priority
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="rounded-xl object-contain"
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            )}
          </div>
        </div>

        {sections.length > 1 && (
          <nav aria-label="On this page" className="border-t border-border">
            <div className="container-x flex gap-1 overflow-x-auto py-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
        )}
        <div className="hairline h-px w-full" />
      </header>

      {/* During and after the event, updates lead the page. */}
      {status !== "upcoming" && updatesSection}

      {event.description && (
        <section id="about" className="section-y scroll-mt-24">
          <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading eyebrow="About the event" title={event.fullName ?? event.title} />
            <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {paragraphs(event.description).map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {people.length > 0 && (
        <section id="guests" className="relative isolate scroll-mt-24 border-y border-border bg-surface section-y">
          <div className="container-x">
            <SectionHeading
              eyebrow="Who's speaking"
              title="Special guests, speakers & panelists"
              lead={`${people.length} distinguished ${people.length === 1 ? "guest" : "guests"} join ${event.title}.`}
            />
            <Guests people={people} />
          </div>
        </section>
      )}

      {sessions.length > 0 && (
        <section id="programme" className="section-y scroll-mt-24">
          <div className="container-x">
            <SectionHeading eyebrow="Programme" title="Order of events" lead="Times are in West Africa Time (WAT)." />
            <Programme days={days} sessions={sessions} />
          </div>
        </section>
      )}

      {status === "upcoming" && updatesSection}

      {/* --------------------------------------------------------- Venue */}
      <section id="venue" className="section-y scroll-mt-24">
        <div className="container-x">
          <Reveal>
            <Panel className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <Eyebrow>Venue</Eyebrow>
                <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">{event.venue}</h2>
                {event.address && <p className="mt-2 text-muted-foreground">{event.address}</p>}
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays className="size-4 text-primary" />
                  {when}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {canRegister && (
                    <CTA href={event.registrationUrl!} variant="gold" external>
                      Register to attend
                    </CTA>
                  )}
                  <CTA href={mapsUrl(event.venue, event.address)} variant="ghost" external>
                    Get directions
                  </CTA>
                </div>
              </div>
              <ShareBar title={event.title} path={path} className="lg:justify-end" />
            </Panel>
          </Reveal>
        </div>
      </section>
    </>
  );
}
