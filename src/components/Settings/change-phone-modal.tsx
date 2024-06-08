"use client";

import { useModalStore } from "@/stores/modal-store";
import { Input, Link, Modal, ModalContent, ModalBody, Button, ModalHeader, Spinner } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormField, FormControl, FormItem, Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePhoneFormValidate, ChangePhoneFromValidateSchema } from "./change-phone-form.validate";
import { FaPhoneFlip } from "react-icons/fa6";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { AuthVerifyResponse, authKey } from "@/api/auth";
import { toast } from "sonner";
import { userEditPhone } from "@/api/user";

export const ChangePhoneModalKey = "ChangePhoneModal";

const ChangePhoneModal = () => {
  const { modalClose, modalKey } = useModalStore();
  const queryClient = useQueryClient();
  const { authData } = useAuth();

  const changePhoneForm = useForm<ChangePhoneFormValidate>({
    resolver: zodResolver(ChangePhoneFromValidateSchema),
    defaultValues: {
      current_phone: authData?.phone || "",
      new_phone: "",
    },
  });

  const { mutate: userEditPhoneMutate, isPending: userEditPhoneIsLoading } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    { phone: string }
  >({
    mutationFn: async (param) => await userEditPhone(param.phone),
    onSuccess: (res) => {
      toast.success("Phone updated successfully!");
      queryClient.setQueryData([authKey], (oldData: ApiSuccessResponse<AuthVerifyResponse>) =>
        oldData
          ? {
              ...oldData,
              data: {
                user: {
                  ...oldData.data.user,
                  phone: res.data,
                },
              },
            }
          : oldData
      );
      changePhoneForm.reset();
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Phone update failed!");
    },
  });

  useEffect(() => {
    changePhoneForm.setValue("current_phone", authData?.phone || "");
  }, [authData?.phone, changePhoneForm]);

  const onSubmit = async (data: ChangePhoneFormValidate) => {
    userEditPhoneMutate({
      phone: data.new_phone,
    });
  };

  return (
    <Modal
      isOpen={modalKey === ChangePhoneModalKey}
      onOpenChange={modalClose}
      hideCloseButton={userEditPhoneIsLoading}
      size="lg"
      isDismissable={!userEditPhoneIsLoading}>
      <ModalContent>
        {(onClose) => (
          <>
            <div className="my-4">
              <ModalHeader className="font-semibold text-2xl">Change Phone</ModalHeader>
              <ModalBody className="cursor-pointer">
                <div>
                  <Form {...changePhoneForm}>
                    <form onSubmit={changePhoneForm.handleSubmit(onSubmit)} className="space-y-8">
                      <div className="md:items-center gap-y-2 gap-x-8">
                        <FormField
                          control={changePhoneForm.control}
                          name="current_phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl className="my-2">
                                <Input
                                  isDisabled
                                  endContent={<FaPhoneFlip className="text-xl text-default-400 flex-shrink-0 my-2" />}
                                  label="Current Phone"
                                  variant="bordered"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={changePhoneForm.control}
                          name="new_phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl className="my-5">
                                <Input
                                  disabled={userEditPhoneIsLoading}
                                  isRequired
                                  isInvalid={!!changePhoneForm.formState.errors.new_phone}
                                  errorMessage={changePhoneForm.formState.errors.new_phone?.message}
                                  endContent={
                                    <FaPhoneFlip className="text-xl text-default-400 pointer-events-none flex-shrink-0 my-2" />
                                  }
                                  label="Enter new phone"
                                  variant="bordered"
                                  aria-label="Phone"
                                  aria-labelledby="phone"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="flex ">
                          <Button
                            type="submit"
                            color="primary"
                            className="pl-16 pr-16 pt-5 pb-5 w-full font-bold"
                            disabled={userEditPhoneIsLoading}>
                            {userEditPhoneIsLoading ? <Spinner color="white" /> : "Change phone"}
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

export default ChangePhoneModal;
