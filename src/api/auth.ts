import { setJWT } from "@/actions";
import http, { ApiSuccessResponse } from "@/lib/http";
import { UserResponse } from "./user";

// ----------------------------------------------LOGIN----------------------------------------------

export interface AuthLoginParams {
  username: string;
  password: string;
}

export interface AuthLoginResponse {
  user: UserResponse;
  token: string;
}

export const authLogin = async (params: AuthLoginParams) =>
  http.post<ApiSuccessResponse<AuthLoginResponse>>("auth/login", params).then(async (res) => {
    const authToken = res.data.data.token;

    if (authToken) {
      await setJWT(authToken);
    }
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

export interface AuthRegisterResponse extends AuthLoginResponse {}

export const authRegister = async (params: AuthRegisterParams) =>
  http.post<ApiSuccessResponse<AuthRegisterResponse>>("auth/register", params).then(async (res) => {
    const authToken = res.data.data.token;

    if (authToken) {
      await setJWT(authToken);
    }
    return res.data;
  });

// ----------------------------------------------Verify----------------------------------------------

export const authVerify = async () => http.get<ApiSuccessResponse<UserResponse>>("auth/verify").then((res) => res.data);

// ----------------------------------------------LOGOUT----------------------------------------------

export const authLogout = async () => http.delete(`auth/logout`).then((res) => res.data);
