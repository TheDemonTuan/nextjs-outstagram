import { setToken } from "@/actions";
import http, { ApiSuccessResponse } from "@/lib/http";
import { UserResponse } from "./user";

// ----------------------------------------------LOGIN----------------------------------------------

export const authKey = "auth";

export interface AuthLoginParams {
  username: string;
  password: string;
}

export interface AuthLoginResponse {
  user: UserResponse;
  access_token: string;
  refresh_token: string;
}

export const authLogin = async (params: AuthLoginParams) =>
  http.post<ApiSuccessResponse<AuthLoginResponse>>("auth/login", params).then(async (res) => {
    const { access_token, refresh_token } = res.data.data;
    access_token && await setToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME ?? "access_token", access_token, new Date(Date.now() + 1000 * 60 * 30));
    refresh_token && await setToken(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME ?? "refresh_token", refresh_token, new Date(Date.now() + 1000 * 60 * 60 * 24 * 15));

    return res.data;
  });

// ----------------------------------------------Register----------------------------------------------

export interface AuthRegisterParams {
  email: string;
  full_name: string;
  username: string;
  password: string;
  birthday: Date;
}

export interface AuthRegisterResponse extends AuthLoginResponse { }

export const authRegister = async (params: AuthRegisterParams) =>
  http.post<ApiSuccessResponse<AuthRegisterResponse>>("auth/register", params).then(async (res) => {
    const { access_token, refresh_token } = res.data.data;
    access_token && await setToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME ?? "access_token", access_token, new Date(Date.now() + 1000 * 60 * 30));
    refresh_token && await setToken(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME ?? "refresh_token", refresh_token, new Date(Date.now() + 1000 * 60 * 60 * 24 * 15));

    return res.data;
  });

// ----------------------------------------------Verify----------------------------------------------

export interface AuthVerifyResponse extends AuthLoginResponse { }

export const authVerify = async () => http.get<ApiSuccessResponse<AuthVerifyResponse>>("auth/verify").then((res) => res.data);

// ----------------------------------------------LOGOUT----------------------------------------------

export const authLogout = async () => http.delete(`auth/logout`).then((res) => res.data);
