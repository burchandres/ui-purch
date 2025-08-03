export type ApiConfig = {
  staleTimes: {
    user: number;
  };
};

export const apiConfig = {
  staleTimes: {
    user: 5 * 60 * 1000, // 5 minutes
  },
};
