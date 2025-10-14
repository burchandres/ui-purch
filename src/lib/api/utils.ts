import { camelCase, mapKeys, snakeCase } from 'lodash';

// biome-ignore lint/suspicious/noExplicitAny: this function purposefully takes any type
export const keysToSnakeCase = (obj: Record<string, any>) =>
	mapKeys(obj, (_val, key) => snakeCase(key));

// biome-ignore lint/suspicious/noExplicitAny: this function purposefully takes any type
export const keysToCamelCase = (obj: Record<string, any>) =>
	mapKeys(obj, (_val, key) => camelCase(key));
