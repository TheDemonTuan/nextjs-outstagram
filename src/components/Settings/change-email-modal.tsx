"use client";

import { useModalStore } from "@/stores/modal-store";
import { Input, Link, Modal, ModalContent, ModalBody, Button, ModalHeader, Spinner, modal } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormField, FormControl, FormItem, Form, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon } from "@/icons";
import { ChangeEmailFormValidate, ChangeEmailFormValidateSchema } from "./change-email-form.validate";
import { useAuth } from "@/hooks/useAuth";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { userEditEmail, userSendOTP } from "@/api/user";
import { AuthVerifyResponse, authKey } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import VerifyOTPModal, { VerifyOTPModalKey } from "./verify-otp-form";

export const ChangeEmailModalKey = "ChangeEmailModal";

const ChangeEmailModal = () => {
  const { modalOpen, modalClose, modalKey } = useModalStore();
  const { authData } = useAuth();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");

  const changeEmailForm = useForm<ChangeEmailFormValidate>({
    resolver: zodResolver(ChangeEmailFormValidateSchema),
    defaultValues: {
      newEmail: "",
      currentEmail: authData?.email || "",
    },
  });

  const { mutate: userSendOTPMutate, isPending: userSendOTPIsLoading } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    { email: string }
  >({
    mutationFn: async (param) => await userSendOTP(param.email),
    onSuccess: (res) => {
      toast.success("Send OTP successfully!");
      queryClient.setQueryData([authKey], (oldData: ApiSuccessResponse<AuthVerifyResponse>) =>
        oldData
          ? {
              ...oldData,
              data: {
                ...oldData.data,
                email: res.data,
              },
            }
          : oldData
      );
      setEmail(res.data);
      changeEmailForm.reset();
      openModalVerifyEmail();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Send OTP failed!");
    },
  });

  const openModalVerifyEmail = () => {
    modalOpen(VerifyOTPModalKey);
  };

  useEffect(() => {
    changeEmailForm.setValue("currentEmail", authData?.email || "");
  }, [authData?.email, changeEmailForm]);

  const onSubmit = async (data: ChangeEmailFormValidate) => {
    userSendOTPMutate({
      email: data.newEmail,
    });
  };

  return (
    <>
      <Modal
        isOpen={modalKey === ChangeEmailModalKey}
        onOpenChange={modalClose}
        hideCloseButton={userSendOTPIsLoading}
        size="lg"
        isDismissable={!userSendOTPIsLoading}>
        <ModalContent>
          {(onClose) => (
            <>
              <div className="my-4">
                <ModalHeader className="font-semibold text-2xl">Change email</ModalHeader>
                <ModalBody className="cursor-pointer">
                  <div>
                    <Form {...changeEmailForm}>
                      <form onSubmit={changeEmailForm.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="md:items-center gap-y-2 gap-x-8">
                          <FormField
                            control={changeEmailForm.control}
                            name="currentEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl className="my-2">
                                  <Input
                                    disabled
                                    endContent={
                                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 my-2" />
                                    }
                                    label="Current email"
                                    variant="bordered"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={changeEmailForm.control}
                            name="newEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl className="my-5">
                                  <Input
                                    disabled={userSendOTPIsLoading}
                                    isRequired
                                    isInvalid={!!changeEmailForm.formState.errors.newEmail}
                                    errorMessage={changeEmailForm.formState.errors.newEmail?.message}
                                    endContent={
                                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 my-2" />
                                    }
                                    label="Enter new email"
                                    variant="bordered"
                                    aria-label="Email"
                                    aria-labelledby="email"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex ">
                          <Button
                            type="submit"
                            color="primary"
                            className="pl-16 pr-16 pt-5 pb-5 w-full font-bold"
                            disabled={userSendOTPIsLoading}>
                            {userSendOTPIsLoading ? <Spinner color="white" /> : "Change email"}
                          </Button>
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
      <VerifyOTPModal email={email} />
    </>
  );
};

export default ChangeEmailModal;
