export type ApiConfig = {
	purchBaseUrl: string;
	staleTimes: {
		user: number;
		checkAuth: number;
		budget: number;
	};
};

export const apiConfig: ApiConfig = {
	purchBaseUrl: 'http://localhost:8080',
	staleTimes: {
		user: 30 * 1000, // 30 sec
		checkAuth: 30 * 1000, // 30 sec
		budget: 2 * 60 * 1000, // 2 min
	},
};
