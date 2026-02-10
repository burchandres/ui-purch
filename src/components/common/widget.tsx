import type { FC, ReactNode } from 'react';
import { Heading3 } from './heading-3';

export type WidgetProps = {
	id?: string;
	children: ReactNode;
	span?: 1 | 2 | 3;
	title?: string;
};

export const Widget: FC<WidgetProps> = ({ children, span = 1, title }) => {
	return (
		<div
			className="dashboard-widget"
			style={{
				gridColumn: `span ${span}`,
				minWidth: 0,
			}}
		>
			<div className="overflow-hidden rounded-lg border pl-4 pr-8 pb-4 pt-4">
				{title && <Heading3 content={title} />}
				{children}
			</div>
		</div>
	);
};
