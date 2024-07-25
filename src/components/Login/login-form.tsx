"use client";

import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthLoginParams, AuthLoginResponse, authLogin } from "@/api/auth";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { LoginFormValidate, LoginFormValidateSchema } from "./login-form.validate";
import { Button, Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "sonner";
import { useModalStore } from "@/stores/modal-store";
import NotificationBanAccount, { NotificationBanAccountModalKey } from "../Profile/notification-ban-account";

const LoginForm = () => {
  const { modalOpen } = useModalStore();
  const queryClient = useQueryClient();
  const loginForm = useForm<LoginFormValidate>({
    resolver: zodResolver(LoginFormValidateSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { mutate: loginMutate, isPending: loginIsPending } = useMutation<
    ApiSuccessResponse<AuthLoginResponse>,
    ApiErrorResponse,
    AuthLoginParams
  >({
    mutationFn: async (params) => await authLogin(params),
    onSuccess: (res) => {
      toast.success("Login successfully!");
      loginForm.reset();
      queryClient.setQueryData(["auth"], res);
    },
    onError: (error) => {
      if (error.response?.data.message === "Account is banned") {
        modalOpen(NotificationBanAccountModalKey);
      } else {
        toast.error(error?.response?.data?.message || "Login failed!");
      }
    },
  });

  const onSubmit = async (data: LoginFormValidate) => {
    loginMutate({
      username: data?.username,
      password: data?.password,
    });
  };

  return (
    <>
      {" "}
      <Form {...loginForm}>
        <form
          method="post"
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="mb-4 space-y-4 bg-white p-8 border rounded">
          <FormField
            control={loginForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    isRequired
                    isInvalid={!!loginForm.formState.errors.username}
                    onClear={() => loginForm.resetField("username")}
                    placeholder="Phone, username, or email"
                    variant="bordered"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    isRequired
                    isInvalid={!!loginForm.formState.errors.password}
                    endContent={
                      <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <FaEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button color="primary" type="submit" className="w-full" variant="shadow" isLoading={loginIsPending}>
            Login
          </Button>
        </form>
      </Form>
      <NotificationBanAccount />
    </>
  );
};

export default LoginForm;
