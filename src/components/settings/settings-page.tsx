import { Palette, SquareUser, Toilet } from 'lucide-react';
import type { FC } from 'react';
import { type SectionConfig, SectionNav } from '../base/section-nav';
import { AccountSettings } from './account-settings';
import { AppearanceSettings } from './appearance-settings';

const sections: Record<string, SectionConfig> = {
	account: {
		display: 'Account',
		icon: SquareUser,
		component: <AccountSettings />,
	},
	appearance: {
		display: 'Appearance',
		icon: Palette,
		component: <AppearanceSettings />,
	},
	poo: {
		display: 'Poop monster',
		icon: Toilet,
		component: <p>🍈</p>,
	},
};

export const SettingsPage: FC = () => <SectionNav sections={sections} />;
