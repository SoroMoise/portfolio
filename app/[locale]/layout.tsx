import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";

import { isLocale, locales, localeTags, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { SITE_URL, profile } from "@/lib/content/site";
import { alternates } from "@/lib/seo";
import { abidjanYear } from "@/lib/time";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/** Editorial display face — one weight, used only for headings and figures. */
const instrumentSerif = Instrument_Serif({
  variable: "--font-display-serif",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Any locale outside the list is a 404, never an on-demand render. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.defaultTitle,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.home.description,
    applicationName: dict.meta.defaultTitle,
    authors: [{ name: profile.name, url: profile.brandUrl }],
    creator: profile.name,
    publisher: profile.name,
    keywords: [
      "Full Stack Developer",
      "Développeur Full Stack",
      "NestJS",
      "React Native",
      "Angular",
      "PostgreSQL",
      "GraphQL",
      "Abidjan",
      "Côte d'Ivoire",
      "Codeur d'Ivoire",
      profile.name,
    ],
    alternates: alternates(locale, ""),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfbf9" },
    { media: "(prefers-color-scheme: dark)", color: "#141416" },
  ],
  colorScheme: "dark light",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);

  /*
   * Resolved once per build, in Abidjan time, and handed down to the footer.
   * Computing it inside a prerendered leaf component would bake the build year
   * into static HTML with no way to notice it had gone stale.
   */
  const year = abidjanYear();

  return (
    <html
      lang={localeTags[locale]}
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="portfolio-theme"
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-fg"
          >
            {dict.nav.skipToContent}
          </a>

          <div className="flex min-h-dvh flex-col">
            <Header
              locale={locale}
              strings={{
                nav: dict.nav,
                theme: dict.theme,
                localeLabel: dict.locale.label,
                downloadCv: dict.common.downloadCv,
              }}
            />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer locale={locale} dict={dict} year={year} />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
