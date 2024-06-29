"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import http, { ApiSuccessResponse } from "./lib/http";
import { AuthLoginResponse } from "./api/auth";

export const getToken = async (name: string) => {
  return cookies().get(name)?.value;
};

export const setToken = async (name: string, value: string, expires: Date) => {
  cookies().set({
    name,
    value,
    sameSite: "strict",
    secure: true,
    expires,
    httpOnly: true,
    priority: "high",
  });
  return true;
};

export const logoutToken = async () => {
  cookies().delete({
    name: process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME ?? "access_token",
    maxAge: 0,
  });
  
  cookies().delete({
    name: process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME ?? "access_token",
    maxAge: 0,
  });
};

export const redirectHard = async (uri: string) => {
  redirect(uri);
};

export const refreshToken = async () => {
  try {
    const refreshToken = await getToken(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME ?? "refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const res = await http.post<ApiSuccessResponse<AuthLoginResponse>>("auth/refresh", { refresh_token: refreshToken });
    const access_token = res.data.data.access_token;

    if (!access_token) {
      throw new Error("No access token found");
    }

    return access_token;
  } catch (error) {
    await logoutToken();
    return null;
  }
};