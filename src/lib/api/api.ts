import axios from 'axios';
import { apiConfig } from '@/config/api';
import { camelToSnake, snakeToCamel } from './types';

export const api = axios.create({
	baseURL: apiConfig.purchBaseUrl,
	withCredentials: true,
});

// request interceptor - convert camelCase to snake_case
api.interceptors.request.use(
	(config) => {
		// convert request body
		if (config.data && typeof config.data === 'object') {
			// skip FormData and URLSearchParams
			if (
				!(config.data instanceof FormData) &&
				!(config.data instanceof URLSearchParams)
			) {
				config.data = camelToSnake(config.data);
			}
		}

		// convert query params
		if (config.params && typeof config.params === 'object') {
			// skip URLSearchParams
			if (!(config.params instanceof URLSearchParams)) {
				config.params = camelToSnake(config.params);
			}
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// response interceptor - convert snake_case to camelCase
api.interceptors.response.use(
	(response) => {
		// Convert response data
		if (response.data && typeof response.data === 'object') {
			response.data = snakeToCamel(response.data);
		}
		return response;
	},
	(error) => {
		console.error('api error', error);

		// Also convert error response data if present
		if (error.response?.data && typeof error.response.data === 'object') {
			error.response.data = snakeToCamel(error.response.data);
		}

		throw error;
	},
);
