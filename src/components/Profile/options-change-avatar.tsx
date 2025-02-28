import { AuthVerifyResponse, authKey } from "@/api/auth";
import { userChangeAvatar, userDeleteAvatar } from "@/api/user";
import { useAuth } from "@/hooks/useAuth";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Spinner } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { Fragment, useRef } from "react";
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
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { authData } = useAuth();

  const { mutate: userDeleteAvatarMutate, isPending: userDeleteAvatarIsLoading } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse
  >({
    mutationFn: async () => await userDeleteAvatar(),
    onSuccess: (res) => {
      toast.success("Delete avatar successfully!");
      queryClient.setQueryData([authKey], (oldData: ApiSuccessResponse<AuthVerifyResponse>) =>
        oldData
          ? {
              ...oldData,
              data: {
                user: {
                  ...oldData.data.user,
                  avatar: "",
                },
              },
            }
          : oldData
      );
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Delete avatar failed!");
    },
  });

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

  const handleImageDelete = () => {
    if (!authData?.avatar) return;

    userDeleteAvatarMutate();

    console.log("check log");
  };

  return (
    <>
      <Modal
        isOpen={modalKey === OptionChangeAvatarModalKey}
        onOpenChange={modalClose}
        hideCloseButton={userChangeAvatarIsLoading || userDeleteAvatarIsLoading}
        isDismissable={!userChangeAvatarIsLoading || !userDeleteAvatarIsLoading}>
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalBody
                  className={`mt-3 mb-3 cursor-pointer items-center p-0 ${
                    userChangeAvatarIsLoading ? "pointer-events-none opacity-50" : ""
                  }`}>
                  <p className="text-black text-lg my-5">Change Profile Photo</p>
                  <hr className="w-full border-gray-300" />
                  {ListOptionChangeAvatar.map((optionItem, index) => {
                    return (
                      <Fragment key={index}>
                        <div
                          className="flex items-center gap-2"
                          onClick={() => {
                            if (optionItem?.action) {
                              console.log("Option clicked:", optionItem.title);
                              switch (optionItem.title) {
                                case "Cancel":
                                  modalClose();
                                  break;
                                case "Upload Photo":
                                  avatarInputRef.current?.click();
                                  break;
                                case "Remove Current Photo":
                                  console.log("check click");
                                  handleImageDelete();
                                  break;
                                default:
                                  break;
                              }
                            }
                          }}>
                          <p className={cn("text-black", optionItem?.className)}>{optionItem.title}</p>
                        </div>
                        {index !== ListOptionChangeAvatar.length - 1 && <hr className="w-full my-1 border-gray-300" />}
                      </Fragment>
                    );
                  })}
                  {(userChangeAvatarIsLoading || userDeleteAvatarIsLoading) && (
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
        accept=".webp,.png,.jpg,.jpeg"
        ref={avatarInputRef}
        disabled={userChangeAvatarIsLoading || userDeleteAvatarIsLoading}
      />
    </>
  );
};

export default OptionChangeAvatar;
