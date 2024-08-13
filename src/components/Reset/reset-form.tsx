"use client";

import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AuthOTPSendEmailParams,
  AuthOTPSendEmailResetPasswordParams,
  AuthOTPVerifyEmailParams,
  AuthRegisterParams,
  AuthRegisterResponse,
  AuthResetPasswordParams,
  authOTPSendEmail,
  authOTPSendEmailResetPassword,
  authOTPVerifyEmail,
  authRegister,
  authResetPassword,
} from "@/api/auth";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Button, DatePicker, DateValue, Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import Image from "next/image";
import { SendEmailFormValidate, SendEmailFormValidateSchema } from "./send-email-form.validate";
import { ResetPasswordFormValidate, ResetPasswordFormValidateSchema } from "./reset-form.validate";

const ResetForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const [formData, setFormData] = useState<SendEmailFormValidate | null>(null);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState<string>("");

  const sendEmailForm = useForm<SendEmailFormValidate>({
    resolver: zodResolver(SendEmailFormValidateSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetPasswordForm = useForm<ResetPasswordFormValidate>({
    resolver: zodResolver(ResetPasswordFormValidateSchema),
    defaultValues: {
      new_password: "",
      re_Type_New_Password: "",
    },
  });

  const { mutate: sendEmailOtpMutate, isPending: sendEmailOtpIsPending } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    AuthOTPSendEmailResetPasswordParams
  >({
    mutationFn: async (params) => await authOTPSendEmailResetPassword(params),
    onSuccess: (res) => {
      toast.success("Send email reset password successfully!");
      setStep(2);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Send email reset password failed!");
    },
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { mutate: resetPasswordMutate, isPending: resetPasswordIsPending } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    AuthResetPasswordParams
  >({
    mutationFn: async (params) => await authResetPassword(params),
    onSuccess: (res) => {
      toast.success("Reset password successfully!");
      resetPasswordForm.reset();

      router.push("/login");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Reset password failed!");
    },
  });

  const { mutate: verifyEmailOtpMutate, isPending: verifyEmailOtpIsPending } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    AuthOTPVerifyEmailParams
  >({
    mutationFn: async (params) => await authOTPVerifyEmail(params),
    onSuccess: (res) => {
      toast.success("Verify reset Otp successfully!");
      setStep(3);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Verify reset Otp failed!");
      setOtp("");
    },
  });

  const onSubmit = async (data: SendEmailFormValidate) => {
    setFormData(data);
    sendEmailOtpMutate({
      user_email: data?.email,
    });
  };

  const onResetPasswordSubmit = async (data: ResetPasswordFormValidate) => {
    if (formData) {
      resetPasswordMutate({
        email: formData?.email,
        new_password: data.new_password,
      });
    }
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
      });

      setIsResendDisabled(true);
    }
  };

  return (
    <>
      {step === 1 && (
        <>
          <Form {...sendEmailForm}>
            <form
              method="post"
              onSubmit={sendEmailForm.handleSubmit(onSubmit)}
              className="mb-4 space-y-4 bg-white p-8 border rounded">
              <div className="mb-10 space-y-4 bg-white rounded flex flex-col items-center ">
                <Image src="/padlock1.png" alt="" width={500} height={500} className="object-cover w-20 h-20" />
                <span className="font-semibold text-center text-sm">Having trouble logging in?</span>
                <span className="text-center text-sm">
                  {" "}
                  Enter your email and we&apos;ll send you a otp to get back into your account.
                </span>
              </div>

              <FormField
                control={sendEmailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        isRequired
                        isInvalid={!!sendEmailForm.formState.errors.email}
                        errorMessage={sendEmailForm.formState.errors.email?.message}
                        onClear={() => sendEmailForm.resetField("email")}
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
              <Button
                color="primary"
                type="submit"
                className="w-full"
                variant="shadow"
                isLoading={sendEmailOtpIsPending}>
                Send reset otp
              </Button>
            </form>
          </Form>
        </>
      )}

      {step === 2 && (
        <div className="mb-4 space-y-4 bg-white p-8 border rounded flex flex-col items-center ">
          <Image src="/love.png" alt="" width={500} height={500} className="object-cover w-20 h-20" />
          <span className="font-semibold text-center">Enter confirmation code</span>
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
      {step === 3 && (
        <Form {...resetPasswordForm}>
          <form
            method="post"
            onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)}
            className="mb-4 space-y-4 bg-white p-8 border rounded">
            <div className="mb-10 space-y-4 bg-white rounded flex flex-col items-center ">
              <span className="font-semibold text-center">Create strong passwords</span>
              <span className="text-center text-sm text-[#737373]">
                {" "}
                Your password must be at least 6 <br /> characters long, including numbers,
                <br /> letters, and special characters (!$@%).
              </span>
            </div>

            <FormField
              control={resetPasswordForm.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isRequired
                      isInvalid={!!resetPasswordForm.formState.errors.new_password}
                      errorMessage={resetPasswordForm.formState.errors.new_password?.message}
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
                      placeholder="New password"
                      variant="bordered"
                      aria-label="New password"
                      aria-labelledby="New password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={resetPasswordForm.control}
              name="re_Type_New_Password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isRequired
                      isInvalid={!!resetPasswordForm.formState.errors.re_Type_New_Password}
                      errorMessage={resetPasswordForm.formState.errors.re_Type_New_Password?.message}
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
                      placeholder="Re-type new password"
                      variant="bordered"
                      aria-label="Re-type new password"
                      aria-labelledby="Re-type new password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              color="primary"
              type="submit"
              className="w-full font-bold"
              variant="shadow"
              isLoading={resetPasswordIsPending}>
              Reset Password
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};

export default ResetForm;
