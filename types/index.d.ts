import { Icons } from "@/components/shared/icons";

export interface SidebarNavItem {
  title: string;
  href?: string;
  icon?: keyof typeof Icons;
  items?: SidebarNavItem[];
}
