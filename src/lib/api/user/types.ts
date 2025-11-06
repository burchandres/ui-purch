import type { IncomeRate } from '@/config/inputs';

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
