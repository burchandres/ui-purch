import { fail, redirect } from '@sveltejs/kit';
import { api } from '$lib/api';
import * as auth from '$lib/auth';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async (event) => {
		const data = await event.request.formData();
		const response = await api.auth.login(
			data.get('username') as string,
			data.get('password') as string
		);

		if (response.error) {
			return fail(400, { message: response.error });
		}

		const userResponse = await api.user.current(response.data!.access_token);

		if (userResponse.error) {
			return fail(400, { message: userResponse.error });
		}

		const token = auth.createUserSession(
			userResponse.data!.id,
			userResponse.data!.username,
			response.data!.access_token
		);

		auth.setAuthCookie(event, token);
		return redirect(302, '/dashboard');
	},

	register: async (event) => {
		const data = await event.request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;

		const response = await api.auth.register(username, password);
		if (response.error) {
			return fail(400, { message: response.error });
		}

		return {
			success: true,
			message: 'User successfully created. Please log in'
		};
	}
};
