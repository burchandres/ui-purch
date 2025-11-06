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

type CamelToSnakeCase<S extends string> =
	S extends `${infer First}${infer Rest}`
		? First extends Uppercase<First>
			? `_${Lowercase<First>}${CamelToSnakeCase<Rest>}`
			: `${First}${CamelToSnakeCase<Rest>}`
		: S;

type CamelToSnake<T> = {
	[K in keyof T as CamelToSnakeCase<K & string>]: T[K] extends object
		? T[K] extends Array<infer U>
			? U extends object
				? Array<CamelToSnake<U>>
				: T[K]
			: CamelToSnake<T[K]>
		: T[K];
};

// biome-ignore lint/suspicious/noExplicitAny: this should handle many data types
export function camelToSnake<T extends Record<string, any>>(
	obj: T,
): CamelToSnake<T> {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	if (Array.isArray(obj)) {
		// biome-ignore lint/suspicious/noExplicitAny: this should handle many data types
		return obj.map((item) => camelToSnake(item)) as any;
	}

	// biome-ignore lint/suspicious/noExplicitAny: this should handle many data types
	const result: any = {};

	for (const key in obj) {
		if (Object.hasOwn(obj, key)) {
			const snakeKey = key.replace(
				/[A-Z]/g,
				(letter) => `_${letter.toLowerCase()}`,
			);
			const value = obj[key];

			result[snakeKey] =
				typeof value === 'object' && value !== null
					? camelToSnake(value)
					: value;
		}
	}

	return result;
}

type SnakeToCamelCase<S extends string> =
	S extends `${infer First}_${infer Second}${infer Rest}`
		? `${First}${Uppercase<Second>}${SnakeToCamelCase<Rest>}`
		: S;

type SnakeToCamel<T> = {
	[K in keyof T as SnakeToCamelCase<K & string>]: T[K] extends object
		? T[K] extends Array<infer U>
			? U extends object
				? Array<SnakeToCamel<U>>
				: T[K]
			: SnakeToCamel<T[K]>
		: T[K];
};

// biome-ignore lint/suspicious/noExplicitAny: this should handle many data types
export function snakeToCamel<T extends Record<string, any>>(
	obj: T,
): SnakeToCamel<T> {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	if (Array.isArray(obj)) {
		// biome-ignore lint/suspicious/noExplicitAny: this should handle many data types
		return obj.map((item) => snakeToCamel(item)) as any;
	}

	// biome-ignore lint/suspicious/noExplicitAny: this should handle many data types
	const result: any = {};

	for (const key in obj) {
		if (Object.hasOwn(obj, key)) {
			const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
				letter.toUpperCase(),
			);
			const value = obj[key];

			result[camelKey] =
				typeof value === 'object' && value !== null
					? snakeToCamel(value)
					: value;
		}
	}

	return result;
}
