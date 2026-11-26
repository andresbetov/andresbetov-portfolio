export type SocialLink = {
  id: "linkedin" | "github" | "x";
  label: string;
  href: string;
};

export const site = {
  lang: "en",
  name: "Andrés Bermúdez",
  title: "Andrés Bermúdez — Backend Software Engineer",
  description:
    "Portfolio of Andrés Bermúdez, a backend software engineer building systems and computational tools.",
  // Keep aligned with --color-bg-base for the browser chrome.
  themeColor: "#0a1128",
  email: "info.andresbetov@gmail.com",
  cv: "/cv/andres-bermudez-cv.pdf",
  socials: [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/andresbetov/",
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/andresbetov",
    },
    {
      id: "x",
      label: "X",
      href: "https://x.com/andresbetov",
    },
  ] satisfies readonly SocialLink[],
} as const;
