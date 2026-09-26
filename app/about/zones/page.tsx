import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/site/reveal";
import { CTA, PageHero, Panel, SectionHeading } from "@/components/site/kit";
import { ZoneExplorer } from "@/components/site/zone-explorer";
import { verificationEmails, zones } from "@/lib/data/zones";

export const metadata: Metadata = pageMetadata({
  title: "Zonal Offices & State Centres",
  description:
    "NFVCB head office, six geo-political zonal offices and state centres across Nigeria, with officers and contact details.",
  path: "/about/zones",
});

export default function ZonesPage() {
  const total = zones.reduce((n, z) => n + z.offices.length, 0);

  return (
    <>
      <PageHero
        eyebrow="Zones & Centres"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Zones & Centres", href: "/about/zones" },
        ]}
        title={
          <>
            A classification desk <span className="text-gradient">close to you</span>
          </>
        }
        lead={`The Board maintains a head office in Abuja, six geo-political zonal offices and ${total - 1} state centres — so that filmmakers, distributors and exhibitors can reach us wherever they work.`}
      />

      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Find an office"
            title="Head office, zonal offices and state centres"
            lead="Select a zone to see its offices, officers and addresses."
          />
          <ZoneExplorer />
        </div>
      </section>

      <section className="border-t border-border section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Online classification"
            title="Verification email desks"
            lead="Send your application letter and film link to the desk nearest you — and always copy nfvcbonline@gmail.com regardless of location."
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {verificationEmails.map((v, i) => (
              <Reveal key={v.email} delay={i * 55}>
                <a
                  href={`mailto:${v.email}`}
                  className="flex h-full flex-col justify-between gap-3 rounded-2xl border border-border bg-card/60 p-5 transition-all duration-400 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                    {v.office}
                  </span>
                  <span className="break-all font-mono text-sm text-primary">{v.email}</span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={180} className="mt-10">
            <Panel className="sheen">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Films for online distribution are classified at a flat rate of{" "}
                <span className="font-semibold text-foreground">₦50,000</span> for 1–120 minutes,
                paid via RevOP. Once payment is confirmed, your film is classified and approved
                within 24 hours and the certificate sent to your email.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CTA href="/classification">Online classification steps</CTA>
                <CTA href="/services/payments" variant="ghost">
                  How to pay via RevOP
                </CTA>
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>
    </>
  );
}
