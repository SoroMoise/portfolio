import type { Localized } from "@/lib/i18n/config";

export type StackGroupId = "backend" | "frontend" | "mobile" | "api" | "data" | "platform";

export type Technology = {
  /** Stable identifier, also the display name for real product names. */
  name: string;
  /**
   * Display override for entries that are concepts rather than products —
   * "relational modelling" has a French and an English form, "PostgreSQL"
   * does not.
   */
  label?: Localized<string>;
  /** What he actually does with it — never a proficiency percentage. */
  use: Localized<string>;
  /** Surfaced in the condensed list on the home page. */
  headline?: boolean;
};

export type StackGroup = {
  id: StackGroupId;
  label: Localized<string>;
  items: Technology[];
};

export const stack: StackGroup[] = [
  {
    id: "backend",
    label: { fr: "Backend", en: "Backend" },
    items: [
      {
        name: "Node.js",
        headline: true,
        use: {
          fr: "Le runtime de tous mes services en production : serveurs d'API bancaires, tâches planifiées, scripts d'intégration.",
          en: "The runtime behind every service I run in production: banking API servers, scheduled jobs, integration scripts.",
        },
      },
      {
        name: "NestJS",
        headline: true,
        use: {
          fr: "Structure mes API en modules : injection de dépendances, guards d'authentification et de droits, validation des entrées.",
          en: "Structures my APIs into modules: dependency injection, auth and permission guards, input validation.",
        },
      },
      {
        name: "Python / Flask",
        use: {
          fr: "Services et API légers, quand une petite brique autonome vaut mieux qu'un module de plus dans l'application principale.",
          en: "Small standalone services and APIs, where a self-contained component beats adding another module to the main app.",
        },
      },
    ],
  },
  {
    id: "frontend",
    label: { fr: "Frontend", en: "Frontend" },
    items: [
      {
        name: "React",
        headline: true,
        use: {
          fr: "Interfaces métier et back-office branchées sur les API, composants réutilisables et gestion d'état côté client.",
          en: "Business and back-office interfaces wired to the APIs, reusable components and client-side state.",
        },
      },
      {
        name: "Angular",
        headline: true,
        use: {
          fr: "Applications bancaires internes structurées : formulaires complexes, écrans d'administration, processus opérationnels à plusieurs étapes.",
          en: "Structured internal banking applications: complex forms, administration screens, multi-step operational processes.",
        },
      },
      {
        name: "Remix",
        use: {
          fr: "Rendu serveur et chargement des données par route, pour les interfaces où le temps d'affichage compte.",
          en: "Server rendering and per-route data loading, for interfaces where time-to-screen matters.",
        },
      },
      {
        name: "TypeScript",
        headline: true,
        use: {
          fr: "Typage de bout en bout, du contrat d'API jusqu'au composant, sur le web comme sur le mobile.",
          en: "Typed end to end, from the API contract through to the component, on web and mobile alike.",
        },
      },
    ],
  },
  {
    id: "mobile",
    label: { fr: "Mobile", en: "Mobile" },
    items: [
      {
        name: "React Native",
        headline: true,
        use: {
          fr: "Les trois applications que j'écris, publie et maintiens moi-même sur Google Play.",
          en: "The three apps I write, publish and maintain myself on Google Play.",
        },
      },
      {
        name: "Expo / Expo Router",
        headline: true,
        use: {
          fr: "Build, navigation, mises à jour et publication sur le store, plus l'accès aux capacités natives sans sortir du flux de développement.",
          en: "Builds, navigation, updates and store releases, plus access to native capabilities without leaving the development flow.",
        },
      },
      {
        name: "Offline-first",
        use: {
          fr: "Persistance locale, file de synchronisation différée, application complètement utilisable en mode avion.",
          en: "Local persistence, deferred sync queues, an app that stays fully usable in airplane mode.",
        },
      },
    ],
  },
  {
    id: "api",
    label: { fr: "API & intégration", en: "API & integration" },
    items: [
      {
        name: "REST",
        headline: true,
        use: {
          fr: "Conception des ressources, versionnage, codes d'erreur et contrats documentés pour les équipes qui consomment mes API.",
          en: "Resource design, versioning, error codes and documented contracts for the teams consuming my APIs.",
        },
      },
      {
        name: "GraphQL",
        headline: true,
        use: {
          fr: "Schémas et resolvers là où le client a besoin de composer sa requête au lieu de recevoir une charge utile figée.",
          en: "Schemas and resolvers where the client needs to compose its own query rather than receive a fixed payload.",
        },
      },
      {
        name: "Connecteurs tiers",
        label: { fr: "Connecteurs tiers", en: "Third-party connectors" },
        use: {
          fr: "Intégration de services externes aux applications bancaires : échange de données, appels sortants, gestion des erreurs et des reprises.",
          en: "Integrating external services into banking applications: data exchange, outbound calls, error handling and retries.",
        },
      },
      {
        name: "Postman",
        use: {
          fr: "Collections de test, vérification des contrats d'API et partage avec les équipes qui les consomment.",
          en: "Test collections, contract checks and shared workspaces with the teams on the other side of the API.",
        },
      },
    ],
  },
  {
    id: "data",
    label: { fr: "Données & architecture", en: "Data & architecture" },
    items: [
      {
        name: "PostgreSQL",
        headline: true,
        use: {
          fr: "La base principale de mes applications bancaires : modélisation, relations, contraintes d'intégrité, index, requêtes.",
          en: "The primary database behind my banking work: modelling, relations, integrity constraints, indexes, queries.",
        },
      },
      {
        name: "MySQL",
        use: {
          fr: "Bases relationnelles sur des projets et des environnements existants : requêtes et évolutions de schéma.",
          en: "Relational databases on existing projects and environments: queries and schema changes.",
        },
      },
      {
        name: "MongoDB",
        use: {
          fr: "Stockage documentaire quand les données n'entrent pas naturellement dans un modèle relationnel.",
          en: "Document storage where the data does not fit a relational model naturally.",
        },
      },
      {
        name: "Modélisation relationnelle",
        label: { fr: "Modélisation relationnelle", en: "Relational modelling" },
        use: {
          fr: "Traduction des règles métier en entités, relations et contraintes, avant le développement.",
          en: "Turning business rules into entities, relations and constraints before development starts.",
        },
      },
      {
        name: "Droits d'accès (RBAC)",
        label: { fr: "Droits d'accès (RBAC)", en: "Access control (RBAC)" },
        headline: true,
        use: {
          fr: "Rôles, profils utilisateurs et permissions par ressource, appliqués au niveau de l'API autant que dans l'interface.",
          en: "Roles, user profiles and per-resource permissions, enforced at the API as well as in the interface.",
        },
      },
      {
        name: "Sécurité applicative",
        label: { fr: "Sécurité applicative", en: "Application security" },
        use: {
          fr: "Validation des entrées, authentification, cloisonnement des données entre profils, selon les exigences du domaine bancaire.",
          en: "Input validation, authentication and data separation between profiles, to banking requirements.",
        },
      },
    ],
  },
  {
    id: "platform",
    label: { fr: "Outils & environnement", en: "Tools & environment" },
    items: [
      {
        name: "Git / GitHub",
        use: {
          fr: "Stratégie de branches, merge requests et revues de code au quotidien.",
          en: "Branching strategy, merge requests and code review as daily practice.",
        },
      },
      {
        name: "GitHub Actions",
        use: {
          fr: "Pipelines qui lancent les tests, construisent l'application et publient les images.",
          en: "Pipelines that run the tests, build the application and publish the images.",
        },
      },
      {
        name: "CI/CD",
        headline: true,
        use: {
          fr: "La chaîne complète du commit au serveur : tests, build, déploiement, aucune mise en production à la main.",
          en: "The full chain from commit to server: tests, build, deploy, with nothing released by hand.",
        },
      },
      {
        name: "Docker",
        headline: true,
        use: {
          fr: "Conteneurisation des applications et de leurs dépendances, pour que la même image tourne sur le poste de développement et sur le serveur.",
          en: "Containerising applications and their dependencies so the same image runs locally and on the server.",
        },
      },
      {
        name: "Linux",
        use: {
          fr: "Serveurs de déploiement : configuration, services, logs, mises en ligne.",
          en: "The deployment servers: configuration, services, logs, releases.",
        },
      },
    ],
  },
];

