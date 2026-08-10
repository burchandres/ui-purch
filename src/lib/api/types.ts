import type { IncomeRate } from '@/config/inputs';

export interface ApiError {
  response: {
    data: string;
  };
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  income?: number;
  incomeRate?: IncomeRate;
}

export type UserRegisterRequest = Omit<User, 'id'>;

export type UserUpdateRequest = Partial<User>;

export interface UserLoginRequest {
  username: string;
  password: string;
}

export type UserDeleteResponse = Omit<User, 'id' | 'income' | 'incomeRate'>;

export interface LinkTokenResponse {
  linkToken: string;
  expiration: string;
  requestId: string;
}

type CamelToSnakeCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? First extends Uppercase<First>
    ? `_${Lowercase<First>}${CamelToSnakeCase<Rest>}`
    : `${First}${CamelToSnakeCase<Rest>}`
  : S;

type CamelToSnake<T> = {
  [K in keyof T as CamelToSnakeCase<K & string>]: T[K] extends object
    ? T[K] extends (infer U)[]
      ? U extends object
        ? CamelToSnake<U>[]
        : T[K]
      : CamelToSnake<T[K]>
    : T[K];
};

// oxlint-disable-next-line typescript/no-explicit-any -- this should handle many data types
export function camelToSnake<T extends Record<string, any>>(obj: T): CamelToSnake<T> {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    // oxlint-disable-next-line typescript/no-explicit-any -- this should handle many data types
    return obj.map((item) => camelToSnake(item)) as any;
  }

  // oxlint-disable-next-line typescript/no-explicit-any -- this should handle many data types
  const result: any = {};

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
      const value = obj[key];

      result[snakeKey] = typeof value === 'object' && value !== null ? camelToSnake(value) : value;
    }
  }

  return result;
}

type SnakeToCamelCase<S extends string> = S extends `${infer First}_${infer Second}${infer Rest}`
  ? `${First}${Uppercase<Second>}${SnakeToCamelCase<Rest>}`
  : S;

type SnakeToCamel<Type> = {
  [Key in keyof Type as SnakeToCamelCase<K & string>]: Type[Key] extends object
    ? Type[Key] extends (infer Unknown)[]
      ? Unknown extends object
        ? SnakeToCamel<Unknown>[]
        : Type[Key]
      : SnakeToCamel<Type[Key]>
    : Type[Key];
};

// oxlint-disable-next-line typescript/no-explicit-any -- this should handle many data types
export const snakeToCamel<T extends Record<string, any>>(obj: T): SnakeToCamel<T> = () => {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj))
    // oxlint-disable-next-line typescript/no-explicit-any -- this should handle many data types
    return obj.map((item) => snakeToCamel(item)) as any;

  // oxlint-disable-next-line typescript/no-explicit-any -- this should handle many data types
  const result: any = {};

  for (const key in obj)
    if (Object.hasOwn(obj, key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      const value = obj[key];

      result[camelKey] = typeof value === 'object' && value !== null ? snakeToCamel(value) : value;
    }

  return result;
}
