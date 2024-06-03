import { clearJWT, getJWT } from "@/actions";
import { useJWTStore } from "@/stores/jwt-store";
import { useApolloClient } from "@apollo/client";
import { useQueryClient } from "@tanstack/react-query";
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
    const jwt = await getJWT();
    if (jwt) {
      config.headers["Authorization"] = `Bearer ${jwt}`;
      !useJWTStore.getState().jwt && useJWTStore.getState().jwt !== jwt && useJWTStore.getState().setJWT(jwt);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error: ApiErrorResponse) => {
    const queryClient = useQueryClient();
    const apolloClient = useApolloClient();

    if (error.response?.status === 401) {
      await clearJWT();
      queryClient.clear();
      apolloClient.clearStore();
      useJWTStore.getState().clearJWT();
    }
    return Promise.reject(error);
  }
);

export type ApiErrorResponse = AxiosError<ErrorResponse>;

export default http;
