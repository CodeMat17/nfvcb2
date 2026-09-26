import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/site/reveal";
import { CTA, PageHero, Panel, Quote, SectionHeading } from "@/components/site/kit";
import { boardFunctions, mission, philosophy, timeline, vision } from "@/lib/data/board";

export const metadata: Metadata = pageMetadata({
  title: "About the National Film and Video Censors Board",
  description:
    "The National Film and Video Censors Board is the regulatory body set up by Act No.85 of 1993 to regulate the films and video industry in Nigeria.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About NFVCB"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]}
        title={
          <>
            The regulator behind every <span className="text-gradient">Nigerian screen</span>
          </>
        }
        lead="The National Film and Video Censors Board is the regulatory body set up by Act No.85 of 1993 to regulate the films and video industry in Nigeria."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CTA href="/about/vision">Vision &amp; goals</CTA>
          <CTA href="/about/management" variant="ghost">
            Meet the leadership
          </CTA>
        </div>
      </PageHero>

      {/* Mandate */}
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              The Board is empowered by law to classify all films and videos whether imported or
              produced locally.
            </p>
            <p>
              It is also the duty of the Board to register all films and video outlets across the
              country and to keep a register of such registered outlets, among other functions
              empowered by the enabling legislation.
            </p>
            <p className="text-foreground">
              Over three decades, NFVCB has grown from a nascent regulatory body into a world-class
              institution that shapes Nigeria&rsquo;s vibrant Nollywood industry while protecting
              the viewing public.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <Panel className="sheen">
              <p className="eyebrow">Enabling law</p>
              <p className="mt-4 font-heading text-2xl font-bold leading-snug">
                NFVCB Act 85 of 1993
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Cap N40 LFN 2004</p>
              <dl className="mt-8 space-y-5 border-t border-border pt-6 text-sm">
                {[
                  ["Established", "1993"],
                  ["Supervising ministry", "Art, Culture, Tourism and the Creative Economy"],
                  ["Head office", "Room B913, Federal Secretariat Complex Phase II, Abuja"],
                  ["Enquiries", "info@nfvcb.gov.ng"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {k}
                    </dt>
                    <dd className="mt-1.5 font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-border bg-surface section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our history"
            title="Three decades of regulation"
            lead="Each era brought a new format and a new challenge. The Board met each one."
          />
          <ol className="mt-14 space-y-0">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.year} delay={i * 90}>
                <div className="grid gap-4 border-t border-border py-8 sm:grid-cols-[8rem_1fr] sm:gap-10 lg:grid-cols-[12rem_1fr]">
                  <p className="font-heading text-3xl font-bold tabular-nums text-gold sm:text-4xl">
                    {t.year}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold sm:text-xl">{t.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {t.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Mission & vision */}
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

      {/* Functions */}
      <section className="border-t border-border section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Statutory mandate"
            title="Functions of the Board"
            lead="As conferred by the National Film and Video Censors Board Act 85 of 1993."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {boardFunctions.map((fn, i) => (
              <Reveal as="li" key={fn} delay={i * 70}>
                <Panel hover className="flex h-full gap-5">
                  <span className="font-heading text-2xl font-bold tabular-nums text-primary/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{fn}</p>
                </Panel>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="scroll-mt-24 border-t border-border bg-surface section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our philosophy"
            title="Principles guiding film classification"
            lead="The values that shape every classification decision the Board makes."
          />
          <ol className="mt-14 space-y-0">
            {philosophy.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 60}>
                <div className="grid gap-3 border-t border-border py-6 sm:grid-cols-[4rem_1fr] sm:gap-8">
                  <span className="font-heading text-2xl font-bold tabular-nums text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {p}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200} className="mt-12 flex flex-col gap-3 sm:flex-row">
            <CTA href="/about/departments">Explore our departments</CTA>
            <CTA href="/about/zones" variant="ghost">
              Zones &amp; centres
            </CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
