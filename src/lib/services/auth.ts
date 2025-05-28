import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { api } from '$lib/api';
import type { Cookies } from '@sveltejs/kit';

export const PURCH_TOKEN_COOKIE = 'purch_token';
export const EXPIRATION_DUR = 30 * 60 * 1000;

export type TokenData = {
	token: string;
	expiration: number;
};

type AuthEvent = {
	cookies: Cookies;
};

export const authService = {
	setPurchTokenCookie(
		event: AuthEvent,
		token: string,
		expiration: number = Date.now() + EXPIRATION_DUR
	) {
		event.cookies.set(PURCH_TOKEN_COOKIE, JSON.stringify({ token, expiration }), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: expiration - Date.now()
		});
	},

	getPurchToken(event: AuthEvent): TokenData | null {
		const data = event.cookies.get(PURCH_TOKEN_COOKIE);
		if (!data) return null;

		try {
			return JSON.parse(data) as TokenData;
		} catch {
			return null;
		}
	},

	clearPurchTokenCookie(event: AuthEvent) {
		event.cookies.delete(PURCH_TOKEN_COOKIE, { path: '/' });
	},

	async login(event: RequestEvent, username: string, password: string) {
		const response = await api.auth.login(username, password);

		if (response.error) {
			return { error: response.error };
		}

		this.setPurchTokenCookie(event, response.data!.access_token, response.data!.expiration);
		throw redirect(302, '/dashboard');
	},

	async register(username: string, password: string): { success: boolean; message: string } {
		const response = await api.auth.register(username, password);
		if (response.error) {
			return { success: false, message: response.error };
		}

		return {
			success: true,
			message: 'User successfully created. Please log in'
		};
	},

	async logout(event: AuthEvent) {
		this.clearPurchTokenCookie(event);
		throw redirect(302, '/login');
	},

	requirePurchAuth(locals: App.Locals) {
		if (!locals.purchToken?.expiration || !(locals.purchToken.expiration > Date.now())) {
			throw redirect(302, '/login');
		}
		return locals.purchToken;
	}
};
