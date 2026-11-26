export type OrbitTier = "edge" | "services" | "data" | "security";
export type OrbitNode = {
  id: string;
  tier: OrbitTier;
  icon: string;
  title: string;
  detail: string;
};

export const hero = {
  eyebrowIndex: "00",
  eyebrowLabel: "HELLO, I’M",
  nameLines: ["ANDRÉS", "BERMÚDEZ"],
  nameLabel: "Andrés Bermúdez",
  role: "Backend Software Engineer",
  statement:
    "I build backend systems and computational tools for complex problems, with a focus on clear architecture, explicit constraints, and rigorous validation.",
  scrollCue: "SCROLL ↓  01 SELECTED WORK",
} as const;

export const orbit = {
  labelLines: ["ENGINEERING", "DISCIPLINE"],
  nodes: [
    {
      id: "tested",
      tier: "edge",
      icon: "tested",
      title: "tested",
      detail: "pytest, locked holdout",
    },
    {
      id: "documented",
      tier: "services",
      icon: "documented",
      title: "documented",
      detail: "API docs, written reports",
    },
    {
      id: "reproducible",
      tier: "data",
      icon: "reproducible",
      title: "reproducible",
      detail: "Docker Compose demo",
    },
    {
      id: "versioned",
      tier: "security",
      icon: "versioned",
      title: "versioned",
      detail: "tagged releases",
    },
  ] satisfies readonly OrbitNode[],
} as const;
