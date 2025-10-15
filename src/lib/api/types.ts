import type { IncomeRate } from '@/config/inputs';

export type ApiError = {
	response: {
		data: string;
	};
};

export type User = {
	id: string;
	last_updated?: number | null;
	first_name: string;
	last_name: string;
	username: string;
	is_active?: boolean | null;
	income?: string;
	income_rate?: IncomeRate;
};

export type UserCreate = {
	username: string;
	password: string;
	first_name: string;
	last_name: string;
	income?: number;
	income_rate?: IncomeRate;
};

export type UserUpdate = {
	first_name?: string;
	last_name?: string;
	username?: string;
	password?: string;
	income_rate?: IncomeRate;
	income?: number;
};

export type UserResponse = {
	id: string;
	username: string;
	first_name: string;
	last_name: string;
	income?: string;
	income_rate?: IncomeRate;
};

export type LinkTokenResponse = {
	link_token: string;
	expiration: string;
	request_id: string;
};

export type LoginCredentials = {
	username: string;
	password: string;
};

export type UserDelete = {
	username: string;
	first_name: string;
	last_name: string;
};
