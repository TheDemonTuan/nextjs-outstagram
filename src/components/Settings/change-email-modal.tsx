"use client";

import { useModalStore } from "@/stores/modal-store";
import { Input, Link, Modal, ModalContent, ModalBody, Button, ModalHeader, Spinner } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormField, FormControl, FormItem, Form, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon } from "@/icons";
import { ChangeEmailFormValidate, ChangeEmailFormValidateSchema } from "./change-email-form.validate";
import { useAuth } from "@/hooks/useAuth";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { userEditEmail } from "@/api/user";
import { AuthVerifyResponse, authKey } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const ChangeEmailModalKey = "ChangeEmailModal";

const ChangeEmailModal = () => {
  const { modalClose, modalKey } = useModalStore();
  const { authData } = useAuth();
  const queryClient = useQueryClient();

  const changeEmailForm = useForm<ChangeEmailFormValidate>({
    resolver: zodResolver(ChangeEmailFormValidateSchema),
    defaultValues: {
      newEmail: "",
      currentEmail: authData?.email || "",
    },
  });

  const { mutate: userEditEmailMutate, isPending: userEditEmailIsLoading } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    { email: string }
  >({
    mutationFn: async (param) => await userEditEmail(param.email),
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
      changeEmailForm.reset();
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Email update failed!");
    },
  });

  useEffect(() => {
    changeEmailForm.setValue("currentEmail", authData?.email || "");
  }, [authData?.email, changeEmailForm]);

  const onSubmit = async (data: ChangeEmailFormValidate) => {
    userEditEmailMutate({
      email: data.newEmail,
    });
  };

  return (
    <Modal
      isOpen={modalKey === ChangeEmailModalKey}
      onOpenChange={modalClose}
      hideCloseButton={userEditEmailIsLoading}
      size="lg"
      isDismissable={!userEditEmailIsLoading}>
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
                                  disabled={userEditEmailIsLoading}
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
                          disabled={userEditEmailIsLoading}>
                          {userEditEmailIsLoading ? <Spinner color="white" /> : "Change email"}
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
  );
};

export default ChangeEmailModal;
