import { notFound } from "next/navigation";

/**
 * Catch-all under a valid locale.
 *
 * Without it, `/fr/anything` falls through to the root 404, which renders
 * outside the `[locale]` layout — no `<html lang>`, no `<main>` landmark, and
 * none of the site chrome. Calling `notFound()` here returns a real 404 status
 * while rendering `app/[locale]/not-found.tsx` inside the localized document.
 */
export const dynamicParams = true;

export default function CatchAllNotFound(): never {
  notFound();
}
