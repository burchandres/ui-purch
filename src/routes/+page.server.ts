import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// if user is logged in (has valid session), redirect to dashboard
	if (locals.accessToken?.expiration && locals.accessToken.expiration > Date.now())
		throw redirect(302, '/dashboard');

	// TODO: landing page instead?

	// otherwise redirect to login
	throw redirect(302, '/login');
};
