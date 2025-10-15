export type QueryKeysConfig = {
	users: {
		current: string;
		linkToken: string;
	};
};

export const queryKeys: QueryKeysConfig = {
	users: {
		current: 'CURRENT_USER',
		linkToken: 'LINK_TOKEN',
	},
} as const;
