import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered entrance, done entirely in CSS with a `view()` animation
 * timeline (see `.reveal` in globals.css).
 *
 * A server component on purpose. The previous implementation used Framer
 * Motion's `whileInView`, which renders the whole page at `opacity: 0` and
 * only reveals it once the client bundle has hydrated — so on a slow
 * connection the site was blank, and with JavaScript disabled it stayed blank.
 * Here the markup ships visible, and browsers that support scroll timelines add
 * the motion on top. The animation moves the element and never touches its
 * opacity, so text keeps full contrast even where nothing ever scrolls.
 */
export function Reveal({
  children,
  className,
  delay,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Seconds of offset, for deliberately staggered groups. */
  delay?: number;
  as?: ElementType;
}) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Load-time entrance for above-the-fold content, where waiting for a scroll
 * would mean waiting forever. Runs once, then holds its final state.
 */
export function Enter({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  return (
    <Tag
      className={cn("motion-safe:animate-rise", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
