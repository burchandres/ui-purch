import { fail } from '@sveltejs/kit';
import { authService } from '$lib/services/auth';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async (event) => {
		const data = await event.request.formData();
		const result = await authService.login(
			event,
			data.get('username') as string,
			data.get('password') as string
		);

		if (!result.success) {
			return fail(400, { message: result.message });
		}
	},

	register: async (event) => {
		const data = await event.request.formData();
		const result = await authService.register(
			data.get('username') as string,
			data.get('password') as string
		);

		if (!result.success) {
			return fail(400, { message: result.message });
		}

		return result;
	}
};
