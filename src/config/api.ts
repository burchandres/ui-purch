export type ApiConfig = {
	purchBaseUrl: string;
	staleTimes: {
		user: number;
		checkAuth: number;
	};
};

export const apiConfig: ApiConfig = {
	purchBaseUrl: 'http://localhost:8080',
	staleTimes: {
		user: 30 * 1000, // 30 sec
		checkAuth: 2 * 30 * 1000, // 2 min
	},
};
