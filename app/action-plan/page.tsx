import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/site/reveal";
import { Bullets, CTA, PageHero, Panel, SectionHeading } from "@/components/site/kit";
import { actionPlan } from "@/lib/data/charter";

export const metadata: Metadata = pageMetadata({
  title: "8-Point Action Plan",
  description:
    "NFVCB's strategic blueprint for transforming Nigeria's film regulatory landscape — eight action points, objectives and strategies.",
  path: "/action-plan",
});

export default function ActionPlanPage() {
  return (
    <>
      <PageHero
        eyebrow="Strategy"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "8-Point Action Plan", href: "/action-plan" },
        ]}
        title={
          <>
            The <span className="text-gradient">8-Point Action Plan</span>
          </>
        }
        lead="NFVCB's strategic blueprint for transforming Nigeria's film regulatory landscape — empowering industry, protecting communities, and promoting excellence."
      />

      {/* Index */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading eyebrow="At a glance" title="Eight action points" />
          <ol className="mt-12 grid gap-3 sm:grid-cols-2">
            {actionPlan.map((a, i) => (
              <Reveal as="li" key={a.no} delay={i * 55}>
                <a
                  href={`#point-${a.no}`}
                  className="group flex h-full items-center gap-5 rounded-2xl border border-border bg-card/60 p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 font-heading font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {a.no}
                  </span>
                  <span className="text-sm font-semibold leading-snug">{a.title}</span>
                </a>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Details */}
      {actionPlan.map((a, i) => (
        <section
          key={a.no}
          id={`point-${a.no}`}
          className={
            i % 2 === 0
              ? "scroll-mt-28 border-t border-border py-14 sm:py-20"
              : "scroll-mt-28 border-t border-border bg-surface py-14 sm:py-20"
          }
        >
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <span className="font-heading text-6xl font-bold tabular-nums text-primary/25 sm:text-7xl">
                  {String(a.no).padStart(2, "0")}
                </span>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  Action Point {a.no}
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold leading-tight sm:text-3xl">
                  {a.title}
                </h2>
              </div>
            </Reveal>

            <div className="space-y-5">
              <Reveal delay={90}>
                <Panel>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                    Objective
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {a.objective}
                  </p>
                </Panel>
              </Reveal>
              <Reveal delay={150}>
                <Panel>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                    Strategies
                  </p>
                  <div className="mt-5">
                    <Bullets items={a.strategies} accent="gold" />
                  </div>
                </Panel>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-border section-y">
        <div className="container-x flex flex-col gap-3 sm:flex-row">
          <CTA href="/about/vision">Vision &amp; strategic goals</CTA>
          <CTA href="/service-charter" variant="ghost">
            Service Charter
          </CTA>
        </div>
      </section>
    </>
  );
}
