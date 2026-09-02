import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content/site";

/**
 * Must live at the app root: Next anchors the robots route match to `/robots`,
 * so a copy under `[locale]` would silently produce no /robots.txt at all.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