/** Display name for a technology in a given language. */
export function techLabel(item: Technology, locale: "fr" | "en"): string {
  return item.label?.[locale] ?? item.name;
}

/** Flat list used by the condensed home-page stack teaser. */
export const headlineTech = stack.flatMap((g) =>
  g.items.filter((i) => i.headline).map((i) => i.name),
);

export const technologyCount = stack.reduce((total, g) => total + g.items.length, 0);

export type Principle = {
  id: string;
  title: Localized<string>;
  body: Localized<string>;
};

export const principles: Principle[] = [
  {
    id: "schema-first",
    title: { fr: "Le schéma avant le code", en: "Schema before code" },
    body: {
      fr: "Je commence par le modèle relationnel et les contraintes de données : une table mal pensée coûte des mois, une migration bien préparée coûte une après-midi.",
      en: "I start with the relational model and its constraints: a badly shaped table costs months, a well-prepared migration costs an afternoon.",
    },
  },
  {
    id: "review-tests-pipeline",
    title: { fr: "Revue, tests, pipeline", en: "Review, tests, pipeline" },
    body: {
      fr: "Chaque fonctionnalité passe par une revue de code et une validation de merge request, des tests unitaires et d'intégration, puis un pipeline CI/CD qui construit, teste et déploie sans intervention manuelle.",
      en: "Every feature goes through code review and merge-request validation, unit and integration tests, then a CI/CD pipeline that builds, tests and deploys without a manual step.",
    },
  },
  {
    id: "design-for-the-drop",
    title: {
      fr: "Concevoir pour la coupure réseau",
      en: "Design for the drop",
    },
    body: {
      fr: "Je pars du principe que la connexion tombera : écriture locale d'abord, synchronisation différée ensuite, état cohérent au retour du réseau.",
      en: "I assume the connection will fail: write locally first, sync later, and come back to a consistent state when the network returns.",
    },
  },
  {
    id: "permissions-first",
    title: { fr: "Les droits avant les écrans", en: "Permissions before screens" },
    body: {
      fr: "Je traite l'authentification, les profils utilisateurs et les droits d'accès (RBAC) comme une partie de l'architecture, pas comme une couche ajoutée avant la recette.",
      en: "Authentication, user profiles and role-based permissions belong in the architecture, not in a layer bolted on just before acceptance testing.",
    },
  },
];
