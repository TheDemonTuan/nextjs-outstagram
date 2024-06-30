"use client";

import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const GuestGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { authIsSuccess, authIsLoading,authIsError } = useAuth();
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
    return <Spinner className="flex justify-center" size="lg" label="Loading..." color="secondary" />;
  }

  return (
    <>
      {authIsError && children}
    </>
  );
};

export default GuestGuard;
