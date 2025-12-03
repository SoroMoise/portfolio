export const PERSONAL_INFO = {
  name: "SORO Colotcholoman Moïse",
  shortName: "Moïse Soro",
  title: "Développeur Web, Mobile & Desktop",
  tagline:
    "Passionate about creating smooth, performant, and scalable experiences",
  location: "Abidjan, Côte d'Ivoire",
  company: "Arolitec",
  email: "soro.moise@example.com", // Update with actual email
  github: "https://github.com/SoroMoise",
  githubUsername: "SoroMoise",
  whatsapp: "+2250564796221",
  whatsappLink: "https://wa.me/2250564796221",
  facebook: "soro.moise.90",
  facebookLink: "https://facebook.com/soro.moise.90",
  bio: "Hey there, I'm Moïse Soro! I'm a passionate full-stack developer with a strong focus on creating smooth, performant, and scalable experiences across web, mobile, and desktop platforms. Currently working at Arolitec in Abidjan, Côte d'Ivoire, I specialize in building innovative solutions that make a difference.",
  about: [
    "I'm a full-stack developer based in Abidjan, Côte d'Ivoire, currently working at Arolitec. My journey in software development has been driven by a passion for creating applications that are not only functional but also provide exceptional user experiences.",
    "With expertise spanning across multiple platforms and technologies, I love tackling challenging problems and bringing ideas to life through code. Whether it's a mobile app that simplifies daily tasks, a web application that streamlines business processes, or a desktop tool that enhances productivity, I'm always excited to build something meaningful.",
    "When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing knowledge with the developer community.",
  ],
};

export const SKILLS = [
  // Mobile Development
  {
    name: "React Native",
    category: "mobile",
    level: "expert",
    icon: "Smartphone",
    description: "Cross-platform mobile app development",
  },

  // Web Frontend
  {
    name: "React",
    category: "web-frontend",
    level: "expert",
    icon: "Code2",
    description: "Modern web application development",
  },
  {
    name: "Angular",
    category: "web-frontend",
    level: "advanced",
    icon: "Globe",
    description: "Enterprise-grade web applications",
  },
  {
    name: "TypeScript",
    category: "web-frontend",
    level: "expert",
    icon: "FileCode",
    description: "Type-safe JavaScript development",
  },
  {
    name: "Tailwind CSS",
    category: "web-frontend",
    level: "expert",
    icon: "Palette",
    description: "Utility-first CSS framework",
  },
  {
    name: "Next.js",
    category: "web-frontend",
    level: "advanced",
    icon: "Zap",
    description: "React framework with SSR/SSG",
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    level: "expert",
    icon: "Server",
    description: "JavaScript runtime for backend",
  },
  {
    name: "Express.js",
    category: "backend",
    level: "advanced",
    icon: "Box",
    description: "Web application framework",
  },
  {
    name: "REST API",
    category: "backend",
    level: "expert",
    icon: "Network",
    description: "RESTful API design and development",
  },

  // Desktop & Python
  {
    name: "Python",
    category: "desktop",
    level: "advanced",
    icon: "Code",
    description: "General-purpose programming",
  },
  {
    name: "Kivy",
    category: "desktop",
    level: "advanced",
    icon: "Monitor",
    description: "Python framework for desktop apps",
  },
  {
    name: "KivyMD",
    category: "desktop",
    level: "advanced",
    icon: "Layout",
    description: "Material Design for Kivy",
  },

  // Database & Tools
  {
    name: "Git",
    category: "tools",
    level: "expert",
    icon: "GitBranch",
    description: "Version control system",
  },
  {
    name: "Firebase",
    category: "tools",
    level: "advanced",
    icon: "Database",
    description: "Backend as a Service platform",
  },
  {
    name: "MongoDB",
    category: "tools",
    level: "advanced",
    icon: "Database",
    description: "NoSQL database",
  },
];

export const SKILL_CATEGORIES = [
  {
    id: "mobile",
    name: "Mobile Development",
    description: "Cross-platform mobile applications",
    icon: "Smartphone",
  },
  {
    id: "web-frontend",
    name: "Web Frontend",
    description: "Modern web interfaces and experiences",
    icon: "Globe",
  },
  {
    id: "backend",
    name: "Backend Development",
    description: "Server-side logic and APIs",
    icon: "Server",
  },
  {
    id: "desktop",
    name: "Desktop Development",
    description: "Cross-platform desktop applications",
    icon: "Monitor",
  },
  {
    id: "tools",
    name: "Tools & Technologies",
    description: "Development tools and platforms",
    icon: "Wrench",
  },
];

