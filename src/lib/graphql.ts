import { getJWT } from "@/actions";
import { GraphQLClient, RequestMiddleware } from "graphql-request";

const endpoint = `${process.env.NEXT_PUBLIC_API_HOST}/graphql`;

const getAccessToken = () => Promise.resolve(getJWT()).then((token) => `Bearer ${token}`);

const requestMiddleware: RequestMiddleware = async (request) => {
  return {
    ...request,
    headers: {
      ...request.headers,
      authorization: await getAccessToken(),
      "Content-Type": "application/json",
    },
  };
};

export const graphQLClient = new GraphQLClient(endpoint, {
  requestMiddleware,
});
