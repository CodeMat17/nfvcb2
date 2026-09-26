import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AlertTriangle, Gavel, ShieldAlert } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { CTA, Callout, PageHero, Panel, SectionHeading } from "@/components/site/kit";
import { allInfringements, majorInfringements } from "@/lib/data/charter";

export const metadata: Metadata = pageMetadata({
  title: "Law Enforcement",
  description:
    "NFVCB enforces compliance with the NFVCB Act 85 of 1993. Infringements, enforcement operations, and how to report a violation.",
  path: "/law-enforcement",
});

export default function EnforcementPage() {
  return (
    <>
      <PageHero
        eyebrow="Enforcement"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Law Enforcement", href: "/law-enforcement" },
        ]}
        title={
          <>
            Compliance is <span className="text-gradient">not optional</span>
          </>
        }
        lead="NFVCB actively enforces compliance with the NFVCB Act 85 of 1993. Violations lead to arrest, prosecution, and sanctions. The Board's operations team monitors compliance nationwide."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CTA href="/services/licensing">Get licensed</CTA>
          <CTA href="/contact" variant="ghost">
            Report a violation
          </CTA>
        </div>
      </PageHero>

      {/* Major */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Field operations"
            title="Major areas of infringement"
            lead="These are the most commonly detected violations during NFVCB field operations."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {majorInfringements.map((m, i) => (
              <Reveal key={m} delay={i * 80}>
                <Panel hover className="h-full">
                  <span className="grid size-11 place-items-center rounded-xl border border-destructive/30 bg-destructive/10 text-destructive">
                    <AlertTriangle className="size-5" />
                  </span>
                  <p className="mt-5 text-sm leading-relaxed text-foreground/90">{m}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* All */}
      <section className="border-y border-border bg-surface section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow={`${allInfringements.length} infringements`}
            title="All types of infringements"
            lead="Every act below constitutes a violation of the NFVCB Act and is liable to enforcement action."
          />

          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-foreground/[0.06] md:grid-cols-2">
            {allInfringements.map((inf, i) => (
              <Reveal as="li" key={inf} delay={i * 35}>
                <div className="flex h-full items-start gap-4 bg-background/85 p-5 transition-colors hover:bg-background/60">
                  <span className="font-mono text-sm font-bold tabular-nums text-destructive/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{inf}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Consequences */}
      <section className="section-y">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: ShieldAlert,
                title: "Monitoring",
                body: "The Operations Department and zonal offices monitor markets, cinemas, premises and broadcast channels nationwide for unclassified and unlicensed activity.",
              },
              {
                icon: Gavel,
                title: "Prosecution",
                body: "Detected violations lead to arrest and prosecution. The Legal Department pursues offenders under the NFVCB Act 85 of 1993.",
              },
              {
                icon: AlertTriangle,
                title: "Sanctions",
                body: "Sanctions may include seizure of materials, closure of unlicensed premises, revocation of licences, and penalties prescribed by law.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <Panel hover className="h-full">
                  <span className="grid size-12 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                    <c.icon className="size-6" />
                  </span>
                  <h3 className="mt-6 font-heading text-lg font-bold">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </Panel>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-10">
            <Callout title="Stay on the right side of the law" tone="danger">
              It is illegal to distribute or exhibit any film or video work not classified by the
              NFVCB, and illegal to distribute films and video works without a distributor&rsquo;s
              licence. Classify your work, obtain the correct licence, and trade with confidence.
            </Callout>
          </Reveal>

          <Reveal delay={260} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTA href="/classification">Classify your work</CTA>
            <CTA href="/services/licensing" variant="ghost">
              Apply for a licence
            </CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
