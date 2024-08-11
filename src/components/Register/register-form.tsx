"use client";

import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValidate, RegisterFormValidateSchema } from "./register-form.validate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AuthOTPSendEmailParams,
  AuthOTPVerifyEmailParams,
  AuthRegisterParams,
  AuthRegisterResponse,
  authOTPSendEmail,
  authOTPVerifyEmail,
  authRegister,
} from "@/api/auth";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Button, DatePicker, DateValue, Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import Image from "next/image";

const RegisterForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const [formData, setFormData] = useState<RegisterFormValidate | null>(null);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState<string>("");

  const registerForm = useForm<RegisterFormValidate>({
    resolver: zodResolver(RegisterFormValidateSchema),
    defaultValues: {
      email: "",
      full_name: "",
      username: "",
      password: "",
    },
  });

  const { mutate: sendEmailOtpMutate, isPending: sendEmailOtpIsPending } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    AuthOTPSendEmailParams
  >({
    mutationFn: async (params) => await authOTPSendEmail(params),
    onSuccess: (res) => {
      toast.success("Send email successfully!");
      setStep(2);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Send email failed!");
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

  const { mutate: verifyEmailOtpMutate, isPending: verifyEmailOtpIsPending } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    AuthOTPVerifyEmailParams
  >({
    mutationFn: async (params) => await authOTPVerifyEmail(params),
    onSuccess: (res) => {
      if (formData) {
        registerMutate({
          email: formData.email,
          full_name: formData.full_name,
          username: formData.username,
          password: formData.password,
          birthday: formData.birthday,
        });
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Validate otp failed!");
      setOtp("");
    },
  });

  const onSubmit = async (data: RegisterFormValidate) => {
    setFormData(data);
    sendEmailOtpMutate({
      user_email: data?.email,
      full_name: data?.full_name,
      username: data?.username,
      password: data?.password,
      birthday: data?.birthday,
    });
  };

  const handleVerifyEmailOtp = () => {
    if (formData) {
      if (otp.length !== 6) {
        toast.error("OTP must be 6 digits long");
        return;
      }

      verifyEmailOtpMutate({
        user_email: formData.email,
        otp_code: otp,
      });
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleResendEmailOtp = () => {
    if (formData) {
      sendEmailOtpMutate({
        user_email: formData.email,
        full_name: formData.full_name,
        username: formData.username,
        password: formData.password,
        birthday: formData.birthday,
      });

      setIsResendDisabled(true);
    }
  };

  return (
    <>
      {step === 1 && (
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
            <Button color="primary" type="submit" className="w-full" variant="shadow" isLoading={sendEmailOtpIsPending}>
              Register
            </Button>
          </form>
        </Form>
      )}

      {step === 2 && (
        <div className="mb-4 space-y-4 bg-white p-8 border rounded flex flex-col items-center ">
          <Image src="/love.png" alt="" width={500} height={500} className="object-cover w-20 h-20" />
          <span className="font-semibold text-center text-sm">Enter confirmation code</span>
          <span className="text-center text-sm">
            {" "}
            Enter the confirmation code that we sent to {formData?.email}.{" "}
            <button
              className={`font-bold ${isResendDisabled ? "text-[#338CF1] opacity-50" : "text-[#338CF1]"}`}
              onClick={handleResendEmailOtp}
              disabled={isResendDisabled}>
              Resend code
            </button>
          </span>
          <div className="flex flex-col space-y-2">
            <InputOTP maxLength={6} onChange={(value) => handleOtpChange(value)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            color="primary"
            type="button"
            className="w-full font-bold"
            variant="shadow"
            onClick={handleVerifyEmailOtp}
            isLoading={verifyEmailOtpIsPending}>
            Next
          </Button>

          <button
            className={`text-center font-bold text-sm  ${
              verifyEmailOtpIsPending ? "text-[#338CF1] opacity-50" : "text-[#338CF1]"
            }`}
            onClick={() => {
              setStep(1);
              setOtp("");
              setIsResendDisabled(false);
            }}
            disabled={verifyEmailOtpIsPending}>
            Go back
          </button>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
