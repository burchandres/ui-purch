import type { Account } from '@/lib/api/budget/types';

export const mockAccounts: Account[] = [
	{
		id: '1',
		itemId: 'C1-id',
		name: 'Venture X',
		availableBalance: 500,
		currentBalance: 234.56,
		type: 'Credit',
		subType: 'Credit Card',
	},
	{
		id: '2',
		itemId: 'WF-id',
		name: 'Active Cash Credit Card',
		availableBalance: 500,
		currentBalance: 2234.5,
		type: 'Credit',
		subType: 'Credit Card',
	},
	{
		id: '3',
		itemId: 'C1-id',
		name: 'Prime Rewards',
		availableBalance: 500,
		currentBalance: 934.56,
		type: 'Credit',
		subType: 'Credit Card',
	},
	{
		id: '4',
		itemId: 'WF-id',
		name: 'Young Adult Checking',
		availableBalance: 500,
		currentBalance: 134.31,
		type: 'Depository',
		subType: 'Checking',
	},
	{
		id: '5',
		itemId: 'WF-id',
		name: 'Lifetime Savings',
		currentBalance: 8134.31,
		type: 'Depository',
		subType: 'Savings',
	},
];
