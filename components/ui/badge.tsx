import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  neutral: "border-line text-fg-muted",
  accent: "border-accent-line bg-accent-soft text-accent",
  positive: "border-positive/35 bg-positive-soft text-positive",
  /* fg-muted, not fg-subtle: this tone sits on `surface-strong`, which is
     light enough that the subtler token drops under 4.5:1. */
  muted: "border-transparent bg-surface-strong text-fg-muted",
} as const;

export function Badge({
  children,
  tone = "neutral",
  className,
  icon: Icon,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  icon?: (props: { className?: string }) => ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-micro font-medium uppercase",
        tones[tone],
        className,
      )}
    >
      {Icon && <Icon className="size-3" />}
      {children}
    </span>
  );
}

/** A technology chip — plain, dense, no colour coding. */
export function TechTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-line bg-bg-subtle px-2 py-1 font-mono text-[0.6875rem] text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** The live availability marker: a dot with a single expanding ring. */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex size-2 shrink-0", className)} aria-hidden="true">
      <span className="absolute inset-0 rounded-full bg-positive motion-safe:animate-pulse-ring" />
      <span className="relative size-2 rounded-full bg-positive" />
    </span>
  );
}
