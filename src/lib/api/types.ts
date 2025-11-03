import type { IncomeRate } from '@/config/inputs';

export type ApiError = {
	response: {
		data: string;
	};
};

export type User = {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	income?: number;
	incomeRate?: IncomeRate;
};

export type UserRegisterRequest = Omit<User, 'id'>;

export type UserUpdateRequest = Partial<User>;

export type UserLoginRequest = {
	username: string;
	password: string;
};

export type UserDeleteResponse = Omit<User, 'id' | 'income' | 'incomeRate'>;

export type LinkTokenResponse = {
	linkToken: string;
	expiration: string;
	requestId: string;
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
