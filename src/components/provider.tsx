"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: false,
    },
  },
});

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_HOST}/graphql`,
  cache: new InMemoryCache(),
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </ApolloProvider>
    </QueryClientProvider>
  );
};
