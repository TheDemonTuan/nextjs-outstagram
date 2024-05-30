"use client";

import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Pusher from "pusher-js";
import { toast } from "sonner";

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
  const [message, setMessage] = useState("");
  const router = useRouter();
  // var pusher = new Pusher("34407909c139e336f7d0", {
  //   cluster: "ap1",
  // });

  // pusher.subscribe("my-channel");
  // pusher.bind("my-event", (data: any) => {
  //   setMessage(data.message);
  // });

  // useEffect(() => {
  //   toast.info(message);
  //   return () => {
  //     pusher.unsubscribe("my-channel");
  //     pusher.disconnect();
  //   };
  // }, [message]);
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </ApolloProvider>
    </QueryClientProvider>
  );
};
