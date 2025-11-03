import { api } from './api';
import type {
	LinkTokenResponse,
	User,
	UserLoginRequest,
	UserRegisterRequest,
	UserUpdateRequest,
} from './types';

// GET /user/info
export const getUserInfo = async (): Promise<User> => {
	const res = await api.get('/user/info');
	console.log(' user info res', res);
	return res.data as User;
};

// POST /user/login
export const login = async (data: UserLoginRequest) => {
	const res: { data: User } = await api.post('/user/login', data);
	return res;
};

// POST /user/logout
export const logout = async () => {
	const res = await api.post('/user/logout');
	return res.data;
};

// POST /user/register
export const registerUser = async (
	data: UserRegisterRequest,
): Promise<User> => {
	const res = await api.post('/user/register', data);
	return res.data;
};

// PATCH /user/update
export const updateUser = async (
	data: Partial<UserUpdateRequest>,
): Promise<User> => {
	const res = await api.put('/user/update', data);
	return res.data;
};

// GET /user/link-token
export const getLinkToken = async (): Promise<LinkTokenResponse> => {
	const res = await api.get('/user/link-token');
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
