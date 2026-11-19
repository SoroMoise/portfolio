import type { Localized } from "@/lib/i18n/config";

export type ProjectLinks = {
  googlePlay?: string;
  github?: string;
  website?: Localized<string>;
};

export type ProjectStatus = "live" | "testing";

export type Project = {
  slug: string;
  name: string;
  category: Localized<string>;
  tagline: Localized<string>;
  summary: Localized<string>;
  problem: Localized<string>;
  build: Localized<string>;
  outcome: Localized<string>;
  features: Localized<string[]>;
  stack: string[];
  platforms: Array<"android" | "ios" | "web">;
  year: number;
  status: ProjectStatus;
  featured: boolean;
  sourceAvailable: boolean;
  links: ProjectLinks;
  icon: string;
  shots: Localized<string[]>;
  metrics: Array<{ value: string; label: Localized<string> }>;
  seo: Localized<{ title: string; description: string }>;
};

/**
 * Store screenshots live in `public/projects/<slug>/` as `<locale>-<n>.webp`
 * (720 × 1280), next to a 256 px `icon.webp`. The first three of a locale are
 * the ones the cards stage; the case study shows them all.
 */
function media(slug: string, count: number) {
  const list = (locale: string) =>
    Array.from({ length: count }, (_, i) => `/projects/${slug}/${locale}-${i + 1}.webp`);

  return {
    icon: `/projects/${slug}/icon.webp`,
    shots: { fr: list("fr"), en: list("en") } satisfies Localized<string[]>,
  };
}

function site(origin: string, paths: Localized<string>): Localized<string> {
  return { fr: `${origin}${paths.fr}`, en: `${origin}${paths.en}` };
}

