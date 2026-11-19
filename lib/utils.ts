import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default scales. Without these, a custom
 * size such as `text-heading` reads as a text colour, so `cn("text-heading",
 * "text-fg")` silently dropped the size and every section title rendered at
 * 16 px. The lists mirror the `--text-*`, `--shadow-*` and `--ease-*` tokens in
 * `app/globals.css`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "title", "heading", "subheading", "lead", "micro"],
      shadow: ["soft", "float"],
      ease: ["out-expo", "out-quint"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
