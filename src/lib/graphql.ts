import { getToken } from "@/actions";
import { GraphQLClient, RequestMiddleware } from "graphql-request";

const endpoint = `${process.env.NEXT_PUBLIC_API_HOST}/graphql`;

const getAccessToken = () => Promise.resolve(getToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME ?? "access_token")).then((token) => `Bearer ${token}`);

export const graphqlAbortController = new AbortController()

const customFetch = async (url: URL | RequestInfo, options?: RequestInit) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  options = options || {};
  options.signal = controller.signal;

  return fetch(url, options).then(response => {
    clearTimeout(timeoutId);
    return response;
  }).catch(error => {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  });
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
