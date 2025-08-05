import { House, Settings } from "lucide-react";

export type PageConfig = {
  url: string;
  display: string;
  icon: React.FC;
};

export type PagesConfig = {
  pages: PageConfig[];
};

export const pagesConfig: PagesConfig = {
  pages: [
    {
      url: "dashboard",
      display: "Dashboard",
      icon: House,
    },
    {
      url: "settings",
      display: "Settings",
      icon: Settings,
    },
  ],
};
