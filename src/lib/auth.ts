import { db } from './db';
import type { RequestEvent } from '@sveltejs/kit';

export const AUTH_COOKIE = 'auth_token';

type UserSession = {
	user: {
		id: string;
		username: string;
	};
	accessToken: string;
};

export function createUserSession(userId: string, username: string, accessToken: string): string {
	// Store user if not exists
	db.prepare(
		`
    INSERT OR IGNORE INTO users (id, username)
    VALUES (?, ?)
  `
	).run(userId, username);

	// Create new token
	const token = accessToken;
	const expiresAt = Date.now() + 30 * 60 * 1000; // 30m

	db.prepare(
		`
    INSERT INTO auth_tokens (token, user_id, expires_at)
    VALUES (?, ?, ?)
  `
	).run(token, userId, expiresAt);

	return token;
}

export function validateSession(token: string): UserSession | null {
	const result = db
		.prepare(
			`
    SELECT
      users.id,
      users.username,
      auth_tokens.expires_at,
      auth_tokens.token as access_token
    FROM auth_tokens
    JOIN users ON users.id = auth_tokens.user_id
    WHERE auth_tokens.token = ?
  `
		)
		.get(token);

	if (!result) return null;
	if (result.expires_at < Date.now()) {
		invalidateSession(token);
		return null;
	}

	return {
		user: {
			id: result.id,
			username: result.username
		},
		accessToken: result.access_token
	};
}

export function invalidateSession(token: string) {
	db.prepare('DELETE FROM auth_tokens WHERE token = ?').run(token);
}

export function setAuthCookie(event: RequestEvent, token: string) {
	event.cookies.set(AUTH_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 // 24 hours
	});
}

export function clearAuthCookie(event: RequestEvent) {
	event.cookies.delete(AUTH_COOKIE, { path: '/' });
}
