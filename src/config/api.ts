export interface ApiConfig {
  purchBaseUrl: string;
  staleTimes: {
    user: number;
    checkAuth: number;
  };
}

export const apiConfig: ApiConfig = {
  purchBaseUrl: 'http://localhost:8080',
  staleTimes: {
    checkAuth: 2 * 30 * 1000, // 2 min
    user: 30 * 1000, // 30 sec
  },
};
