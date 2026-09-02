import type { MetadataRoute } from "next";
import { locales, localeTags, defaultLocale } from "@/lib/i18n/config";
import { allPaths } from "@/lib/i18n/routes";
import { projects } from "@/lib/content/projects";
import { SITE_URL } from "@/lib/content/site";

/**
 * One entry per page, listed under the default locale with an hreflang
 * alternate for every other language — the shape Google expects for a
 * multilingual site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...allPaths(), ...projects.map((p) => `/work/${p.slug}`)];

  return paths.map((path) => ({
    url: `${SITE_URL}/${defaultLocale}${path}`,
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : path === "/work" ? 0.9 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [localeTags[locale], `${SITE_URL}/${locale}${path}`]),
      ),
    },
  }));
}
