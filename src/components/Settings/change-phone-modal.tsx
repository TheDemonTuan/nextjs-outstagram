"use client";

import { useModalStore } from "@/stores/modal-store";
import { Input, Link, Modal, ModalContent, ModalBody, Button, ModalHeader } from "@nextui-org/react";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormField, FormControl, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePhoneFormValidate, ChangePhoneFromValidateSchema } from "./change-phone-form.validate";
import { FaPhoneFlip } from "react-icons/fa6";

export const ChangePhoneModalKey = "ChangePhoneModal";

const ChangePhoneModal = () => {
  const { modalClose, modalKey } = useModalStore();

  const editForm = useForm<ChangePhoneFormValidate>({
    resolver: zodResolver(ChangePhoneFromValidateSchema),
    defaultValues: {
      newPhone: "",
    },
  });

  const onSubmit = async (data: ChangePhoneFormValidate) => {
    // handle form submission
  };

  return (
    <Modal isOpen={modalKey === ChangePhoneModalKey} onOpenChange={modalClose} hideCloseButton={false} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <div className="my-4">
              <ModalHeader className="font-semibold text-2xl">Change Phone</ModalHeader>
              <ModalBody className="cursor-pointer">
                <div className="">
                  <FormProvider {...editForm}>
                    <form onSubmit={editForm.handleSubmit(onSubmit)} className="space-y-8">
                      <FormField
                        control={editForm.control}
                        name="newPhone"
                        render={({ field }) => (
                          <FormItem>
                            <div className="md:items-center gap-y-2 gap-x-8">
                              <FormControl className="mt-2">
                                <Input
                                  autoFocus
                                  endContent={
                                    <FaPhoneFlip className="text-2xl text-default-400 pointer-events-none flex-shrink-0 my-2" />
                                  }
                                  label="Enter new phone"
                                  variant="bordered"
                                />
                              </FormControl>
                            </div>
                          </FormItem>
                        )}
                      />
                      <div className="flex ">
                        <Button type="submit" color="primary" className="pl-16 pr-16 pt-5 pb-5 w-full font-bold">
                          Change phone
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

export default ChangePhoneModal;
