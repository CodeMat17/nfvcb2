import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Download, FileText } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { CTA, Callout, PageHero, SectionHeading } from "@/components/site/kit";
import { formGroups } from "@/lib/data/licensing";

export const metadata: Metadata = pageMetadata({
  title: "Downloadable Forms",
  description:
    "Download NFVCB application forms for classification, licensing, permits and reference documents in PDF format.",
  path: "/services/forms",
});

export default function FormsPage() {
  const total = formGroups.reduce((n, g) => n + g.forms.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Forms", href: "/services/forms" },
        ]}
        title={
          <>
            Downloadable <span className="text-gradient">forms</span>
          </>
        }
        lead={`Download the appropriate form for your submission or application. All ${total} forms are in PDF format.`}
      />

      <section className="section-y">
        <div className="container-x space-y-16">
          {formGroups.map((group, gi) => (
            <div key={group.category}>
              <SectionHeading
                eyebrow={`${group.forms.length} ${group.forms.length === 1 ? "form" : "forms"}`}
                title={group.category}
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.forms.map((f, i) => (
                  <Reveal key={f.title} delay={gi * 40 + i * 70}>
                    <article className="group flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:bg-card">
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive">
                          <FileText className="size-5" />
                        </span>
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          PDF
                        </span>
                      </div>

                      <h3 className="mt-6 flex-1 text-sm font-semibold leading-relaxed">
                        {f.title}
                      </h3>

                      <a
                        href={encodeURI(f.file)}
                        download
                        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-foreground/[0.04] text-sm font-semibold transition-all group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <Download className="size-4" />
                        Download
                      </a>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border section-y">
        <div className="container-x grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Callout title="Before you submit" tone="primary">
              Complete the appropriate form for your content type, pay the applicable fee via RevOP,
              and submit the form, a copy of the work and your payment receipt to the nearest NFVCB
              office.
            </Callout>
          </Reveal>
          <Reveal delay={110}>
            <Callout title="Need the fee schedule?" tone="gold">
              Classification fees depend on runtime and language, with a 30% surcharge for works
              intended for public exhibition. See the full schedule on the Classification page.
            </Callout>
          </Reveal>
        </div>

        <div className="container-x mt-10 flex flex-col gap-3 sm:flex-row">
          <CTA href="/classification">View classification fees</CTA>
          <CTA href="/services/payments" variant="ghost">
            RevOP payment guide
          </CTA>
        </div>
      </section>
    </>
  );
}
