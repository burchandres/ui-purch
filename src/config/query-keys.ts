export type QueryKeysConfig = {
	user: {
		info: string;
		linkToken: string;
	};
	budget: {
		transactions: string;
		transaction: string;
		categories: string;
		items: string;
		accounts: string;
	};
};

export const queryKeys: QueryKeysConfig = {
	user: {
		info: 'USER_INFO',
		linkToken: 'LINK_TOKEN',
	},
	budget: {
		transactions: 'TRANSACTIONS',
		transaction: 'TRANSACTION',
		categories: 'CATEGORIES',
		items: 'ITEMS',
		accounts: 'ACCOUNTS',
	},
} as const;
