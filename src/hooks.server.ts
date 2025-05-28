import type { Handle } from '@sveltejs/kit';
import { authService } from '$lib/services/auth';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.purchToken = authService.getPurchToken(event);
	return resolve(event);
};
