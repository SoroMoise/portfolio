# SORO Colotcholoman Moïse — Portfolio

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
| Validation   | `zod`, one schema shared by the browser and the API route  |
| Mail         | Your own mailbox over SMTP, or Resend — see below           |
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

| Variable                            | Purpose                                                   |
| ----------------------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`              | Override the canonical origin (defaults to the live domain) |
| `SMTP_HOST` `SMTP_USER` `SMTP_PASS` | Send from your own mailbox — see below                     |
| `SMTP_PORT`                         | Optional, defaults to 465 (implicit TLS; use 587 for STARTTLS) |
| `RESEND_API_KEY`                    | Alternative transport, if you prefer not to store a mailbox password |
| `CONTACT_FROM`                      | Resend sender; ignored by the SMTP transport               |
| `CONTACT_EMAIL`                     | Where enquiries land                                       |

### Contact form delivery

`lib/mail.ts` picks a transport from the environment at request time. SMTP wins
when both are set, since it is the more direct route:

- **SMTP** — set `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` and messages are sent
  from your own mailbox into your own inbox, with the visitor's address in
  `Reply-To`. No third party is involved. Gmail requires an *App Password*
  (Google Account → Security → two-step verification, then App passwords), not
  the account password.
- **Resend** — set `RESEND_API_KEY` instead. One `fetch` call, no SDK.

With neither configured the endpoint returns 502 and the form shows an error, on
purpose: a form that silently drops messages is worse than one that admits it is
broken.

Neither option can be removed. A statically served site has nothing that can
open an authenticated SMTP session, and mail sent from an unauthenticated host
is refused or filed as spam by every large provider — so something has to hold
a mailbox credential. The only real choice is whose mailbox it is.

**WhatsApp is the exception.** The contact form also renders a secondary
"continue on WhatsApp" action whose `href` is recomposed from the live field
values (`lib/whatsapp.ts`). It is a plain `wa.me` URL, so it needs no backend
and no configuration — and it keeps working when mail delivery is broken.

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

**Adding project screenshots.** Put files in `public/projects/<slug>/` and list
them in that project's `shots` array. The generated SVG artwork is used
whenever `shots` is empty.

**Linking an app's own landing page.** Set `links.website` on that project in
`lib/content/projects.ts` — one line, nothing else. The secondary button on the
case study, the "Website" badge on the card and the `sameAs` of the app's
structured data all appear from it, and disappear again if it is removed.
`links.github` behaves the same way for a project that is open source. Two of
the three apps have a site today; Background Eraser has the line ready and
commented out.

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
- Home page: ~26 KB gzipped HTML; no dictionary text in any client chunk

---

## Deployment

Vercel, framework preset auto-detected from `vercel.json`. `pnpm-workspace.yaml`
carries `onlyBuiltDependencies` so `sharp` builds for image optimisation.

`SITE_URL` defaults to the production domain, so no environment variable is
needed for a normal deploy — set `NEXT_PUBLIC_SITE_URL` only for previews.
Configure a mail transport (see above) or the contact form will return 502.
