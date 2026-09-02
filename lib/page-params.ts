import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n";

/**
 * Resolve the `[locale]` segment for a page.
 *
 * The layout already rejects unknown locales, but each page re-narrows the
 * `string` param to `Locale` so the dictionary and the localized content maps
 * can be indexed without a cast.
 */
export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<{ locale: Locale; dict: Dictionary }> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale, dict: getDictionary(locale) };
}
