export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeLabels: Record<Locale, { short: string; long: string }> = {
  fr: { short: "FR", long: "Français" },
  en: { short: "EN", long: "English" },
};

/** BCP-47 tags used for `<html lang>`, hreflang and OpenGraph. */
export const localeTags: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-US",
};

export const openGraphLocales: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** A value that exists in every supported language. */
export type Localized<T> = Record<Locale, T>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
