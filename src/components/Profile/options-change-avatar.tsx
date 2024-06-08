import { AuthVerifyResponse, authKey } from "@/api/auth";
import { userChangeAvatar } from "@/api/user";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Spinner } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { toast } from "sonner";

export const OptionChangeAvatarModalKey = "OptionChangeAvatar";

const ListOptionChangeAvatar = [
  {
    title: "Upload Photo",
    className: "text-sky-500 text-sm font-bold",
    action: true,
  },
  {
    title: "Remove Current Photo",
    className: "text-sm font-bold text-red-500",
    action: true,
  },
  {
    title: "Cancel",
    className: "text-black text-sm",
    action: true,
  },
];

const OptionChangeAvatar = () => {
  const { modalClose, modalKey } = useModalStore();
  const queryClient = useQueryClient();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const { mutate: userChangeAvatarMutate, isPending: userChangeAvatarIsLoading } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    { avatar: File }
  >({
    mutationFn: async (params) => await userChangeAvatar(params.avatar),
    onSuccess: (res) => {
      toast.success("Change avatar successfully!");
      queryClient.setQueryData([authKey], (oldData: ApiSuccessResponse<AuthVerifyResponse>) =>
        oldData
          ? {
              ...oldData,
              data: {
                user: {
                  ...oldData.data.user,
                  avatar: res.data,
                },
              },
            }
          : oldData
      );
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Change avatar failed!");
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    file && userChangeAvatarMutate({ avatar: file });
  };

  return (
    <>
      <Modal
        isOpen={modalKey === OptionChangeAvatarModalKey}
        onOpenChange={modalClose}
        hideCloseButton={true}
        isDismissable={!userChangeAvatarIsLoading}>
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalBody
                  className={`relative mt-3 mb-3 cursor-pointer items-center p-0 ${
                    userChangeAvatarIsLoading ? "pointer-events-none opacity-50" : ""
                  }`}>
                  <p className="text-black text-lg my-5">Change Profile Photo</p>
                  <hr className="w-full border-gray-300" />
                  {ListOptionChangeAvatar.map((optionItem, index) => {
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
                                case "Upload Photo":
                                  avatarInputRef.current?.click();
                                  break;
                                case "Remove Current Photo":
                                  break;
                                default:
                                  break;
                              }
                            }
                          }}>
                          <p className={cn("text-black", optionItem?.className)}>{optionItem.title}</p>
                        </div>
                        {index !== ListOptionChangeAvatar.length - 1 && <hr className="w-full my-1 border-gray-300" />}
                      </>
                    );
                  })}
                  {userChangeAvatarIsLoading && (
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
      <input
        onChange={handleImageChange}
        onClick={(e) => {
          e.currentTarget.value = "";
          e.currentTarget.files = null;
        }}
        type="file"
        className="hidden"
        accept=".webp,.png,.jpg"
        ref={avatarInputRef}
      />
    </>
  );
};

export default OptionChangeAvatar;
