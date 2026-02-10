export type RecurringPayment = {
	name: string;
	amount: number;
	schedule: string[]; // cron string
};

export const recurringPayments: RecurringPayment[] = [
	{
		name: 'Payday',
		amount: 1400,
		schedule: ['0 0 15 * *', '0 0 L * *'],
	},
	{
		name: 'Rent',
		amount: -740,
		schedule: ['0 0 1 * *'],
	},
	{
		name: 'Mortgage',
		amount: -322,
		schedule: ['0 0 2 * *'],
	},
	{
		name: 'Pay back Melos',
		amount: -500,
		schedule: ['0 0 3 * *'],
	},
	{
		name: 'Progressive',
		amount: -120,
		schedule: ['0 0 20 * *'],
	},
];
