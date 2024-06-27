"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/hooks/useNotification";
import { sendNotification } from "@/lib/send-notification";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0, // 0 means never refetch
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
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
      <NextUIProvider navigate={router.push}>
        <PrimeReactProvider value={{ unstyled: false }}>{children}</PrimeReactProvider>
      </NextUIProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
};
