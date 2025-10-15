import { api } from './api';
import type {
	LinkTokenResponse,
	User,
	UserDelete,
	UserResponse,
} from './types';
import {
	keysToCamelCase,
	keysToCap,
	keysToSnakeCase,
	keysToUnCap,
} from './utils';

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

// GET /user/info
export const getUserInfo = async (): Promise<User> => {
	const res = await api.get('/user/info');
	return res.data;
};

// // POST /user/verify_auth
// export const verifyAuth = async () => {
// 	const res = await api.post('/user/verify_auth');
// 	return res.data;
// };

// POST /user/login
export const login = async (data: LoginData) => {
	const form = new URLSearchParams(data);
	const res = await api.get('/user/login', { params: form });
	return res.data;
};

// POST /user/logout
export const logout = async () => {
	const res = await api.get('/user/logout');
	return res.data;
};

// POST /user/register
export const registerUser = async (
	data: CreateUserData,
): Promise<UserResponse> => {
	const payload = keysToCap(data);
	const res = await api.post('/user/register', payload);
	return res.data;
};

// PATCH /user/update
export const updateUser = async (
	data: Partial<CreateUserData>,
): Promise<UserResponse> => {
	const payload = keysToCap(data);
	const res = await api.post('/user/update', payload);
	return res.data;
};

// DELETE /user/delete
export const deleteUser = async (): Promise<UserDelete> => {
	const res = await api.delete('/user/delete');
	return res.data;
};

// GET /user/link-token
export const getLinkToken = async (): Promise<LinkTokenResponse> => {
	const res = await api.get('/user/link-token');
	return res.data;
};

// POST /user/sync-bank-accounts
export const syncBankAccounts = async (publicToken: string) => {
	const res = await api.post('/user/sync-bank-accounts', null, {
		params: { public_token: publicToken },
	});
	return res.data;
};

// helper function
export const checkIfLoggedIn = async () => {
	try {
		await getUserInfo();
		return true;
	} catch {
		return false;
	}
};
