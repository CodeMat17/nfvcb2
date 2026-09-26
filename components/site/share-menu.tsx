"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------- Brand glyphs */
/* lucide no longer ships brand marks, so these are inlined. */

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.412c0-3.025 1.792-4.696 4.533-4.696 1.313 0 2.686.236 2.686.236v2.97H15.83c-1.491 0-1.956.931-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347Zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884Zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ Shared */

type Target = {
  label: string;
  Icon: (p: { className?: string }) => React.ReactElement;
  href: (url: string, title: string) => string;
  /**
   * "link" opens the network's web share intent.
   *
   * "copy" is for Instagram, which publishes no web endpoint for sharing a URL
   * — links can only reach it by being pasted into a story, bio or DM. So the
   * button copies the link and opens Instagram, rather than pretending to
   * prefill a post. On phones the OS share sheet (see ShareButton) offers
   * Instagram natively and is the better route.
   */
  mode: "link" | "copy";
};

const targets: Target[] = [
  {
    label: "X",
    mode: "link",
    Icon: XIcon,
    href: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    label: "Facebook",
    mode: "link",
    Icon: FacebookIcon,
    href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: "Instagram",
    mode: "copy",
    Icon: InstagramIcon,
    href: () => "https://www.instagram.com/",
  },
  {
    label: "WhatsApp",
    mode: "link",
    Icon: WhatsAppIcon,
    href: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    label: "LinkedIn",
    mode: "link",
    Icon: LinkedInIcon,
    href: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

function absoluteUrl(path: string) {
  if (typeof window === "undefined") return path;
  return new URL(path, window.location.origin).toString();
}

/** Tracks which control was last copied from, so each can show its own feedback. */
function useCopy() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!copiedKey) return;
    const t = setTimeout(() => setCopiedKey(null), 2400);
    return () => clearTimeout(t);
  }, [copiedKey]);

  const copy = useCallback(async (url: string, key: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedKey(key);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions) — fall back to
      // a selection-based copy so the action still works.
      const input = document.createElement("input");
      input.value = url;
      document.body.append(input);
      input.select();
      try {
        document.execCommand("copy");
        setCopiedKey(key);
      } catch {
        /* nothing more we can do */
      }
      input.remove();
    }
  }, []);

  return { copiedKey, copy };
}

const iconButton =
  "grid size-10 place-items-center rounded-full border border-border bg-foreground/[0.04] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary hover:text-primary-foreground";

/* --------------------------------------------------------------- Share bar */

export function ShareBar({
  title,
  path,
  className,
}: {
  title: string;
  path: string;
  className?: string;
}) {
  const { copiedKey, copy } = useCopy();

  const onInstagram = async () => {
    await copy(absoluteUrl(path), "instagram");
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Share
      </span>

      <div className="flex flex-wrap items-center gap-2">
        {targets.map((t) =>
          t.mode === "copy" ? (
            <button
              key={t.label}
              type="button"
              onClick={onInstagram}
              aria-label={`Copy link for ${t.label}`}
              title={`Copy the link and open ${t.label} — Instagram has no direct web share, so paste it into a story, bio or DM`}
              className={cn(
                iconButton,
                copiedKey === "instagram" && "border-primary/40 bg-primary/15 text-primary",
              )}
            >
              {copiedKey === "instagram" ? (
                <Check className="size-4" />
              ) : (
                <t.Icon className="size-4" />
              )}
            </button>
          ) : (
            <a
              key={t.label}
              href={t.href(absoluteUrl(path), title)}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Share on ${t.label}`}
              title={`Share on ${t.label}`}
              className={iconButton}
            >
              <t.Icon className="size-4" />
            </a>
          ),
        )}

        <button
          type="button"
          onClick={() => copy(absoluteUrl(path), "link")}
          aria-label={copiedKey === "link" ? "Link copied" : "Copy link"}
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all duration-300",
            copiedKey === "link"
              ? "border-primary/40 bg-primary/15 text-primary"
              : "border-border bg-foreground/[0.04] text-muted-foreground hover:border-primary/40 hover:text-foreground",
          )}
        >
          {copiedKey === "link" ? <Check className="size-4" /> : <Link2 className="size-4" />}
          {copiedKey === "link" ? "Link copied" : "Copy link"}
        </button>
      </div>

      {copiedKey === "instagram" && (
        <p role="status" className="basis-full text-xs text-primary">
          Link copied — paste it into your Instagram story, bio or DM.
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------- Icon menu */

export function ShareButton({
  title,
  path,
  className,
}: {
  title: string;
  path: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const { copiedKey, copy } = useCopy();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onTrigger = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = absoluteUrl(path);

    // Phones and tablets get the OS share sheet, which includes Instagram.
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Dismissed or unavailable — fall through to the menu.
      }
    }
    setOpen((v) => !v);
  };

  const itemClass =
    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-foreground/[0.07] hover:text-foreground";

  return (
    <div ref={root} className={cn("relative", className)}>
      <button
        type="button"
        onClick={onTrigger}
        aria-label={`Share “${title}”`}
        aria-expanded={open}
        className={cn(
          "grid size-9 place-items-center rounded-full border transition-all duration-300",
          open
            ? "border-primary/40 bg-primary text-primary-foreground"
            : "border-border bg-foreground/[0.04] text-muted-foreground hover:border-primary/40 hover:text-foreground",
        )}
      >
        <Share2 className="size-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-popover p-1.5 shadow-2xl shadow-[color:var(--shadow-tint)]">
          {targets.map((t) =>
            t.mode === "copy" ? (
              <button
                key={t.label}
                type="button"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  await copy(absoluteUrl(path), "instagram");
                  window.open(
                    "https://www.instagram.com/",
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
                className={itemClass}
              >
                {copiedKey === "instagram" ? (
                  <Check className="size-4 text-primary" />
                ) : (
                  <t.Icon className="size-4" />
                )}
                {copiedKey === "instagram" ? "Copied — paste in app" : t.label}
              </button>
            ) : (
              <a
                key={t.label}
                href={t.href(absoluteUrl(path), title)}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                className={itemClass}
              >
                <t.Icon className="size-4" />
                {t.label}
              </a>
            ),
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              copy(absoluteUrl(path), "link");
            }}
            className={itemClass}
          >
            {copiedKey === "link" ? (
              <Check className="size-4 text-primary" />
            ) : (
              <Link2 className="size-4" />
            )}
            {copiedKey === "link" ? "Link copied" : "Copy link"}
          </button>
        </div>
      )}
    </div>
  );
}
