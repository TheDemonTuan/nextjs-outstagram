"use client";

import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const listNotAuth = ["/login", "/register", "/forgot-password", "/oauth"];

const AuthGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { authCanUse, authIsError, authIsStale } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (authIsError) {
      if (listNotAuth.includes(pathname)) {
        return;
      }
      sessionStorage.setItem("last_visited", pathname);
      router.replace(`/login?callback=${pathname}`);
      queryClient.clear();
    }
  }, [authIsError, pathname, queryClient, router]);

  useEffect(() => {
    if (authIsStale && authCanUse) {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    }
  }, [authCanUse, authIsStale, queryClient]);

  return (
    <>{authCanUse ? children : <Spinner label="Loading..." color="secondary" size="lg" className="w-full h-full" />}</>
  );
};

export default AuthGuard;
