import { House, Settings } from "lucide-react";
import { PurchLogoSquare } from "@/components/icons/purch-logo";

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
      url: "home",
      display: "Home",
      icon: House,
    },
    {
      url: "settings",
      display: "Settings",
      icon: Settings,
    },
  ],
};
