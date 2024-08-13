import { getToken, logoutToken, refreshToken, setToken } from "@/actions";
import { GraphQLClient, RequestMiddleware } from "graphql-request";

const endpoint = `${process.env.NEXT_PUBLIC_API_HOST}/graphql`;

const getAccessToken = () => Promise.resolve(getToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME ?? "access_token")).then((token) => `Bearer ${token}`);

export const graphqlAbortController = new AbortController()

let apiRetryCount = 0; // Khởi tạo biến đếm
const MAX_API_RETRIES = 3; // Giới hạn số lần gọi lại

const customFetch = async (url: URL | RequestInfo, options?: RequestInit) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  options = options || {};
  options.signal = controller.signal;

  const attemptFetch: any = async () => {
    if (apiRetryCount >= MAX_API_RETRIES) {
      // Đã vượt quá giới hạn số lần gọi lại, xử lý tương ứng
      await logoutToken();
      throw new Error("Reached max API retries");
    }

    try {
      const response = await fetch(url, options);
      clearTimeout(timeoutId);
      const data = await response.clone().json();
      if (!data?.data) {
        const accessToken = await refreshToken();

        if (!accessToken) {
          throw new Error("No access token found");
        }

        await setToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "access_token", accessToken, new Date(Date.now() + 1000 * 60 * 5));
        options.headers = {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };

        apiRetryCount++; // Tăng biến đếm
        return attemptFetch();
      }
      apiRetryCount = 0; // Đặt lại biến đếm sau khi gọi API thành công
      return response;
    } catch (error: any) {
      throw error; // Xử lý lỗi tại đây
    }
  };

  return attemptFetch();
};

const requestMiddleware: RequestMiddleware = async (request) => {
  return {
    ...request,
    headers: {
      ...request.headers,
      authorization: await getAccessToken(),
      "Content-Type": "application/json",
    },
    signal: graphqlAbortController.signal,
    
  };
};

export const graphQLClient = new GraphQLClient(endpoint, {
  requestMiddleware,
  fetch: customFetch,
});
