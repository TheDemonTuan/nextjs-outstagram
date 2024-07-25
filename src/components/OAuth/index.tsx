"use client";

import { authOAuthLogin, AuthOAuthLoginParams, AuthOAuthLoginResponse, OAuthProvider } from "@/api/auth";
import { auth, facebookProvider, githubProvider, googleProvider } from "@/firebase";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { useModalStore } from "@/stores/modal-store";
import { useOAuthStore } from "@/stores/oauth-store";
import { Button } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import { toast } from "sonner";
import NotificationBanAccount, { NotificationBanAccountModalKey } from "../Profile/notification-ban-account";

const OAuth = () => {
  const queryClient = useQueryClient();
  const { modalOpen } = useModalStore();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const { email, provider, setData } = useOAuthStore();

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
      if (error.response?.data.message === "Account is banned") {
        modalOpen(NotificationBanAccountModalKey);
        return;
      }
      toast.error(error?.response?.data?.message || "Login with oauth failed !");
    },
  });

  const handleLoginFacebook = useCallback(async () => {
    try {
      setIsPending(true);
      const result = await signInWithPopup(auth, facebookProvider);
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

  const handleLoginGithub = useCallback(async () => {
    try {
      setIsPending(true);
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      const credential = GithubAuthProvider.credentialFromResult(result);

      if (!user || !credential) {
        throw new Error("Failed to login with Github");
      }

      setData({
        email: user.email || "",
        full_name: user.displayName || "",
        provider: OAuthProvider.GITHUB,
      });

      loginMutate({
        email: user.email || "",
        provider: OAuthProvider.GITHUB,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to login with Github");
    } finally {
      setIsPending(false);
    }
  }, [loginMutate, setData]);

  const handleLoginGoogle = useCallback(async () => {
    try {
      setIsPending(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (!user || !credential) {
        throw new Error("Failed to login with Google");
      }

      setData({
        email: user.email || "",
        full_name: user.displayName || "",
        provider: OAuthProvider.GOOGLE,
      });

      loginMutate({
        email: user.email || "",
        provider: OAuthProvider.GOOGLE,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to login with Google");
    } finally {
      setIsPending(false);
    }
  }, [loginMutate, setData]);

  const isLoading = useMemo(() => isPending || loginIsPending, [isPending, loginIsPending]);
  return (
    <>
      <div className="mb-4 flex flex-col gap-2 items-center justify-center px-10">
        <Button
          className="w-full"
          startContent={<FaFacebook className="mr-2 h-4 w-4" />}
          variant="ghost"
          onClick={handleLoginFacebook}
          isLoading={isLoading}>
          Log in with Facebook
        </Button>
        <Button
          className="w-full"
          startContent={<FaGithub className="mr-2 h-4 w-4" />}
          variant="ghost"
          onClick={handleLoginGithub}
          isLoading={isLoading}>
          Log in with Github
        </Button>
        <Button
          className="w-full"
          startContent={<FaGoogle className="mr-2 h-4 w-4" />}
          variant="ghost"
          onClick={handleLoginGoogle}
          isLoading={isLoading}>
          Log in with Google
        </Button>
      </div>
      <NotificationBanAccount />
    </>
  );
};

export default OAuth;
