import type { ReactNode } from "react";

/**
 * Pass-through root layout.
 *
 * Every route lives under `app/[locale]`, and that layout renders the real
 * `<html>` / `<body>` so `lang` can reflect the requested locale. Next still
 * requires a root layout to exist, so this one only forwards its children —
 * emitting a second `<html>` here would nest two documents.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
