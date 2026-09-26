import { cn } from "@/lib/utils";

/** Up to two initials from the capitalised words of a name ("Vice President of …" → "VP"). */
export function initialsOf(name: string) {
  const words = name.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w));
  const capitalised = words.filter((w) => /^[A-Z]/.test(w));
  return (capitalised.length ? capitalised : words)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/**
 * 4:5 portrait. Photos come from Convex storage URLs, so a plain img avoids
 * next/image remote pattern configuration. Without a photo, shows initials.
 */
export function ProfilePhoto({
  name,
  imageUrl,
  className,
  initialsClassName = "text-5xl",
}: {
  name: string;
  imageUrl?: string | null;
  className?: string;
  initialsClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border",
        className,
      )}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={name} className="absolute inset-0 size-full object-cover object-top" />
      ) : (
        <div className="grid size-full place-items-center bg-gradient-to-br from-primary/18 via-surface to-gold/12">
          <span className={cn("font-heading font-bold text-foreground/25", initialsClassName)}>
            {initialsOf(name)}
          </span>
        </div>
      )}
    </div>
  );
}
