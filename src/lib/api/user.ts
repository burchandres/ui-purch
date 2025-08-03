import { api } from "./api";

export const getCurrentUser = async () => {
  const res = await api.get("/users/current");
  return res.data;
};

export const login = async (data: { username: string; password: string }) => {
  const form = new URLSearchParams(data);
  const res = await api.post("/users/token", form);
  return res.data;
};

export const logout = async () => {
  await api.post("/users/logout");
};