export const projects: Project[] = [
  {
    slug: "background-eraser",
    name: "BG Remover",
    category: { fr: "Photo · IA embarquée", en: "Photo · On-device AI" },
    tagline: {
      fr: "Le détourage par IA, sans que la photo quitte le téléphone.",
      en: "AI cutouts that never leave the phone.",
    },
    summary: {
      fr: "BG Remover détoure le sujet d'une photo en un geste, puis permet de changer le fond, d'affiner les contours et d'exporter une image propre. L'IA tourne sur le téléphone : aucune photo n'est envoyée, et l'application fonctionne hors ligne après une installation unique. Elle produit aussi des photos d'identité aux formats officiels et traite jusqu'à 30 photos d'un coup.",
      en: "BG Remover cuts the subject out of a photo in one tap, then lets you change the background, refine the edges and export a clean image. The AI runs on the phone: no photo is uploaded, and after a one-time setup it works offline. It also produces ID photos in official sizes and processes up to 30 photos in one batch.",
    },
    problem: {
      fr: "Les outils de détourage grand public envoient chaque image sur un serveur : il faut du réseau, la photo quitte le téléphone, et le service se paie souvent au crédit, image par image.",
      en: "Mainstream cutout tools upload every image to a server: you need a connection, the photo leaves your phone, and the service is often paid in credits, one image at a time.",
    },
    build: {
      fr: "Une application React Native où la segmentation, l'édition et l'export tournent en local, avec un éditeur manuel (pinceau, lasso, baguette magique, mode détails pour les cheveux) pour les contours que le modèle rate, et une mise en page des photos d'identité en planche à 300 dpi.",
      en: "A React Native app where segmentation, editing and export all run locally, with a manual editor (brush, lasso, magic wand, a details mode for hair) for the edges the model misses, and ID photo layouts printed as 300 dpi sheets.",
    },
    outcome: {
      fr: "Un détourage qui fonctionne en mode avion, sans coût par image ni envoi de données, disponible en 20 langues pour un public international.",
      en: "Cutouts that work in airplane mode, with no per-image cost and no data sent anywhere, available in 20 languages for an international audience.",
    },
    features: {
      fr: [
        "Détourage automatique par IA, exécuté sur l'appareil",
        "Fonds transparents, couleurs, dégradés, flou ou scènes studio",
        "Pinceau, lasso, baguette magique et mode détails pour cheveux et fourrure",
        "Photos d'identité et de passeport aux formats officiels, planche à 300 dpi",
        "Traitement par lot jusqu'à 30 photos avec les mêmes réglages",
        "Export PNG transparent ou JPG jusqu'en 4K, et stickers WhatsApp",
      ],
      en: [
        "Automatic AI cutout, run on the device",
        "Transparent, solid, gradient, blurred or studio backgrounds",
        "Brush, lasso, magic wand and a details mode for hair and fur",
        "ID and passport photos in official sizes, 300 dpi print sheets",
        "Batch processing of up to 30 photos with the same settings",
        "Transparent PNG or JPG export up to 4K, plus WhatsApp stickers",
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
      website: site("https://bg-remover.codeurdivoire.com", { fr: "/fr", en: "/en" }),
    },
    ...media("background-eraser", 6),
    metrics: [
      { value: "0", label: { fr: "Photo envoyée", en: "Photos uploaded" } },
      { value: "30", label: { fr: "Photos par lot", en: "Photos per batch" } },
      { value: "4K", label: { fr: "Export maximal", en: "Maximum export" } },
    ],
    seo: {
      fr: {
        title: "BG Remover : détourage photo par IA hors ligne",
        description:
          "Détourage photo par IA exécuté sur l'appareil : nouveaux fonds, contours précis, photos d'identité, lots de 30 photos, export PNG ou 4K, hors ligne.",
      },
      en: {
        title: "BG Remover: offline AI background remover",
        description:
          "React Native app that removes photo backgrounds with on-device AI: new backdrops, precise edges, ID photos, 30-photo batches and 4K export, offline.",
      },
    },
  },
  {
    slug: "noise-remover",
    name: "Noise Remover",
    category: { fr: "Audio · IA embarquée", en: "Audio · On-device AI" },
    tagline: {
      fr: "Une voix nette, nettoyée sur le téléphone.",
      en: "A clean voice, processed on the phone.",
    },
    summary: {
      fr: "Noise Remover retire le bruit de fond d'un enregistrement vocal en un geste (ventilateur, climatisation, rue, vent, clavier) directement sur le téléphone, hors ligne, sans compte et sans envoi. Pensée pour les créateurs (podcasts, YouTube, Reels, voix off), l'application enregistre, importe un fichier ou la bande son d'une vidéo, nettoie jusqu'à 20 fichiers d'un coup et exporte en M4A, WAV, MP3 ou Opus.",
      en: "Noise Remover strips background noise from a voice recording in one tap (fans, air conditioning, traffic, wind, keyboards) right on the phone, offline, with no account and no upload. Built for creators (podcasts, YouTube, Reels, voice-overs), it records, imports a file or a video's soundtrack, cleans up to 20 files at once and exports to M4A, WAV, MP3 or Opus.",
    },
    problem: {
      fr: "Les débruiteurs en ligne exigent l'envoi du fichier, un compte et des crédits, et beaucoup ajoutent un filigrane ou bloquent l'export une fois le traitement fait. Pour un créateur sur un Android de milieu de gamme, c'est du temps, de la data et de la confidentialité perdus.",
      en: "Online noise removers want an upload, an account and credits, and many add a watermark or lock the export once the work is done. For a creator on a mid-range Android phone, that costs time, data and privacy.",
    },
    build: {
      fr: "Un module natif Android en C++ (JNI) qui enchaîne la réduction de bruit par réseau de neurones (RNNoise, et DPDFNet via ONNX Runtime), la normalisation du volume EBU R128, un filtre coupe-bas, dix préréglages de voix podcast et l'encodage final. Les longs fichiers continuent d'être traités en arrière-plan, avec une notification de progression.",
      en: "A native Android module in C++ (JNI) that chains neural noise reduction (RNNoise, and DPDFNet through ONNX Runtime), EBU R128 loudness normalization, a low-cut filter, ten podcast-voice presets and the final encode. Long files keep cleaning in the background, with a progress notification.",
    },
    outcome: {
      fr: "Un fichier prêt à publier en moins d'une minute, sans que l'audio quitte le téléphone, et une version gratuite qui laisse enregistrer le résultat sans filigrane.",
      en: "A publish-ready file in under a minute, without the audio ever leaving the phone, and a free tier that lets you save the result with no watermark.",
    },
    features: {
      fr: [
        "Réduction du bruit par IA, pensée pour la voix, sur l'appareil",
        "Comparaison avant/après instantanée et curseur d'intensité",
        "Normalisation du volume et dix préréglages de voix podcast",
        "Enregistrement au micro filaire, USB ou Bluetooth, avec repères de prises",
        "Nettoyage de la bande son d'une vidéo et lots de 20 fichiers",
        "Export M4A, WAV, MP3 ou Opus, stéréo conservée",
      ],
      en: [
        "AI noise reduction tuned for voice, on the device",
        "Instant before-and-after switch and a strength slider",
        "Loudness normalization and ten podcast-voice presets",
        "Recording with wired, USB or Bluetooth mics, with retake markers",
        "Video soundtrack cleaning and 20-file batches",
        "M4A, WAV, MP3 or Opus export, stereo preserved",
      ],
    },
    stack: ["React Native", "Expo", "TypeScript", "C++ / JNI", "ONNX Runtime"],
    platforms: ["android"],
    year: 2026,
    status: "live",
    featured: true,
    sourceAvailable: false,
    links: {
      googlePlay: "https://play.google.com/store/apps/details?id=com.codeurdivoire.noiseremover",
      website: site("https://noise-remover.codeurdivoire.com", { fr: "/fr", en: "/" }),
    },
    ...media("noise-remover", 6),
    metrics: [
      { value: "0", label: { fr: "Fichier envoyé", en: "Files uploaded" } },
      { value: "20", label: { fr: "Fichiers par lot", en: "Files per batch" } },
      { value: "4", label: { fr: "Formats d'export", en: "Export formats" } },
    ],
    seo: {
      fr: {
        title: "Noise Remover : débruitage de la voix hors ligne",
        description:
          "Réduction du bruit de fond par IA sur le téléphone : module natif C++, normalisation EBU R128, voix podcast, lots de 20 fichiers, export MP3 ou WAV.",
      },
      en: {
        title: "Noise Remover: offline AI voice cleaner",
        description:
          "On-device AI background noise removal: a native C++ module, EBU R128 loudness, podcast-voice presets, 20-file batches and MP3, WAV or Opus export.",
      },
    },
  },
  {
    slug: "currency-converter-offline",
    name: "Currency Converter Offline",
    category: { fr: "Finance · Hors ligne", en: "Finance · Offline-first" },
    tagline: {
      fr: "148 devises, avec ou sans réseau.",
      en: "148 currencies, signal or not.",
    },
    summary: {
      fr: "Currency Converter Offline convertit un montant dans 148 devises à la fois, avec les taux en direct quand le téléphone est connecté et les taux enregistrés quand il ne l'est pas. Calculatrice intégrée, historique des taux sur cinq ans, alertes de taux cible, widget d'écran d'accueil et export PDF ou CSV, dans une interface en 20 langues.",
      en: "Currency Converter Offline converts an amount into 148 currencies at once, using live rates when the phone is online and saved rates when it is not. A built-in calculator, five years of rate history, target-rate alerts, a home-screen widget and PDF or CSV export, in an interface available in 20 languages.",
    },
    problem: {
      fr: "Un convertisseur qui interroge une API à chaque conversion devient inutilisable exactement au moment où on en a besoin : en voyage, à l'étranger sans itinérance, ou en zone de couverture faible.",
      en: "A converter that calls an API on every conversion breaks at exactly the moment you need it: traveling, abroad without roaming, or in weak coverage.",
    },
    build: {
      fr: "Une architecture offline-first : les taux stockés sur l'appareil font autorité pour l'affichage, le rafraîchissement se fait en arrière-plan dès que le réseau le permet, une synchronisation qui échoue est reprise plus tard sans bloquer l'interface, et les alertes de taux sont vérifiées même application fermée.",
      en: "An offline-first architecture: rates stored on the device are the source of truth for the interface, the refresh runs in the background whenever the network allows, a failed sync is retried later instead of blocking the UI, and rate alerts are checked even with the app closed.",
    },
    outcome: {
      fr: "Une conversion instantanée en permanence, une consommation de data réduite à de courts rafraîchissements, et plus de 1 000 installations sur Google Play.",
      en: "Instant conversion at all times, data use reduced to short refreshes, and more than 1,000 installs on Google Play.",
    },
    features: {
      fr: [
        "148 devises converties toutes à la fois à partir d'un seul montant",
        "Fonctionnement hors ligne sur les derniers taux enregistrés",
        "Calculatrice intégrée : 120 x 3 + 45 converti pendant la saisie",
        "Historique des taux jusqu'à cinq ans, avec minimum, maximum et moyenne",
        "Alertes de taux cible, même application fermée",
        "Widget d'écran d'accueil, export PDF ou CSV et sauvegarde Google Drive",
      ],
      en: [
        "148 currencies, all converted at once from a single amount",
        "Works offline on the last saved rates",
        "Built-in calculator: 120 x 3 + 45 converted as you type",
        "Rate history up to five years, with low, high and average",
        "Target-rate alerts, even with the app closed",
        "Home-screen widget, PDF or CSV export and Google Drive backup",
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
      website: site("https://all-currency-converter.codeurdivoire.com", { fr: "/fr", en: "/" }),
    },
    ...media("currency-converter-offline", 6),
    metrics: [
      { value: "148", label: { fr: "Devises", en: "Currencies" } },
      { value: "20", label: { fr: "Langues", en: "Languages" } },
      { value: "1K+", label: { fr: "Installations", en: "Installs" } },
    ],
    seo: {
      fr: {
        title: "Currency Converter Offline : 148 devises hors ligne",
        description:
          "Convertisseur React Native offline-first : 148 devises, calculatrice, historique sur cinq ans, alertes de taux, widget et interface en 20 langues.",
      },
      en: {
        title: "Currency Converter Offline: 148 currencies offline",
        description:
          "Offline-first React Native converter: 148 currencies, a built-in calculator, five-year rate history, rate alerts, a widget and 20 languages.",
      },
    },
  },
  {
    slug: "deep-focus",
    name: "Deep Focus",
    category: { fr: "Productivité", en: "Productivity" },
    tagline: {
      fr: "Les distractions bloquées, le temps d'une session.",
      en: "Distractions blocked for as long as the session runs.",
    },
    summary: {
      fr: "Deep Focus bloque les applications qui dispersent l'attention pendant des sessions de concentration minutées (25, 50 ou 90 minutes, ou toute durée). Un mode strict empêche d'arrêter avant la fin, les notifications des applications bloquées sont mises en sourdine, et les séries quotidiennes, les statistiques et un widget d'écran d'accueil entretiennent l'habitude. Sans compte, sans collecte de données, hors ligne.",
      en: "Deep Focus blocks the apps that scatter your attention during timed focus sessions (25, 50 or 90 minutes, or any length). Strict mode stops you quitting early, notifications from blocked apps are snoozed, and daily streaks, statistics and a home-screen widget keep the habit going. No account, no data collection, fully offline.",
    },
    problem: {
      fr: "Les bloqueurs d'applications demandent souvent un compte, envoient l'usage du téléphone vers un serveur, ou se contournent en deux gestes. Et un minuteur qui dérive dès que l'application passe en arrière-plan ne tient pas une séance de travail.",
      en: "App blockers often want an account, send your phone usage to a server, or can be bypassed in two taps. And a timer that drifts the moment the app goes to the background cannot hold a work session.",
    },
    build: {
      fr: "Trois modules Expo natifs écrits en Kotlin : un service d'accessibilité qui affiche un écran de blocage au-dessus des applications choisies, la lecture du temps d'écran réel, et un widget dont le compte à rebours reste juste même application fermée. Le minuteur se cale sur l'horloge murale, si bien qu'une session survit à l'arrêt du processus.",
      en: "Three native Expo modules written in Kotlin: an accessibility service that raises a blocking screen over the chosen apps, a reader for the phone's real screen time, and a widget whose countdown stays correct while the app is closed. The timer runs on wall-clock time, so a session survives the process being killed.",
    },
    outcome: {
      fr: "Une session de concentration qui tient vraiment, sans compte ni donnée qui quitte le téléphone, en 20 langues avec la prise en charge de l'écriture de droite à gauche.",
      en: "A focus session that actually holds, with no account and no data leaving the phone, in 20 languages with right-to-left support.",
    },
    features: {
      fr: [
        "Sessions de 25, 50 ou 90 minutes, ou toute durée sur une roue",
        "Blocage réel des applications choisies pendant la session",
        "Mode strict : impossible d'arrêter avant la fin du minuteur",
        "Notifications des applications bloquées mises en sourdine",
        "Temps d'écran réel, objectif quotidien, séries et statistiques",
        "Widget d'écran d'accueil avec un compte à rebours en direct",
      ],
      en: [
        "25, 50 or 90-minute sessions, or any length on a wheel",
        "Real blocking of the chosen apps for the length of the session",
        "Strict mode: no way out before the timer ends",
        "Notifications from blocked apps snoozed until the end",
        "Real screen time, a daily goal, streaks and statistics",
        "Home-screen widget with a live countdown",
      ],
    },
    stack: ["React Native", "Expo", "TypeScript", "Kotlin"],
    platforms: ["android"],
    year: 2026,
    status: "live",
    featured: true,
    sourceAvailable: false,
    links: {
      googlePlay: "https://play.google.com/store/apps/details?id=com.codeurdivoire.deepfocus",
      website: site("https://deep-focus.codeurdivoire.com", { fr: "/fr", en: "/" }),
    },
    ...media("deep-focus", 6),
    metrics: [
      { value: "3", label: { fr: "Modules natifs", en: "Native modules" } },
      { value: "0", label: { fr: "Compte requis", en: "Accounts required" } },
      { value: "20", label: { fr: "Langues", en: "Languages" } },
    ],
    seo: {
      fr: {
        title: "Deep Focus : bloqueur d'applications et minuteur",
        description:
          "Sessions de concentration minutées qui bloquent les applications distrayantes : mode strict, modules natifs Kotlin, widget, séries, sans compte.",
      },
      en: {
        title: "Deep Focus: app blocker and focus timer",
        description:
          "Timed focus sessions that block distracting apps: strict mode, native Kotlin modules, a live home-screen widget and streaks, with no account.",
      },
    },
  },
  {
    slug: "health-log",
    name: "Health Log",
    category: { fr: "Santé", en: "Health" },
    tagline: {
      fr: "Le carnet de mesures de toute la famille, gardé sur le téléphone.",
      en: "A health log for the whole household, kept on the phone.",
    },
    summary: {
      fr: "Health Log est un carnet pour noter les mesures prises avec ses propres appareils : tension, glycémie, poids, pouls, SpO2 et température. Un journal par membre du foyer, des graphiques de 7 jours à tout l'historique, et un rapport PDF ou CSV à remettre au médecin. Hors ligne, sans compte et sans serveur.",
      en: "Health Log is a logbook for the readings you take with your own devices: blood pressure, blood sugar, weight, pulse, SpO2 and temperature. One log per household member, charts from 7 days to your whole history, and a PDF or CSV report to hand to your doctor. Offline, with no account and no server.",
    },
    problem: {
      fr: "Les applications les plus installées de la catégorie prétendent mesurer la tension avec le téléphone, ce qu'il ne sait pas faire, et noient la saisie sous la publicité. Les plus honnêtes ne suivent qu'une personne et une constante, derrière un compte.",
      en: "The most-installed apps in the category claim the phone can measure blood pressure, which it cannot, and bury logging under ads. The honest ones track a single person and a single vital, behind an account.",
    },
    build: {
      fr: "Une application React Native sans backend : stockage local, statistiques et graphiques calculés sur l'appareil, rapport PDF généré en A4 ou US Letter dans l'une des 20 langues (l'arabe s'imprime de droite à gauche), import depuis Health Connect, verrouillage de l'application et widget Android.",
      en: "A React Native app with no backend: local storage, statistics and charts computed on the device, a PDF report generated in A4 or US Letter in any of 20 languages (Arabic prints right to left), Health Connect import, an app lock and an Android widget.",
    },
    outcome: {
      fr: "Une mesure saisie en quelques secondes et un rapport lisible à remettre au médecin, sans que la moindre donnée de santé passe par un serveur.",
      en: "A reading logged in seconds and a readable report for the doctor, without a single health record going through a server.",
    },
    features: {
      fr: [
        "Tension, glycémie, poids, pouls, SpO2 et température",
        "Un journal par membre du foyer",
        "Graphiques et statistiques sur 7, 30 ou 90 jours, un an ou tout l'historique",
        "Rapport pour le médecin en PDF, à imprimer, en CSV ou en Excel",
        "Rappels quotidiens et import depuis Health Connect",
        "Sauvegarde dans un fichier, restauration et verrouillage de l'application",
      ],
      en: [
        "Blood pressure, blood sugar, weight, pulse, SpO2 and temperature",
        "One log per household member",
        "Charts and statistics over 7, 30 or 90 days, a year or the whole history",
        "Doctor report as a PDF, a printout, a CSV or an Excel file",
        "Daily reminders and Health Connect import",
        "File backup and restore, plus an app lock",
      ],
    },
    stack: ["React Native", "Expo", "TypeScript", "Health Connect"],
    platforms: ["android"],
    year: 2026,
    status: "live",
    featured: true,
    sourceAvailable: false,
    links: {
      googlePlay: "https://play.google.com/store/apps/details?id=com.codeurdivoire.healthlog",
      website: site("https://health-log.codeurdivoire.com", { fr: "/fr", en: "/" }),
    },
    ...media("health-log", 6),
    metrics: [
      { value: "6", label: { fr: "Constantes suivies", en: "Vitals tracked" } },
      { value: "0", label: { fr: "Serveur", en: "Servers" } },
      { value: "20", label: { fr: "Langues du rapport", en: "Report languages" } },
    ],
    seo: {
      fr: {
        title: "Health Log : carnet de tension et de glycémie",
        description:
          "Carnet de santé familial hors ligne : tension, glycémie, poids, SpO2, graphiques et rapport PDF pour le médecin en 20 langues, sans compte ni serveur.",
      },
      en: {
        title: "Health Log: blood pressure and sugar log",
        description:
          "Offline household health log: blood pressure, blood sugar, weight and SpO2, charts and a doctor-ready PDF report in 20 languages, no account.",
      },
    },
  },
  {
    slug: "simpli-code",
    name: "Simpli Code",
    category: { fr: "Télécom · USSD", en: "Telecom · USSD" },
    tagline: {
      fr: "Vos codes USSD et Mobile Money, exécutés en un appui.",
      en: "Every USSD and Mobile Money code, one tap away.",
    },
    summary: {
      fr: "Simpli Code transforme les codes USSD et les services Mobile Money en raccourcis exécutés en un appui. L'application gère les téléphones à double SIM, génère les champs attendus à chaque étape (montant, numéro, référence) et enchaîne automatiquement les niveaux d'un menu USSD. Elle fonctionne avec Orange, MTN, Moov, Airtel et tout opérateur qui utilise l'USSD.",
      en: "Simpli Code turns USSD codes and Mobile Money services into shortcuts that run in one tap. It handles dual-SIM phones, generates the fields each step expects (amount, number, reference) and chains the levels of a USSD menu automatically. It works with Orange, MTN, Moov, Airtel and any operator that uses USSD.",
    },
    problem: {
      fr: "Le Mobile Money et les forfaits passent par des codes USSD longs, à plusieurs niveaux, différents chez chaque opérateur, et à ressaisir intégralement à chaque opération. Sur un téléphone à double SIM, la mauvaise ligne fait échouer la transaction.",
      en: "Mobile Money and data bundles run on long, multi-level USSD codes that differ by operator and have to be retyped in full for every transaction. On a dual-SIM phone, the wrong line fails the operation outright.",
    },
    build: {
      fr: "Un catalogue de codes par opérateur, des champs de saisie dynamiques pour les paramètres variables, un moteur d'exécution qui enchaîne les étapes sur la SIM choisie, et un service d'accessibilité optionnel qui referme les boîtes de dialogue USSD.",
      en: "A catalog of codes per operator, dynamic input fields for the variable parameters, an execution engine that chains the steps on the chosen SIM, and an optional accessibility service that closes the USSD dialogs.",
    },
    outcome: {
      fr: "Une opération Mobile Money se déclenche depuis une seule fiche, sur le bon opérateur et la bonne ligne, sans rien mémoriser ni ressaisir.",
      en: "A Mobile Money operation launches from a single saved entry, on the right operator and the right line, with nothing to memorize or retype.",
    },
    features: {
      fr: [
        "Codes USSD et services Mobile Money réunis dans un seul catalogue",
        "Compatible avec tout opérateur USSD : Orange, MTN, Moov, Airtel…",
        "Prise en charge du double SIM, choix automatique ou manuel de la ligne",
        "Champs de saisie dynamiques adaptés à chaque code",
        "Exécution automatisée des séquences à plusieurs étapes",
        "Fermeture automatique des boîtes de dialogue USSD, en option",
      ],
      en: [
        "USSD codes and Mobile Money services in a single catalog",
        "Works with any USSD operator: Orange, MTN, Moov, Airtel…",
        "Dual-SIM support, with automatic or manual line selection",
        "Dynamic input fields matched to each code",
        "Automated execution of multi-step sequences",
        "Optional automatic dismissal of USSD dialogs",
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
      website: site("https://simplicode.codeurdivoire.com", { fr: "/fr", en: "/en" }),
    },
    ...media("simpli-code", 6),
    metrics: [
      { value: "2", label: { fr: "SIM gérées", en: "SIMs handled" } },
      { value: "1", label: { fr: "Appui par opération", en: "Tap per operation" } },
      { value: "0", label: { fr: "Code à mémoriser", en: "Codes to memorize" } },
    ],
    seo: {
      fr: {
        title: "Simpli Code : codes USSD et Mobile Money",
        description:
          "Gestionnaire USSD React Native pour tout opérateur : double SIM, champs dynamiques et exécution automatisée des séquences à plusieurs étapes.",
      },
      en: {
        title: "Simpli Code: USSD and Mobile Money manager",
        description:
          "React Native USSD manager for any operator: dual SIM, dynamic input fields and automated execution of multi-step sequences, in one tap.",
      },
    },
  },
  {
    slug: "tarifo",
    name: "Tarifo",
    category: { fr: "Business · Devis et factures", en: "Business · Estimates & invoices" },
    tagline: {
      fr: "Le devis fait sur place, la facture quand le client dit oui.",
      en: "The estimate made on site, the invoice when the customer says yes.",
    },
    summary: {
      fr: "Tarifo permet à un artisan ou à un indépendant de faire un devis professionnel en deux minutes sur son téléphone, de l'envoyer en PDF ou de l'imprimer, puis de le transformer en facture quand le client accepte. Clients et tarifs enregistrés, suivi des impayés et des retards, sans compte et sans connexion. L'application est en test fermé sur Google Play.",
      en: "Tarifo lets a tradesperson or freelancer build a professional estimate in two minutes on their phone, send it as a PDF or print it, then turn it into an invoice when the customer accepts. Saved customers and prices, unpaid and overdue tracking, no account and no connection needed. The app is in closed testing on Google Play.",
    },
    problem: {
      fr: "Les applications de facturation grand public sont pensées pour la facture, plafonnent le nombre de documents et augmentent leurs prix. Le plombier ou l'électricien qui chiffre un chantier chez son client a d'abord besoin d'un devis, vite, et souvent sans réseau.",
      en: "Mainstream invoicing apps are built around the invoice, cap the number of documents and keep raising their prices. A plumber or an electrician pricing a job at the customer's place needs an estimate first, fast, and often without a signal.",
    },
    build: {
      fr: "Une application React Native hors ligne : un éditeur de documents avec lignes, quantités, unités, taxes et remise, une numérotation automatique, un aperçu au format papier et un PDF généré sur l'appareil en A4 ou US Letter. Un devis accepté devient une facture d'un geste.",
      en: "An offline React Native app: a document editor with lines, quantities, units, tax and discount, automatic numbering, a paper-like preview and a PDF generated on the device in A4 or US Letter. An accepted estimate becomes an invoice in one tap.",
    },
    outcome: {
      fr: "Un devis envoyé avant de quitter le chantier, des documents illimités dans la version gratuite, et une version Pro qui met la marque de l'artisan sur chaque document. En test fermé avant sa sortie publique.",
      en: "An estimate sent before leaving the job, unlimited documents on the free tier, and a Pro tier that puts the tradesperson's own brand on every document. In closed testing ahead of its public release.",
    },
    features: {
      fr: [
        "Devis et factures illimités, sans compte",
        "Lignes, unités, taxes et remise calculées automatiquement",
        "PDF partagé par WhatsApp ou e-mail, ou imprimé",
        "Devis accepté transformé en facture en un geste",
        "Montants en attente, impayés et en retard visibles d'un coup d'œil",
        "Clients et tarifs enregistrés, réutilisés d'un document à l'autre",
      ],
      en: [
        "Unlimited estimates and invoices, no account",
        "Lines, units, tax and discount worked out automatically",
        "PDF shared over WhatsApp or e-mail, or printed",
        "An accepted estimate turned into an invoice in one tap",
        "Pending, unpaid and overdue totals at a glance",
        "Saved customers and prices, reused across documents",
      ],
    },
    stack: ["React Native", "Expo", "TypeScript", "On-device PDF"],
    platforms: ["android"],
    year: 2026,
    status: "testing",
    featured: false,
    sourceAvailable: false,
    links: {},
    ...media("tarifo", 6),
    metrics: [
      { value: "2 min", label: { fr: "Pour un devis", en: "Per estimate" } },
      { value: "0", label: { fr: "Compte requis", en: "Accounts required" } },
      { value: "20", label: { fr: "Langues", en: "Languages" } },
    ],
    seo: {
      fr: {
        title: "Tarifo : devis et factures sur le téléphone",
        description:
          "Application de devis et de factures pour artisans et indépendants : PDF généré sur l'appareil, devis transformé en facture, sans compte, hors ligne.",
      },
      en: {
        title: "Tarifo: estimates and invoices on the phone",
        description:
          "Estimates and invoices app for tradespeople and freelancers: PDFs generated on the device, estimates turned into invoices, no account, offline.",
      },
    },
  },
];

export const clientWork = {
  title: {
    fr: "Travail client chez Arolitec",
    en: "Client work at Arolitec",
  } satisfies Localized<string>,
  body: {
    fr: [
      "L'essentiel de mon travail depuis 2023 ne peut pas être montré ici : ce sont des applications bancaires internes, couvertes par les règles de confidentialité de leurs utilisateurs. Ce que je peux décrire, c'est le contenu technique : des schémas PostgreSQL modélisés à partir des règles métier, des API REST et GraphQL en Node.js et NestJS reliées à des services tiers, des back-offices Angular, React et Remix alignés sur les processus opérationnels, une gestion des profils utilisateurs et des droits d'accès (RBAC) appliquée au niveau de l'API, des tests unitaires et d'intégration, des revues de code, des pipelines CI/CD, des images Docker et des déploiements sur serveurs Linux.",
      "Cette confidentialité, je la respecte pour mes futurs clients exactement comme pour l'actuel. Je peux en revanche détailler l'architecture, les choix de modélisation et les compromis lors d'un entretien, schéma au tableau, sans exposer une donnée ni une ligne de code client. Et si vous voulez juger mon travail sans NDA, les six applications publiées sur Google Play sont la partie visible de la même pratique : elles sont téléchargeables dès maintenant.",
    ],
    en: [
      "Most of what I have built since 2023 cannot be shown here: these are internal banking applications, covered by their users' confidentiality rules. What I can describe is the engineering: PostgreSQL schemas modeled from business rules, REST and GraphQL APIs in Node.js and NestJS wired to third-party services, Angular, React and Remix back-offices that follow real operational processes, user-profile and access-rights management (RBAC) enforced at the API layer, unit and integration tests, code reviews, CI/CD pipelines, Docker images and deployments on Linux servers.",
      "I hold to that confidentiality for future clients exactly as I do for the current one. What I can do is walk through the architecture, the modeling choices and the trade-offs in an interview, on a whiteboard, without exposing a single record or line of client code. And if you want to judge my work without an NDA, the six apps on Google Play are the visible half of the same practice: you can download them right now.",
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

export function nextProject(slug: string): Project {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}

export const featuredProjects = projects.filter((p) => p.featured);

export const publishedProjects = projects.filter((p) => p.status === "live");
