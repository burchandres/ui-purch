import { type LucideIcon, Palette, SquareUser, Toilet } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { appearanceConfig } from '@/config/appearance';
import { Separator } from '../base/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../base/tabs';
import { AccountSettings } from './account-settings';

type SectionConfig = {
	display?: string;
	icon: LucideIcon;
	component: ReactNode;
};

const sections: Record<string, SectionConfig> = {
	account: {
		display: 'Account',
		icon: SquareUser,
		component: <AccountSettings />,
	},
	appearance: {
		display: 'Appearance',
		icon: Palette,
		component: <p>🎨</p>,
	},
	poo: {
		display: 'Poop monster',
		icon: Toilet,
		component: <p>🍈</p>,
	},
};

export const SettingsPage: FC = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<Tabs
				defaultValue="account"
				orientation="vertical"
				className="flex flex-row min-h-max"
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: appearanceConfig.mdGap,
						padding: appearanceConfig.lgGap,
					}}
				>
					<TabsList>
						{Object.entries(sections).map(([key, section]) => (
							<TabsTrigger
								key={key}
								value={key}
								style={{
									textAlign: 'left',
									justifyContent: 'flex-start',
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyItems: 'flex-start',
										alignItems: 'center',
										gap: appearanceConfig.smGap,
									}}
								>
									<section.icon /> {section.display}
								</div>
							</TabsTrigger>
						))}
					</TabsList>
				</div>
				<Separator style={{ height: 'auto' }} orientation="vertical" />
				<div style={{ margin: appearanceConfig.lgGap }}>
					{Object.entries(sections).map(([key, section]) => (
						<TabsContent key={key} value={key}>
							{section.component}
						</TabsContent>
					))}
				</div>
			</Tabs>
		</div>
	);
};
