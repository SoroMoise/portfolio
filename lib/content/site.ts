import type { Localized } from "@/lib/i18n/config";

/**
 * Every externally-owned fact about the site lives here, transcribed from the
 * CV. Nothing else in the codebase should hardcode a URL, an address or a date.
 */

/**
 * Canonical origin. Set `NEXT_PUBLIC_SITE_URL` in the deployment environment to
 * point the canonical tags, sitemap and OG images at the custom domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://soromoise.vercel.app"
).replace(/\/+$/, "");

export const profile = {
  name: "SORO Colotcholoman Moïse",
  shortName: "Moïse Soro",
  initials: "MS",
  /** The name he publishes mobile apps under. */
  brand: "Codeur d'Ivoire",
  brandUrl: "https://codeurdivoire.com",
  role: {
    fr: "Développeur Full Stack Web & Mobile",
    en: "Full Stack Web & Mobile Developer",
  } satisfies Localized<string>,
  email: "soromoise4@gmail.com",
  phone: "+225 05 64 79 62 21",
  phoneE164: "+2250564796221",
  location: {
    city: "Abidjan",
    country: { fr: "Côte d'Ivoire", en: "Ivory Coast" } satisfies Localized<string>,
    countryCode: "CI",
    timeZone: "Africa/Abidjan",
    /** Abidjan is UTC+0 year-round — no daylight saving. */
    utcOffset: 0,
  },
  company: {
    name: "Arolitec",
    url: "https://arolitec.com",
  },
  languages: [
    {
      id: "fr",
      name: { fr: "Français", en: "French" } satisfies Localized<string>,
      level: { fr: "Langue maternelle", en: "Native" } satisfies Localized<string>,
    },
    {
      id: "en",
      name: { fr: "Anglais", en: "English" } satisfies Localized<string>,
      level: { fr: "Intermédiaire (B1)", en: "Intermediate (B1)" } satisfies Localized<string>,
    },
  ],
  resume: {
    /** Files live in `public/cv/`. */
    href: {
      fr: "/cv/soro-moise-cv-fr.pdf",
      en: "/cv/soro-moise-cv-fr.pdf",
    } satisfies Localized<string>,
    fileName: {
      fr: "SORO-Colotcholoman-Moise-CV.pdf",
      en: "SORO-Colotcholoman-Moise-Resume.pdf",
    } satisfies Localized<string>,
  },
  /**
   * Drop a square portrait (≥800×800, JPG or WebP) at this path and flip
   * `available` to true — the monogram is used until then.
   */
  portrait: {
    src: "/moise-soro.jpg",
    available: false,
  },
  availability: {
    open: true,
  },
  /** First year of professional work, used to compute experience length. */
  careerStartYear: 2023,
} as const;

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  handle: string;
  /** Included in the JSON-LD `sameAs` array — identity profiles only. */
  sameAs: boolean;
  /** Shown in the condensed icon rails (header, hero, footer). */
  primary: boolean;
};

export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/SoroMoise",
    handle: "@SoroMoise",
    sameAs: true,
    primary: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/soro-colotcholoman-mo%C3%AFse-9756b8188",
    handle: "Soro Colotcholoman Moïse",
    sameAs: true,
    primary: true,
  },
  {
    id: "googleplay",
    label: "Google Play",
    href: "https://play.google.com/store/apps/dev?id=4666757015702442188",
    handle: "Codeur d'Ivoire",
    sameAs: true,
    primary: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/2250564796221",
    handle: "+225 05 64 79 62 21",
    sameAs: false,
    primary: true,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com/soro.moise.90",
    handle: "soro.moise.90",
    sameAs: true,
    primary: false,
  },
];

export const githubUsername = "SoroMoise";

export const googlePlayDeveloperUrl =
  "https://play.google.com/store/apps/dev?id=4666757015702442188";

/** Identity URLs for the `Person` JSON-LD node. */
export const sameAs = [
  profile.brandUrl,
  ...socials.filter((s) => s.sameAs).map((s) => s.href),
];
