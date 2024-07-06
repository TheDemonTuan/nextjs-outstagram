"use client";

import { LoadingTopBar } from "@/components/skeletons";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const GuestGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { authIsSuccess, authIsLoading, authIsError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authIsSuccess) {
      const lastVisited = sessionStorage.getItem("last_visited");
      if (lastVisited) {
        router.replace(lastVisited);
        sessionStorage.removeItem("last_visited");
      } else {
        router.replace("/");
      }
    }
  }, [authIsSuccess, router]);

  if (authIsLoading) {
    return <LoadingTopBar />;
  }

  return <>{authIsError && children}</>;
};

export default GuestGuard;
