import type { Localized } from "@/lib/i18n/config";

/**
 * Canonical origin for canonical tags, hreflang alternates, the sitemap and the
 * OG images. `NEXT_PUBLIC_SITE_URL` overrides it (useful for preview
 * deployments), but the default is the production domain so a missing
 * environment variable cannot silently point the whole site at a stale host.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://codeurdivoire.com"
).replace(/\/+$/, "");

export const profile = {
  name: "SORO Colotcholoman Moïse",
  shortName: "Moïse Soro",
  initials: "MS",
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
    country: {
      fr: "Côte d'Ivoire",
      en: "Ivory Coast",
    } satisfies Localized<string>,
    countryCode: "CI",
    timeZone: "Africa/Abidjan",
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
      level: {
        fr: "Langue maternelle",
        en: "Native",
      } satisfies Localized<string>,
    },
    {
      id: "en",
      name: { fr: "Anglais", en: "English" } satisfies Localized<string>,
      level: {
        fr: "Intermédiaire (B1)",
        en: "Intermediate (B1)",
      } satisfies Localized<string>,
    },
  ],
  resume: {
    href: {
      fr: "/cv/soro-moise-cv-fr.pdf",
      en: "/cv/soro-moise-cv-fr.pdf",
    } satisfies Localized<string>,
    fileName: {
      fr: "SORO-Colotcholoman-Moise-CV.pdf",
      en: "SORO-Colotcholoman-Moise-Resume.pdf",
    } satisfies Localized<string>,
  },
  portrait: {
    src: "/moise-soro.jpeg",
    available: true,
  },
  availability: {
    open: true,
  },
  careerStartYear: 2023,
} as const;

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  handle: string;
  sameAs: boolean;
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

export const sameAs = [
  profile.brandUrl,
  ...socials.filter((s) => s.sameAs).map((s) => s.href),
];

export const adsenseClientId = "ca-pub-1484915286810219";

export const adsenseScriptUrl = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`;