export const PROJECTS = [
  {
    id: "all-currency-converter",
    name: "All Currency Converter",
    description:
      "A comprehensive mobile currency converter supporting 170+ currencies with real-time exchange rates, offline mode, and historical charts.",
    longDescription:
      "All Currency Converter is a feature-rich mobile application built with React Native that simplifies currency conversion for travelers, businesses, and anyone dealing with multiple currencies. The app provides real-time exchange rates, works offline with cached data, and offers visual insights through historical charts.",
    tech: [
      "React Native",
      "TypeScript",
      "REST API",
      "Async Storage",
      "React Native Charts",
    ],
    features: [
      "Support for 170+ global currencies",
      "Real-time exchange rates",
      "Offline mode with cached rates",
      "Historical exchange rate charts",
      "Clean and intuitive UI",
      "Fast and responsive performance",
    ],
    github: "https://github.com/SoroMoise/all-currency-converter",
    demo: undefined as string | undefined,
    image: "/projects/currency-converter.png",
    category: "mobile",
    status: "completed",
    year: "2024",
  },
  {
    id: "simpli-code",
    name: "Simpli-Code",
    description:
      "A mobile app that helps you save and organize your favorite USSD codes for quick access to mobile services like balance checks, airtime purchases, and credit transfers.",
    longDescription:
      "Simpli-Code revolutionizes how users interact with USSD codes by providing a centralized, organized interface for managing and executing mobile service shortcuts. No more memorizing complex codes - just one tap and you're done!",
    tech: ["React Native", "TypeScript", "Async Storage", "React Navigation"],
    features: [
      "Save and organize USSD codes",
      "One-tap execution of actions",
      "Custom categories and favorites",
      "Quick balance check",
      "Airtime purchase shortcuts",
      "Credit transfer made easy",
      "Search and filter functionality",
    ],
    github: "https://github.com/SoroMoise/simpli-code",
    demo: undefined as string | undefined,
    image: "/projects/simpli-code.png",
    category: "mobile",
    status: "completed",
    year: "2024",
  },
  {
    id: "jargon-informatique",
    name: "Jargon Informatique",
    description:
      "An Android dictionary application for computer science and IT terminology, built with Python and Kivy framework.",
    longDescription:
      "Jargon Informatique is an educational mobile application designed to help students and professionals understand computer science terminology. Built entirely with Python and Kivy, it demonstrates the power of Python for mobile development.",
    tech: ["Python", "Kivy", "KivyMD", "SQLite"],
    features: [
      "Comprehensive IT terminology database",
      "Search functionality",
      "Favorites and bookmarks",
      "Offline access",
      "Material Design interface",
      "French language support",
    ],
    github: "https://github.com/SoroMoise/Jargon-Informatique",
    demo: undefined as string | undefined,
    image: "/projects/jargon-informatique.png",
    category: "mobile",
    status: "completed",
    year: "2023",
  },
];

export const EXPERIENCE = [
  {
    id: "arolitec",
    company: "Arolitec",
    position: "Full Stack Developer",
    location: "Abidjan, Côte d'Ivoire",
    startDate: "2022", // Update with actual dates
    endDate: "Present",
    current: true,
    description:
      "Developing innovative web and mobile solutions for clients across various industries.",
    responsibilities: [
      "Design and develop full-stack web applications using React, Angular, and Node.js",
      "Build cross-platform mobile applications with React Native",
      "Collaborate with cross-functional teams to deliver high-quality software solutions",
      "Implement responsive and accessible user interfaces",
      "Optimize application performance and user experience",
      "Mentor junior developers and conduct code reviews",
    ],
    technologies: [
      "React",
      "Angular",
      "React Native",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Firebase",
    ],
    achievements: [
      "Successfully delivered multiple client projects on time and within budget",
      "Improved application performance by 40% through optimization techniques",
      "Implemented modern development practices and CI/CD pipelines",
    ],
  },
  // Add more experiences as needed
];

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: PERSONAL_INFO.github,
    icon: "Github",
    color: "#333",
  },
  {
    name: "WhatsApp",
    url: PERSONAL_INFO.whatsappLink,
    icon: "MessageCircle",
    color: "#25D366",
  },
  {
    name: "Facebook",
    url: PERSONAL_INFO.facebookLink,
    icon: "Facebook",
    color: "#1877F2",
  },
];

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];
