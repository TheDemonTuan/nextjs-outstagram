"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner } from "@nextui-org/react";
import { ChangePasswordFormValidate, ChangePasswordFormValidateSchema } from "./change-password-form.validate";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Link from "next/link";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { AuthVerifyResponse, authKey } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userEditPassword } from "@/api/user";
import { logoutToken } from "@/actions";
import { useRouter } from "next/navigation";

const ChangePasswordForm = () => {
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isReTypeNewPasswordVisible, setIsReTypeNewPasswordVisible] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const editForm = useForm<ChangePasswordFormValidate>({
    resolver: zodResolver(ChangePasswordFormValidateSchema),
    defaultValues: {
      new_password: "",
      current_password: "",
      re_Type_New_Password: "",
    },
  });

  const { mutate: userEditPasswordMutate, isPending: userEditPasswordIsLoading } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    { current_password: string; new_password: string }
  >({
    mutationFn: async (param) => await userEditPassword(param.current_password, param.new_password),
    onSuccess: () => {
      toast.success("Password updated successfully!");
      editForm.reset();
      setIsCurrentPasswordVisible(false);
      setIsNewPasswordVisible(false);
      setIsReTypeNewPasswordVisible(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Password update failed!");
    },
  });

  const toggleCurrentPasswordVisibility = () => setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
  const toggleNewPasswordVisibility = () => setIsNewPasswordVisible(!isNewPasswordVisible);
  const toggleReTypeNewPasswordVisibility = () => setIsReTypeNewPasswordVisible(!isReTypeNewPasswordVisible);

  const onSubmit = async (data: ChangePasswordFormValidate) => {
    userEditPasswordMutate({
      current_password: data.current_password,
      new_password: data.new_password,
    });
  };

  const handleSignOut = async () => {
    toast.promise(logoutToken(), {
      loading: "Logging out... 🚪",
      success: "Logged out successfully! 👋",
      error: "Failed to log out! 😵",
    });
    queryClient.clear();

    router.push("/accounts/password/reset");
  };

  return (
    <div className="space-y-8 py-8">
      <Form {...editForm}>
        <form onSubmit={editForm.handleSubmit(onSubmit)} className="space-y-8">
          <FormItem>
            <FormDescription className="text-sm">
              Your password must be at least 8 characters and should include a combination of numbers, letters <br />{" "}
              and special characters (!$@%).
            </FormDescription>
            <FormMessage />
          </FormItem>

          <FormField
            control={editForm.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <div className="md:items-center gap-y-2 gap-x-8">
                  <FormControl className="mt-2">
                    <Input
                      label="Current password"
                      autoFocus
                      variant="bordered"
                      isRequired
                      isInvalid={!!editForm.formState.errors.current_password}
                      errorMessage={editForm.formState.errors.current_password?.message}
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleCurrentPasswordVisibility}>
                          {isCurrentPasswordVisible ? (
                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none mb-2" />
                          ) : (
                            <FaEye className="text-2xl text-default-400 pointer-events-none mb-2" />
                          )}
                        </button>
                      }
                      type={isCurrentPasswordVisible ? "text" : "password"}
                      className="max-w-3xl"
                      {...field}
                      onChange={(e) => editForm.setValue("current_password", e.target.value)}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={editForm.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <div className="md:items-center gap-y-2 gap-x-8">
                  <FormControl className="mt-2">
                    <Input
                      label="New password"
                      variant="bordered"
                      isRequired
                      isInvalid={!!editForm.formState.errors.new_password}
                      errorMessage={editForm.formState.errors.new_password?.message}
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleNewPasswordVisibility}>
                          {isNewPasswordVisible ? (
                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none mb-2" />
                          ) : (
                            <FaEye className="text-2xl text-default-400 pointer-events-none mb-2" />
                          )}
                        </button>
                      }
                      type={isNewPasswordVisible ? "text" : "password"}
                      className="max-w-3xl"
                      {...field}
                      onChange={(e) => editForm.setValue("new_password", e.target.value)}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={editForm.control}
            name="re_Type_New_Password"
            render={({ field }) => (
              <FormItem>
                <div className="md:items-center gap-y-2 gap-x-8">
                  <FormControl className="mt-2">
                    <Input
                      label="Re-type new password"
                      variant="bordered"
                      isRequired
                      isInvalid={!!editForm.formState.errors.re_Type_New_Password}
                      errorMessage={editForm.formState.errors.re_Type_New_Password?.message}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleReTypeNewPasswordVisibility}>
                          {isReTypeNewPasswordVisible ? (
                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none mb-2" />
                          ) : (
                            <FaEye className="text-2xl text-default-400 pointer-events-none mb-2" />
                          )}
                        </button>
                      }
                      type={isReTypeNewPasswordVisible ? "text" : "password"}
                      className="max-w-3xl"
                      {...field}
                      onChange={(e) => editForm.setValue("re_Type_New_Password", e.target.value)}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Link href="/accounts/password/reset" onClick={handleSignOut}>
              <div className="font-medium text-primary-500 hover:underline">Forgot your password?</div>
            </Link>

            <Button
              type="submit"
              color="primary"
              className="pl-16 pr-16 pt-5 pb-5"
              disabled={userEditPasswordIsLoading}>
              {userEditPasswordIsLoading ? <Spinner color="white" /> : "Change password"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
