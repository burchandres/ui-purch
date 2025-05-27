import { redirect } from '@sveltejs/kit';
import * as auth from '$lib/auth';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	console.log('dashboard locals: ', locals);
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	return {
		user: locals.user,
		token: locals.accessToken
	};
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.accessToken) {
			return redirect(302, '/login');
		}

		// invalidate the session
		auth.invalidateSession(event.locals.accessToken);
		// clear the cookie
		auth.clearAuthCookie(event);

		throw redirect(302, '/login');
	}
};
