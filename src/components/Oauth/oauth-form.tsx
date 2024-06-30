"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthOAuthRegisterParams, AuthOAuthRegisterResponse, authOAuthRegister } from "@/api/auth";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Button, DatePicker, DateValue, Input } from "@nextui-org/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { OauthFormValidate, OauthFormValidateSchema } from "./oauth-form.validate";
import { useOAuthStore } from "@/stores/oauth-store";
import { convertToSlug } from "@/lib/utils";

const RegisterForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { email, full_name, provider } = useOAuthStore();

  const oauthForm = useForm<OauthFormValidate>({
    resolver: zodResolver(OauthFormValidateSchema),
    defaultValues: {
      email,
      full_name,
      username: convertToSlug(full_name),
    },
  });

  const { mutate: oauthMutate, isPending: oauthIsPending } = useMutation<
    ApiSuccessResponse<AuthOAuthRegisterResponse>,
    ApiErrorResponse,
    AuthOAuthRegisterParams
  >({
    mutationFn: async (params) => await authOAuthRegister(params),
    onSuccess: (res) => {
      toast.success("Register successfully!");
      oauthForm.reset();
      queryClient.setQueryData(["auth"], res);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Register failed!");
    },
  });

  const onSubmit = async (data: OauthFormValidate) => {
    oauthMutate({
      email,
      full_name,
      username: data?.username,
      birthday: data?.birthday,
      provider,
    });
  };

  if (!email || !full_name || !provider) {
    router.replace("/login");
    return null;
  }
  return (
    <Form {...oauthForm}>
      <form
        method="post"
        onSubmit={oauthForm.handleSubmit(onSubmit)}
        className="w-1/4 space-y-4 bg-white p-8 border rounded">
        <FormField
          control={oauthForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  isRequired
                  isDisabled
                  isInvalid={!!oauthForm.formState.errors.email}
                  errorMessage={oauthForm.formState.errors.email?.message}
                  onClear={() => oauthForm.resetField("email")}
                  placeholder="Email"
                  variant="bordered"
                  aria-label="Email"
                  aria-labelledby="email"
                  {...field}
                  autoFocus
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={oauthForm.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  isRequired
                  isInvalid={!!oauthForm.formState.errors.full_name}
                  errorMessage={oauthForm.formState.errors.full_name?.message}
                  onClear={() => oauthForm.resetField("full_name")}
                  placeholder="Full Name"
                  variant="bordered"
                  aria-label="Full Name"
                  aria-labelledby="full_name"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={oauthForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  isRequired
                  isInvalid={!!oauthForm.formState.errors.username}
                  errorMessage={oauthForm.formState.errors.username?.message}
                  onClear={() => oauthForm.resetField("username")}
                  placeholder="Username"
                  variant="bordered"
                  aria-label="Username"
                  aria-labelledby="username"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={oauthForm.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  isInvalid={!!oauthForm.formState.errors.birthday}
                  errorMessage={oauthForm.formState.errors.birthday?.message}
                  isRequired
                  variant="bordered"
                  showMonthAndYearPickers
                  onChange={(value: DateValue) => {
                    value && field.onChange(new Date(value.toString()));
                  }}
                  ref={field.ref}
                  aria-label="Birthday"
                  aria-labelledby="birthday"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button color="primary" type="submit" className="w-full" variant="shadow" isLoading={oauthIsPending}>
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
