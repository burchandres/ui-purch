import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';

export type UseDateOptions = {
	relative?: boolean;
	relativeThreshold?: number; // days
	updateInterval?: number; // ms
	absoluteFormat?: string;
	unit?: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
};

const UNITS = {
	second: 1000,
	minute: 60 * 1000,
	hour: 60 * 60 * 1000,
	day: 24 * 60 * 60 * 1000,
	week: 7 * 24 * 60 * 60 * 1000,
	month: 30 * 24 * 60 * 60 * 1000,
	year: 365 * 24 * 60 * 60 * 1000,
} as const;

function formatWithUnit(dateObj: Date, unit: keyof typeof UNITS): string {
	const diff = Date.now() - dateObj.getTime();
	const absDiff = Math.abs(diff);
	const value = Math.round(absDiff / UNITS[unit]);
	const isFuture = diff < 0;

	if (value === 0) {
		if (unit === 'day') return 'today';
		return 'now';
	}

	const unitStr = value === 1 ? unit : `${unit}s`;

	if (isFuture) {
		return `in ${value} ${unitStr}`;
	}

	return `${value} ${unitStr} ago`;
}

export function useDate(date: string | Date, options: UseDateOptions = {}) {
	const {
		relative = true,
		relativeThreshold = 7,
		updateInterval = 60000, // 1 minute
		absoluteFormat = 'PPpp',
		unit,
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
		const display = unit
			? formatWithUnit(dateObj, unit)
			: formatDistanceToNow(dateObj, { addSuffix: true });

		return {
			display,
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
