import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/site/reveal";
import {
  CTA,
  Callout,
  NumberedItem,
  PageHero,
  Panel,
  SectionHeading,
} from "@/components/site/kit";
import {
  filmFees,
  onlineClassificationLetter,
  otherFees,
  ratings,
  trailerFees,
  ratingStyle,
  ratingWatermark,
} from "@/lib/data/classification";
import { verificationEmails } from "@/lib/data/zones";

export const metadata: Metadata = pageMetadata({
  title: "Film Classification Symbols & Fees in Nigeria",
  description:
    "Official NFVCB classification symbols and the schedule of fees for film, trailer and video content submitted for classification in Nigeria.",
  path: "/classification",
});

export default function ClassificationPage() {
  return (
    <>
      <PageHero
        eyebrow="Classification"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Classification & Fees", href: "/classification" },
        ]}
        title={
          <>
            Classification <span className="text-gradient">&amp; fees</span>
          </>
        }
        lead="Official NFVCB classification symbols and schedule of fees for film, trailer and video content submitted for classification in Nigeria."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CTA href="#fees">Jump to fee schedule</CTA>
          <CTA href="#online" variant="ghost">
            Online classification
          </CTA>
        </div>
      </PageHero>

      {/* Symbols */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Classification symbols"
            title="Seven symbols, one clear signal"
            lead="The NFVCB uses these official symbols to indicate the suitability of film and video content for different audience age groups across Nigeria. Every approved work must display its symbol prominently on promotional materials and on screen prior to exhibition."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ratings.map((r, i) => (
              <Reveal key={r.code} delay={i * 70}>
                <article
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-card"
                  style={{ borderColor: undefined }}
                >
                  <div
                    className="watermark-text pointer-events-none absolute -right-6 -top-6 font-heading text-[6rem] font-extrabold leading-none opacity-[0.07] transition-opacity duration-500 group-hover:opacity-20"
                    style={ratingWatermark(r.tone)}
                    data-text={r.code}
                    aria-hidden
                  />
                  <span
                    className="relative grid size-14 place-items-center rounded-xl border font-heading text-lg font-extrabold tabular-nums"
                    style={ratingStyle(r.tone)}
                  >
                    {r.code}
                  </span>
                  <h3 className="relative mt-6 font-heading text-base font-bold">{r.label}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                    {r.desc}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Film fees */}
      <section id="fees" className="scroll-mt-28 border-y border-border bg-surface section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Schedule of fees"
            title="Classification fees — films"
            lead="Fees are based on the runtime of the film. A surcharge of +30% of the applicable fee applies to films intended for public exhibition. Fast-track processing attracts an additional ₦50,000 on top of any category fee."
          />

          {/* Desktop table */}
          <Reveal delay={120} className="mt-12 hidden lg:block">
            <div className="overflow-hidden rounded-2xl border border-border">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-foreground/[0.05] text-left">
                    <th className="px-6 py-4 font-semibold">Item</th>
                    <th className="px-6 py-4 font-semibold">Runtime</th>
                    <th className="px-6 py-4 text-right font-semibold">Local Language</th>
                    <th className="px-6 py-4 text-right font-semibold">English Language</th>
                    <th className="px-6 py-4 text-right font-semibold">Foreign Film</th>
                    <th className="px-6 py-4 text-right font-semibold">Public Exhibition</th>
                  </tr>
                </thead>
                <tbody>
                  {filmFees.map((f) => (
                    <tr
                      key={f.item}
                      className="border-t border-border transition-colors hover:bg-foreground/[0.03]"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                        {f.item}
                      </td>
                      <td className="px-6 py-4 font-medium">{f.runtime}</td>
                      <td className="px-6 py-4 text-right font-mono tabular-nums">{f.local}</td>
                      <td className="px-6 py-4 text-right font-mono tabular-nums">{f.english}</td>
                      <td className="px-6 py-4 text-right font-mono tabular-nums">{f.foreign}</td>
                      <td className="px-6 py-4 text-right font-mono text-xs text-gold">
                        +30% of fee
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Mobile cards */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
            {filmFees.map((f, i) => (
              <Reveal key={f.item} delay={i * 50}>
                <Panel className="h-full !p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-heading text-lg font-bold">{f.runtime}</p>
                    <span className="font-mono text-[11px] text-muted-foreground">{f.item}</span>
                  </div>
                  <dl className="mt-5 space-y-2.5 border-t border-border pt-4 text-sm">
                    {[
                      ["Local Language", f.local],
                      ["English Language", f.english],
                      ["Foreign Film", f.foreign],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-3">
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="font-mono font-semibold tabular-nums">{v}</dd>
                      </div>
                    ))}
                    <div className="flex items-baseline justify-between gap-3 border-t border-border pt-2.5">
                      <dt className="text-muted-foreground">Public exhibition</dt>
                      <dd className="font-mono text-xs font-semibold text-gold">+30% of fee</dd>
                    </div>
                  </dl>
                </Panel>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-8">
            <Callout title="Fast-Track Processing" tone="gold">
              An additional ₦50,000 is charged on top of the applicable category fee for expedited
              classification of films.
            </Callout>
          </Reveal>
        </div>
      </section>

      {/* Trailer + other fees */}
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Trailers"
              title="Classification fees — trailers"
              lead="Trailers submitted separately for classification are subject to the following fees."
            />
            <div className="mt-8 space-y-3">
              {trailerFees.map((t, i) => (
                <Reveal key={t.label} delay={i * 80}>
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/60 p-5">
                    <span className="text-sm">{t.label}</span>
                    <span className="font-heading text-xl font-bold tabular-nums text-primary">
                      {t.value}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Other fees"
              title="Appeals, exemptions & title changes"
              lead="Administrative charges beyond the standard classification schedule."
            />
            <div className="mt-8 space-y-3">
              {otherFees.map((t, i) => (
                <Reveal key={t.label} delay={i * 80}>
                  <div className="rounded-2xl border border-border bg-card/60 p-5">
                    <p className="text-sm font-semibold">{t.label}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{t.value}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Online classification */}
      <section id="online" className="scroll-mt-28 border-y border-border bg-surface section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Online classification"
            title="Classify from your studio, in 24 hours"
            lead="The NFVCB has introduced a faster, more convenient classification service that enables producers of films and video works meant for online distribution to classify their content from the comfort of their offices or studios."
          />

          <div className="mt-12 space-y-4">
            <Reveal>
              <Panel>
                <NumberedItem n={1} title="Send an Application Letter">
                  Submit an application on your company letterhead stating the following about the
                  film(s) or video work:
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {onlineClassificationLetter.map((l) => (
                      <li key={l} className="flex gap-2.5">
                        <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-primary" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </NumberedItem>
              </Panel>
            </Reveal>

            <Reveal delay={80}>
              <Panel>
                <NumberedItem n={2} title="Upload Your Film & Submit">
                  Upload your film via Google Drive or WeTransfer, then send the link together with
                  your application letter to the email address of your nearest NFVCB office. Always
                  copy{" "}
                  <a
                    href="mailto:nfvcbonline@gmail.com"
                    className="font-mono font-semibold text-primary hover:text-gold"
                  >
                    nfvcbonline@gmail.com
                  </a>{" "}
                  regardless of location.
                  <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {verificationEmails.map((v) => (
                      <a
                        key={v.email}
                        href={`mailto:${v.email}`}
                        className="rounded-xl border border-border bg-foreground/[0.03] p-3 transition-colors hover:border-primary/35"
                      >
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
                          {v.office}
                        </span>
                        <span className="mt-1 block break-all font-mono text-xs text-primary">
                          {v.email}
                        </span>
                      </a>
                    ))}
                  </div>
                </NumberedItem>
              </Panel>
            </Reveal>

            <Reveal delay={160}>
              <Panel>
                <NumberedItem n={3} title="Make Payment & Receive Your Certificate">
                  Pay a flat rate of{" "}
                  <span className="font-semibold text-foreground">₦50,000</span> for films of 1–120
                  minutes via the RevOP federal government payment platform. Forward the payment
                  receipt to the zonal/centre email where the film was submitted and copy
                  nfvcbonline@gmail.com. Once payment is confirmed your film will be classified and
                  approved within 24 hours, and the certificate sent to your email.
                </NumberedItem>
              </Panel>
            </Reveal>
          </div>

          <Reveal delay={240} className="mt-8">
            <Callout title="Important" tone="danger">
              It is illegal to distribute or exhibit any film or video work not classified by the
              NFVCB. It is also illegal to distribute films and video works if you are not a
              licensed distributor. Visit any of our state or zonal offices for more details.
            </Callout>
          </Reveal>

          <Reveal delay={300} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTA href="/services/payments">How to pay via RevOP</CTA>
            <CTA href="/services/forms" variant="ghost">
              Download forms
            </CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
