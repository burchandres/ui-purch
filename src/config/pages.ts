import { House, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface PageConfig {
  url: string;
  display: string;
  icon: LucideIcon;
}

export interface PagesConfig {
  pages: Record<string, PageConfig>;
}

export const pagesConfig: PagesConfig = {
  pages: {
    dashboard: {
      display: 'Dashboard',
      icon: House,
      url: 'dashboard',
    },
    landing: {
      display: 'Purch',
      icon: House,
      url: 'landing',
    },
    settings: {
      display: 'Settings',
      icon: Settings,
      url: 'settings',
    },
  },
};
