import { mapKeys } from 'lodash';

// biome-ignore lint/suspicious/noExplicitAny: this function purposefully takes any type
export const keysToCap = (obj: Record<string, any>) =>
	mapKeys(obj, (_val, key) => `${key.charAt(0).toUpperCase()}${key.slice(1)}`);

// biome-ignore lint/suspicious/noExplicitAny: this function purposefully takes any type
export const keysToUnCap = (obj: Record<string, any>) =>
	mapKeys(obj, (_val, key) => `${key.charAt(0).toLowerCase()}${key.slice(1)}`);

// tries to pull useful messages out of different error messages
// biome-ignore lint/suspicious/noExplicitAny: this function purposefully takes any type
export const parseErrorMessage = (error: any): string => {
	// biome-ignore lint/suspicious/noExplicitAny: this function purposefully takes any type
	const isStringWithLength = (val: any) =>
		typeof val === 'string' && val.length;
	const message = isStringWithLength(error.response.data.message)
		? error.response.data.message
		: isStringWithLength(error.response.data.error)
			? error.response.data.error
			: isStringWithLength(error.response.data)
				? error.response.data
				: isStringWithLength(error.error)
					? error.error
					: isStringWithLength(error.message)
						? error.message
						: isStringWithLength(error)
							? error
							: 'An error occurred';

	const messageMap: Record<string, string> = {
		'ERROR: duplicate key value violates unique constraint "users_username_key" (SQLSTATE 23505)':
			'Username already exists',
	};
	return messageMap[message] || message;
};
