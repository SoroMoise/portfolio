# SORO Colotcholoman Moïse · Portfolio

Bilingual (FR/EN) portfolio for a full-stack developer in Abidjan. Dark-first
editorial design, fully statically prerendered, no client-side data fetching.

**Live:** https://codeurdivoire.com

---

## Stack

| Concern      | Choice                                                    |
| ------------ | --------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack), React 19               |
| Language     | TypeScript, `strict`                                       |
| Styling      | Tailwind CSS v4 with an OKLCH token system                 |
| Theming      | `next-themes`, class strategy, light/dark/system           |
| Icons        | `lucide-react` + two hand-drawn brand marks                |
| Validation   | `zod`, one schema shared by the browser and the Worker     |
| Mail         | Cloudflare Email Sending, from the Worker (see below)      |
| Analytics    | Cloudflare Web Analytics (dashboard, no script in the repo) |

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
  [locale]/
    layout.tsx                <html lang>, fonts, providers, header, footer
    page.tsx                  home
    about/  stack/  work/  work/[slug]/  experience/  contact/
    page-not-found/page.tsx   localized 404 the Worker serves for unknown paths
    not-found.tsx  error.tsx  opengraph-image.tsx
worker/index.ts               Cloudflare Worker: /api/contact, locale redirect, 404s
wrangler.jsonc                Worker, static assets, Email Sending binding
lib/
  i18n/       config, routes, fr + en dictionaries
  content/    site, projects, experience, stack: the single source of truth
  seo.ts      metadata, hreflang, JSON-LD builders
components/
  ui/         primitives (layout, button, badge, reveal, artwork, icons)
  layout/     header, footer, theme toggle, locale switcher
  sections/   hero, home sections, project card, contact form
