import { logoutToken, getToken, refreshToken, setToken } from "@/actions";
import axios, { AxiosError } from "axios";

export interface ApiSuccessResponse<T = null | []> {
  code: number;
  message: string;
  data: T;
}

interface ErrorResponse {
  code: number;
  message: string;
  data: null;
}

const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}/api/`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  async (config) => {
    const accessToken = await getToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "access_token");
    accessToken && (config.headers["Authorization"] = `Bearer ${accessToken}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshTokenRetryCount = 0;
const MAX_REFRESH_TOKEN_RETRIES = 3;

http.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error: ApiErrorResponse) => {
    if (error.response?.status === 401) {
      if (refreshTokenRetryCount >= MAX_REFRESH_TOKEN_RETRIES) {
        // Đã vượt quá giới hạn số lần gọi lại, xử lý tương ứng
        await logoutToken();
        return Promise.reject(new Error("Reached max refresh token retries"));
      }

      try {
        const accessToken = await refreshToken();
        refreshTokenRetryCount++; // Tăng biến đếm

        if (!accessToken) {
          throw new Error("No access token found");
        }

        await setToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "access_token", accessToken, new Date(Date.now() + 1000 * 60 * 5));
        if (error.config) {
          error.config.headers["Authorization"] = `Bearer ${accessToken}`;
          return Promise.resolve(http.request(error.config));
        }

        return Promise.reject(error);
      } catch (err) {
        await logoutToken();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export type ApiErrorResponse = AxiosError<ErrorResponse>;

export default http;
