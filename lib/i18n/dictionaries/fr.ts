import { errorStrings } from "../error-strings";

export const fr = {
  nav: {
    home: "Accueil",
    about: "À propos",
    stack: "Stack",
    work: "Réalisations",
    experience: "Parcours",
    contact: "Contact",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    menuTitle: "Navigation",
    primaryNavLabel: "Navigation principale",
    mobileNavLabel: "Menu mobile",
    footerNavLabel: "Navigation du pied de page",
    skipToContent: "Aller au contenu principal",
    brandAria: "Retour à l'accueil",
  },

  common: {
    downloadCv: "Télécharger le CV",
    viewOnGithub: "Voir sur GitHub",
    getOnGooglePlay: "Disponible sur Google Play",
    googlePlayShort: "Google Play",
    visitWebsite: "Voir le site de l'app",
    websiteShort: "Site web",
    privateSource: "Projet client confidentiel",
    backToWork: "Retour aux réalisations",
    viewAllProjects: "Voir tous les projets",
    viewProject: "Voir le projet",
    getInTouch: "Me contacter",
    since: "Depuis",
    inProgress: "En cours",
    externalLink: "ouvre un nouvel onglet",
    openToWork: "Ouvert aux échanges",
    localTime: "Heure locale",
    closedTesting: "En test fermé",
    closedSource: "Code source privé",
    readCaseStudy: "Lire l'étude de cas",
  },

  theme: {
    label: "Thème",
    light: "Activer le thème clair",
    dark: "Activer le thème sombre",
    system: "Suivre le thème du système",
  },

  locale: {
    label: "Changer de langue : français ou anglais",
  },

  home: {
    status: "Ouvert aux échanges : projets web et mobile, à Abidjan comme à distance.",
    roleLine: "Développeur Full Stack Web & Mobile",
    intro:
      "Depuis 2023, je développe des applications bancaires chez Arolitec : architecture applicative, schéma relationnel PostgreSQL, API REST et GraphQL en Node.js et NestJS, gestion des droits d'accès. En parallèle, je publie sous le nom Codeur d'Ivoire mes propres applications React Native (six à ce jour sur Google Play, une septième en test fermé), publiées pour un public international et conçues pour tout faire sur l'appareil : sans compte, sans serveur, même sans réseau.",
    primaryCta: "Voir les réalisations",
    secondaryCta: "Me contacter",
    stats: {
      apps: "applications publiées sur Google Play",
      since: "en production bancaire chez Arolitec",
      accounts: "compte exigé par mes applications",
    },
    selectedWork: {
      eyebrow: "Réalisations sélectionnées",
      title: "Six applications publiées, une même règle",
      lead: "Le téléphone fait le travail. L'IA, l'audio, les calculs et les documents sont traités sur l'appareil : rien n'attend une connexion, aucune donnée ne part sur un serveur, et aucune application ne demande de compte.",
    },
    approach: {
      eyebrow: "Méthode",
      title: "Ma façon de travailler",
      lead: "Quatre principes issus du contexte bancaire et du mobile hors ligne, appliqués à chaque projet.",
    },
    stackTeaser: {
      eyebrow: "Stack",
      title: "Ce que je fais réellement avec chaque outil",
      lead: "Pas de pourcentages, pas de badges de niveau : une phrase par technologie sur ce que j'en fais au quotidien.",
      cta: "Voir la stack complète",
    },
    experienceTeaser: {
      eyebrow: "Parcours",
      title: "Du stage de fin de BTS au CDI, sur des applications bancaires",
      cta: "Voir le parcours complet",
    },
    contactTeaser: {
      title: "Parlons de votre projet",
      lead: "Décrivez le contexte, la contrainte technique et l'échéance. Je vous réponds avec un premier avis concret, pas avec un devis générique.",
      cta: "Démarrer la conversation",
    },
  },

  about: {
    eyebrow: "À propos",
    title: "Entre systèmes bancaires et mobile hors ligne",
    lead: "Développeur full stack à Abidjan. Je construis des systèmes qui doivent tenir : sous contrainte de sécurité en semaine, sous contrainte de réseau le reste du temps.",
    paragraphs: [
      "Chez Arolitec, je développe des applications bancaires de bout en bout. Je pose l'architecture applicative (frontend, backend, base de données) et je modélise le schéma relationnel PostgreSQL avant d'écrire la première ligne de code métier. Viennent ensuite les API REST et GraphQL en Node.js et NestJS, reliées aux applications internes et à des services tiers, puis les interfaces métier et back-office en Angular, React et Remix, calées sur les processus opérationnels réels. Dans une banque, la question n'est jamais seulement « est-ce que ça fonctionne » mais « qui a le droit de faire quoi » : je conçois et j'implémente la gestion des profils utilisateurs et des droits d'accès (RBAC) qui encadre chaque écran et chaque endpoint.",
      "En parallèle, je publie mes propres applications sur Google Play sous le nom Codeur d'Ivoire : BG Remover, Noise Remover, Currency Converter Offline, Deep Focus, Health Log et Simpli Code, et Tarifo, en test fermé. Toutes sont écrites en React Native, Expo et TypeScript, la plupart sont traduites en 20 langues, et toutes suivent la même règle : le téléphone fait le travail. Ce n'est pas une préférence esthétique : une application qui exige une connexion, un compte ou un serveur pour fonctionner est une application qu'on désinstalle, où que l'on soit. J'ai donc traité le hors-ligne comme une contrainte d'ingénierie à résoudre plutôt qu'à contourner : le détourage par IA s'exécute sur l'appareil, le débruitage de la voix passe par un module natif en C++, le convertisseur garde 148 devises en local et se resynchronise quand le réseau revient, et le bloqueur de distractions s'appuie sur des modules Android écrits en Kotlin.",
      "Je termine un Master Génie Logiciel au Groupe EDHEG-Abidjan, après une Licence 3 dans la même filière et un BTS Développeur d'Applications. Ce que j'y consolide sert le lendemain au travail : modélisation, sécurité applicative, industrialisation. Au quotidien, je travaille en Agile avec les équipes produit et les référents métier : je discute la règle métier avant de la coder, je mène des revues de code et je fais relire le mien, j'écris des tests unitaires et d'intégration, et je documente ce qui sera repris par quelqu'un d'autre.",
    ],
    facts: {
      title: "En bref",
      role: "Poste actuel",
      location: "Localisation",
      education: "Formation",
      languages: "Langues",
      focus: "Domaines",
      focusValue: "Applications bancaires, mobile offline-first",
    },
    principlesTitle: "Ma façon de travailler",
    principlesLead: "Ce sur quoi je ne transige pas, quel que soit le projet.",
    educationTitle: "Formation",
  },

  stack: {
    eyebrow: "Stack technique",
    title: "Les outils, et ce que j'en fais",
    lead: "Ce que je fais réellement avec chaque outil. Pas de pourcentages, pas de badges de niveau.",
    groupsLabel: "Catégories",
  },

  work: {
    eyebrow: "Réalisations",
    title: "Applications publiées et travail client",
    lead: "Six applications React Native disponibles sur Google Play sous le nom Codeur d'Ivoire, une septième en test fermé, et le travail bancaire quotidien qui reste confidentiel.",
    publishedTitle: "Sur Google Play",
    clientTitle: "Travail client chez Arolitec",
    detail: {
      problem: "Le problème",
      build: "Ce que j'ai construit",
      outcome: "Le résultat",
      features: "Fonctionnalités",
      stack: "Technologies",
      year: "Année",
      platforms: "Plateformes",
      publisher: "Éditeur",
      nextProject: "Projet suivant",
      caseStudy: "Étude de cas",
      status: "Statut",
      screenshots: "Captures d'écran",
      screenshotAlt: "{name}, capture d'écran {index} sur {total}",
    },
    platform: {
      android: "Android",
      ios: "iOS",
      web: "Web",
    },
    status: {
      live: "En production",
      testing: "En test fermé",
    },
  },

  experience: {
    eyebrow: "Parcours",
    title: "Expérience et formation",
    lead: "Entré chez Arolitec pour mon stage de fin de BTS, j'y ai été recruté en CDI à la fin du stage, et je travaille depuis sur ses applications bancaires.",
    rolesTitle: "Expérience professionnelle",
    educationTitle: "Formation",
    languagesTitle: "Langues",
    responsibilitiesLabel: "Missions",
    stackLabel: "Environnement technique",
    downloadPrompt: "Le détail complet est dans mon CV.",
  },

  contact: {
    eyebrow: "Contact",
    title: "Parlons de votre projet",
    lead: "Décrivez le contexte, la contrainte technique et l'échéance. Je vous réponds avec un premier avis concret, pas avec un devis générique.",
    directTitle: "Contact direct",
    whatsappNote: "Plus rapide par WhatsApp",
    formTitle: "Envoyer un message",
    fields: {
      name: "Nom",
      namePlaceholder: "Votre nom complet",
      email: "E-mail",
      emailPlaceholder: "vous@entreprise.com",
      subject: "Objet",
      subjectPlaceholder: "Application mobile hors ligne, API, back-office…",
      message: "Message",
      messagePlaceholder:
        "Le contexte, ce que vous voulez construire, la stack existante et vos délais.",
    },
    submit: "Envoyer le message",
    submitting: "Envoi en cours…",
    success: "Message reçu. Je vous réponds personnellement.",
    error:
      "L'envoi a échoué. Réessayez, ou écrivez-moi directement à soromoise4@gmail.com",
    errors: {
      required: "Ce champ est obligatoire.",
      invalidEmail: "Cette adresse e-mail n'est pas valide.",
      tooShort: "Trop court : 2 caractères minimum.",
      tooLong: "Trop long pour ce champ.",
      messageTooShort: "Message trop court : 20 caractères minimum.",
      messageTooLong: "Message trop long : 2 000 caractères maximum.",
      rateLimited:
        "Trop de messages envoyés. Patientez quelques minutes avant de réessayer.",
      server: "Une erreur est survenue de mon côté. Réessayez dans un instant.",
    },
    responseNote:
      "Chaque message est lu, et c'est moi qui vous réponds : jamais un message automatique.",
    orSeparator: "ou",
    whatsappCta: "Continuer sur WhatsApp",
    whatsappHint:
      "Ce que vous avez saisi est repris dans le message : il ne reste qu'à l'envoyer.",
    whatsappIntro: "Bonjour Moïse, je vous écris depuis codeurdivoire.com.",
  },

  notFound: {
    code: "404",
    title: "Page introuvable",
    body: "Cette adresse ne correspond à aucune page du site. Le lien est peut-être obsolète ou mal recopié. Les réalisations et le parcours restent accessibles depuis le menu.",
    cta: "Retour à l'accueil",
    secondaryCta: "Voir les réalisations",
  },

  error: errorStrings.fr,

  footer: {
    tagline: "Développeur Full Stack Web & Mobile à Abidjan, Côte d'Ivoire",
    brandNote: "Applications mobiles publiées sous le nom Codeur d'Ivoire.",
    builtWith: "Conçu et développé avec Next.js et Tailwind CSS.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    privacy: "Confidentialité",
  },

  privacy: {
    eyebrow: "Confidentialité",
    title: "Vos données sur ce site et dans Apps Analyser",
    lead: "Ce que ce site et l'outil Apps Analyser reçoivent, pourquoi, et comment le retirer.",
    updated: "Mise à jour le",
    contact: "Pour toute demande :",
  },

  meta: {
    titleTemplate: "%s · Moïse Soro",
    defaultTitle: "Moïse Soro · Développeur Full Stack Web & Mobile",
    home: {
      title: "Moïse Soro · Développeur Full Stack Web & Mobile",
      description:
        "Développeur full stack à Abidjan : applications bancaires chez Arolitec, schéma PostgreSQL, API NestJS et GraphQL, et six applications mobiles hors ligne.",
    },
    about: {
      title: "À propos : développeur à Abidjan",
      description:
        "Développeur full stack chez Arolitec depuis 2023 : architecture bancaire, PostgreSQL, API GraphQL, RBAC, et des applications mobiles pour un public international.",
    },
    stack: {
      title: "Stack technique",
      description:
        "Node.js, NestJS, React, Angular, Remix, React Native, PostgreSQL, Docker, CI/CD : ce que je fais réellement avec chaque outil, sans pourcentages.",
    },
    work: {
      title: "Réalisations : applications publiées et projets",
      description:
        "Six applications React Native sur Google Play sous Codeur d'Ivoire : détourage IA, débruitage audio, 148 devises, concentration, santé et USSD.",
    },
    experience: {
      title: "Parcours : Arolitec, Master Génie Logiciel",
      description:
        "Développeur full stack en CDI chez Arolitec depuis 2023, après un stage BTS. Master Génie Logiciel en cours au Groupe EDHEG-Abidjan, 2024-2026.",
    },
    privacy: {
      title: "Confidentialité",
      description:
        "Politique de confidentialité de codeurdivoire.com et d'Apps Analyser : données reçues, usage des API Google, hébergement et droits.",
    },
    contact: {
      title: "Contact · Abidjan",
      description:
        "Écrivez-moi pour un projet web ou mobile : décrivez le contexte, la contrainte technique et l'échéance, je vous réponds avec un premier avis.",
    },
  },
};

export type Dictionary = typeof fr;
