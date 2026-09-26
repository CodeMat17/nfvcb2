import type { Metadata } from "next";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/site/reveal";
import { CTA, Callout, PageHero } from "@/components/site/kit";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { faqFootnote, faqGroups } from "@/lib/data/faq";

export const metadata: Metadata = pageMetadata({
  title: "Film Censorship & Classification FAQ",
  description:
    "Answers on film and video censorship, classification, licensing, exemptions and the role of the National Film and Video Censors Board.",
  path: "/faq",
});

export default function FaqPage() {
  const total = faqGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqGroups.flatMap((g) =>
            g.items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          ),
        })}
      />
      <PageHero
        eyebrow="Frequently Asked Questions"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ", href: "/faq" }]}
        title={
          <>
            Everything you need to know about{" "}
            <span className="text-gradient">classification</span>
          </>
        }
        lead={`${total} answers on film and video censorship, classification, licensing, and the role of the National Film and Video Censors Board.`}
      >
        <div className="flex flex-wrap gap-2">
          {faqGroups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="rounded-full border border-border bg-foreground/[0.04] px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {g.title}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-x">
          <FaqAccordion />

          <Reveal delay={150} className="mt-16">
            <Callout title="Still have a question?" tone="gold">
              {faqFootnote}
            </Callout>
          </Reveal>

          <Reveal delay={210} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTA href="/contact">Contact the Board</CTA>
            <CTA href="/services" variant="ghost">
              Start an application
            </CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
