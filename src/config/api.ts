export type ApiConfig = {
  purchBaseUrl: string;
  staleTimes: {
    user: number;
  };
};

export const apiConfig: ApiConfig = {
  purchBaseUrl: "http://localhost:8080",
  staleTimes: {
    user: 5 * 60 * 1000, // 5 minutes
  },
};
