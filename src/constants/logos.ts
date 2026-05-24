export type Category = "discomorphism" | "balloonmorphism" | "monetmorphism";

export interface Logo {
  id: string;
  brand: string;
  category: Category;
  description: string;
  tags: string[];
  hasAudio: boolean;
}

export const categories: { key: Category; label: string; emoji: string }[] = [
  { emoji: "🕺", key: "discomorphism", label: "Discomorphism" },
  { emoji: "🎈", key: "balloonmorphism", label: "Balloonmorphism" },
  { emoji: "🎨", key: "monetmorphism", label: "Monetmorphism" },
];

export const logos: Logo[] = [
  {
    brand: "Notion",
    category: "discomorphism",
    description:
      "All-in-one workspace for notes, docs, and project management.",
    hasAudio: true,
    id: "notion",
    tags: ["productivity", "notes", "docs", "workspace"],
  },
  {
    brand: "Figma",
    category: "discomorphism",
    description: "Collaborative interface design tool used by teams worldwide.",
    hasAudio: true,
    id: "figma",
    tags: ["design", "ui", "ux", "prototyping", "collaboration"],
  },
  {
    brand: "Vercel",
    category: "discomorphism",
    description:
      "Platform for frontend frameworks and static sites, built by the creators of Next.js.",
    hasAudio: false,
    id: "vercel",
    tags: ["hosting", "deployment", "serverless", "frontend"],
  },
  {
    brand: "Linear",
    category: "discomorphism",
    description:
      "Modern issue tracking and project management tool for software teams.",
    hasAudio: true,
    id: "linear",
    tags: ["project-management", "issues", "tracking", "software"],
  },
  {
    brand: "Stripe",
    category: "discomorphism",
    description: "Payment processing platform for internet businesses.",
    hasAudio: false,
    id: "stripe",
    tags: ["payments", "finance", "saas", "api"],
  },
  {
    brand: "Slack",
    category: "discomorphism",
    description:
      "Business communication platform for team messaging and collaboration.",
    hasAudio: true,
    id: "slack",
    tags: ["communication", "messaging", "team", "collaboration"],
  },
  {
    brand: "GitHub",
    category: "balloonmorphism",
    description:
      "Platform for version control and collaborative software development.",
    hasAudio: true,
    id: "github",
    tags: ["code", "git", "development", "collaboration"],
  },
  {
    brand: "Tailwind CSS",
    category: "balloonmorphism",
    description:
      "Utility-first CSS framework for rapidly building custom user interfaces.",
    hasAudio: false,
    id: "tailwind",
    tags: ["css", "design", "frontend", "framework"],
  },
  {
    brand: "Next.js",
    category: "balloonmorphism",
    description:
      "React framework for production-grade web applications with server-side rendering.",
    hasAudio: true,
    id: "nextjs",
    tags: ["react", "framework", "ssr", "web", "frontend"],
  },
  {
    brand: "Supabase",
    category: "balloonmorphism",
    description:
      "Open-source Firebase alternative with PostgreSQL database, auth, and storage.",
    hasAudio: false,
    id: "supabase",
    tags: ["database", "backend", "auth", "storage", "open-source"],
  },
  {
    brand: "Railway",
    category: "balloonmorphism",
    description:
      "Infrastructure platform for deploying and scaling applications effortlessly.",
    hasAudio: false,
    id: "railway",
    tags: ["hosting", "deployment", "infrastructure", "cloud"],
  },
  {
    brand: "PlanetScale",
    category: "balloonmorphism",
    description:
      "MySQL-compatible serverless database platform with branching workflows.",
    hasAudio: false,
    id: "planetscale",
    tags: ["database", "mysql", "serverless", "branching"],
  },
  {
    brand: "Arc Browser",
    category: "monetmorphism",
    description:
      "A modern web browser reimagined for a calmer, more organized internet experience.",
    hasAudio: true,
    id: "arc",
    tags: ["browser", "web", "productivity", "design"],
  },
  {
    brand: "Raycast",
    category: "monetmorphism",
    description:
      "Blazingly fast, extensible launcher for macOS with powerful productivity extensions.",
    hasAudio: true,
    id: "raycast",
    tags: ["launcher", "productivity", "macos", "extensions"],
  },
  {
    brand: "Excalidraw",
    category: "monetmorphism",
    description:
      "Virtual whiteboard for sketching hand-drawn like diagrams and wireframes.",
    hasAudio: false,
    id: "excalidraw",
    tags: ["whiteboard", "diagram", "drawing", "collaboration"],
  },
  {
    brand: "Cal.com",
    category: "monetmorphism",
    description: "Open-source scheduling infrastructure for everyone.",
    hasAudio: false,
    id: "cal",
    tags: ["scheduling", "calendar", "open-source", "booking"],
  },
  {
    brand: "Loom",
    category: "monetmorphism",
    description: "Video messaging platform for async workplace communication.",
    hasAudio: false,
    id: "loom",
    tags: ["video", "communication", "async", "messaging"],
  },
  {
    brand: "Notion Calendar",
    category: "monetmorphism",
    description:
      "Connected calendar that brings your schedule and tasks together.",
    hasAudio: false,
    id: "notion-calendar",
    tags: ["calendar", "productivity", "scheduling", "notion"],
  },
];

const getLogoById = (id: string): Logo | undefined =>
  logos.find((l) => l.id === id);

const getLogosByCategory = (category: Category): Logo[] =>
  logos.filter((l) => l.category === category);

const getAdjacentLogo = (id: string, direction: 1 | -1): Logo | undefined => {
  const idx = logos.findIndex((l) => l.id === id);
  if (idx === -1) {
    return undefined;
  }
  const next = (idx + direction + logos.length) % logos.length;
  return logos[next];
};

export { getAdjacentLogo, getLogoById, getLogosByCategory };
