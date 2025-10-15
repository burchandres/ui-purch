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
		console.error('api err', err);
		throw err;
	},
);
