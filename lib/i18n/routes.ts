import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/fr";

export const routeKeys = [
  "home",
  "about",
  "stack",
  "work",
  "experience",
  "contact",
] as const;

export type RouteKey = (typeof routeKeys)[number];

/**
 * Path segments are shared across languages — only the locale prefix changes.
 * Translating the slugs too would double the URL surface for no SEO gain and
 * break every link the moment a translation is edited.
 */
const segments: Record<RouteKey, string> = {
  home: "",
  about: "/about",
  stack: "/stack",
  work: "/work",
  experience: "/experience",
  contact: "/contact",
};

export function href(locale: Locale, key: RouteKey): string {
  return `/${locale}${segments[key]}`;
}

export function projectHref(locale: Locale, slug: string): string {
  return `/${locale}/work/${slug}`;
}

/** Rewrite the current path onto another locale, preserving the rest of it. */
export function swapLocale(pathname: string, next: Locale): string {
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  return `/${next}${rest}`;
}

export type NavItem = { key: RouteKey; label: string; href: string };

/** Nav entries in display order — `home` is reached through the wordmark. */
export function navItems(locale: Locale, nav: Dictionary["nav"]): NavItem[] {
  return (["about", "stack", "work", "experience", "contact"] as const).map((key) => ({
    key,
    label: nav[key],
    href: href(locale, key),
  }));
}

/** Every canonical path, used to build the sitemap. */
export function allPaths(): string[] {
  return routeKeys.map((key) => segments[key]);
}
