/** Primary column — each stop is a vertebra on the brand spine */
export const navItems = [
  {
    code: "C1",
    label: "Services",
    href: "/#services",
    section: "services",
  },
  {
    code: "T1",
    label: "Work",
    href: "/#work",
    section: "work",
  },
  {
    code: "L1",
    label: "Process",
    href: "/#process",
    section: "process",
  },
  {
    code: "S1",
    label: "Contact",
    href: "/#contact",
    section: "contact",
  },
] as const;

export type NavItem = (typeof navItems)[number];
