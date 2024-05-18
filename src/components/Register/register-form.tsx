"use client";

import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValidate, RegisterFormValidateSchema } from "./register-form.validate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthRegisterParams, AuthRegisterResponse, authRegister } from "@/api/auth";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Button, DatePicker, DateValue, Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "sonner";

const RegisterForm = () => {
  const queryClient = useQueryClient();

  const registerForm = useForm<RegisterFormValidate>({
    resolver: zodResolver(RegisterFormValidateSchema),
    defaultValues: {
      email: "",
      full_name: "",
      username: "",
      password: "",
      birthday: new Date(),
    },
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { mutate: registerMutate, isPending: registerIsPending } = useMutation<
    ApiSuccessResponse<AuthRegisterResponse>,
    ApiErrorResponse,
    AuthRegisterParams
  >({
    mutationFn: async (params) => await authRegister(params),
    onSuccess: (res) => {
      toast.success("Register successfully!");
      registerForm.reset();
      queryClient.setQueryData(["auth"], res);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Register failed!");
    },
  });

  const onSubmit = async (data: RegisterFormValidate) => {
    registerMutate({
      email: data?.email,
      full_name: data?.full_name,
      username: data?.username,
      password: data?.password,
      birthday: data?.birthday,
    });
  };
  return (
    <Form {...registerForm}>
      <form
        method="post"
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="mb-4 space-y-4 bg-white p-8 border rounded">
        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  isRequired
                  isInvalid={!!registerForm.formState.errors.email}
                  errorMessage={registerForm.formState.errors.email?.message}
                  onClear={() => registerForm.resetField("email")}
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
          control={registerForm.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  isRequired
                  isInvalid={!!registerForm.formState.errors.full_name}
                  errorMessage={registerForm.formState.errors.full_name?.message}
                  onClear={() => registerForm.resetField("full_name")}
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
          control={registerForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  isRequired
                  isInvalid={!!registerForm.formState.errors.username}
                  errorMessage={registerForm.formState.errors.username?.message}
                  onClear={() => registerForm.resetField("username")}
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
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  isRequired
                  isInvalid={!!registerForm.formState.errors.password}
                  errorMessage={registerForm.formState.errors.password?.message}
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
                  placeholder="Password"
                  variant="bordered"
                  aria-label="Password"
                  aria-labelledby="password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  isInvalid={!!registerForm.formState.errors.birthday}
                  errorMessage={registerForm.formState.errors.birthday?.message}
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
        <Button color="primary" type="submit" className="w-full" variant="shadow" isLoading={registerIsPending}>
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
