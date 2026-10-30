// Single source of truth for portfolio content. Mirrors docs/cv.md.

export interface Project {
  name: string;
  summary: string;
  // "Genres" shown on the Experience channel, taken from the summary
  tags: string[];
}

export interface Job {
  company: string;
  role: string;
  start: string;
  end: string;
  projects: Project[];
  stack: string[];
}

export interface Degree {
  title: string;
  school: string;
  focus?: string;
  place?: string;
  details: string[];
}

export interface Link {
  label: string;
  href: string;
  handle: string;
}

export const profile = {
  name: "Elizabeth Calzadilla",
  fullName: "Elizabeth Calzadilla Fernández",
  role: "Software Engineer",
  tagline: "5+ years exp. · ICPC World Finalist",
  location: "Barcelona, Spain",
  summary:
    "Software engineer with a competitive programming background (ICPC World Finals) and 5+ years shipping production software. Currently frontend on zara.com, one of the world's largest e-commerce platforms. I care deeply about performance and accessibility at scale, and have delivered full stack work with .NET and Node across earlier projects.",
};

export const about = [
  "Software engineer with 5+ years shipping production software and a competitive programming background that took me to the ICPC World Finals.",
  "Currently frontend on zara.com, one of the world's largest e-commerce platforms, where I focus on accessibility and performance at scale. Earlier I delivered full stack work with .NET and Node, from B2B carbon credit platforms to AI-powered tools.",
  "Beyond building products, I taught weekly coding classes for kids at Leagues of Code in 2026. Breaking down complex ideas for them sharpened my technical communication.",
  "Based in Barcelona, always up for new challenges and collaborations.",
];

export const links: Link[] = [
  {
    label: "Email",
    href: "mailto:elizabethcalzadillafernandez@gmail.com",
    handle: "elizabethcalzadillafernandez@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/ElizabethCF01",
    handle: "github.com/ElizabethCF01",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/elizabethcalzadilla-fernandez",
    handle: "linkedin.com/in/elizabethcalzadilla-fernandez",
  },
  {
    label: "Phone",
    href: "tel:+34608567163",
    handle: "+34 608 567 163",
  },
];

export const highlights = [
  { label: "Competitive programming", title: "ICPC World Finalist", detail: "46th World Finals · Luxor, Egypt" },
  { label: "Education", title: "Double M.Sc.", detail: "Frontend Dev & Computer Science · Harbour.Space" },
  { label: "Shipping at scale", title: "zara.com", detail: "Frontend on one of the world's largest e-commerce sites" },
];

export const experience: Job[] = [
  {
    company: "Napptilus Tech Labs",
    role: "Full Stack Developer",
    start: "Dec 2022",
    end: "Present",
    projects: [
      {
        name: "Zara.com / Inditex",
        tags: ["Frontend", "Accessibility", "Performance"],
        summary:
          "Develop and maintain the official zara.com storefront and 6+ internal repositories for a platform serving millions of users daily. Worked extensively on accessibility improvements to make the shopping experience usable for customers with disabilities, and on performance-critical interfaces at scale.",
      },
      {
        name: "Slalom",
        tags: ["Vue → Nuxt", ".NET 8", "Full stack"],
        summary:
          "Owned the migration from Vue to Nuxt, modernizing the codebase and improving rendering performance. Led development of the back office and backend services with .NET 8 / C#, delivering the full stack end to end.",
      },
      {
        name: "Napptilus corporate site",
        tags: ["SEO", "Performance", "Motion"],
        summary:
          "Led design and development of the company's own website, improving SEO and load performance while modernizing the brand presence with motion design and animations.",
      },
      {
        name: "TrackCO2",
        tags: ["B2B", "Real-time dashboards"],
        summary:
          "Built a B2B platform connecting companies with carbon credit project developers, implementing real-time dashboards and document verification flows to guarantee full traceability of environmental assets.",
      },
      {
        name: "Federació Catalana d'Hípica",
        tags: ["Node.js", "APIs"],
        summary:
          "Built the backend for the Catalan Equestrian Federation's platform with Node.js, developing APIs and server-side logic.",
      },
      {
        name: "Nappai",
        tags: ["Astro", "React", "AI"],
        summary:
          "Built the public-facing frontend for an AI platform with Astro and React, focused on performance and polish.",
      },
      {
        name: "Stage in Home",
        tags: [".NET 8", "Full stack", "AI"],
        summary:
          "Full stack work on an AI-powered virtual home staging tool: frontend plus backend services and APIs with .NET 8 / C#, integrating image generation pipelines and property management workflows.",
      },
    ],
    stack: ["Vue.js", "Nuxt.js", "React", "TypeScript", "Redux Toolkit", "Pinia", "Astro", "Strapi", "Nest.js", "Tailwind", ".NET 6/8", "C#"],
  },
  {
    company: "Luna Geoespacial",
    role: "Frontend Developer",
    start: "Aug 2021",
    end: "Sep 2022",
    projects: [
      {
        name: "NatureCounts (Birds Canada)",
        tags: ["Vue.js", "Data viz"],
        summary:
          "Contributed to one of the world's largest biodiversity data repositories, developing interactive data visualization interfaces for ornithological research used by scientists globally.",
      },
    ],
    stack: ["Vue.js", "Vuex", "JavaScript", "Bootstrap"],
  },
];

export const beyondWork = [
  {
    title: "Competitive Programming",
    subtitle: "ICPC World Finalist · UCI Team",
    summary:
      "Competed at the 46th ICPC World Finals, after years of training in algorithms, data structures and problem-solving under pressure.",
  },
  {
    title: "Leagues of Code",
    subtitle: "2026",
    summary:
      "Taught programming to children weekly; breaking down complex concepts is a skill that transfers directly to technical communication.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "CS Fundamentals", items: ["Algorithms", "Data Structures", "Dynamic Programming", "C++", "Python"] },
  {
    group: "Frontend",
    items: ["React", "Vue.js", "TypeScript", "Nuxt.js", "Astro", "Quasar", "Tailwind", "Accessibility (a11y)", "SEO & Performance", "Redux Toolkit", "Zustand", "Pinia", "Vuex"],
  },
  {
    group: "Backend & Data",
    items: [".NET 6/8", "C#", "Node.js", "Nest.js", "Strapi", "Laravel", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  { group: "Tools", items: ["Git / GitHub", "Claude Code", "Figma"] },
];

// Graduation years are left out on purpose: work history shows the seniority.
export const education: Degree[] = [
  {
    title: "Double M.Sc.",
    school: "Harbour.Space University",
    focus: "Frontend Development & Computer Science",
    place: "Barcelona",
    details: ["Frontend Development", "Computer Science", "Barcelona, Spain"],
  },
  {
    title: "Computer Science Engineering",
    school: "Universidad de las Ciencias Informáticas (UCI)",
    details: ["ICPC World Finals participant, 46th edition, Luxor", "Programming team member & competitor"],
  },
];

export const icpc = {
  title: "ICPC World Finals",
  edition: "46th Edition",
  place: "Luxor, Egypt",
  team: "UCI Team",
};

export const languages = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "C1 / Advanced (EF SET)" },
];
