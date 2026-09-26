import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/site/reveal";
import { Callout, PageHero } from "@/components/site/kit";
import { AssociationDirectory } from "@/components/site/association-directory";
import { associations } from "@/lib/data/associations";

export const metadata: Metadata = pageMetadata({
  title: "Associations & Guilds",
  description:
    "Directory of registered professional associations and guilds in Nigeria's film and video industry, with officials and contact details.",
  path: "/associations",
});

export default function AssociationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Industry"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Associations & Guilds", href: "/associations" },
        ]}
        title={
          <>
            {associations.length} registered{" "}
            <span className="text-gradient">professional bodies</span>
          </>
        }
        lead="Guilds and associations representing actors, directors, producers, distributors, exhibitors, cinematographers, screenwriters and educators across Nigeria."
      />

      <section className="section-y">
        <div className="container-x">
          <AssociationDirectory />

          <Reveal delay={150} className="mt-14">
            <Callout title="Keep your listing current" tone="gold">
              Contact details are provided by the associations themselves and are published for the
              convenience of practitioners and the public. If your guild&rsquo;s details have
              changed, please write to the Board at{" "}
              <a
                href="mailto:info@nfvcb.gov.ng"
                className="font-mono font-semibold text-primary hover:text-gold"
              >
                info@nfvcb.gov.ng
              </a>{" "}
              so this directory can be updated.
            </Callout>
          </Reveal>
        </div>
      </section>
    </>
  );
}
