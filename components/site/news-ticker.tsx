import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/lib/convex-server";

/**
 * Tone per editorial category. Anything unrecognised falls back to the neutral
 * border treatment, so a new category authored in Convex still renders cleanly.
 */
const categoryTone: Record<string, string> = {
  "press release": "border-gold/30 bg-gold/10 text-gold",
  announcement: "border-gold/30 bg-gold/10 text-gold",
  advisory: "border-gold/30 bg-gold/10 text-gold",
  enforcement: "border-destructive/30 bg-destructive/10 text-destructive",
  regulation: "border-primary/30 bg-primary/10 text-primary",
  events: "border-primary/30 bg-primary/10 text-primary",
};

function toneFor(category?: string) {
  const tone = category && categoryTone[category.toLowerCase()];
  return tone ?? "border-border bg-foreground/[0.06] text-muted-foreground";
}

function shortDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "short" });
}

function Item({ article }: { article: NewsArticle }) {
  const date = shortDate(article.publishedAt);

  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex shrink-0 items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 transition-colors hover:border-border hover:bg-card"
    >
      <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-surface">
        {article.coverImageUrl ? (
          // Covers come from arbitrary Convex storage URLs, so a plain img
          // avoids per-host next/image remote pattern configuration.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.coverImageUrl} alt="" className="size-full object-cover" />
        ) : (
          // No cover art: the Board mark stands in, so every row reads as NFVCB.
          <Image
            src="/logo.webp"
            alt=""
            width={40}
            height={40}
            className="size-7 object-contain opacity-80"
          />
        )}
      </span>

      <span className="flex items-center gap-2.5">
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${toneFor(article.category)}`}
        >
          {article.category ?? "News"}
        </span>
        <span className="whitespace-nowrap text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          {article.title}
        </span>
        {date && (
          <span className="whitespace-nowrap text-xs tabular-nums text-muted-foreground">
            {date}
          </span>
        )}
      </span>
    </Link>
  );
}

/**
 * Latest headlines scrolling under the hero. The track holds two identical
 * halves and shifts by -50%, so the loop is seamless; a short article list is
 * repeated first to make sure the track is always wider than the viewport.
 */
export function NewsTicker({ articles }: { articles: NewsArticle[] }) {
  if (articles.length === 0) return null;

  const half: NewsArticle[] = [];
  while (half.length < 8) half.push(...articles);

  return (
    <div className="relative border-y border-border bg-foreground/[0.03] py-3">
      <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        {/* One pass takes ~28s per headline, so the speed stays readable
            whether the newsroom has two articles or twenty. */}
        <div
          className="flex shrink-0 animate-marquee items-center gap-6 pr-6"
          style={{ animationDuration: `${half.length * 28}s` }}
        >
          {[...half, ...half].map((a, i) => (
            <Item key={`${a._id}-${i}`} article={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
