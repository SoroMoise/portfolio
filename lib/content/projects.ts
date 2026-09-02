import type { Localized } from "@/lib/i18n/config";

export type ProjectLinks = {
  googlePlay?: string;
  github?: string;
  website?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: Localized<string>;
  summary: Localized<string>;
  problem: Localized<string>;
  build: Localized<string>;
  outcome: Localized<string>;
  features: Localized<string[]>;
  stack: string[];
  platforms: Array<"android" | "ios" | "web">;
  year: number;
  status: "live" | "archived";
  featured: boolean;
  /** Closed source: these are store-published apps, not repositories. */
  sourceAvailable: boolean;
  links: ProjectLinks;
  /**
   * Hue in degrees (OKLCH) used to tint the generated cover art, so the three
   * cards stay distinguishable without store screenshots in the repo.
   */
  hue: number;
  /**
   * Real screenshots, if any. Drop files in `public/projects/<slug>/` and list
   * them here; the generated artwork is used whenever this is empty.
   */
  shots: string[];
  metrics: Array<{ value: string; label: Localized<string> }>;
  seo: Localized<{ title: string; description: string }>;
};

export const projects: Project[] = [
  {
    slug: "background-eraser",
    name: "Background Eraser",
    tagline: {
      fr: "Le détourage par IA, entièrement sur le téléphone.",
      en: "AI cutouts that never leave the phone.",
    },
    summary: {
      fr: "Background Eraser supprime l'arrière-plan d'une photo par IA sans jamais envoyer l'image sur un serveur : tout le traitement s'exécute sur l'appareil. L'utilisateur reprend ensuite le résultat à la main — pinceau, restauration, zoom — puis exporte en PNG transparent ou en JPG HD.",
      en: "Background Eraser removes a photo's background with AI without ever sending the image to a server — the whole process runs on the device. You then fix the result by hand — brush, restore, zoom — and export a transparent PNG or an HD JPG.",
    },
    problem: {
      fr: "Les outils de détourage grand public envoient l'image sur un serveur : il faut une connexion stable, du forfait data à dépenser à chaque photo, et la photo quitte le téléphone.",
      en: "Consumer cutout tools send the image to a server: you need a stable connection, you spend prepaid data on every photo, and the photo leaves your phone.",
    },
    build: {
      fr: "Une application React Native où l'inférence IA, l'édition et l'export tournent intégralement en local, doublée d'un éditeur manuel pour rattraper les contours que le modèle rate.",
      en: "A React Native app where inference, editing and export all run locally, paired with a manual editor for the edges the model gets wrong.",
    },
    outcome: {
      fr: "Un détourage qui fonctionne en mode avion, sans consommation de data par image, et sans que la photo sorte de l'appareil.",
      en: "Cutouts that work in airplane mode, with no per-image data cost and no photo leaving the device.",
    },
    features: {
      fr: [
        "Suppression d'arrière-plan par IA exécutée entièrement sur l'appareil",
        "Fonctionnement complet hors ligne, de l'import à l'export",
        "Pinceau d'effacement pour reprendre les zones restantes à la main",
        "Outil de restauration pour récupérer une partie effacée par erreur",
        "Zoom pour le travail de précision sur les bords et les détails fins",
        "Export en PNG à fond transparent ou en JPG haute définition",
      ],
      en: [
        "AI background removal running entirely on-device",
        "Fully offline, from import to export",
        "Erase brush for cleaning up whatever the model leaves behind",
        "Restore tool for bringing back anything removed by mistake",
        "Zoom for precision work along edges and fine detail",
        "Export as transparent-background PNG or high-definition JPG",
      ],
    },
    stack: ["React Native", "Expo", "TypeScript", "On-device AI"],
    platforms: ["android"],
    year: 2025,
    status: "live",
    featured: true,
    sourceAvailable: false,
    links: {
      googlePlay: "https://play.google.com/store/apps/details?id=com.codeurdivoire.bgremover",
    },
    hue: 292,
    shots: [],
    metrics: [
      { value: "100 %", label: { fr: "Traitement local", en: "On-device" } },
      { value: "0", label: { fr: "Image envoyée", en: "Images uploaded" } },
      { value: "PNG / JPG", label: { fr: "Formats d'export", en: "Export formats" } },
    ],
    seo: {
      fr: {
        title: "Background Eraser — détourage IA hors ligne",
        description:
          "Détourage photo par IA exécuté entièrement sur l'appareil : retouche manuelle au pinceau, zoom, export PNG transparent ou JPG HD, sans connexion.",
      },
      en: {
        title: "Background Eraser — offline AI photo cutout",
        description:
          "React Native app that removes photo backgrounds with AI entirely on-device: brush and restore editing, transparent PNG or HD JPG export, offline.",
      },
    },
  },
  {
    slug: "currency-converter-offline",
    name: "Currency Converter Offline",
    tagline: {
      fr: "170+ devises, avec ou sans réseau.",
      en: "170+ currencies, signal or not.",
    },
    summary: {
      fr: "Currency Converter Offline conserve les taux en local et les rafraîchit toutes les heures dès qu'une connexion est disponible : la conversion reste utilisable quand le réseau tombe, et la synchronisation reprend d'elle-même au retour. Plus de 170 devises, historique en graphiques, interface en 20 langues.",
      en: "Currency Converter Offline keeps rates locally and refreshes them hourly whenever a connection is available, so conversion keeps working when the network drops and sync picks itself back up when it returns. More than 170 currencies, historical charts, and 20 interface languages.",
    },
    problem: {
      fr: "Un convertisseur qui interroge une API à chaque conversion devient inutilisable exactement au moment où on en a besoin : en déplacement, en zone de couverture faible, ou avec un forfait data épuisé.",
      en: "A converter that calls an API on every conversion breaks at exactly the moment you need it: travelling, in weak coverage, or out of prepaid data.",
    },
    build: {
      fr: "Une architecture offline-first : les taux sont stockés localement et font autorité pour l'affichage, le rafraîchissement horaire s'effectue en arrière-plan quand le réseau le permet, et une synchronisation qui échoue est reprise plus tard sans bloquer l'interface.",
      en: "An offline-first architecture: rates are stored on the device and are the source of truth for the interface, the hourly refresh runs in the background when the network allows, and a failed sync is retried later instead of blocking the UI.",
    },
    outcome: {
      fr: "Une conversion instantanée en permanence, une consommation de data réduite à de courts rafraîchissements, et une interface disponible en 20 langues.",
      en: "Instant conversion at all times, data use reduced to short refreshes, and an interface available in 20 languages.",
    },
    features: {
      fr: [
        "Plus de 170 devises prises en charge",
        "Taux de change rafraîchis toutes les heures",
        "Fonctionnement offline-first avec synchronisation différée",
        "Graphiques d'évolution historique des taux",
        "Interface disponible en 20 langues",
        "Conversion instantanée à partir des données locales, sans attente réseau",
      ],
      en: [
        "More than 170 currencies supported",
        "Exchange rates refreshed every hour",
        "Offline-first operation with deferred synchronisation",
        "Historical charts showing how rates have moved",
        "Interface available in 20 languages",
        "Instant conversion from locally stored data, with no network wait",
      ],
    },
    stack: ["React Native", "Expo", "TypeScript", "REST"],
    platforms: ["android"],
    year: 2024,
    status: "live",
    featured: true,
    sourceAvailable: false,
    links: {
      googlePlay:
        "https://play.google.com/store/apps/details?id=com.codeurdivoire.allcurencyconverter",
    },
    hue: 168,
    shots: [],
    metrics: [
      { value: "170+", label: { fr: "Devises", en: "Currencies" } },
      { value: "20", label: { fr: "Langues", en: "Languages" } },
      { value: "1 h", label: { fr: "Cycle de mise à jour", en: "Refresh cycle" } },
    ],
    seo: {
      fr: {
        title: "Currency Converter Offline — 170+ devises hors ligne",
        description:
          "Convertisseur React Native offline-first : plus de 170 devises, taux rafraîchis chaque heure, synchronisation différée, graphiques et 20 langues.",
      },
      en: {
        title: "Currency Converter Offline — 170+ currencies offline",
        description:
          "Offline-first React Native converter: 170+ currencies, hourly rate refresh, deferred synchronisation, historical charts and 20 supported languages.",
      },
    },
  },
  {
    slug: "simpli-code",
    name: "Simpli Code",
    tagline: {
      fr: "Vos codes USSD et Mobile Money, exécutés en un appui.",
      en: "Every USSD and Mobile Money code, one tap away.",
    },
    summary: {
      fr: "Simpli Code centralise les codes USSD et les services Mobile Money des trois opérateurs — Orange, MTN et Moov — et les exécute à la place de l'utilisateur. L'application gère les téléphones à double SIM, génère les champs de saisie attendus à chaque étape et enchaîne automatiquement les niveaux d'un code multi-étapes.",
      en: "Simpli Code brings together the USSD codes and Mobile Money services of all three operators — Orange, MTN and Moov — and runs them on the user's behalf. It handles dual-SIM phones, generates the input fields each step expects, and chains the levels of a multi-step code automatically.",
    },
    problem: {
      fr: "Les services Mobile Money passent par des codes USSD longs, à plusieurs niveaux, différents chez chaque opérateur, et à ressaisir intégralement à chaque opération ; sur un téléphone à double SIM, la mauvaise ligne fait échouer la transaction.",
      en: "Mobile Money runs on long, multi-level USSD codes that differ by operator and have to be retyped in full for every transaction; on a dual-SIM phone, the wrong line fails the operation outright.",
    },
    build: {
      fr: "Un catalogue de codes par opérateur, des champs de saisie dynamiques pour les paramètres variables, et un moteur d'exécution qui enchaîne les étapes sur la SIM choisie.",
      en: "A catalogue of codes per operator, dynamic input fields for the variable parameters, and an execution engine that chains the steps on the chosen SIM.",
    },
    outcome: {
      fr: "Une opération Mobile Money se déclenche depuis une seule fiche, sur le bon opérateur et la bonne ligne, sans rien mémoriser ni ressaisir.",
      en: "A Mobile Money operation launches from a single saved entry, on the right operator and the right line, with nothing to memorise or retype.",
    },
    features: {
      fr: [
        "Codes USSD d'Orange, MTN et Moov regroupés dans un seul catalogue",
        "Services Mobile Money accessibles au même endroit",
        "Prise en charge du double SIM, avec choix de la ligne au moment de l'exécution",
        "Champs de saisie dynamiques adaptés à chaque code",
        "Exécution automatisée des séquences à plusieurs étapes",
        "Enregistrement et organisation des codes personnels pour réutilisation",
      ],
      en: [
        "Orange, MTN and Moov USSD codes in a single catalogue",
        "Mobile Money services grouped in one place",
        "Dual-SIM support with line selection at execution time",
        "Dynamic input fields matched to each code",
        "Automated execution of multi-step sequences",
        "Personal codes saved and organised for reuse",
      ],
    },
    stack: ["React Native", "Expo", "TypeScript"],
    platforms: ["android"],
    year: 2024,
    status: "live",
    featured: true,
    sourceAvailable: false,
    links: {
      googlePlay: "https://play.google.com/store/apps/details?id=com.codeurdivoire.simplicode",
    },
    hue: 48,
    shots: [],
    metrics: [
      { value: "3", label: { fr: "Opérateurs couverts", en: "Operators covered" } },
      { value: "2", label: { fr: "SIM gérées", en: "SIMs handled" } },
      { value: "1", label: { fr: "Appui par opération", en: "Tap per operation" } },
    ],
    seo: {
      fr: {
        title: "Simpli Code — codes USSD et Mobile Money",
        description:
          "Gestionnaire USSD React Native pour Orange, MTN et Moov : double SIM, champs dynamiques et exécution automatisée des séquences multi-étapes.",
      },
      en: {
        title: "Simpli Code — USSD and Mobile Money manager",
        description:
          "React Native USSD manager for Orange, MTN and Moov: dual SIM, dynamic input fields and automated execution of multi-step sequences.",
      },
    },
  },
];

