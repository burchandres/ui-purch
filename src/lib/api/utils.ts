import { camelCase, mapKeys, snakeCase } from 'lodash';

// biome-ignore lint/suspicious/noExplicitAny: this function purposefully takes any type
export const keysToSnakeCase = (obj: Record<string, any>) =>
	mapKeys(obj, (_val, key) => snakeCase(key));

// biome-ignore lint/suspicious/noExplicitAny: this function purposefully takes any type
export const keysToCamelCase = (obj: Record<string, any>) =>
	mapKeys(obj, (_val, key) => camelCase(key));

// tries to pull useful messages out of different error messages
// biome-ignore lint/suspicious/noExplicitAny: this function purposefully takes any type
export const parseErrorMessage = (error: any): string => {
	// biome-ignore lint/suspicious/noExplicitAny: this function purposefully takes any type
	const isStringWithLength = (val: any) =>
		typeof val === 'string' && val.length;
	return isStringWithLength(error.response.data.message)
		? error.response.data.message
		: isStringWithLength(error.response.data)
			? error.response.data
			: isStringWithLength(error.message)
				? error.message
				: isStringWithLength(error)
					? error
					: 'An error occurred';
};
