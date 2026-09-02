import type { Metadata } from "next";
import { locales, localeTags, openGraphLocales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { profile, sameAs, SITE_URL } from "@/lib/content/site";

/**
 * Build the `alternates` block for a page.
 *
 * `path` is the locale-independent part of the URL ("" for the home page,
 * "/work/simpli-code" for a project). Every page gets a self-referencing
 * canonical plus an hreflang entry per locale and an `x-default` pointing at
 * French, which is the primary language of the site.
 */
export function alternates(locale: Locale, path: string): Metadata["alternates"] {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [localeTags[l], `${SITE_URL}/${l}${path}`])),
      "x-default": `${SITE_URL}/fr${path}`,
    },
  };
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  /** Absolute or root-relative OG image path; defaults to the locale's generated one. */
  image,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const dict = getDictionary(locale);

  return {
    title,
    description,
    alternates: alternates(locale, path),
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: dict.meta.defaultTitle,
      locale: openGraphLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => openGraphLocales[l]),
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/**
 * `Person` + `WebSite` graph for the home page. Emitted once per locale so the
 * localised job title and description are the ones crawlers read.
 */
export function personJsonLd(locale: Locale) {
  const dict = getDictionary(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        alternateName: profile.shortName,
        jobTitle: profile.role[locale],
        description: dict.meta.home.description,
        email: `mailto:${profile.email}`,
        telephone: profile.phoneE164,
        url: `${SITE_URL}/${locale}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location.city,
          addressCountry: profile.location.countryCode,
        },
        worksFor: {
          "@type": "Organization",
          name: profile.company.name,
          url: profile.company.url,
        },
        knowsLanguage: profile.languages.map((l) => l.name[locale]),
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/${locale}`,
        name: dict.meta.defaultTitle,
        description: dict.meta.home.description,
        inLanguage: localeTags[locale],
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  trail: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path}`,
    })),
  };
}

/** `SoftwareApplication` node for a published mobile app. */
export function softwareAppJsonLd({
  locale,
  name,
  description,
  url,
  downloadUrl,
}: {
  locale: Locale;
  name: string;
  description: string;
  url: string;
  downloadUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    ...(downloadUrl ? { downloadUrl, installUrl: downloadUrl } : {}),
    applicationCategory: "MobileApplication",
    operatingSystem: "Android",
    inLanguage: localeTags[locale],
    author: { "@id": `${SITE_URL}/#person` },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}
