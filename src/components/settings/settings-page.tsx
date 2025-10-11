import { AppWindow, type LucideIcon, SquareUser, Toilet } from 'lucide-react';
import type { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../base/tabs';
import { AccountSettings } from './account-settings';
import { ApplicationSettings } from './applicaiton-settings';

type TabConfig = {
	id: string;
	display?: string;
	icon: LucideIcon;
	component: FC;
};

const tabs: TabConfig[] = [
	{
		id: 'account',
		display: 'Account',
		icon: SquareUser,
		component: AccountSettings,
	},
	{
		id: 'application',
		display: 'Application',
		icon: AppWindow,
		component: AccountSettings,
	},
	{
		id: 'poo',
		display: 'Poop monster',
		icon: Toilet,
		component: AccountSettings,
	},
];

export const SettingsPage: FC = () => {
	return (
		<div>
			<div className=" flex w-full justify-center mt-5 pb-10">
				<Tabs defaultValue="account">
					<div className="mb-2">
						<TabsList>
							{tabs.map((tab) => (
								<TabsTrigger key={tab.id} value={tab.id}>
									<div className="flex gap-2 items-center">
										<tab.icon />
										{tab.display}
									</div>
								</TabsTrigger>
							))}
						</TabsList>
					</div>
					<div className="min-w-sm p-0">
						{tabs.map((tab) => (
							<TabsContent key={tab.id} value={tab.id}>
								<tab.component />
							</TabsContent>
						))}
					</div>
				</Tabs>
			</div>
		</div>
	);
};
