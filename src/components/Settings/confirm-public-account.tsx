import { AuthVerifyResponse, authKey } from "@/api/auth";
import { userEditPrivate } from "@/api/user";
import { useAuth } from "@/hooks/useAuth";
import { MentionIcon, PlusIcon, ReelsIcon } from "@/icons";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Skeleton, Spinner } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

export const ConfirmPublicAccountModalKey = "ConfirmPublicAccount";

const ConfirmPublicAccount = ({ onPrivateEdit }: { onPrivateEdit: (isPrivate: boolean) => void }) => {
  const { modalClose, modalKey } = useModalStore();
  const queryClient = useQueryClient();
  const { authData } = useAuth();

  const { mutate: userEditPrivateMutate, isPending: userEditPrivateIsLoading } = useMutation<
    ApiSuccessResponse<boolean>,
    ApiErrorResponse
  >({
    mutationFn: async () => await userEditPrivate(),
    onSuccess: (res) => {
      toast.success("Update private successfully!");
      queryClient.setQueryData([authKey], (oldData: ApiSuccessResponse<AuthVerifyResponse>) =>
        oldData
          ? {
              ...oldData,
              data: {
                user: {
                  ...oldData.data.user,
                  is_private: res.data,
                },
              },
            }
          : oldData
      );
      onPrivateEdit(res.data);
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "update private failed!");
    },
  });

  const handleSwitch = () => {
    userEditPrivateMutate();
  };

  const modalTitle = authData?.is_private ? "Switch to public account?" : "Switch to private account?";
  const modalActionTitle = authData?.is_private ? "Switch to public" : "Switch to private";

  const ListConfirmPublicAccount = [
    {
      title: modalActionTitle,
      className: "text-sky-500 text-sm font-bold",
      action: true,
    },
    {
      title: "Cancel",
      className: "text-black text-sm",
      action: true,
    },
  ];

  return (
    <Modal
      isOpen={modalKey === ConfirmPublicAccountModalKey}
      onOpenChange={modalClose}
      hideCloseButton={true}
      size="md"
      isDismissable={!userEditPrivateIsLoading}>
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalBody
                className={`relative mt-3 mb-3 cursor-pointer items-center p-0 ${
                  userEditPrivateIsLoading ? "pointer-events-none opacity-50" : ""
                }`}>
                <p className="text-black text-xl my-4">{modalTitle}</p>

                <div className="text-sm mx-8 flex flex-col my-2">
                  <div className="flex flex-row items-center my-2">
                    <ReelsIcon className="w-7 h-7 mr-2" />
                    <div className="">
                      Anyone can see your posts, reels, and stories, <br /> and can use your original audio.
                    </div>
                  </div>
                  <div className="flex flex-row items-center my-2">
                    <MentionIcon className="w-7 h-7 mr-2" />
                    <div className="">
                      This won&apos;t change who can message, tag or <br /> @mention you.
                    </div>
                  </div>
                  <div className="flex flex-row items-center my-2">
                    <PlusIcon className="w-7 h-7 mr-2" />
                    <div className="">
                      People can remix your reels and download them <br /> as part of a remix. You can change this in{" "}
                      <br /> settings.
                    </div>
                  </div>
                </div>

                <hr className="w-full border-gray-300" />
                {ListConfirmPublicAccount.map((optionItem, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="flex items-center gap-2"
                        onClick={() => {
                          if (optionItem?.action) {
                            switch (optionItem.title) {
                              case "Cancel":
                                modalClose();
                                break;
                              case modalActionTitle:
                                handleSwitch();
                                break;
                              default:
                                break;
                            }
                          }
                        }}>
                        <p className={cn("text-black", optionItem?.className)}>{optionItem.title}</p>
                        {optionItem.title === modalActionTitle && userEditPrivateIsLoading && <Skeleton />}
                      </div>
                      {index !== ListConfirmPublicAccount.length - 1 && <hr className="w-full my-1 border-gray-300" />}
                    </>
                  );
                })}
                {userEditPrivateIsLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                    <Spinner size="md" />
                  </div>
                )}
              </ModalBody>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmPublicAccount;
