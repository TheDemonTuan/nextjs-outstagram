"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useNotification } from "@/hooks/useNotification";
import { sendNotification } from "@/lib/send-notification";
import { usePusherStore } from "@/stores/pusher-store";

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

  // useEffect(() => {
  //   if (!("Notification" in window)) {
  //     console.log("This browser does not support notifications.");
  //     return;
  //   }

  //   if (Notification.permission !== "granted") {
  //     Notification.requestPermission()
  //       .then((permission) => {
  //         if (permission === "granted") {
  //           console.log("Permission granted");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </ApolloProvider>
    </QueryClientProvider>
  );
};
