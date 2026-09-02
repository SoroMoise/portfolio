import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-md font-medium " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-200 " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "motion-safe:active:translate-y-px";

const variants = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-hover shadow-xs hover:shadow-soft",
  secondary:
    "border border-line-strong bg-surface text-fg hover:border-accent-line hover:bg-surface-hover",
  ghost: "text-fg-muted hover:bg-surface-hover hover:text-fg",
  outline:
    "border border-line text-fg-muted hover:border-accent-line hover:text-fg",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
  icon: "size-10",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

function classes(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button className={classes(variant, size, className)} {...props} />;
}

/** Internal navigation — always a `next/link`, never a button in a link. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

/**
 * Outbound link. Adds `rel="noreferrer"` and an assistive-only hint that the
 * link opens a new tab.
 */
export function ExternalButtonLink({
  href,
  variant = "secondary",
  size = "md",
  className,
  children,
  newTabLabel,
  ...props
}: Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  newTabLabel: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes(variant, size, className)}
      {...props}
    >
      {children}
      <span className="sr-only"> ({newTabLabel})</span>
    </a>
  );
}
