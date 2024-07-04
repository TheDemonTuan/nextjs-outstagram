import { getToken, refreshToken, setToken } from "@/actions";
import { GraphQLClient, RequestMiddleware } from "graphql-request";

const endpoint = `${process.env.NEXT_PUBLIC_API_HOST}/graphql`;

const getAccessToken = () => Promise.resolve(getToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME ?? "access_token")).then((token) => `Bearer ${token}`);

export const graphqlAbortController = new AbortController()

const customFetch = async (url: URL | RequestInfo, options?: RequestInit) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  options = options || {};
  options.signal = controller.signal;

  const attemptFetch = async () => {
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

        return attemptFetch();
      }
      return response;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
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
