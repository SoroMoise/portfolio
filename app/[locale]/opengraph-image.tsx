import { ImageResponse } from "next/og";
import { locales, isLocale, defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { profile } from "@/lib/content/site";

/**
 * Social preview card, generated per locale.
 *
 * `opengraph-image` is its own route entrypoint and does not inherit the
 * layout's `generateStaticParams`, so it declares its own — without it the
 * image would be rendered on demand for every crawl instead of prerendered.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SORO Colotcholoman Moïse — Full Stack Web & Mobile Developer";

/*
 * Colours are literals rather than the CSS tokens: the OG renderer resolves no
 * custom properties and no external stylesheet. They mirror the dark theme.
 */
const BG = "#141416";
const FG = "#f4f4f5";
const MUTED = "#a1a1aa";
const ACCENT = "#e9b44c";
const LINE = "#2a2a2e";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 3, background: ACCENT }} />
          <div
            style={{
              color: MUTED,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {profile.brand}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: FG,
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            <span>SORO</span>
            <span style={{ color: ACCENT }}>Colotcholoman Moïse</span>
          </div>

          <div style={{ color: MUTED, fontSize: 30, letterSpacing: -0.5 }}>
            {dict.home.roleLine}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 28,
            color: MUTED,
            fontSize: 24,
          }}
        >
          <span>
            {profile.location.city}, {profile.location.country[locale]}
          </span>
          <span style={{ color: FG }}>{new URL(profile.brandUrl).host}</span>
        </div>
      </div>
    ),
    size,
  );
}
