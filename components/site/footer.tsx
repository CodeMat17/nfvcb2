import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { footerColumns } from "@/lib/data/nav";
import { ratings } from "@/lib/data/classification";
import { Mark } from "./logo";

const emails = ["info@nfvcb.gov.ng", "dgoffice@nfvcb.gov.ng", "complaint@nfvcb.gov.ng"];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-surface">
      <div className="absolute inset-x-0 top-0 h-px hairline" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(60% 80% at 15% 0%, oklch(0.706 0.148 158 / 0.12), transparent 70%)",
        }}
      />

      <div className="container-x relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Mark />
              <div className="leading-tight">
                <p className="font-heading text-lg font-bold">NFVCB</p>
                <p className="text-xs text-muted-foreground">
                  National Film &amp; Video Censors Board
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Regulatory body established by Act No.85 of 1993 to regulate the films and video
              industry in Nigeria — preserving culture, protecting children, empowering creativity.
            </p>

            <div className="mt-7 space-y-3 text-sm">
              <p className="flex gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                Room B913, Federal Secretariat Complex Phase II, Abuja FCT
              </p>
              {emails.map((e) => (
                <a
                  key={e}
                  href={`mailto:${e}`}
                  className="flex gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                  {e}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-foreground/[0.02] p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Film Classification Ratings
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {ratings.map((r) => (
              <Link
                key={r.code}
                href="/classification"
                title={r.label}
                className="grid h-10 min-w-10 place-items-center rounded-lg border border-border px-3 font-heading text-sm font-bold tabular-nums text-foreground/90 transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
              >
                {r.code}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} National Film and Video Censors Board</p>
          <p>Federal Republic of Nigeria · Act No.85 of 1993</p>
        </div>
      </div>
    </footer>
  );
}
