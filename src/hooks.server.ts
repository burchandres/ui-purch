import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(auth.AUTH_COOKIE);

	if (!token) {
		event.locals.user = null;
		event.locals.accessToken = null;
		return resolve(event);
	}

	const session = auth.validateSession(token);
	if (session) {
		event.locals.user = session.user;
		event.locals.accessToken = session.accessToken;
	} else {
		event.locals.user = null;
		event.locals.accessToken = null;
		auth.clearAuthCookie(event);
	}

	return resolve(event);
};
