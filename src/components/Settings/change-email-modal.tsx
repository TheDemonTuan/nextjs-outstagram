"use client";

import { useModalStore } from "@/stores/modal-store";
import { Input, Link, Modal, ModalContent, ModalBody, Button, ModalHeader } from "@nextui-org/react";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormField, FormControl, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon } from "@/icons";
import { ChangeEmailFormValidate, ChangeEmailFormValidateSchema } from "./change-email-form.validate";

export const ChangeEmailModalKey = "ChangeEmailModal";

const ChangeEmailModal = () => {
  const { modalClose, modalKey } = useModalStore();

  const editForm = useForm<ChangeEmailFormValidate>({
    resolver: zodResolver(ChangeEmailFormValidateSchema),
    defaultValues: {
      newEmail: "",
    },
  });

  const onSubmit = async (data: ChangeEmailFormValidate) => {
    // handle form submission
  };

  return (
    <Modal isOpen={modalKey === ChangeEmailModalKey} onOpenChange={modalClose} hideCloseButton={false} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <div className="my-4">
              <ModalHeader className="font-semibold text-2xl">Change email</ModalHeader>
              <ModalBody className="cursor-pointer">
                <div className="">
                  <FormProvider {...editForm}>
                    <form onSubmit={editForm.handleSubmit(onSubmit)} className="space-y-8">
                      <FormField
                        control={editForm.control}
                        name="newEmail"
                        render={({ field }) => (
                          <FormItem>
                            <div className="md:items-center gap-y-2 gap-x-8">
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
                              <FormControl className="my-3">
                                <Input
                                  autoFocus
                                  endContent={
                                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 my-2" />
                                  }
                                  label="Enter new email"
                                  variant="bordered"
                                />
                              </FormControl>
                            </div>
                          </FormItem>
                        )}
                      />
                      <div className="flex ">
                        <Button type="submit" color="primary" className="pl-16 pr-16 pt-5 pb-5 w-full font-bold">
                          Change email
                        </Button>
                      </div>
                    </form>
                  </FormProvider>
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
