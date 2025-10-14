export type IncomeRate =
	| 'hourly'
	| 'weekly'
	| 'biweekly'
	| 'bimonthly'
	| 'monthly'
	| 'annual';

export type InputsConfig = {
	income: {
		min: number;
		max: number;
		rates: { label?: string; value: IncomeRate; tooltip?: string }[];
	};
};

export const inputsConfig: InputsConfig = {
	income: {
		min: 0,
		max: 999999999999999,
		rates: [
			{
				value: 'hourly',
				tooltip: 'You get paid this amount for every hour you work',
			},
			{
				value: 'weekly',
				tooltip: 'You get paid this amount once a week',
			},
			{
				value: 'biweekly',
				label: 'Bi-weekly',
				tooltip: 'You get paid this amount twice a week',
			},
			{
				value: 'monthly',
				tooltip: 'You get paid this amount once a month',
			},
			{
				label: 'Bi-monthly',
				value: 'bimonthly',
				tooltip: 'You get paid this amount twice a month',
			},
			{
				value: 'annual',
				tooltip: 'You get paid this amount once a year',
			},
		],
	},
} as const;
