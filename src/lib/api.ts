const API_BASE = 'http://localhost:8080';

type ApiResponse<T> = {
	data?: T;
	error?: string;
};

type LoginResponse = {
	access_token: string;
	token_type: string;
	expiration: string;
};

async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
	try {
		const response = await fetch(`${API_BASE}${endpoint}`, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...options.headers
			}
		});

		const data = await response.json();

		if (!response.ok) {
			return { error: data.detail || 'An error occurred' };
		}

		return { data };
	} catch (error) {
		console.error(error);
		return { error: 'Network error occurred' };
	}
}

export const api = {
	auth: {
		login: async (username: string, password: string) => {
			const formData = new URLSearchParams();
			formData.append('username', username);
			formData.append('password', password);

			return apiCall<LoginResponse>('/auth/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: formData
			});
		},

		register: async (username: string, password: string) => {
			// TODO: set these through actual form input
			const fields = {
				id: null,
				first_name: 'Anders',
				last_name: 'Buch',
				is_active: true,
				plaid_access_token: 'string',
				salary: 3958.33,
				salary_rate: 'bimonthly'
			};

			return apiCall<{ id: string; username: string }>('/auth/register', {
				method: 'POST',
				body: JSON.stringify({ username, password, ...fields })
			});
		}
	}
};
