export type QueryKeysConfig = {
	user: {
		info: string;
		linkToken: string;
	};
};

export const queryKeys: QueryKeysConfig = {
	user: {
		info: 'USER_INFO',
		linkToken: 'LINK_TOKEN',
	},
} as const;
