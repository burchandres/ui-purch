import { House, Settings } from 'lucide-react';

export type PageConfig = {
	url: string;
	display: string;
	icon: React.FC;
};

export const pages: PageConfig[] = [
	{
		url: 'home',
		display: 'Home',
		icon: House,
	},
	{
		url: 'settings',
		display: 'Settings',
		icon: Settings,
	},
];
