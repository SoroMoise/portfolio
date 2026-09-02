import type { Dictionary } from "./fr";

export const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    stack: "Stack",
    work: "Work",
    experience: "Experience",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "Navigation",
    primaryNavLabel: "Primary navigation",
    mobileNavLabel: "Mobile menu",
    footerNavLabel: "Footer navigation",
    skipToContent: "Skip to main content",
    brandAria: "Back to home",
  },

  common: {
    downloadCv: "Download CV",
    viewOnGithub: "View on GitHub",
    getOnGooglePlay: "Get it on Google Play",
    googlePlayShort: "Google Play",
    privateSource: "Private — client work",
    backToWork: "Back to work",
    viewAllProjects: "View all projects",
    viewProject: "View project",
    getInTouch: "Get in touch",
    present: "present",
    inProgress: "In progress",
    externalLink: "opens in a new tab",
    openToWork: "Open to conversations",
    localTime: "Local time",
  },

  theme: {
    label: "Theme",
    light: "Switch to light theme",
    dark: "Switch to dark theme",
    system: "Follow system theme",
  },

  locale: {
    label: "Change language: French or English",
  },

  home: {
    status: "Open to conversations — web and mobile projects, in Abidjan or remote.",
    roleLine: "Full Stack Web & Mobile Developer",
    intro:
      "Since 2023 I have been building banking web applications at Arolitec: application architecture, the PostgreSQL relational schema, REST and GraphQL APIs in Node.js and NestJS, and the access-control model that sits under all of it. Under the name Codeur d'Ivoire I also ship my own React Native apps — three so far on Google Play — built for networks that drop, prepaid data and dual-SIM phones.",
    primaryCta: "See the work",
    secondaryCta: "Get in touch",
    stats: {
      apps: "apps published on Google Play",
      since: "shipping banking software",
      currencies: "currencies handled offline",
    },
    selectedWork: {
      eyebrow: "Selected work",
      title: "Three published apps, one shared constraint",
      lead: "Here, mobile data is prepaid and coverage changes from one neighbourhood to the next. An app that needs a live connection is an app that gets uninstalled.",
    },
    approach: {
      eyebrow: "Method",
      title: "How I work",
      lead: "Four principles drawn from banking systems and offline mobile, applied to every project.",
    },
    stackTeaser: {
      eyebrow: "Stack",
      title: "What I actually do with each tool",
      lead: "No percentages, no seniority badges: one line per technology on what I do with it day to day.",
      cta: "See the full stack",
    },
    experienceTeaser: {
      eyebrow: "Experience",
      title: "From a final-year placement to banking applications",
      cta: "See the full background",
    },
    contactTeaser: {
      title: "Let's talk about your project",
      lead: "Tell me the context, the technical constraint and the deadline. You will get a considered first read, not a template quote.",
      cta: "Start the conversation",
    },
  },

  about: {
    eyebrow: "About",
    title: "Between banking systems and offline mobile",
    lead: "Full-stack developer in Abidjan. I build systems that have to hold: under security constraints during the week, under network constraints the rest of the time.",
    paragraphs: [
      "At Arolitec I build banking web applications end to end. I set the application architecture — frontend, backend, database — and model the PostgreSQL relational schema before any business logic gets written. Then come the REST and GraphQL APIs in Node.js and NestJS, wired into internal applications and third-party services, and the business and back-office interfaces in Angular, React and Remix, mapped to how the operational processes actually run. In a bank the question is never only “does it work”, it is “who is allowed to do what”: I design and implement the user profiles and role-based access control that govern every screen and every endpoint.",
      "Alongside that, I publish my own apps on Google Play under the name Codeur d'Ivoire: Background Eraser, Currency Converter Offline and Simpli Code, all built with React Native, Expo and TypeScript. All three are offline-first, and that is an engineering decision rather than a preference: here, mobile data is prepaid, coverage changes from one neighbourhood to the next, and Mobile Money is everyday infrastructure rather than a payment option. So I treated offline as a constraint to solve rather than route around: the AI cutout runs entirely on the device, the converter keeps more than 170 currencies in local storage and syncs later when the signal returns, and the USSD manager chains the steps of Orange, MTN and Moov codes on the right SIM.",
      "I am finishing a Master's in Software Engineering at Groupe EDHEG-Abidjan, after a Licence 3 in the same field and a BTS in application development. What I consolidate there gets used at work the next day: modelling, application security, industrialisation. Day to day I work in Agile with product teams and business stakeholders: settle the business rule before coding it, run code reviews and have my own code reviewed, write unit and integration tests, and document whatever someone else will inherit.",
    ],
    facts: {
      title: "At a glance",
      role: "Current role",
      location: "Based in",
      education: "Education",
      languages: "Languages",
      focus: "Focus",
      focusValue: "Banking applications, offline-first mobile",
    },
    principlesTitle: "How I work",
    principlesLead: "What I do not compromise on, whatever the project.",
    educationTitle: "Education",
  },

  stack: {
    eyebrow: "Technical stack",
    title: "The tools, and what I do with them",
    lead: "What I actually do with each tool. No percentages, no seniority badges.",
    groupsLabel: "Categories",
  },

  work: {
    eyebrow: "Work",
    title: "Published apps and client work",
    lead: "Three React Native apps on Google Play under the name Codeur d'Ivoire, plus the daily banking work that stays confidential.",
    publishedTitle: "Published on Google Play",
    clientTitle: "Client work at Arolitec",
    detail: {
      problem: "The problem",
      build: "What I built",
      outcome: "The result",
      features: "Features",
      stack: "Technologies",
      year: "Year",
      platforms: "Platforms",
      publisher: "Publisher",
      nextProject: "Next project",
      caseStudy: "Case study",
    },
    platform: {
      android: "Android",
      ios: "iOS",
      web: "Web",
    },
    status: {
      live: "Live",
      archived: "Archived",
    },
  },

  experience: {
    eyebrow: "Experience",
    title: "Background and education",
    lead: "Joined Arolitec on a final-year BTS placement, hired on a permanent contract at the end of it, and on the company's banking applications ever since.",
    rolesTitle: "Professional experience",
    educationTitle: "Education",
    languagesTitle: "Languages",
    responsibilitiesLabel: "Responsibilities",
    stackLabel: "Technical environment",
    downloadPrompt: "The full detail is in my CV.",
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's talk about your project",
    lead: "Tell me the context, the technical constraint and the deadline. You will get a considered first read, not a template quote.",
    directTitle: "Direct contact",
    whatsappNote: "Faster by WhatsApp",
    formTitle: "Send a message",
    fields: {
      name: "Name",
      namePlaceholder: "Your full name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      subject: "Subject",
      subjectPlaceholder: "Offline-first mobile app, API, back-office…",
      message: "Message",
      messagePlaceholder:
        "The context, what you want built, the existing stack and your timeline.",
    },
    submit: "Send message",
    submitting: "Sending…",
    success: "Message received. I will reply personally.",
    error: "Sending failed. Try again, or email me directly at soromoise4@gmail.com",
    errors: {
      required: "This field is required.",
      invalidEmail: "That email address is not valid.",
      tooShort: "Too short — 2 characters minimum.",
      tooLong: "Too long for this field.",
      messageTooShort: "Message too short — 20 characters minimum.",
      messageTooLong: "Message too long — 2,000 characters maximum.",
      rateLimited: "Too many messages sent. Wait a few minutes before trying again.",
      server: "Something went wrong on my side. Try again in a moment.",
    },
    responseNote: "Every message is read and answered by me, not by an autoresponder.",
  },

  notFound: {
    code: "404",
    title: "Page not found",
    body: "This address does not match any page on the site. The link may be out of date or mistyped — the work and experience sections are still in the menu.",
    cta: "Back to home",
    secondaryCta: "See the work",
  },

  error: {
    title: "Something went wrong",
    body: "This content could not be loaded. Reload the page; if it keeps happening, email me at soromoise4@gmail.com",
    retry: "Try again",
    home: "Back to home",
  },

  footer: {
    tagline: "Full Stack Web & Mobile Developer — Abidjan, Ivory Coast",
    brandNote: "Mobile apps published under the name Codeur d'Ivoire.",
    builtWith: "Designed and built with Next.js and Tailwind CSS.",
    navTitle: "Navigation",
    contactTitle: "Contact",
  },

  meta: {
    titleTemplate: "%s · Moïse Soro",
    defaultTitle: "Moïse Soro — Full Stack Web & Mobile Developer",
    home: {
      title: "Moïse Soro — Full Stack Web & Mobile Developer",
      description:
        "Full stack developer in Abidjan: banking applications at Arolitec, PostgreSQL and NestJS, plus three offline-first React Native apps on Google Play.",
    },
    about: {
      title: "About — developer in Abidjan",
      description:
        "Full stack developer at Arolitec since 2023: banking architecture, PostgreSQL, GraphQL APIs, RBAC, and offline-first mobile apps built for Abidjan.",
    },
    stack: {
      title: "Tech stack",
      description:
        "Node.js, NestJS, React, Angular, Remix, React Native, PostgreSQL, Docker, CI/CD: what I actually do with each tool. No percentages, no badges.",
    },
    work: {
      title: "Work — published apps and client projects",
      description:
        "Three React Native apps on Google Play as Codeur d'Ivoire: an offline AI photo cutout tool, 170+ currencies, USSD and Mobile Money automation.",
    },
    experience: {
      title: "Experience — Arolitec, MSc Software Engineering",
      description:
        "Full stack developer at Arolitec since 2023 on a permanent contract, hired after a BTS internship. MSc Software Engineering, EDHEG-Abidjan, 2024-2026.",
    },
    contact: {
      title: "Contact — Abidjan",
      description:
        "Get in touch about a web or mobile project: send the context, the technical constraint and the deadline, and I will reply with a first read.",
    },
  },
};
