import type { CSSProperties, FC } from 'react';
import { type UseDateOptions, useDate } from '@/hooks/use-date';
import { Tooltip, TooltipContent, TooltipTrigger } from '../base/tooltip';

type SmartDateProps = UseDateOptions & {
	date: string | Date;
	style?: CSSProperties | undefined;
	className?: string;
	showTooltip?: boolean;
};

export const SmartDate: FC<SmartDateProps> = ({
	date,
	style,
	className,
	showTooltip = true,
	relative,
	relativeThreshold,
	updateInterval,
	absoluteFormat,
}) => {
	const formatted = useDate(date, {
		relative,
		relativeThreshold,
		updateInterval,
		absoluteFormat,
	});

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<time
					dateTime={typeof date === 'string' ? date : date.toISOString()}
					style={style}
					className={className}
				>
					{formatted.display}
				</time>
			</TooltipTrigger>
			<TooltipContent side="right" align="center" hidden={!showTooltip}>
				{formatted.absolute}
			</TooltipContent>
		</Tooltip>
	);
};
