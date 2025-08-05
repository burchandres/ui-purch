export type ApiConfig = {
	purchBaseUrl: string;
	staleTimes: {
		user: number;
	};
};

export const apiConfig: ApiConfig = {
	purchBaseUrl: 'http://localhost:8080',
	staleTimes: {
		user: 30 * 1000, // 30 seconds
	},
};
