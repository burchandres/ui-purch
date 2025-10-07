import { api } from './api';
import { snakeCase, mapKeys } from 'lodash';
import { queryClient } from '../queryClient';

export type LoginData = {
	username: string;
	password: string;
};

export type CreateUserData = LoginData & {
	firstName: string;
	lastName: string;
};

// biome-ignore lint/suspicious/noExplicitAny: this function purposefully takes any type
const keysToSnakeCase = (obj: Record<string, any>) =>
	mapKeys(obj, (_value, key) => snakeCase(key));

export const getCurrentUser = async () => {
	const res = await api.post('/users/verify_auth');
	return res;
};

export const checkIfLoggedIn = async () => {
	const res = await queryClient.fetchQuery({
		queryKey: ['currentUser'],
		queryFn: getCurrentUser,
	});
	const ok = res && res.status === 200;
	console.log('ok', ok, 'res', res);
	return ok;
};

export const createUser = async (data: CreateUserData) => {
	const res = await api.post('/users/register', keysToSnakeCase(data));
	return res;
};

export const login = async (data: LoginData) => {
	const form = new URLSearchParams(data);
	const res = await api.post('/users/login', form);
	return res;
};

export const logout = async () => {
	await api.post('/users/logout');
};
