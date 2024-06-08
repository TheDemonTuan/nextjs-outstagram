"use client";

import { useModalStore } from "@/stores/modal-store";
import { Input, Link, Modal, ModalContent, ModalBody, Button, ModalHeader, Spinner } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormField, FormControl, FormItem, Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { AuthVerifyResponse, authKey } from "@/api/auth";
import { toast } from "sonner";
import { userEditEmail, userVerifyOTP } from "@/api/user";
import { VerifyOTPFormValidate, VerifyOTPFormValidateSchema } from "./verify-otp-form.validate";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

export const VerifyOTPModalKey = "VerifyOTPModal";

const VerifyOTPModal = ({ email }: { email: string }) => {
  const { modalClose, modalKey } = useModalStore();
  const queryClient = useQueryClient();

  const VerifyOTPForm = useForm<VerifyOTPFormValidate>({
    resolver: zodResolver(VerifyOTPFormValidateSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { mutate: userEditEmailMutate, isPending: userEditEmailIsLoading } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    { otp: string }
  >({
    mutationFn: async (param) => await userEditEmail(param.otp, email),
    onSuccess: (res) => {
      toast.success("Email updated successfully!");
      queryClient.setQueryData([authKey], (oldData: ApiSuccessResponse<AuthVerifyResponse>) =>
        oldData
          ? {
              ...oldData,
              data: {
                user: {
                  ...oldData.data.user,
                  email: res.data,
                },
              },
            }
          : oldData
      );
      VerifyOTPForm.reset();
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Verify otp failed!");
    },
  });

  const onSubmit = async (data: VerifyOTPFormValidate) => {
    userEditEmailMutate({ otp: data.otp });
    console.log(data.otp);
    console.log(email);
  };

  return (
    <Modal
      isOpen={modalKey === VerifyOTPModalKey}
      onOpenChange={modalClose}
      hideCloseButton={userEditEmailIsLoading}
      size="sm"
      isDismissable={!userEditEmailIsLoading}>
      <ModalContent>
        {() => (
          <>
            <div className="my-3 items-center flex flex-col">
              <ModalHeader className="font-semibold  text-2xl">Verify OTP</ModalHeader>
              <ModalBody className="cursor-pointer">
                <div>
                  <Form {...VerifyOTPForm}>
                    <form onSubmit={VerifyOTPForm.handleSubmit(onSubmit)}>
                      <div>
                        <FormField
                          control={VerifyOTPForm.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                  <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                  </InputOTPGroup>
                                  <InputOTPSeparator />
                                  <InputOTPGroup>
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                  </InputOTPGroup>
                                  <InputOTPSeparator />
                                  <InputOTPGroup>
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                  </InputOTPGroup>
                                </InputOTP>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="flex">
                          <Button
                            type="submit"
                            color="primary"
                            className="mt-5 w-full mx-2 font-bold"
                            size="sm"
                            disabled={userEditEmailIsLoading}>
                            {userEditEmailIsLoading ? <Spinner color="white" /> : "verify OTP"}
                          </Button>
                        </div>{" "}
                      </div>
                    </form>
                  </Form>
                </div>
              </ModalBody>
            </div>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default VerifyOTPModal;
