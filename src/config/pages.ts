import { House, type LucideIcon, Settings } from 'lucide-react';

export type PageConfig = {
	url: string;
	display: string;
	icon: LucideIcon;
};

export type PagesConfig = {
	pages: Record<string, PageConfig>;
};

export const pagesConfig: PagesConfig = {
	pages: {
		landing: {
			url: 'landing',
			display: 'Purch',
			icon: House,
		},
		dashboard: {
			url: 'dashboard',
			display: 'Dashboard',
			icon: House,
		},
		settings: {
			url: 'settings',
			display: 'Settings',
			icon: Settings,
		},
	},
};
