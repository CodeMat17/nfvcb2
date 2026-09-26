import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Clapperboard, Heart, Landmark, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Bullets, CTA, PageHero, Panel, Quote, SectionHeading } from "@/components/site/kit";
import { charterSections } from "@/lib/data/charter";
import { getExecutiveDirector } from "@/lib/convex-server";

export const metadata: Metadata = pageMetadata({
  title: "Service Charter",
  description:
    "NFVCB's commitment to world-class film regulatory services — the standards we set for industry clients, government and the public.",
  path: "/service-charter",
});

// The foreword comes from the Executive Director's profile in Convex.
export const revalidate = 300;

const icons: Record<string, LucideIcon> = { Users, Clapperboard, Landmark, Heart };

export default async function CharterPage() {
  const executiveDirector = await getExecutiveDirector();

  return (
    <>
      <PageHero
        eyebrow="Service Charter"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Service Charter", href: "/service-charter" },
        ]}
        title={
          <>
            Our commitment to <span className="text-gradient">world-class service</span>
          </>
        }
        lead="Setting the standard for how NFVCB serves every stakeholder — industry clients, government, and the Nigerian viewing public."
      />

      {/* Foreword */}
      <section className="section-y">
        <div className="container-x">
          <Reveal className="mx-auto max-w-4xl">
            <p className="eyebrow mb-6">Director-General&rsquo;s foreword</p>
            <Quote
              cite={
                <>
                  <span className="block font-semibold text-foreground">
                    {executiveDirector.name}
                  </span>
                  Director-General, National Film and Video Censors Board
                </>
              }
            >
              {executiveDirector.foreword}
            </Quote>
          </Reveal>
        </div>
      </section>

      {/* Who it serves */}
      <section className="border-y border-border bg-surface section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Scope"
            title="Who this charter serves"
            lead="Two audiences, one standard of service."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              {
                title: "Industry Clients",
                body: "Producers, marketers and organisations that apply to have films, video works, and computer games censored/classified.",
                icon: Clapperboard,
              },
              {
                title: "Consumers",
                body: "Members of the public who consume films and video products in Nigeria, and deserve accurate consumer information and protection.",
                icon: Heart,
              },
            ].map((a, i) => (
              <Reveal key={a.title} delay={i * 110}>
                <Panel hover className="h-full">
                  <span className="grid size-12 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                    <a.icon className="size-6" />
                  </span>
                  <h3 className="mt-6 font-heading text-xl font-bold">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="section-y">
        <div className="container-x space-y-14">
          {charterSections.map((section, si) => {
            const Icon = icons[section.icon] ?? Users;
            return (
              <div key={section.id} id={section.id} className="scroll-mt-28">
                <Reveal>
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                        {section.title}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                        {section.intro}
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={90 + si * 20} className="mt-7">
                  <Panel>
                    <Bullets items={section.items} accent={si % 2 === 0 ? "primary" : "gold"} />
                  </Panel>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feedback */}
      <section className="border-t border-border section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Feedback"
              title="Feedback on our service"
              lead="The Board welcomes feedback on our performance against these service standards."
            />
            <Reveal delay={120} className="mt-7 space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                Clients can write to or email us with any comments or suggestions. Your feedback
                will help us to improve our services in future.
              </p>
              <p>
                If you experience any problem with our service and cannot resolve it by discussion
                with the staff member concerned, escalate the matter by asking to speak to his or
                her supervisor. If you remain dissatisfied, you can further escalate the issue to
                the office of the Director-General through the Head of Servicom and Community
                Liaison Unit.
              </p>
              <p>
                For clients who are not satisfied with a classification decision, we can provide you
                with a copy of the reasons for the Board&rsquo;s decision or arrange for you to
                speak to a senior official. We can also assist you with information on how to apply
                to the Review Board for a review of the decision.
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <Panel className="sheen lg:sticky lg:top-28">
              <p className="eyebrow">Contact NFVCB</p>
              <div className="mt-6 space-y-5 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Email</p>
                  <a
                    href="mailto:info@nfvcb.gov.ng"
                    className="mt-1.5 block font-mono text-primary hover:text-gold"
                  >
                    info@nfvcb.gov.ng
                  </a>
                </div>
                <div className="border-t border-border pt-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Head office
                  </p>
                  <p className="mt-1.5 leading-relaxed">
                    Room B913, Federal Secretariat Complex Phase II, Abuja FCT.
                  </p>
                </div>
              </div>
              <div className="mt-7 border-t border-border pt-6">
                <CTA href="/contact" className="w-full">
                  Contact the Board
                </CTA>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>
    </>
  );
}
