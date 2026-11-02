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

export function swapLocale(pathname: string, next: Locale): string {
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  return `/${next}${rest}`;
}

export type NavItem = { key: RouteKey; label: string; href: string };

export function navItems(locale: Locale, nav: Dictionary["nav"]): NavItem[] {
  return (["about", "stack", "work", "experience", "contact"] as const).map((key) => ({
    key,
    label: nav[key],
    href: href(locale, key),
  }));
}

export function allPaths(): string[] {
  return routeKeys.map((key) => segments[key]);
}