```

### Notes on a few decisions

**The locale redirect is the Worker's.** A static export has no proxy, so
`worker/index.ts` negotiates the locale from the `NEXT_LOCALE` cookie (written
by the language switcher and by the redirect itself) then `Accept-Language`
(q-values respected), and replaces (rather than prefixes) a leading segment
that looks like an unsupported language tag, so `/de/work` lands on `/fr/work`
instead of `/fr/de/work`.

**Every route is static.** `generateStaticParams` on the locale segment plus
`dynamicParams = false` prerenders all 35 routes, including one OG image per
locale and one detail page per project per locale. Nothing reads a dynamic API,
so nothing silently opts out of prerendering.

**Content lives in `lib/content/`.** Copy is `Localized<T>` (`{ fr, en }`),
next to the fact it describes, so adding a project or changing a job title is a
single edit in one file. `lib/i18n/dictionaries/fr.ts` is the reference shape;
`en.ts` is typed against it, so a missing translation is a compile error.

**Client components take narrow props.** Everything a client component receives
is serialised into the RSC payload of every page that renders it. The header
gets four strings, not the dictionary.

**The reveal animation never touches opacity.** A scroll-linked animation holds
its start state until the viewport reaches the element, possibly forever, for
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

| Variable               | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Build time: override the canonical origin (defaults to the live domain) |
| `CONTACT_FROM`         | Worker variable: sender address, on the verified sending domain (defaults to `portfolio@codeurdivoire.com`) |
| `CONTACT_EMAIL`        | Worker variable: where enquiries land (defaults to the address in `lib/content/site.ts`) |

### Contact form delivery

The site is a static export, so the form posts to the Worker (`worker/index.ts`,
`/api/contact`), which validates with the same `zod` schema as the browser,
rate-limits per IP (3 messages per 10 minutes and per isolate), drops the
honeypot silently and sends through **Cloudflare Email Sending**, the `EMAIL`
`send_email` binding of `wrangler.jsonc` (`lib/mail.ts`): from
`portfolio@codeurdivoire.com` to your inbox, with the visitor in `Reply-To`. No
mailbox password and no API key: the binding is the credential. Workers Paid
includes 3,000 emails a month.

It needs `codeurdivoire.com` onboarded for sending (Cloudflare dashboard, Email
Service › Email Sending): that adds an MX, an SPF and a DKIM record on the
`cf-bounce` subdomain, and leaves the domain's own MX records (OVH's mail
redirections) untouched. **Add a DMARC record with `p=none` first**: Cloudflare
creates `p=reject` when none exists, which would bounce the mail you send as
`contact@codeurdivoire.com` from Gmail.

Without the binding, or when a send fails, the endpoint returns 502 and the
form shows an error, on purpose: a form that silently drops messages is worse
than one that admits it is broken.

**WhatsApp is the exception.** The contact form also renders a secondary
"continue on WhatsApp" action whose `href` is recomposed from the live field
values (`lib/whatsapp.ts`). It is a plain `wa.me` URL, so it needs no backend
and no configuration, and it keeps working when mail delivery is broken.

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

**Replacing the profile photo.** Drop a roughly square image (≥ 800×800) in
`public/` and point `profile.portrait.src` at it in `lib/content/site.ts`.
Setting `available` to `false` falls back to the monogram.

**Project icons and screenshots.** Each project has a folder in
`public/projects/<slug>/` holding `icon.webp` (256 px) and its store
screenshots as `fr-1.webp`, `en-1.webp`… (720×1280, one set per language, so
the French pages show the French captions). `media(slug, count)` in
`lib/content/projects.ts` builds the paths. The cards stage the first three of
the visitor's language on a backdrop drawn in the site's own palette
(`project-stage` in `app/globals.css`); the case study shows the whole set.
Tarifo has no public listing yet, so its six images are composed from the app's
design screens in its own repository.

**Linking an app's own landing page.** Set `links.website` on that project in
`lib/content/projects.ts`. One line, nothing else. The secondary button on the
case study, the "Website" badge on the card and the `sameAs` of the app's
structured data all appear from it, and disappear again if it is removed.
It is localized (`{ fr, en }`) because each app site serves French under `/fr`.
`links.github` behaves the same way for a project that is open source.

**A project in closed testing.** Set `status: "testing"` and leave
`links.googlePlay` out until the listing is public: the card and the case study
show an "In closed testing" badge instead, and the home page and the hero count
only `live` projects. Flip it to `"live"` and add the store link on release.

**Adding a language.** Add the code to `lib/i18n/config.ts`, create the
dictionary next to `fr.ts` and type it as `Dictionary`, then add the language's
strings to every `Localized<T>` in `lib/content/`. TypeScript will list them.

---

## Quality gates

Verified on the current build:

- `next build`: 35/35 routes prerendered static
- `eslint` and `tsc --noEmit`: clean
- `axe-core`: zero violations across 10 pages × light and dark
- Canonical, hreflang (incl. `x-default`), per-locale OG images, JSON-LD
  (`Person`, `WebSite`, `BreadcrumbList`, `SoftwareApplication`)
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`
- Home page: ~26 KB gzipped HTML; no dictionary text in any client chunk

---

## Deployment

A **static export** (`output: "export"`, written to `out/`) served by
**Cloudflare Workers** static assets and deployed by **Workers Builds** (moved
from Vercel in November 2026). Pages, the Open Graph images, the sitemap, the
CV and the project images are files, served free and unmetered; images are
unoptimized (`images.unoptimized`), so keep them sized before adding them.

`worker/index.ts` runs only for `/api/contact` and for paths no file answers:
a path without a locale (`/`, `/about`) redirects with a 307 to the visitor's
language (the `NEXT_LOCALE` cookie the language switcher sets, then
`Accept-Language`, then French), and anything else gets the localized 404
(`/<locale>/page-not-found`, noindex) with a 404 status. `public/_headers`
carries the security headers.

Workers Builds settings: root directory `/`, build command
`pnpm install --frozen-lockfile && pnpm build`, deploy command
`pnpm run deploy`, non-production branch deploy command
`npx wrangler@4 versions upload`, build variable `NODE_VERSION=22`. Domain:
`codeurdivoire.com` (and `www`, redirected to it), Custom Domains of the
`portfolio` Worker.
