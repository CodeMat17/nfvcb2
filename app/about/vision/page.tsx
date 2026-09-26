import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/site/reveal";
import { CTA, PageHero, Panel, Quote, SectionHeading } from "@/components/site/kit";
import { mission, strategicGoals, vision } from "@/lib/data/board";

export const metadata: Metadata = pageMetadata({
  title: "Vision & Goals",
  description:
    "NFVCB's vision, mission and the seven strategic goals that guide every aspect of the Board's operations.",
  path: "/about/vision",
});

export default function VisionPage() {
  return (
    <>
      <PageHero
        eyebrow="Vision & Goals"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Vision & Goals", href: "/about/vision" },
        ]}
        title={
          <>
            Our strategic goals guide every aspect of{" "}
            <span className="text-gradient">NFVCB&rsquo;s operations</span>
          </>
        }
        lead="A world-class film and video regulatory agency that institutes best practice in the discharge of its duties — measured against seven concrete goals."
      />

      <section className="section-y">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Quote cite="Mission Statement">{mission}</Quote>
          </Reveal>
          <Reveal delay={120}>
            <Quote cite="Our Vision">{vision}</Quote>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Seven goals"
            title="What we hold ourselves to"
            lead="From creating an enabling environment for the industry to empowering the staff who deliver the mandate."
          />

          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {strategicGoals.map((goal, i) => (
              <Reveal as="li" key={goal} delay={i * 80}>
                <Panel hover className="flex h-full flex-col">
                  <span className="grid size-12 place-items-center rounded-xl border border-gold/25 bg-gold/10 font-heading text-lg font-bold text-gold">
                    {i + 1}
                  </span>
                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{goal}</p>
                </Panel>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={240} className="mt-14 flex flex-col gap-3 sm:flex-row">
            <CTA href="/action-plan">See the 8-Point Action Plan</CTA>
            <CTA href="/service-charter" variant="ghost">
              Our Service Charter
            </CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
