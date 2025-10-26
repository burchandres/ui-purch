import { api } from "./api";
import {
  camelToPascal,
  camelToSnake,
  pascalToCamel,
  type LinkTokenResponse,
  type User,
  type UserDelete,
  type UserLoginRequest,
  type UserRegisterRequest,
  type UserResponse,
  type UserUpdateRequest,
  type CamelToPascal,
} from "./types";
import { keysToCap, keysToSnakeCase, keysToUnCap } from "./utils";

// GET /user/info
export const getUserInfo = async (): Promise<UserResponse> => {
  const res = await api.get("/user/info");
  return keysToUnCap(res.data) as UserResponse;
};

// // POST /user/verify_auth
// export const verifyAuth = async () => {
// 	const res = await api.post('/user/verify_auth');
// 	return res.data;
// };

// POST /user/login
export const login = async (data: UserLoginRequest) => {
  const form = new URLSearchParams(camelToSnake<UserLoginRequest>(data));
  console.log("form", form);
  const res: { data: CamelToPascal<User> } = await api.get("/user/login", {
    params: form,
  });
  // return keysToUnCap(res.data) as UserResponse;
  // return pascalToCamel<
};

// POST /user/logout
export const logout = async () => {
  const res = await api.get("/user/logout");
  return res.data;
};

// POST /user/register
export const registerUser = async (
  data: UserRegisterRequest,
): Promise<UserResponse> => {
  const payload = keysToCap(data);
  const res = await api.post("/user/register", keysToSnakeCase(payload));
  return res.data;
};

// PATCH /user/update
export const updateUser = async (
  data: Partial<UserUpdateRequest>,
): Promise<UserResponse> => {
  const payload = keysToCap(data);
  const res = await api.put("/user/update", keysToSnakeCase(payload));
  return res.data;
};

// DELETE /user/delete
export const deleteUser = async (): Promise<UserDelete> => {
  const res = await api.delete("/user/delete");
  return res.data;
};

// GET /user/link-token
export const getLinkToken = async (): Promise<LinkTokenResponse> => {
  const res = await api.get("/user/link-token");
  return res.data;
};

// POST /user/sync-bank-accounts
export const syncBankAccounts = async (publicToken: string) => {
  const res = await api.post("/user/sync-bank-accounts", null, {
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
