import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "@/types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [{ href: "/dashboard", icon: "dashboard", title: "Dashboard" }],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/", icon: "settings", title: "Settings" },
      { href: "/", icon: "home", title: "Homepage" },
      { href: "/dashboard/", icon: "bookOpen", title: "Documentation" },
      {
        href: "#",
        icon: "messages",
        title: "Support",
        authorizeOnly: UserRole.USER,
        disabled: true,
      },
    ],
  },
];
