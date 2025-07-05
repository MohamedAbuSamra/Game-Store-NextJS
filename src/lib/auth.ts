import api from "./axios";
import Cookies from "js-cookie";
import { LoginResponse, User } from "../types";
import { AxiosResponse } from "axios";

export async function loginUser(
  username: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> {
  return api.post<LoginResponse>("/login", { username, password });
}

export function getTokenFromCookie(): string | null {
  return Cookies.get("token") || null;
}

export function getUserFromCookie(): User | null {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
}
