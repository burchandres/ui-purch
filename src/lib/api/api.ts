import axios from 'axios';
import { apiConfig } from '@/config/api';

export const api = axios.create({
	baseURL: apiConfig.purchBaseUrl,
	withCredentials: true,
});

// interceptor for auth error handling
api.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err.response?.status === 401) return false;
		return Promise.reject(err);
	},
);
