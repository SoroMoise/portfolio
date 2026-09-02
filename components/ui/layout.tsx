import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const widths = {
  narrow: "max-w-3xl",
  prose: "max-w-[68ch]",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  children,
  className,
  width = "default",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  width?: keyof typeof widths;
  as?: ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full px-gutter", widths[width], className)}>{children}</Tag>
  );
}

/**
 * A page section. Vertical rhythm comes from one token (`--ds-section-y`) so
 * every section on the site breathes identically instead of each component
 * inventing its own padding.
 */
export function Section({
  children,
  className,
  id,
  bordered = false,
  tone = "default",
  as: Tag = "section",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Draw a hairline above the section. */
  bordered?: boolean;
  tone?: "default" | "subtle";
  as?: ElementType;
  labelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-section",
        bordered && "border-t border-line",
        tone === "subtle" && "bg-bg-subtle",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Small mono label with a leading rule — the site's recurring section marker. */
export function Eyebrow({
  children,
  className,
  rule = true,
}: {
  children: ReactNode;
  className?: string;
  rule?: boolean;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-micro font-medium uppercase text-fg-subtle",
        className,
      )}
    >
      {rule && <span aria-hidden="true" className="h-px w-8 bg-accent-line" />}
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
  align = "start",
  className,
  level = 2,
  action,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: "start" | "center";
  className?: string;
  level?: 1 | 2;
  action?: ReactNode;
}) {
  const Heading: ElementType = level === 1 ? "h1" : "h2";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow rule={align === "start"}>{eyebrow}</Eyebrow>}

      <div
        className={cn(
          "flex w-full flex-col gap-6",
          action && "sm:flex-row sm:items-end sm:justify-between sm:gap-10",
        )}
      >
        <div className={cn("flex flex-col gap-4", align === "center" && "items-center")}>
          <Heading
            id={id}
            className={cn(
              "font-display text-heading text-fg",
              level === 1 && "text-title",
              align === "center" && "max-w-3xl",
            )}
          >
            {title}
          </Heading>

          {lead && (
            <p
              className={cn(
                "max-w-2xl text-lead text-fg-muted",
                align === "center" && "mx-auto",
              )}
            >
              {lead}
            </p>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

/** Hairline rule used between list items and blocks. */
export function Hairline({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-line", className)} />;
}
