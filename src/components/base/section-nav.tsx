import type { LucideIcon } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { appearanceConfig } from '@/config/appearance';
import { Separator } from '../base/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../base/tabs';

export type SectionConfig = {
	display?: string;
	icon: LucideIcon;
	component: ReactNode;
	onClick?: () => void;
};

interface SectionNavProps {
	default?: string;
	sections: Record<string, SectionConfig>;
}

export const SectionNav: FC<SectionNavProps> = ({ sections }) => {
	// const defaultValue = default ? 'asdf' : 'asfd';
	const defaultValue = Object.keys(sections).at(0);

	return (
		<Tabs
			defaultValue={defaultValue}
			orientation="vertical"
			className="flex flex-row h-full"
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
			<div
				style={{ margin: appearanceConfig.lgGap, flex: 1, overflow: 'auto' }}
			>
				{Object.entries(sections).map(([key, section]) => (
					<TabsContent key={key} value={key}>
						{section.component}
					</TabsContent>
				))}
			</div>
		</Tabs>
	);
};
