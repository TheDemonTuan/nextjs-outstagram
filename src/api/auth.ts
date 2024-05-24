import { setJWT } from "@/actions";
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

export interface AuthRegisterResponse extends AuthLoginResponse { }

export const authRegister = async (params: AuthRegisterParams) =>
  http.post<ApiSuccessResponse<AuthRegisterResponse>>("auth/register", params).then(async (res) => {
    const authToken = res.data.data.token;

    if (authToken) {
      await setJWT(authToken);
    }
    return res.data;
  });

// ----------------------------------------------Verify----------------------------------------------

export interface AuthVerifyResponse extends Omit<AuthLoginResponse, "token"> { }

export const authVerify = async () => http.get<ApiSuccessResponse<AuthVerifyResponse>>("auth/verify").then((res) => res.data);

// ----------------------------------------------LOGOUT----------------------------------------------

export const authLogout = async () => http.delete(`auth/logout`).then((res) => res.data);
