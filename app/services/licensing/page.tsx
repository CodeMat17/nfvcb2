import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/site/reveal";
import { CTA, Callout, PageHero, Panel, SectionHeading } from "@/components/site/kit";
import { licenceCategories, paymentNote, renewalNote } from "@/lib/data/licensing";

export const metadata: Metadata = pageMetadata({
  title: "Film Distribution & Exhibition Licences in Nigeria",
  description:
    "Distributor, exhibitor, premises, mobile and online exhibition licences — fees, share capital requirements and processing charges.",
  path: "/services/licensing",
});

export default function LicensingPage() {
  return (
    <>
      <PageHero
        eyebrow="Licensing"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Licensing", href: "/services/licensing" },
        ]}
        title={
          <>
            Licence categories for <span className="text-gradient">every scale</span>
          </>
        }
        lead="Browse all licence categories below. Each card shows the licence fee, minimum share capital where applicable, and the processing fee."
      >
        <div className="flex flex-wrap gap-2">
          {licenceCategories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-full border border-border bg-foreground/[0.04] px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {c.title}
            </a>
          ))}
        </div>
      </PageHero>

      {licenceCategories.map((cat, ci) => (
        <section
          key={cat.id}
          id={cat.id}
          className={
            ci % 2 === 1
              ? "scroll-mt-28 border-y border-border bg-surface section-y"
              : "scroll-mt-28 section-y"
          }
        >
          <div className="container-x">
            <SectionHeading
              eyebrow={`${cat.licences.length} licences in this category`}
              title={cat.title}
              lead={cat.blurb}
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.licences.map((l, i) => (
                <Reveal key={l.name} delay={i * 70}>
                  <Panel hover className="flex h-full flex-col">
                    <h3 className="font-heading text-lg font-bold leading-snug">{l.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {l.desc}
                    </p>

                    <div className="mt-7 rounded-xl border border-primary/20 bg-primary/[0.07] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Licence Fee
                      </p>
                      <p className="mt-1.5 font-heading text-2xl font-bold tabular-nums text-primary">
                        {l.fee}
                      </p>
                    </div>

                    <dl className="mt-5 space-y-3 border-t border-border pt-5">
                      {l.meta.map((m) => (
                        <div key={m.label} className="flex items-baseline justify-between gap-3">
                          <dt className="text-xs text-muted-foreground">{m.label}</dt>
                          <dd className="font-mono text-sm font-semibold">{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </Panel>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="renewal" className="scroll-mt-28 border-t border-border section-y">
        <div className="container-x">
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal>
              <Callout title="Licence Renewal" tone="primary">
                {renewalNote}
              </Callout>
            </Reveal>
            <Reveal delay={110}>
              <Callout title="Payment Instructions" tone="gold">
                {paymentNote}
              </Callout>
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-10">
            <Panel className="sheen text-center">
              <p className="text-sm leading-relaxed text-muted-foreground">
                For licensing enquiries, contact{" "}
                <a
                  href="mailto:nfvcb_ldd@nfvcb.gov.ng"
                  className="font-mono font-semibold text-primary hover:text-gold"
                >
                  nfvcb_ldd@nfvcb.gov.ng
                </a>{" "}
                or visit any NFVCB zonal office.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <CTA href="/services/payments">How to pay via RevOP</CTA>
                <CTA href="/about/zones" variant="ghost">
                  Find a zonal office
                </CTA>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>
    </>
  );
}
