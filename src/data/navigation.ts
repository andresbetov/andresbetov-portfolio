export type NavItem = {
  index: string;
  label: string;
  href: string;
};

export const navigation: readonly NavItem[] = [
  { index: "01", label: "Projects", href: "#projects" },
  { index: "02", label: "Experience", href: "#experience" },
  { index: "03", label: "Education", href: "#education" },
  { index: "04", label: "Contact", href: "#contact" },
];
