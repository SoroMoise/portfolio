# SORO Colotcholoman Moïse — Portfolio

Bilingual (FR/EN) portfolio for a full-stack developer in Abidjan. Dark-first
editorial design, fully statically prerendered, no client-side data fetching.

**Live:** https://soromoise.vercel.app

---

## Stack

| Concern      | Choice                                                    |
| ------------ | --------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack), React 19               |
| Language     | TypeScript, `strict`                                       |
| Styling      | Tailwind CSS v4 with an OKLCH token system                 |
| Theming      | `next-themes`, class strategy, light/dark/system           |
| Icons        | `lucide-react` + two hand-drawn brand marks                |
| Validation   | `zod`, one schema shared by the browser and the API route  |
| Mail         | Resend REST API (no SDK)                                   |
| Analytics    | `@vercel/analytics`                                        |

No animation library. Motion is CSS: a load-time entrance for above-the-fold
content and a scroll-driven `animation-timeline: view()` reveal for the rest.

---

## Architecture

```
app/
  layout.tsx                  pass-through root (no <html>; the locale layout owns it)
  globals.css                 design tokens, base layer, custom utilities
  not-found.tsx               root 404, renders its own document
  robots.ts  sitemap.ts  manifest.ts     must stay at the app root
  api/contact/route.ts        validated, rate-limited, really sends mail
  [locale]/
    layout.tsx                <html lang>, fonts, providers, header, footer
    page.tsx                  home
    about/  stack/  work/  work/[slug]/  experience/  contact/
    [...rest]/page.tsx        catch-all → localized 404 inside the shell
    not-found.tsx  error.tsx  opengraph-image.tsx
proxy.ts                      locale detection + redirect (Next 16 renamed middleware)
lib/
  i18n/       config, routes, fr + en dictionaries
  content/    site, projects, experience, stack — the single source of truth
  seo.ts      metadata, hreflang, JSON-LD builders
components/
  ui/         primitives (layout, button, badge, reveal, artwork, icons)
  layout/     header, footer, theme toggle, locale switcher
  sections/   hero, home sections, project card, contact form
```

### Notes on a few decisions

**`proxy.ts`, not `middleware.ts`.** Next.js 16 deprecates the `middleware`
file convention. The proxy negotiates the locale from the `NEXT_LOCALE` cookie
then `Accept-Language` (q-values respected), and replaces — rather than
prefixes — a leading segment that looks like an unsupported language tag, so
`/de/work` lands on `/fr/work` instead of `/fr/de/work`.

**Every route is static.** `generateStaticParams` on the locale segment plus
`dynamicParams = false` prerenders all 27 routes, including one OG image per
locale and one detail page per project per locale. Nothing reads a dynamic API,
so nothing silently opts out of prerendering.

**Content lives in `lib/content/`.** Copy is `Localized<T>` — `{ fr, en }` —
next to the fact it describes, so adding a project or changing a job title is a
single edit in one file. `lib/i18n/dictionaries/fr.ts` is the reference shape;
`en.ts` is typed against it, so a missing translation is a compile error.

**Client components take narrow props.** Everything a client component receives
is serialised into the RSC payload of every page that renders it. The header
gets four strings, not the dictionary.

**The reveal animation never touches opacity.** A scroll-linked animation holds
its start state until the viewport reaches the element — possibly forever, for
print, a crawler, or a full-page screenshot. Fading text there is a permanent
contrast reduction, so the reveal only translates.

---

## Getting started

```bash
pnpm install
cp .env.example .env.local     # then fill in the values you need
pnpm dev                      # http://localhost:3000 → redirects to /fr or /en
```

```bash
pnpm build      # production build
pnpm start      # serve the build
pnpm lint       # eslint
pnpm typecheck  # tsc --noEmit
```

### Environment variables

All optional for local development; see `.env.example` for the annotated list.

| Variable               | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for canonical tags, hreflang, sitemap, OG      |
| `RESEND_API_KEY`       | Contact form delivery. Without it the endpoint returns 502      |
| `CONTACT_EMAIL`        | Where enquiries land                                            |
| `CONTACT_FROM`         | Verified Resend sender                                          |

The contact endpoint deliberately fails loudly when mail is not configured. A
form that silently drops messages is worse than one that admits it is broken.

---

## Editing the content

| To change…                    | Edit                                        |
| ----------------------------- | ------------------------------------------- |
| Name, email, socials, CV path | `lib/content/site.ts`                       |
| Projects and case studies     | `lib/content/projects.ts`                   |
| Roles and education           | `lib/content/experience.ts`                 |
| Technologies and principles   | `lib/content/stack.ts`                      |
| Any UI string                 | `lib/i18n/dictionaries/{fr,en}.ts`          |
| Colours, type scale, spacing  | the token blocks at the top of `app/globals.css` |

**Adding a profile photo.** Drop a square image (≥ 800×800) at
`public/moise-soro.jpg` and set `profile.portrait.available` to `true` in
`lib/content/site.ts`. Until then the monogram is used.

**Adding project screenshots.** Put files in `public/projects/<slug>/` and list
them in that project's `shots` array. The generated SVG artwork is used
whenever `shots` is empty.

**Adding a language.** Add the code to `lib/i18n/config.ts`, create the
dictionary next to `fr.ts` and type it as `Dictionary`, then add the language's
strings to every `Localized<T>` in `lib/content/`. TypeScript will list them.

---

## Quality gates

Verified on the current build:

- `next build` — 27/27 routes prerendered static
- `eslint` and `tsc --noEmit` — clean
- `axe-core` — zero violations across 10 pages × light and dark
- Canonical, hreflang (incl. `x-default`), per-locale OG images, JSON-LD
  (`Person`, `WebSite`, `BreadcrumbList`, `SoftwareApplication`)
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`
- Home page: ~26 KB gzipped HTML

---

## Deployment

Vercel, framework preset auto-detected from `vercel.json`. `pnpm-workspace.yaml`
carries `onlyBuiltDependencies` so `sharp` builds for image optimisation.

Set `NEXT_PUBLIC_SITE_URL` to the production domain before going live, otherwise
canonical URLs and the sitemap will point at the default host.
