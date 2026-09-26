import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-10 shrink-0 place-items-center overflow-hidden rounded",
        className,
      )}
      aria-hidden
    >
      <Image
        src="/logo.webp"
        alt=""
        fill
        sizes="64px"
        priority
        className="object-contain"
      />
    </span>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="NFVCB home">
      <Mark className="transition-transform duration-500 group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[20px] font-bold tracking-tight text-foreground">
          NFVCB
        </span>
        {/* {!compact && (
          <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:block">
            National Film &amp; Video Censors Board
          </span>
        )} */}
      </span>
    </Link>
  );
}
