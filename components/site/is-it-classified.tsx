import { ratings, ratingStyle } from "@/lib/data/classification";
import { CTA, NumberedItem, SectionHeading } from "./kit";
import { Reveal } from "./reveal";

const checks = [
  {
    title: "Look for the symbol",
    body: "Every approved work carries its classification symbol on the jacket, poster or opening frame.",
  },
  {
    title: "Check the register",
    body: "The Board publishes every classified title, month by month, in the approved-movies register.",
  },
  {
    title: "Report what doesn't add up",
    body: "No symbol, a forged certificate or an unlicensed outlet? Let the Board know and its field teams will follow up.",
  },
];

/**
 * Viewer-facing prompt to verify a title before watching it. Always
 * theatre-dark (the `dark` class re-scopes the colour tokens).
 */
export function IsItClassified() {
  return (
    <section className='dark theatre letterbox relative isolate overflow-hidden text-foreground section-y'>
      <div className='absolute inset-0 -z-10 opacity-60 spotlight' />
      <div className='container-x'>
        <div className='grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20'>
          <div>
            <SectionHeading
              eyebrow='Before you watch'
              title='Is it classified?'
              lead='Every film and video work shown, sold or streamed in Nigeria must be classified by the Board. A few seconds of checking protects your family and the creators behind the work.'
            />

            <Reveal delay={120}>
              <div className='mt-8 flex flex-wrap gap-2'>
                {ratings.map((r) => (
                  <span
                    key={r.code}
                    title={r.label}
                    className='grid h-10 min-w-10 place-items-center rounded-lg border px-2.5 font-heading text-sm font-extrabold'
                    style={ratingStyle(r.tone)}>
                    {r.code}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={180} className='mt-9 flex flex-col gap-3 sm:flex-row'>
              <CTA href='/approved-movies'>Search the register</CTA>
              <CTA href='/contact' variant='ghost'>
                Report a title
              </CTA>
            </Reveal>
          </div>

          <ol className='grid gap-8'>
            {checks.map((c, i) => (
              <Reveal as='li' key={c.title} delay={i * 110}>
                <NumberedItem n={i + 1} title={c.title} accent='gold'>
                  {c.body}
                </NumberedItem>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
