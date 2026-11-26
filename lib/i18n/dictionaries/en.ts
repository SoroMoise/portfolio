import type { Dictionary } from "./fr";
import { errorStrings } from "../error-strings";

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
    visitWebsite: "Visit the app site",
    websiteShort: "Website",
    privateSource: "Private client work",
    backToWork: "Back to work",
    viewAllProjects: "View all projects",
    viewProject: "View project",
    getInTouch: "Get in touch",
    since: "Since",
    inProgress: "In progress",
    externalLink: "opens in a new tab",
    openToWork: "Open to conversations",
    localTime: "Local time",
    closedTesting: "In closed testing",
    closedSource: "Closed source",
    readCaseStudy: "Read the case study",
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
    status: "Open to conversations about web and mobile projects, in Abidjan or remote.",
    roleLine: "Full Stack Web & Mobile Developer",
    intro:
      "Since 2023 I have been building banking web applications at Arolitec: application architecture, the PostgreSQL relational schema, REST and GraphQL APIs in Node.js and NestJS, and the access-control model that sits under all of it. Under the name Codeur d'Ivoire I also ship my own React Native apps (six so far on Google Play, a seventh in closed testing), published for an international audience and built to do everything on the device: no account, no server, not even a signal required.",
    primaryCta: "See the work",
    secondaryCta: "Get in touch",
    stats: {
      apps: "apps published on Google Play",
      since: "shipping banking software",
      accounts: "accounts required by my apps",
    },
    selectedWork: {
      eyebrow: "Selected work",
      title: "Six published apps, one rule",
      lead: "The phone does the work. AI, audio, maths and documents are processed on the device: nothing waits for a connection, no user data goes to a server, and no app asks for an account.",
    },
    approach: {
      eyebrow: "Method",
      title: "How I work",
      lead: "Four principles drawn from banking systems and offline mobile, applied to every project.",
    },
    stackTeaser: {
      eyebrow: "Stack",
      title: "What I actually do with each tool",
      lead: "No percentages, no seniority badges: one line per technology on how I use it day to day.",
      cta: "See the full stack",
    },
    experienceTeaser: {
      eyebrow: "Experience",
      title: "From a final-year internship to banking applications",
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
    lead: "Full-stack developer in Abidjan. I build systems that have to hold up: under security constraints during the week, under network constraints the rest of the time.",
    paragraphs: [
      "At Arolitec I build banking web applications end to end. I set the application architecture (frontend, backend, database) and model the PostgreSQL relational schema before any business logic gets written. Then come the REST and GraphQL APIs in Node.js and NestJS, wired into internal applications and third-party services, and the business and back-office interfaces in Angular, React and Remix, mapped to how the operational processes actually run. In a bank the question is never only “does it work?” but also “who is allowed to do what?” I design and implement the user profiles and role-based access control that govern every screen and every endpoint.",
      "Alongside that, I publish my own apps on Google Play under the name Codeur d'Ivoire: BG Remover, Noise Remover, Currency Converter Offline, Deep Focus, Health Log and Simpli Code, plus Tarifo, in closed testing. All of them are written in React Native, Expo and TypeScript, most ship in 20 languages, and all follow the same rule: the phone does the work. That is an engineering decision, not a preference: an app that needs a connection, an account or a server to work is an app that gets uninstalled, wherever its user lives. So I treated offline as a problem to solve, not to work around: the AI cutout runs on the device, voice cleanup goes through a native C++ module, the converter keeps 148 currencies in local storage and resyncs when the signal returns, and the distraction blocker relies on Android modules written in Kotlin.",
      "I am finishing a Master's in Software Engineering at Groupe EDHEG-Abidjan, after a bachelor's in the same field (Licence 3) and a BTS in application development. What I consolidate there gets used at work the next day: modeling, application security, build and release practices. Day to day I work in an Agile setup with product teams and business stakeholders: settle the business rule before coding it, run code reviews and have my own code reviewed, write unit and integration tests, and document whatever someone else will inherit.",
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
    principlesLead: "What I won't compromise on, whatever the project.",
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
    lead: "Six React Native apps on Google Play under the name Codeur d'Ivoire, a seventh in closed testing, plus the daily banking work that stays confidential.",
    publishedTitle: "On Google Play",
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
      status: "Status",
      screenshots: "Screenshots",
      screenshotAlt: "{name}, screenshot {index} of {total}",
    },
    platform: {
      android: "Android",
      ios: "iOS",
      web: "Web",
    },
    status: {
      live: "Live",
      testing: "In closed testing",
    },
  },

  experience: {
    eyebrow: "Experience",
    title: "Background and education",
    lead: "Joined Arolitec on a final-year BTS internship, was hired on a permanent contract at the end of it, and has worked on the company's banking applications ever since.",
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
    whatsappNote: "Faster on WhatsApp",
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
    error: "Message not sent. Try again, or email me directly at soromoise4@gmail.com",
    errors: {
      required: "This field is required.",
      invalidEmail: "That email address is not valid.",
      tooShort: "Too short: 2 characters minimum.",
      tooLong: "Too long for this field.",
      messageTooShort: "Message too short: 20 characters minimum.",
      messageTooLong: "Message too long: 2,000 characters maximum.",
      rateLimited: "Too many messages sent. Wait a few minutes before trying again.",
      server: "Something went wrong on my side. Try again in a moment.",
    },
    responseNote: "Every message is read and answered by me, not by an autoresponder.",
    orSeparator: "or",
    whatsappCta: "Continue on WhatsApp",
    whatsappHint: "Whatever you have filled in is carried over, so just hit send.",
    whatsappIntro: "Hello Moïse, I'm reaching out from codeurdivoire.com.",
  },

  notFound: {
    code: "404",
    title: "Page not found",
    body: "This address does not match any page on the site. The link may be out of date or mistyped. The work and experience sections are still in the menu.",
    cta: "Back to home",
    secondaryCta: "See the work",
  },

  error: errorStrings.en,

  footer: {
    tagline: "Full Stack Web & Mobile Developer in Abidjan, Côte d'Ivoire",
    brandNote: "Mobile apps published under the name Codeur d'Ivoire.",
    builtWith: "Designed and built with Next.js and Tailwind CSS.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    privacy: "Privacy",
  },

  privacy: {
    eyebrow: "Privacy",
    title: "Your data on this site and in Apps Analyser",
    lead: "What this site and the Apps Analyser tool receive, why, and how to withdraw it.",
    updated: "Updated on",
    contact: "For any request:",
  },

  meta: {
    titleTemplate: "%s · Moïse Soro",
    defaultTitle: "Moïse Soro · Full Stack Web & Mobile Developer",
    home: {
      title: "Moïse Soro · Full Stack Web & Mobile Developer",
      description:
        "Full stack developer in Abidjan: banking applications at Arolitec, PostgreSQL and NestJS, plus six offline-first React Native apps on Google Play.",
    },
    about: {
      title: "About: developer in Abidjan",
      description:
        "Full stack developer at Arolitec since 2023: banking architecture, PostgreSQL, GraphQL APIs, RBAC, and offline-first mobile apps for an international audience.",
    },
    stack: {
      title: "Tech stack",
      description:
        "Node.js, NestJS, React, Angular, Remix, React Native, PostgreSQL, Docker, CI/CD: what I actually do with each tool. No percentages, no badges.",
    },
    work: {
      title: "Work: published apps and client projects",
      description:
        "Six React Native apps on Google Play as Codeur d'Ivoire: AI photo cutouts, voice cleanup, 148 currencies, focus, health logging and USSD.",
    },
    experience: {
      title: "Experience: Arolitec, MSc Software Engineering",
      description:
        "Full stack developer at Arolitec since 2023 on a permanent contract, hired after a BTS internship. MSc Software Engineering, EDHEG-Abidjan, 2024-2026.",
    },
    privacy: {
      title: "Privacy",
      description:
        "Privacy policy of codeurdivoire.com and Apps Analyser: data received, use of Google APIs, hosting and your rights.",
    },
    contact: {
      title: "Contact · Abidjan",
      description:
        "Get in touch about a web or mobile project: send the context, the technical constraint and the deadline, and I will reply with a first read.",
    },
  },
};