/** Confidential day-job work, presented as substance rather than an absence. */
export const clientWork = {
  title: {
    fr: "Travail client chez Arolitec",
    en: "Client work at Arolitec",
  } satisfies Localized<string>,
  body: {
    fr: [
      "L'essentiel de mon travail depuis 2023 ne peut pas être montré ici : ce sont des applications bancaires internes, couvertes par les règles de confidentialité de leurs utilisateurs. Ce que je peux décrire, c'est le contenu technique : des schémas PostgreSQL modélisés à partir des règles métier, des API REST et GraphQL en Node.js et NestJS reliées à des services tiers, des back-offices Angular, React et Remix alignés sur les processus opérationnels, une gestion des profils utilisateurs et des droits d'accès (RBAC) appliquée au niveau de l'API, des tests unitaires et d'intégration, des revues de code, des pipelines CI/CD, des images Docker et des déploiements sur serveurs Linux.",
      "Cette confidentialité, je la respecte pour mes futurs clients exactement comme pour l'actuel. Je peux en revanche détailler l'architecture, les choix de modélisation et les compromis lors d'un entretien, schéma au tableau, sans exposer une donnée ni une ligne de code client. Et si vous voulez juger mon travail sans NDA, les trois applications publiées sur Google Play sont la partie visible de la même pratique : elles sont téléchargeables dès maintenant.",
    ],
    en: [
      "Most of what I have built since 2023 cannot be shown here: these are internal banking applications, covered by the confidentiality their users require. What I can describe is the engineering: PostgreSQL schemas modelled from business rules, REST and GraphQL APIs in Node.js and NestJS wired to third-party services, Angular, React and Remix back-offices that follow real operational processes, user-profile and access-rights management (RBAC) enforced at the API layer, unit and integration tests, code reviews, CI/CD pipelines, Docker images and deployments on Linux servers.",
      "I hold to that confidentiality for future clients exactly as I do for the current one. What I can do is walk through the architecture, the modelling choices and the trade-offs in an interview, on a whiteboard, without exposing a single record or line of client code. And if you want to judge my work without an NDA, the three apps on Google Play are the visible half of the same practice: you can download them right now.",
    ],
  } satisfies Localized<string[]>,
  stack: [
    "NestJS",
    "Node.js",
    "GraphQL",
    "REST",
    "PostgreSQL",
    "Angular",
    "React",
    "Remix",
    "Docker",
    "CI/CD",
    "Linux",
  ],
};

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** The project after `slug`, wrapping around — powers the "next project" link. */
export function nextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}

export const featuredProjects = projects.filter((p) => p.featured);
