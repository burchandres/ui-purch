import { api } from "./api";
import { snakeCase, mapKeys } from "lodash";

export type LoginData = {
  username: string;
  password: string;
};

export type CreateUserData = LoginData & {
  firstName: string;
  lastName: string;
};

const keysToSnakeCase = (obj: Record<string, any>) =>
  mapKeys(obj, (value, key) => snakeCase(key));

export const getCurrentUser = async () => {
  const res = await api.get("/users/current");
  return res.data;
};

export const createUser = async (data: CreateUserData) => {
  const res = await api.post("/users/register", keysToSnakeCase(data));
  return res;
};

export const login = async (data: LoginData) => {
  const form = new URLSearchParams(data);
  const res = await api.post("/users/token", form);
  return res.data;
};

export const logout = async () => {
  await api.post("/users/logout");
};
