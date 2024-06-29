import { getToken } from "@/actions";
import { GraphQLClient, RequestMiddleware } from "graphql-request";

const endpoint = `${process.env.NEXT_PUBLIC_API_HOST}/graphql`;

const getAccessToken = () => Promise.resolve(getToken(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME ?? "access_token")).then((token) => `Bearer ${token}`);

export const graphqlAbortController = new AbortController()

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
});
