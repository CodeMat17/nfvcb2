"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { navGroups } from "@/lib/data/nav";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle, ThemeSwitcher } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  // Desktop dropdown dismissed by a click; stays hidden until the pointer leaves it.
  const [dismissedGroup, setDismissedGroup] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the drawer when navigation lands on a new route.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setOpenGroup(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Federal strip */}
    

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "glass border-b border-border shadow-lg shadow-[color:var(--shadow-tint)]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex  items-center justify-between gap-4 py-2.5">
          <Logo />

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navGroups.map((group) => {
              const active = pathname.startsWith(group.href);
              const dismissed = dismissedGroup === group.label;
              const dismiss = () => {
                setDismissedGroup(group.label);
                (document.activeElement as HTMLElement | null)?.blur();
              };
              return (
                <div
                  key={group.label}
                  className="group/nav relative"
                  onMouseLeave={() => dismissed && setDismissedGroup(null)}
                >
                  <Link
                    href={group.href}
                    onClick={dismiss}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {group.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-300",
                        !dismissed && "group-hover/nav:rotate-180",
                      )}
                    />
                  </Link>
                  <div
                    className={cn(
                      "invisible absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3 opacity-0",
                      "transition-all duration-300",
                      !dismissed &&
                        "group-hover/nav:visible group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:opacity-100",
                    )}
                  >
                    <div className="overflow-hidden bg-background rounded-2xl border border-border p-2 shadow-2xl shadow-[color:var(--shadow-tint)]">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={dismiss}
                          className="block rounded-xl px-4 py-3 transition-colors hover:bg-foreground/[0.06]"
                        >
                          <span className="block text-sm font-semibold">{link.label}</span>
                          {link.desc && (
                            <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                              {link.desc}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/services/licensing"
              className="hidden h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:brightness-110 active:scale-95 sm:inline-flex"
            >
              Apply for a Licence
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid size-10 place-items-center rounded-full border border-border bg-foreground/[0.04] transition-colors hover:bg-foreground/[0.09] lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        // Closed: out of the tab order and the accessibility tree.
        inert={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 scrim backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-border bg-background shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <Logo compact />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full border border-border bg-foreground/[0.04]"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
            {navGroups.map((group) => {
              const expanded = openGroup === group.label;
              return (
                <div key={group.label} className="border-b border-border last:border-0">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(expanded ? null : group.label)}
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between py-4 text-left text-base font-semibold"
                  >
                    {group.label}
                    <ChevronDown
                      className={cn(
                        "size-4 text-muted-foreground transition-transform duration-300",
                        expanded && "rotate-180 text-primary",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      expanded ? "grid-rows-[1fr] pb-3 opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-1 border-l border-primary/25 pl-4">
                        {group.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                              "rounded-lg px-2 py-2.5 text-sm transition-colors",
                              pathname === link.href
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="space-y-3 border-t border-border p-5">
            <ThemeSwitcher className="w-full" />
            <Link
              href="/services/licensing"
              className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
            >
              Apply for a Licence
            </Link>
            <a
              href="tel:+2348000000000"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border text-sm font-semibold"
            >
              <Phone className="size-4" /> Contact the Board
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
