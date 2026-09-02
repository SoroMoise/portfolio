"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n";

/** Only the theme strings cross the server/client boundary, not the whole dictionary. */
export type ThemeLabels = Dictionary["theme"];

const noopSubscribe = () => () => {};

/**
 * True once React has hydrated, without a `setState` inside an effect. The
 * server snapshot is `false` and the client snapshot is `true`, so the first
 * client render matches the server output and the swap happens on hydration.
 */
function useHasMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

const order = ["light", "dark", "system"] as const;

export function ThemeToggle({ labels, className }: { labels: ThemeLabels; className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();

  const current = mounted ? (theme ?? "system") : "system";
  const next = order[(order.indexOf(current as (typeof order)[number]) + 1) % order.length];

  const actionLabel: Record<(typeof order)[number], string> = {
    light: labels.light,
    dark: labels.dark,
    system: labels.system,
  };

  // Show what the toggle will *do*, matching the label, so the icon and the
  // accessible name never disagree.
  const Icon = next === "light" ? Sun : next === "dark" ? Moon : Monitor;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      title={actionLabel[next]}
      aria-label={actionLabel[next]}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md border border-line text-fg-muted transition-colors hover:border-accent-line hover:text-fg",
        className,
      )}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span className="sr-only">
        {labels.label}
        {mounted && resolvedTheme ? `: ${resolvedTheme}` : ""}
      </span>
    </button>
  );
}
