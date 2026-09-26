import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Mail, MapPin, ShieldQuestion, Ticket, Clapperboard } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { CTA, PageHero, Panel, SectionHeading } from "@/components/site/kit";
import { zones } from "@/lib/data/zones";

export const metadata: Metadata = pageMetadata({
  title: "Contact the NFVCB",
  description:
    "Contact the National Film and Video Censors Board — head office, zonal offices, and dedicated email desks for classification, licensing and complaints.",
  path: "/contact",
});

const desks = [
  {
    icon: Mail,
    title: "General enquiries",
    email: "info@nfvcb.gov.ng",
    body: "For questions about the Board, its services and publications.",
  },
  {
    icon: ShieldQuestion,
    title: "Director-General's office",
    email: "dgoffice@nfvcb.gov.ng",
    body: "For correspondence to the office of the Director-General.",
  },
  {
    icon: Ticket,
    title: "Licensing & documentation",
    email: "nfvcb_ldd@nfvcb.gov.ng",
    body: "For licence applications, renewals and requirements.",
  },
  {
    icon: Clapperboard,
    title: "Online classification",
    email: "nfvcbonline@gmail.com",
    body: "Always copy this address on online classification submissions.",
  },
  {
    icon: Mail,
    title: "Complaints",
    email: "complaint@nfvcb.gov.ng",
    body: "To report an infringement or raise a service complaint.",
  },
  {
    icon: Clapperboard,
    title: "Abuja verification desk",
    email: "verification@nfvcb.gov.ng",
    body: "Head office verification desk for film submissions.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]}
        title={
          <>
            Talk to the <span className="text-gradient">Board</span>
          </>
        }
        lead="Reach the right desk directly, or visit any of our zonal offices and state centres across the federation."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CTA href="/about/zones">Find your nearest office</CTA>
          <CTA href="/service-charter" variant="ghost">
            Our service standards
          </CTA>
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <Panel className="sheen lg:sticky lg:top-28">
              <p className="eyebrow">Head office</p>
              <p className="mt-5 flex gap-3 text-sm leading-relaxed">
                <MapPin className="mt-0.5 size-5 shrink-0 text-gold" />
                Room B913, Federal Secretariat Complex Phase II, Abuja FCT, Nigeria.
              </p>
              <dl className="mt-7 space-y-5 border-t border-border pt-6 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Response standard
                  </dt>
                  <dd className="mt-1.5">
                    Correspondence answered within 20 working days; telephone callbacks before the
                    end of the next working day.
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Payments
                  </dt>
                  <dd className="mt-1.5">
                    All fees are paid on{" "}
                    <a
                      href="https://revop.gov.ng"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-semibold text-primary hover:text-gold"
                    >
                      revop.gov.ng
                    </a>
                    . Payments made outside RevOP are not accepted.
                  </dd>
                </div>
              </dl>
            </Panel>
          </Reveal>

          <div>
            <SectionHeading eyebrow="Email desks" title="Reach the right team directly" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {desks.map((d, i) => (
                <Reveal key={d.email + d.title} delay={i * 70}>
                  <a
                    href={`mailto:${d.email}`}
                    className="flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-primary/35 hover:bg-card"
                  >
                    <span className="grid size-10 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                      <d.icon className="size-5" />
                    </span>
                    <h3 className="mt-5 text-sm font-bold">{d.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {d.body}
                    </p>
                    <span className="mt-4 break-all font-mono text-xs text-primary">
                      {d.email}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Zonal offices"
            title="Six zones across the federation"
            lead="Each zone coordinates state centres serving filmmakers, distributors and exhibitors locally."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((z, i) => (
              <Reveal key={z.id} delay={i * 70}>
                <Link
                  href="/about/zones"
                  className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-card/60 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-primary/35 hover:bg-card"
                >
                  <div>
                    <h3 className="font-heading text-base font-bold">{z.zone}</h3>
                    <p className="mt-1.5 text-sm text-gold">{z.location}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {z.offices.length} {z.offices.length === 1 ? "office" : "offices & centres"} →
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
