import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Clapperboard, FileDown, ScrollText } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { CTA, Callout, NumberedItem, PageHero, Panel, SectionHeading } from "@/components/site/kit";
import { submissionSteps } from "@/lib/data/licensing";

export const metadata: Metadata = pageMetadata({
  title: "Film Classification & Licensing Services",
  description:
    "Film classification, exhibition and distribution licensing, and downloadable forms from the National Film and Video Censors Board.",
  path: "/services",
});

const services = [
  {
    tag: "Core Service",
    icon: Clapperboard,
    title: "Film Classification & Censorship",
    body: "Submit films, music videos, skits, and video games to NFVCB for classification. All works must be classified before distribution or exhibition in Nigeria.",
    href: "/classification",
  },
  {
    tag: "Licensing",
    icon: ScrollText,
    title: "Exhibition & Distribution Licensing",
    body: "Apply for Exhibitor, Exhibition Premises, Mobile Exhibition, Online Exhibition, or Distributor licences. Five licence categories covering every scale of operation — community to national.",
    href: "/services/licensing",
  },
  {
    tag: "Resources",
    icon: FileDown,
    title: "Downloadable Forms",
    body: "Access and download all forms needed to submit a film, music video, skit or video game to NFVCB for classification. Forms available in PDF format.",
    href: "/services/forms",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
        title={
          <>
            Everything you need to <span className="text-gradient">get to market</span>
          </>
        }
        lead="Classification, licensing and the forms that support both — with published timelines, published fees and offices nationwide."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CTA href="/services/licensing">Browse licence categories</CTA>
          <CTA href="/services/payments" variant="ghost">
            How to pay via RevOP
          </CTA>
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 110}>
                <Link href={s.href} className="block h-full">
                  <Panel hover className="flex h-full flex-col">
                    <span className="self-start rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
                      {s.tag}
                    </span>
                    <span className="mt-6 grid size-12 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                      <s.icon className="size-6" />
                    </span>
                    <h2 className="mt-6 font-heading text-xl font-bold leading-snug">{s.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                    <span className="mt-6 text-sm font-semibold text-primary">Learn more →</span>
                  </Panel>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface section-y">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Step by step"
              title="How to submit for classification"
              lead="Six steps from a finished work to a classification certificate in your hands."
            />
            <Reveal delay={160} className="mt-8">
              <Callout title="NFVCB Business Online — Coming Soon" tone="gold">
                NFVCB plans to launch a full Business Online Application that will make online
                transactions easier for stakeholders — including electronic submission, application
                tracking, and digital certificate download. Watch this space for the launch
                announcement.
              </Callout>
            </Reveal>
          </div>

          <div className="space-y-7">
            {submissionSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <NumberedItem n={i + 1} title={s.title}>
                  {s.body}
                </NumberedItem>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-5 md:grid-cols-3">
          {[
            { k: "20", u: "working days", l: "to classify a valid application" },
            { k: "5", u: "working days", l: "to issue your certificate after a decision" },
            { k: "24", u: "hours", l: "for online classification once payment is confirmed" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 100}>
              <Panel className="h-full">
                <p className="font-heading text-5xl font-bold tabular-nums text-primary">{s.k}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
                  {s.u}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.l}</p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
