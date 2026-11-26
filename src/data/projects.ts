export type SectionOpenerContent = {
  eyebrowIndex: string;
  eyebrowLabel: string;
  title: string;
  meta: string;
};

export const featuredProjectsSection = {
  eyebrowIndex: "01",
  eyebrowLabel: "SELECTED WORK",
  title: "ENGINEERING PROJECTS",
  meta: "3 FEATURED PROJECTS",
} as const satisfies SectionOpenerContent;
