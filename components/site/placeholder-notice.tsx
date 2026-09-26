import { FlaskConical } from "lucide-react";
import { convexConfigured } from "@/lib/convex-server";

/**
 * Renders only while Convex is unconfigured, so sample records on the newsroom
 * and approved-movies pages are never mistaken for live content. It disappears
 * on its own once NEXT_PUBLIC_CONVEX_URL is set.
 */
export function PlaceholderNotice({ what }: { what: string }) {
  if (convexConfigured) return null;

  return (
    <div className="mb-10 flex items-start gap-4 rounded-2xl border border-gold/30 bg-gold/[0.08] p-5">
      <FlaskConical className="mt-0.5 size-5 shrink-0 text-gold" />
      <div>
        <p className="text-sm font-bold text-gold">Placeholder content</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          These {what} are sample records for layout review only — they are not real NFVCB
          records. They are served because no Convex deployment is configured yet, and will be
          replaced automatically by live content once{" "}
          <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-xs">
            NEXT_PUBLIC_CONVEX_URL
          </code>{" "}
          is set.
        </p>
      </div>
    </div>
  );
}
