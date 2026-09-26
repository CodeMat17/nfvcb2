import type { Metadata } from "next";
import { ProfilePhoto } from "@/components/site/profile-photo";
import { Reveal } from "@/components/site/reveal";
import { CTA, PageHero, Panel, Quote, SectionHeading } from "@/components/site/kit";
import { getExecutiveDirector, type ProfileEntry as Entry } from "@/lib/convex-server";
import { pageMetadata } from "@/lib/seo";

// The profile is authored in Convex; revalidate so CMS edits appear without a redeploy.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const ed = await getExecutiveDirector();
  return pageMetadata({
    title: `Executive Director — ${ed.shortName}`,
    description: `Profile of ${ed.shortName}, ${ed.role} of the National Film and Video Censors Board (NFVCB), Nigeria.`,
    path: "/about/management/executive-director",
    keywords: ["Dr Shaibu Husseini", "NFVCB director general", "NFVCB executive director"],
  });
}

function EntryList({ items }: { items: Entry[] }) {
  return (
    <ul className="divide-y divide-border">
      {items.map((e) => (
        <li key={e.title + e.org} className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <p className="font-semibold leading-snug">{e.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{e.org}</p>
          </div>
          {e.note && (
            <span className="shrink-0 text-xs font-medium tabular-nums text-gold">{e.note}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function Block({ title, items, delay = 0 }: { title: string; items: Entry[]; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Panel className="h-full">
        <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{title}</h3>
        <div className="mt-6">
          <EntryList items={items} />
        </div>
      </Panel>
    </Reveal>
  );
}

export default async function EDPage() {
  const ed = await getExecutiveDirector();

  return (
    <>
      <PageHero
        eyebrow="Office of the Executive Director"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Management", href: "/about/management" },
          { label: "Executive Director", href: "/about/management/executive-director" },
        ]}
        title={ed.name}
        lead={ed.role}
      >
        <ul className="flex flex-wrap gap-2">
          {ed.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {h}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Profile */}
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <ProfilePhoto
                name={ed.shortName}
                imageUrl={ed.imageUrl}
                className="rounded-3xl"
                initialsClassName="text-7xl"
              />
              <dl className="mt-8 space-y-5 text-sm">
                {[
                  ["Post-nominals", ed.postNominals],
                  ...ed.appointment.map((a) => [a.label, a.value]),
                  ["Correspondence", ed.email],
                  ["Head office", ed.headOffice],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                  <div key={k} className="border-t border-border pt-4">
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {k}
                    </dt>
                    <dd className="mt-1.5 font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <div>
            <Reveal className="space-y-6 text-base leading-relaxed text-muted-foreground">
              {ed.bio.map((para) => (
                <p key={para.slice(0, 30)}>{para}</p>
              ))}
            </Reveal>

            <Reveal delay={140} className="mt-12">
              <Quote
                cite={
                  <>
                    <span className="block font-semibold text-foreground">{ed.shortName}</span>
                    On the Board&rsquo;s strategy
                  </>
                }
              >
                {ed.vision}
              </Quote>
            </Reveal>

            <Reveal delay={180} className="mt-12">
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
                Areas of expertise
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {ed.expertise.map((x) => (
                  <li
                    key={x}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Achievements at NFVCB */}
      <section className="border-t border-border bg-surface section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Since March 2024"
            title="Key achievements at NFVCB"
            lead="How the Board has changed under the current Executive Director."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ed.achievements.map((a, i) => (
              <Reveal key={a.title} delay={(i % 4) * 90}>
                <Panel hover className="h-full">
                  <span className="font-heading text-3xl font-bold tabular-nums text-primary/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold">{a.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="border-t border-border section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Background"
            title="Scholar, critic, cultural administrator"
            lead="More than three decades across journalism, the academy, the performing arts and film."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Block title="Career" items={ed.career} />
            <Block title="Film industry leadership" items={ed.industryRoles} delay={100} />
            <Block title="Education" items={ed.education} />
            <div className="grid gap-5">
              <Block title="International leadership programmes" items={ed.programmes} delay={100} />
              <Block title="Awards & honours" items={ed.awards} delay={140} />
              <Block title="Publications" items={ed.publications} delay={180} />
            </div>
          </div>
        </div>
      </section>

      {/* In his words */}
      <section className="border-t border-border bg-surface section-y">
        <div className="container-x">
          <SectionHeading eyebrow="In his words" title="Notable remarks" />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {ed.quotes.map((q, i) => (
              <Reveal key={q.context} delay={i * 100}>
                <Panel className="flex h-full flex-col">
                  <p className="text-pretty text-base font-medium leading-relaxed">
                    &ldquo;{q.text}&rdquo;
                  </p>
                  <p className="mt-auto pt-6 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {q.context}
                  </p>
                </Panel>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-12">
            <Quote
              cite={
                <>
                  <span className="block font-semibold text-foreground">{ed.shortName}</span>
                  Foreword to the NFVCB Service Charter
                </>
              }
            >
              {ed.foreword}
            </Quote>
          </Reveal>

          <Reveal delay={200} className="mt-12 flex flex-col gap-3 sm:flex-row">
            <CTA href="/service-charter">Read the Service Charter</CTA>
            <CTA href="/action-plan" variant="ghost">
              The 8-Point Action Plan
            </CTA>
            <CTA href="/about/management" variant="ghost">
              Back to management
            </CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
