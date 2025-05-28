import type { PageServerLoad, Actions } from './$types';
import { authService } from '$lib/services/auth';

export const load: PageServerLoad = async ({ locals }) => {
	const token = authService.requirePurchAuth(locals);
	return { purchToken: token };
};

export const actions: Actions = {
	logout: async (event) => {
		return authService.logout(event);
	}
};
