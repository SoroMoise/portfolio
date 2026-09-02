import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { getDictionary } from "@/lib/i18n";
import { defaultLocale, localeTags } from "@/lib/i18n/config";
import { href } from "@/lib/i18n/routes";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-display-serif",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/**
 * Root 404, reached only by paths the locale proxy skips — anything with a file
 * extension, essentially. The root layout is a pass-through, so this page has
 * to render the whole document itself, including `<html lang>`.
 */
export default function RootNotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <html
      lang={localeTags[defaultLocale]}
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-dvh antialiased">
        <main className="flex min-h-dvh flex-col items-center justify-center gap-8 px-gutter text-center">
          <p className="font-display text-display leading-none text-accent">
            {dict.notFound.code}
          </p>
          <h1 className="font-display text-title text-fg">{dict.notFound.title}</h1>
          <p className="max-w-xl text-lead text-fg-muted">{dict.notFound.body}</p>
          <a
            href={href(defaultLocale, "home")}
            className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-fg"
          >
            {dict.notFound.cta}
          </a>
        </main>
      </body>
    </html>
  );
}
