import { api } from './api';
import type {
	LinkTokenResponse,
	User,
	UserDelete,
	UserResponse,
} from './types';
import { keysToSnakeCase } from './utils';

export type LoginData = {
	username: string;
	password: string;
};

export type CreateUserData = {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
};

// GET /users/current
export const getCurrentUser = async (): Promise<User> => {
	const res = await api.get('/users/current');
	return res.data;
};

// POST /users/verify_auth
export const verifyAuth = async () => {
	const res = await api.post('/users/verify_auth');
	return res.data;
};

// POST /users/login
export const login = async (data: LoginData) => {
	const form = new URLSearchParams(data);
	const res = await api.post('/users/login', form);
	return res.data;
};

// POST /users/logout
export const logout = async () => {
	const res = await api.post('/users/logout');
	return res.data;
};

// POST /users/register
export const registerUser = async (
	data: CreateUserData,
): Promise<UserResponse> => {
	const payload = keysToSnakeCase(data);
	const res = await api.post('/users/register', payload);
	return res.data;
};

// PATCH /users/update
export const updateUser = async (
	data: Partial<CreateUserData>,
): Promise<UserResponse> => {
	const payload = keysToSnakeCase(data);
	const res = await api.patch('/users/update', payload);
	return res.data;
};

// DELETE /users/delete
export const deleteUser = async (): Promise<UserDelete> => {
	const res = await api.delete('/users/delete');
	return res.data;
};

// GET /users/link-token
export const getLinkToken = async (): Promise<LinkTokenResponse> => {
	const res = await api.get('/users/link-token');
	return res.data;
};

// POST /users/sync-bank-accounts
export const syncBankAccounts = async (publicToken: string) => {
	const res = await api.post('/users/sync-bank-accounts', null, {
		params: { public_token: publicToken },
	});
	return res.data;
};

// helper function
export const checkIfLoggedIn = async () => {
	try {
		const res = await verifyAuth();
		return true;
	} catch {
		return false;
	}
};
