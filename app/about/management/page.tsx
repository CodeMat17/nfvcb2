import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProfilePhoto } from "@/components/site/profile-photo";
import { Reveal } from "@/components/site/reveal";
import { CTA, PageHero, Panel, SectionHeading } from "@/components/site/kit";
import { getExecutiveDirector, getLeadership, getManagementStaff } from "@/lib/convex-server";

export const metadata: Metadata = pageMetadata({
  title: "Management Team & Leadership",
  description:
    "The leadership of the National Film and Video Censors Board — from the Federal Government tier to the Executive Director and departmental management.",
  path: "/about/management",
});

// Everything on this page is authored in Convex; revalidate so CMS edits appear without a redeploy.
export const revalidate = 300;

export default async function ManagementPage() {
  const [leadership, executiveDirector, staff] = await Promise.all([
    getLeadership(),
    getExecutiveDirector(),
    getManagementStaff(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Management"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Management", href: "/about/management" },
        ]}
        title={
          <>
            The people who carry the <span className="text-gradient">mandate</span>
          </>
        }
        lead="NFVCB operates under the supervision of the Federal Government of Nigeria, led day to day by the Executive Director and the Board's departmental directors."
      />

      {/* Government tier */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Federal Government of Nigeria"
            title="Supervisory leadership"
            lead="The Board is an agency of the Federal Republic of Nigeria, supervised through the Ministry of Art, Culture, Tourism and the Creative Economy."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((l, i) => (
              <Reveal key={l._id} delay={Math.min(i, 5) * 110}>
                <Panel hover className="h-full">
                  <ProfilePhoto name={l.name} imageUrl={l.imageUrl} />
                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                    {l.office}
                  </p>
                  <h3 className="mt-3 font-heading text-lg font-bold leading-snug">{l.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{l.role}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Director */}
      <section className="border-y border-border bg-surface section-y">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:items-center">
            <Reveal>
              <ProfilePhoto
                name={executiveDirector.shortName}
                imageUrl={executiveDirector.imageUrl}
                initialsClassName="text-7xl"
              />
            </Reveal>
            <div>
              <Reveal>
                <p className="eyebrow">Office of the Executive Director</p>
                <h2 className="mt-5 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {executiveDirector.name}
                </h2>
                <p className="mt-3 text-base text-gold">{executiveDirector.role}</p>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-7 text-base leading-relaxed text-muted-foreground">
                  {executiveDirector.bio[0]}
                </p>
              </Reveal>
              <Reveal delay={190}>
                <Link
                  href="/about/management/executive-director"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-gold"
                >
                  Read more about the Executive Director
                  <ArrowRight className="size-4" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Management staff"
            title="Directors of the Board"
            lead="Each department is led by a director reporting to the Executive Director."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {staff.map((m, i) => (
              <Reveal key={m._id} delay={Math.min(i, 8) * 60}>
                <div className="h-full rounded-2xl border border-border bg-card/60 p-5 transition-all duration-400 hover:border-primary/35 hover:bg-card">
                  <ProfilePhoto name={m.name} imageUrl={m.imageUrl} />
                  <h3 className="mt-5 font-heading text-base font-bold leading-snug">{m.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{m.designation}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12">
            <CTA href="/about/departments">Explore the ten departments</CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
