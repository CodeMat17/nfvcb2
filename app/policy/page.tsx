import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/site/reveal";
import {
  Bullets,
  CTA,
  Callout,
  NumberedItem,
  PageHero,
  Panel,
  SectionHeading,
} from "@/components/site/kit";
import {
  censorshipCriteria,
  mainConsiderations,
  ratings,
  regulations2025,
  ratingStyle,
} from "@/lib/data/classification";

export const metadata: Metadata = pageMetadata({
  title: "Film Censorship & Classification Policy",
  description:
    "The philosophy, legal basis and criteria behind NFVCB censorship and classification decisions, including the 2025 exhibition regulations.",
  path: "/policy",
});

export default function PolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Regulation"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Policy", href: "/policy" }]}
        title={
          <>
            Freedom to choose, <span className="text-gradient">protection where it counts</span>
          </>
        }
        lead="Classification gives adults a wider range of films dealing with the realities of the adult world, while restricting children and youth from viewing what could harm them."
      />

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              In an ethnic and religious society like Nigeria, the censorship and classification of
              films into varying categories not only allows adults the opportunity to see a wider
              range of films dealing with the realities of the adult world, but at the same time
              restricts children and youth from viewing what could be harmful to them — this is
              besides ensuring that other kinds of objectionable materials capable of inciting civil
              strife are reduced or eliminated completely.
            </p>
            <p>
              The classification system serves two different functions: first, it lays down a set of
              legally enforceable rules to restrict admission and access to adult films by minors.
              On the other hand, it offers parents advance information about the suitability of the
              film so that parents can make informed decisions about what to let their children
              watch.
            </p>
            <p className="text-foreground">
              The Board abides at all times with the legal instruments that established it — the
              NFVCB Act 85 of 1993 (Cap N40 LFN 2004) — which lays out specific criteria for the
              censorship of films and video works. In line with global best practices and under
              section 2(e) of the NFVCB Act, the Board has also established clear guidelines for
              censorship and classification.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <Panel className="sheen">
              <p className="eyebrow">Classification ratings</p>
              <div className="mt-6 space-y-3">
                {ratings.map((r) => (
                  <div key={r.code} className="flex items-center gap-4">
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-lg border font-heading text-sm font-bold"
                      style={ratingStyle(r.tone)}
                    >
                      {r.code}
                    </span>
                    <span className="text-sm text-muted-foreground">{r.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 border-t border-border pt-6">
                <CTA href="/classification" variant="ghost" className="w-full">
                  Full rating details
                </CTA>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      {/* 2025 Regulations */}
      <section className="border-y border-border bg-surface section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="2025"
            title="New policies for film & video exhibition"
            lead="In exercise of the powers conferred by Section 65 of the NFVCB Act 1993 and with the approval of the Honourable Minister of Art, Culture, Tourism and the Creative Economy, the Board has issued updated Regulations and Scale of Charges for Film Distribution and Exhibition 2025."
          />

          <Reveal delay={140} className="mt-12">
            <Panel>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">
                These regulations govern
              </p>
              <ul className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2">
                {regulations2025.map((r) => (
                  <li key={r} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-primary" />
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-7 sm:flex-row">
                <CTA href="/services/licensing">Full requirements &amp; fees</CTA>
                <a
                  href="mailto:nfvcb_ldd@nfvcb.gov.ng"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-foreground/[0.04] px-6 text-sm font-semibold transition-colors hover:bg-foreground/[0.08]"
                >
                  nfvcb_ldd@nfvcb.gov.ng
                </a>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      {/* Considerations */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Decision framework"
            title="Four main considerations"
            lead="Every classification decision begins with these four questions."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {mainConsiderations.map((c, i) => (
              <Reveal key={c} delay={i * 90}>
                <Panel hover className="h-full">
                  <NumberedItem n={i + 1} accent="gold">
                    <span className="text-base text-foreground/90">{c}</span>
                  </NumberedItem>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Criteria */}
      <section className="border-t border-border section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Section 37, Decree No.85 of 1993"
              title="Censorship criteria"
              lead="The Censors and Classification Committee, in reaching a decision on a film or video work, shall ensure that:"
            />
          </div>
          <Reveal delay={120}>
            <Panel>
              <Bullets items={censorshipCriteria} />
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-x">
          <Reveal>
            <Callout title="Board's power to reject" tone="danger">
              The Board shall not classify material which it believes to be in breach of the
              criminal law. Where possible the Board will carry out its responsibilities through
              appropriate use of the classification categories, particularly in order to protect
              children from actual or potential harm. If necessary, however, the Board may cut or
              even reject a film, video, DVD or digital work. The Board&rsquo;s approach to rejects
              is set out in the Classification Guidelines.
            </Callout>
          </Reveal>
          <Reveal delay={140} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTA href="/classification">Classification &amp; fees</CTA>
            <CTA href="/law-enforcement" variant="ghost">
              Law enforcement
            </CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
