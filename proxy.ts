import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

/**
 * Locale routing.
 *
 * `middleware.ts` is deprecated in Next.js 16 — this is the `proxy.ts`
 * replacement. Every page lives under `/[locale]`, so any request without a
 * locale prefix is redirected to the visitor's best match.
 */

const LOCALE_COOKIE = "NEXT_LOCALE";
/** One year, in seconds. */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function hasLocalePrefix(pathname: string): boolean {
  return locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

/**
 * Pick a locale from `Accept-Language`, honouring quality values.
 *
 * Hand-rolled rather than pulling in `negotiator` and
 * `@formatjs/intl-localematcher`: with two supported languages, the full
 * BCP-47 lookup algorithm buys nothing over a sorted prefix match.
 */
function negotiate(header: string | null): Locale | undefined {
  if (!header) return undefined;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      const quality = q === undefined ? 1 : Number.parseFloat(q);
      return {
        base: tag.trim().toLowerCase().split("-")[0],
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .filter((entry) => entry.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  return ranked.find((entry) => locales.includes(entry.base as Locale))?.base as
    | Locale
    | undefined;
}

function resolveLocale(request: NextRequest): Locale {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (fromCookie && locales.includes(fromCookie as Locale)) {
    return fromCookie as Locale;
  }
  return negotiate(request.headers.get("accept-language")) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (hasLocalePrefix(pathname)) {
    // Remember the locale the visitor is actually browsing, so a later visit to
    // a bare path lands in the same language.
    const current = pathname.split("/")[1] as Locale;
    const response = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== current) {
      response.cookies.set(LOCALE_COOKIE, current, {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
        sameSite: "lax",
      });
    }
    return response;
  }

  const locale = resolveLocale(request);

  /*
   * A leading segment that looks like a language tag but is not one we support
   * (`/de/about`, `/es`) gets replaced rather than prefixed. Blindly prefixing
   * would produce `/fr/de/about`, which then 404s for no good reason.
   */
  const rest = pathname.replace(/^\/[a-z]{2}(?:-[a-z]{2})?(?=\/|$)/i, "");
  const looksLikeLocale = rest !== pathname;
  const tail = looksLikeLocale ? rest : pathname === "/" ? "" : pathname;

  const target = new URL(`/${locale}${tail}${search}`, request.url);

  const response = NextResponse.redirect(target);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  /*
   * Skip everything that is not a page: Next internals, the API, and any path
   * with a file extension (favicon, images, the CV, robots.txt, sitemap.xml,
   * manifest.webmanifest, the generated OG images).
   */
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
