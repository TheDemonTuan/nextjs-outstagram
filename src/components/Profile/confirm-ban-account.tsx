import { adminBanUserByUserID } from "@/api/user";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { toast } from "sonner";

export const ConfirmBanAccountModalKey = "ConfirmBanAccount";

const ConfirmBanAccount = () => {
  const { modalData, modalClose, modalKey, modalOpen } = useModalStore();

  const ListConfirmBanAccount = [
    {
      title: modalData.active === true ? "Ban" : "Unban",
      className: "text-sm font-bold text-red-500",
      action: true,
    },
    {
      title: "Cancel",
      className: "text-black text-sm",
      action: true,
    },
  ];

  const { mutate: adminBanUserMutate, isPending: adminBanUserIsLoading } = useMutation<
    ApiSuccessResponse<boolean>,
    ApiErrorResponse
  >({
    mutationFn: async () => await adminBanUserByUserID(modalData.id),
    onSuccess: () => {
      toast.success("Banned account successfully!");
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Banned account failed!");
    },
  });

  const handleAdminBanUser = () => {
    adminBanUserMutate();
  };

  return (
    <Modal
      isOpen={modalKey === ConfirmBanAccountModalKey}
      onOpenChange={modalClose}
      hideCloseButton={true}
      isDismissable={false}
      size="sm">
      <ModalContent>
        {() => {
          return (
            <>
              <ModalBody className="mt-3 mb-3 cursor-pointer items-center p-0 ">
                <div className="my-3 space-y-1 text-center">
                  <p className="text-black text-xl">
                    {modalData.active === true ? "Ban" : "Unban"} {modalData.username}{" "}
                  </p>
                  <p className="text-[#737373] text-sm">
                    {!modalData.active ? (
                      <>
                        They will be able to use any of the features <br /> on Outstagram. Outstagram will notify them
                        that <br /> they have been unbanned.
                      </>
                    ) : (
                      <>
                        They will not be able to use any features <br /> on Outstagram. Outstagram will notify them that{" "}
                        <br /> they have been banned.
                      </>
                    )}
                  </p>
                </div>
                <hr className="w-full border-gray-300" />
                {ListConfirmBanAccount.map((optionItem, index) => {
                  return (
                    <Fragment key={index}>
                      <div
                        className="flex items-center gap-2"
                        onClick={() => {
                          if (optionItem?.action) {
                            switch (optionItem.title) {
                              case "Ban":
                                handleAdminBanUser();
                                break;
                              case "Unban":
                                handleAdminBanUser();
                                break;
                              case "Cancel":
                                modalClose();
                                break;
                              default:
                                break;
                            }
                          }
                        }}>
                        <p className={cn("text-black", optionItem?.className)}>{optionItem.title}</p>
                      </div>
                      {index !== ListConfirmBanAccount.length - 1 && <hr className="w-full my-1 border-gray-300" />}
                    </Fragment>
                  );
                })}
              </ModalBody>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmBanAccount;
