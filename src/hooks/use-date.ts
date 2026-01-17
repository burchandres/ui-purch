import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';

export type UseDateOptions = {
	relative?: boolean;
	relativeThreshold?: number; // days
	updateInterval?: number; // ms
	absoluteFormat?: string;
};

export function useDate(date: string | Date, options: UseDateOptions = {}) {
	const {
		relative = true,
		relativeThreshold = 7,
		updateInterval = 60000, // 1 minute
		absoluteFormat = 'PPpp',
	} = options;

	const [, setTick] = useState(0);
	const dateObj = typeof date === 'string' ? parseISO(date) : date;
	const daysDiff = (Date.now() - dateObj.getTime()) / (1000 * 60 * 60 * 24);

	useEffect(() => {
		if (!relative || daysDiff > relativeThreshold) return;

		const interval = setInterval(() => {
			setTick((t) => t + 1);
		}, updateInterval);

		return () => clearInterval(interval);
	}, [relative, daysDiff, relativeThreshold, updateInterval]);

	if (relative && daysDiff <= relativeThreshold) {
		return {
			display: formatDistanceToNow(dateObj, { addSuffix: true }),
			absolute: format(dateObj, absoluteFormat),
			isRelative: true,
		};
	}

	return {
		display: format(dateObj, absoluteFormat),
		absolute: format(dateObj, absoluteFormat),
		isRelative: false,
	};
}
