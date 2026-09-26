import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import {
  BarChart3,
  Briefcase,
  Clapperboard,
  ClipboardList,
  Crown,
  Lightbulb,
  Map,
  Megaphone,
  Scale,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { CTA, PageHero, SectionHeading } from "@/components/site/kit";
import { departments } from "@/lib/data/board";

export const metadata: Metadata = pageMetadata({
  title: "Departments",
  description:
    "The ten departments of the National Film and Video Censors Board and what each one delivers.",
  path: "/about/departments",
});

const icons: Record<string, LucideIcon> = {
  Crown,
  Settings,
  Clapperboard,
  ClipboardList,
  Map,
  BarChart3,
  Lightbulb,
  Scale,
  Briefcase,
  Megaphone,
};

export default function DepartmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Departments"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Departments", href: "/about/departments" },
        ]}
        title={
          <>
            Ten departments, <span className="text-gradient">one mandate</span>
          </>
        }
        lead="From classification to enforcement, licensing to public communication — every function of the Board sits within a department accountable for delivering it."
      />

      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Organisational structure"
            title="How the Board is organised"
            lead="Each department is led by a director reporting to the Executive Director."
          />

          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d, i) => {
              const Icon = icons[d.icon] ?? Settings;
              return (
                <Reveal as="li" key={d.no} delay={i * 70}>
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:bg-card hover:shadow-2xl hover:shadow-[color:var(--shadow-tint)]">
                    <div className="pointer-events-none absolute -right-8 -top-8 font-heading text-[7rem] font-bold leading-none text-foreground/[0.03] transition-colors duration-500 group-hover:text-primary/10">
                      {d.no}
                    </div>
                    <span className="relative grid size-11 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <p className="relative mt-6 font-mono text-xs text-gold">{d.no}</p>
                    <h3 className="relative mt-2 font-heading text-lg font-bold leading-snug">
                      {d.name}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                      {d.summary}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </ol>

          <Reveal delay={200} className="mt-14 flex flex-col gap-3 sm:flex-row">
            <CTA href="/about/management">Meet the management team</CTA>
            <CTA href="/about/zones" variant="ghost">
              Zones &amp; centres
            </CTA>
          </Reveal>
        </div>
      </section>
    </>
  );
}
