import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { jsonLd, siteUrl } from "@/lib/seo";
import { Reveal } from "./reveal";

/* ------------------------------------------------------------------ Buttons */

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50";

export const buttonStyles = {
  primary: cn(
    base,
    "h-12 px-6 bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:brightness-110 active:scale-[0.98]",
  ),
  ghost: cn(
    base,
    "h-12 px-6 border border-border bg-foreground/[0.04] text-foreground backdrop-blur hover:border-border hover:bg-foreground/[0.08] active:scale-[0.98]",
  ),
  gold: cn(
    base,
    "h-12 px-6 bg-gold text-gold-foreground shadow-lg shadow-gold/20 hover:brightness-105 active:scale-[0.98]",
  ),
  link: "group inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-gold",
};

export function CTA({
  href,
  children,
  variant = "primary",
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  className?: string;
  external?: boolean;
}) {
  const cls = cn(buttonStyles[variant], className);
  const inner = (
    <>
      {children}
      {external ? (
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      ) : (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* ------------------------------------------------------------------- Layout */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("eyebrow", className)}>
      <span className="h-px w-6 bg-primary/60" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-balance text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {lead && (
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{lead}</p>
      )}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  breadcrumb,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  breadcrumb?: { label: string; href: string }[];
}) {
  return (
    <header className="relative isolate overflow-hidden grain">
      <div className="absolute inset-0 -z-10 spotlight" />
      <div
        className="grid-overlay absolute inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(70% 70% at 50% 0%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 70% at 50% 0%, black, transparent)",
        }}
      />
      <div className="container-x pb-14 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
        {breadcrumb && (
          <Reveal eager className="mb-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {breadcrumb.map((b, i) => (
                  <li key={b.href} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden className="text-foreground/20">
                        /
                      </span>
                    )}
                    <Link
                      href={b.href}
                      aria-current={i === breadcrumb.length - 1 ? "page" : undefined}
                      className="transition-colors hover:text-primary"
                    >
                      {b.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={jsonLd({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: breadcrumb.map((b, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: b.label,
                  item: `${siteUrl}${b.href === "/" ? "" : b.href}`,
                })),
              })}
            />
          </Reveal>
        )}
        <Reveal eager>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal eager delay={80}>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal eager delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
              {lead}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal eager delay={240} className="mt-9">
            {children}
          </Reveal>
        )}
      </div>
      <div className="hairline h-px w-full" />
    </header>
  );
}

/* -------------------------------------------------------------------- Cards */

export function Panel({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "card-surface p-6 sm:p-8",
        hover &&
          "transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:bg-card hover:shadow-2xl hover:shadow-[color:var(--shadow-tint)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hairline to-transparent" />
      {children}
    </div>
  );
}

export function NumberedItem({
  n,
  title,
  children,
  accent = "primary",
}: {
  n: string | number;
  title?: ReactNode;
  children: ReactNode;
  accent?: "primary" | "gold";
}) {
  return (
    <div className="group relative flex gap-4 sm:gap-5">
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-xl border text-sm font-bold tabular-nums transition-colors sm:size-11",
          accent === "gold"
            ? "border-gold/25 bg-gold/10 text-gold group-hover:bg-gold group-hover:text-gold-foreground"
            : "border-primary/25 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
        )}
      >
        {n}
      </span>
      <div className="min-w-0 pt-1">
        {title && <h3 className="text-base font-semibold sm:text-lg">{title}</h3>}
        <div className={cn("text-sm leading-relaxed text-muted-foreground", title && "mt-2")}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Bullets({ items, accent = "primary" }: { items: string[]; accent?: "primary" | "gold" }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
          <span
            className={cn(
              "mt-[0.45rem] size-1.5 shrink-0 rounded-full",
              accent === "gold" ? "bg-gold" : "bg-primary",
            )}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Quote({ children, cite }: { children: ReactNode; cite?: ReactNode }) {
  return (
    <figure className="card-surface sheen p-7 sm:p-10">
      <svg viewBox="0 0 48 48" className="mb-5 size-8 text-gold/60" fill="currentColor" aria-hidden>
        <path d="M18 8C11 12 7 19 7 27v13h16V24h-8c0-5 2-9 7-11l-4-5Zm23 0c-7 4-11 11-11 19v13h16V24h-8c0-5 2-9 7-11l-4-5Z" />
      </svg>
      <blockquote className="text-pretty text-lg font-medium leading-relaxed sm:text-xl lg:text-2xl">
        {children}
      </blockquote>
      {cite && (
        <figcaption className="mt-6 text-sm text-muted-foreground">{cite}</figcaption>
      )}
    </figure>
  );
}

export function Callout({
  title,
  children,
  tone = "primary",
}: {
  title: string;
  children: ReactNode;
  tone?: "primary" | "gold" | "danger";
}) {
  const tones = {
    primary: "border-primary/25 bg-primary/[0.07]",
    gold: "border-gold/25 bg-gold/[0.07]",
    danger: "border-destructive/30 bg-destructive/[0.08]",
  };
  return (
    <div className={cn("rounded-2xl border p-6 sm:p-7", tones[tone])}>
      <h3 className="text-sm font-bold uppercase tracking-[0.14em]">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
