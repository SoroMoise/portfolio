import type { Localized } from "@/lib/i18n/config";

export type PrivacySection = {
  id: string;
  title: Localized<string>;
  paragraphs: Localized<string[]>;
};

export const PRIVACY_UPDATED = "2026-11-26";

export const privacySections: PrivacySection[] = [
  {
    id: "responsable",
    title: { fr: "Qui est responsable", en: "Who is responsible" },
    paragraphs: {
      fr: [
        "Ce site et l'outil Apps Analyser sont édités par SORO Colotcholoman Moïse, développeur à Abidjan, Côte d'Ivoire. Pour toute question sur vos données, écrivez à l'adresse indiquée plus bas.",
      ],
      en: [
        "This site and the Apps Analyser tool are run by SORO Colotcholoman Moïse, a developer based in Abidjan, Côte d'Ivoire. For any question about your data, write to the address given below.",
      ],
    },
  },
  {
    id: "site",
    title: { fr: "Ce site (codeurdivoire.com)", en: "This site (codeurdivoire.com)" },
    paragraphs: {
      fr: [
        "Le formulaire de contact transmet votre nom, votre adresse e-mail et votre message par e-mail à ma boîte, pour que je puisse vous répondre. Ils ne sont pas enregistrés dans une base de données du site. Votre adresse IP sert un court instant à limiter les envois abusifs, sans être conservée.",
        "Le site n'utilise ni outil de mesure d'audience, ni publicité, ni cookie de suivi. Il dépose un seul cookie, NEXT_LOCALE, qui retient la langue choisie, et garde le thème clair ou sombre dans votre navigateur.",
        "Le site est hébergé par Cloudflare, qui traite les requêtes techniques (adresse IP, navigateur) pour servir les pages et protéger le site.",
      ],
      en: [
        "The contact form sends your name, email address and message by email to my inbox so that I can reply. They are not stored in any database of the site. Your IP address is used for a moment to limit abusive sending, and is not kept.",
        "The site uses no audience measurement, no advertising and no tracking cookie. It sets a single cookie, NEXT_LOCALE, which remembers the language you chose, and keeps the light or dark theme in your browser.",
        "The site is hosted by Cloudflare, which processes technical request data (IP address, browser) to serve the pages and protect the site.",
      ],
    },
  },
  {
    id: "apps-analyser",
    title: {
      fr: "Apps Analyser (apps-analyser.codeurdivoire.com)",
      en: "Apps Analyser (apps-analyser.codeurdivoire.com)",
    },
    paragraphs: {
      fr: [
        "Apps Analyser est un tableau de bord privé : je suis son seul utilisateur, et il sert à suivre les chiffres de mes propres applications. Son accès est réservé à mon compte.",
        "Quand je connecte mon compte Google, l'outil demande un accès en lecture seule à deux services : AdMob, pour les rapports de revenus publicitaires de mes applications, et BigQuery, pour l'export Google Analytics de mes applications. Il ne lit rien d'autre, n'écrit rien dans ces services et n'accède à aucun autre compte Google.",
        "Il en garde des chiffres agrégés par jour (revenus, impressions, nombres d'événements), dans une base Cloudflare D1. Le jeton d'accès Google y est stocké chiffré. Ces données ne sont ni partagées, ni vendues, ni utilisées pour de la publicité, et ne servent qu'à afficher ce tableau de bord.",
        "L'utilisation des données reçues des API Google respecte le Règlement sur les données utilisateur des services d'API Google, y compris ses exigences d'utilisation limitée. L'accès peut être retiré à tout moment depuis myaccount.google.com/permissions.",
      ],
      en: [
        "Apps Analyser is a private dashboard: I am its only user, and it tracks the figures of my own apps. Access to it is restricted to my account.",
        "When I connect my Google account, the tool asks for read-only access to two services: AdMob, for the ad revenue reports of my apps, and BigQuery, for the Google Analytics export of my apps. It reads nothing else, writes nothing to these services and reaches no other Google account.",
        "It keeps aggregated daily figures (revenue, impressions, event counts) in a Cloudflare D1 database, where the Google access token is stored encrypted. This data is not shared, not sold, not used for advertising, and only serves to display the dashboard.",
        "Apps Analyser's use of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements. Access can be revoked at any time from myaccount.google.com/permissions.",
      ],
    },
  },
  {
    id: "applications",
    title: { fr: "Les applications mobiles", en: "The mobile apps" },
    paragraphs: {
      fr: [
        "Chaque application publiée sous le nom Codeur d'Ivoire a sa propre politique de confidentialité, sur son site et sur sa fiche Google Play.",
      ],
      en: [
        "Each app published under the name Codeur d'Ivoire has its own privacy policy, on its website and on its Google Play listing.",
      ],
    },
  },
  {
    id: "droits",
    title: { fr: "Vos droits", en: "Your rights" },
    paragraphs: {
      fr: [
        "Vous pouvez demander à savoir quelles données vous concernant j'ai reçues, les faire corriger ou supprimer, en écrivant à l'adresse ci-dessous.",
      ],
      en: [
        "You can ask which data about you I have received, and have it corrected or deleted, by writing to the address below.",
      ],
    },
  },
];
