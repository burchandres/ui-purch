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
}

export type UserRegisterRequest = Omit<User, 'id'>

export type UserUpdateRequest = Partial<User>

export type UserLoginRequest = {
	username: string;
	password: string;
};

export type UserDeleteResponse = Omit<User, 'id' | 'income'| 'incomeRate'>

export type LinkTokenResponse = {
	linkToken: string;
	expiration: string;
	requestId: string;
};

type CamelToSnakeCase<S extends string> = S extends `${infer First}${infer Rest}`
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

export function camelToSnake<T extends Record<string, any>>(obj: T): CamelToSnake<T> {
  if (obj === null || typeof obj !== 'object') {
    return obj as any;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => camelToSnake(item)) as any;
  }

  const result: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      const value = obj[key];

      result[snakeKey] = typeof value === 'object' && value !== null
        ? camelToSnake(value)
        : value;
    }
  }

  return result;
}

type PascalToCamelCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : S;

export type PascalToCamel<T> = {
  [K in keyof T as PascalToCamelCase<K & string>]: T[K] extends object
    ? T[K] extends Array<infer U>
      ? U extends object
        ? Array<PascalToCamel<U>>
        : T[K]
      : PascalToCamel<T[K]>
    : T[K];
};

export function pascalToCamel<T extends Record<string, any>>(obj: T): PascalToCamel<T> {
  if (obj === null || typeof obj !== 'object') {
    return obj as any;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => pascalToCamel(item)) as any;
  }

  const result: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
      const value = obj[key];

      result[camelKey] = typeof value === 'object' && value !== null
        ? pascalToCamel(value)
        : value;
    }
  }

  return result;
}

type CamelToPascalCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S;

export type CamelToPascal<T> = {
  [K in keyof T as CamelToPascalCase<K & string>]: T[K] extends object
    ? T[K] extends Array<infer U>
      ? U extends object
        ? Array<CamelToPascal<U>>
        : T[K]
      : CamelToPascal<T[K]>
    : T[K];
};

export function camelToPascal<T extends Record<string, any>>(obj: T): CamelToPascal<T> {
  if (obj === null || typeof obj !== 'object') {
    return obj as any;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => camelToPascal(item)) as any;
  }

  const result: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
      const value = obj[key];

      result[pascalKey] = typeof value === 'object' && value !== null
        ? camelToPascal(value)
        : value;
    }
  }

  return result;
}
