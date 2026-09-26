"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};

/** True only after hydration — the active theme is not known on the server. */
function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

const options = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

/**
 * Navbar toggle: switches straight between light and dark.
 *
 * Renders a neutral placeholder until mounted, because the active theme is only
 * known on the client and rendering the wrong icon would flash on hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div
        className={cn(
          "size-10 shrink-0 rounded-full border border-border bg-foreground/[0.04]",
          className,
        )}
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const next = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        "group relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-border",
        "bg-foreground/[0.04] text-muted-foreground transition-all duration-300",
        "hover:border-primary/40 hover:text-foreground active:scale-95",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute size-[18px] transition-all duration-500",
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />
      <Moon
        className={cn(
          "absolute size-[18px] transition-all duration-500",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
        )}
      />
    </button>
  );
}

/**
 * Explicit two-way selector for the mobile drawer, where a single cycling
 * button gives no indication of what the options are.
 */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-border bg-foreground/[0.04] p-1",
        className,
      )}
      role="group"
      aria-label="Colour theme"
    >
      {options.map((o) => {
        const active = mounted && resolvedTheme === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => setTheme(o.value)}
            aria-pressed={active}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-all duration-300",
              active
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
            )}
          >
            <o.Icon className="size-4" />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
