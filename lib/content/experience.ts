import type { Localized } from "@/lib/i18n/config";

export type Role = {
  id: string;
  company: string;
  companyUrl?: string;
  position: Localized<string>;
  /** Contract type, shown as a small tag next to the position. */
  kind: Localized<string>;
  location: Localized<string>;
  start: string;
  /** `null` means the role is current. */
  end: string | null;
  summary: Localized<string>;
  responsibilities: Localized<string[]>;
  stack: string[];
};

export const roles: Role[] = [
  {
    id: "arolitec-fullstack",
    company: "Arolitec",
    companyUrl: "https://arolitec.com",
    position: {
      fr: "Développeur Full Stack",
      en: "Full Stack Developer",
    },
    kind: { fr: "CDI", en: "Permanent" },
    location: { fr: "Abidjan, Côte d'Ivoire", en: "Abidjan, Ivory Coast" },
    start: "2023",
    end: null,
    summary: {
      fr: "Je développe des applications web bancaires de bout en bout, de l'architecture au déploiement, dans un environnement où la sécurité et la traçabilité conditionnent chaque décision technique.",
      en: "I build banking web applications end to end, from architecture to deployment, in an environment where security and traceability shape every technical decision.",
    },
    responsibilities: {
      fr: [
        "Concevoir l'architecture applicative complète des applications bancaires livrées : frontend, backend, base de données.",
        "Modéliser le schéma relationnel PostgreSQL et les contraintes d'intégrité qui portent les données métier.",
        "Construire les interfaces métier et back-office en Angular, React et Remix, câblées sur les processus opérationnels réels.",
        "Concevoir et développer les API REST et GraphQL en Node.js et NestJS, et les intégrer aux applications métier comme aux services tiers.",
        "Implémenter la gestion des profils utilisateurs et des droits d'accès (RBAC) dans un contexte bancaire à fortes exigences de sécurité.",
        "Livrer les fonctionnalités en Agile avec les équipes produit et les référents métier, du cadrage à la mise en production.",
        "Tenir la qualité et l'industrialisation : revues de code, validation des merge requests, tests unitaires et d'intégration, documentation technique.",
        "Gérer la chaîne DevOps : Git et GitHub, stratégie de branches, pipelines CI/CD, conteneurisation Docker, déploiement sur serveurs Linux.",
      ],
      en: [
        "Design the full application architecture of the banking applications we ship: frontend, backend, database.",
        "Model the PostgreSQL relational schema and the integrity constraints that hold the business data.",
        "Build the business and back-office interfaces in Angular, React and Remix, wired to real operational processes.",
        "Design and build the REST and GraphQL APIs in Node.js and NestJS, integrated with business applications and third-party services.",
        "Implement user profiles and role-based access control (RBAC) in a banking context with strict security requirements.",
        "Ship features in Agile with product teams and business stakeholders, from scoping through to production.",
        "Hold the quality bar: code reviews, merge-request validation, unit and integration tests, technical documentation.",
        "Run the DevOps chain: Git and GitHub, branching strategy, CI/CD pipelines, Docker containerisation, deployment on Linux servers.",
      ],
    },
    stack: [
      "NestJS",
      "Node.js",
      "GraphQL",
      "REST",
      "PostgreSQL",
      "Angular",
      "React",
      "Remix",
      "TypeScript",
      "Docker",
      "CI/CD",
      "Linux",
    ],
  },
  {
    id: "arolitec-intern",
    company: "Arolitec",
    companyUrl: "https://arolitec.com",
    position: {
      fr: "Développeur — stage",
      en: "Developer — internship",
    },
    kind: { fr: "Stage de fin de BTS · 3 mois", en: "Final-year BTS placement · 3 months" },
    location: { fr: "Abidjan, Côte d'Ivoire", en: "Abidjan, Ivory Coast" },
    start: "2023",
    end: "2023",
    summary: {
      fr: "Développement d'applications web full stack au sein de l'équipe technique. Travail reconnu par l'équipe, qui a débouché sur une proposition de CDI à l'issue du stage.",
      en: "Full-stack web application development inside the technical team. The work was recognised by the team, which offered a permanent contract at the end of the internship.",
    },
    responsibilities: {
      fr: [
        "Développement d'applications web full stack au sein de l'équipe technique.",
        "Intégration aux rituels et aux standards de qualité de l'équipe.",
      ],
      en: [
        "Full-stack web application development inside the engineering team.",
        "Integration into the team's rituals and quality standards.",
      ],
    },
    stack: ["JavaScript", "TypeScript", "Node.js", "React"],
  },
];

export type Education = {
  id: string;
  degree: Localized<string>;
  school: string;
  period: string;
  note: Localized<string>;
  inProgress: boolean;
};

export const education: Education[] = [
  {
    id: "master",
    degree: { fr: "Master Génie Logiciel (BAC+5)", en: "MSc Software Engineering" },
    school: "Groupe EDHEG — Abidjan",
    period: "2024 — 2026",
    note: {
      fr: "Architecture logicielle, modélisation et qualité, menés en parallèle du poste à temps plein chez Arolitec.",
      en: "Software architecture, modelling and quality, studied alongside the full-time role at Arolitec.",
    },
    inProgress: true,
  },
  {
    id: "licence",
    degree: { fr: "Licence 3 Génie Logiciel (BAC+3)", en: "BSc Software Engineering" },
    school: "Groupe EDHEG — Abidjan",
    period: "2024",
    note: {
      fr: "Consolidation des fondamentaux : conception logicielle, bases de données, développement d'applications.",
      en: "Consolidated the fundamentals: software design, databases, application development.",
    },
    inProgress: false,
  },
  {
    id: "bts",
    degree: {
      fr: "BTS IDA — Développeur d'Applications",
      en: "BTS IDA — Application Developer",
    },
    school: "IT Academy University",
    period: "2023",
    note: {
      fr: "Formation conclue par le stage chez Arolitec, transformé en CDI.",
      en: "Completed with the Arolitec internship that turned into a permanent contract.",
    },
    inProgress: false,
  },
  {
    id: "bac",
    degree: { fr: "BAC F2 — Électronique", en: "Baccalauréat F2 — Electronics" },
    school: "Groupe ITA Ingénierie SA",
    period: "2019",
    note: {
      fr: "Formation initiale en électronique : l'habitude des systèmes qui doivent tenir sur le terrain vient de là.",
      en: "The original electronics training, and where the habit of building systems that have to hold up in the field comes from.",
    },
    inProgress: false,
  },
];

/**
 * Whole years of professional experience.
 *
 * Takes the current year as an argument so callers decide where "now" comes
 * from — computing it inside the module would freeze the value at build time
 * for every statically prerendered page.
 */
export function yearsOfExperience(currentYear: number, startYear = 2023): number {
  return Math.max(1, currentYear - startYear);
}
