"use client";

import { authOAuthLogin, AuthOAuthLoginParams, AuthOAuthLoginResponse, OAuthProvider } from "@/api/auth";
import { auth, provider } from "@/firebase";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { useOAuthStore } from "@/stores/oauth-store";
import { Button } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { toast } from "sonner";

const OAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const { email, provider: oauthProvider, setData } = useOAuthStore();

  const { mutate: loginMutate, isPending: loginIsPending } = useMutation<
    ApiSuccessResponse<AuthOAuthLoginResponse>,
    ApiErrorResponse,
    AuthOAuthLoginParams
  >({
    mutationFn: async (params) => await authOAuthLogin(params),
    onSuccess: (res) => {
      toast.success("Login successfully !");
      queryClient.setQueryData(["auth"], res);
    },
    onError: (error) => {
      if (error?.response?.data?.message === "User not found") {
        router.replace(`/oauth`);
        return;
      }
      toast.error(error?.response?.data?.message || "Login with oauth failed !");
    },
  });

  const handleLoginFB = useCallback(async () => {
    try {
      setIsPending(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);

      if (!user || !credential) {
        throw new Error("Failed to login with Facebook");
      }

      setData({
        email: user.email || "",
        full_name: user.displayName || "",
        provider: OAuthProvider.FACEBOOK,
      });

      loginMutate({
        email: user.email || "",
        provider: OAuthProvider.FACEBOOK,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to login with Facebook");
    } finally {
      setIsPending(false);
    }
  }, [loginMutate, setData]);

  const isLoading = useMemo(() => isPending || loginIsPending, [isPending, loginIsPending]);
  return (
    <div className="mb-4 flex items-center justify-center">
      <Button onClick={handleLoginFB} className="flex items-center" variant="ghost" isLoading={isLoading}>
        <FaFacebook className="mr-2 h-4 w-4" />
        Log in with Facebook
      </Button>
    </div>
  );
};

export default OAuth;
