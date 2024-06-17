import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Input, Link, Spinner } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { PostResponse, postDelete } from "@/api/post";
import { toast } from "sonner";
import { AuthVerifyResponse, authKey } from "@/api/auth";

export const ConfirmDeletePostModalKey = "ConfirmDeletePost";

const ListConfirmDeletePost = [
  {
    title: "Delete",
    className: "text-sm font-bold text-red-500",
    action: true,
  },
  {
    title: "Cancel",
    className: "text-black text-sm",
    action: true,
  },
];

const ConfirmDeletePost = () => {
  const { modalClose, modalKey, modalData } = useModalStore();
  const queryClient = useQueryClient();
  const { mutate: postDeleteMutate, isPending: postDeleteIsLoading } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse
  >({
    mutationFn: async () => await postDelete(modalData?.id),
    onSuccess: () => {
      toast.success("Delete post successfully!");
      queryClient.setQueryData([authKey], (oldData: ApiSuccessResponse<AuthVerifyResponse>) =>
        oldData
          ? {
              ...oldData,
              data: {
                user: {
                  ...oldData.data.user,
                  post: "",
                },
              },
            }
          : oldData
      );
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Delete post failed!");
    },
  });

  const handlePostDelete = () => {
    if (!modalData?.id) return;
    postDeleteMutate();
  };
  return (
    <Modal
      isOpen={modalKey === ConfirmDeletePostModalKey}
      onOpenChange={modalClose}
      hideCloseButton={postDeleteIsLoading || postDeleteIsLoading}
      isDismissable={!postDeleteIsLoading || !postDeleteIsLoading}>
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalBody
                className={`mt-3 mb-3 cursor-pointer items-center p-0 ${
                  postDeleteIsLoading ? "pointer-events-none opacity-50" : ""
                }`}>
                <div className="my-4 text-center">
                  <p className="text-black text-lg">Delete post?</p>
                  <p>Are you sure you want to delete this post?</p>
                </div>
                <hr className="w-full border-gray-300" />
                {ListConfirmDeletePost.map((optionItem, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="flex items-center gap-2"
                        onClick={() => {
                          if (optionItem?.action) {
                            switch (optionItem.title) {
                              case "Delete":
                                handlePostDelete();
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
                      {index !== ListConfirmDeletePost.length - 1 && <hr className="w-full my-1 border-gray-300" />}
                    </>
                  );
                })}
                {(postDeleteIsLoading || postDeleteIsLoading) && (
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

export default ConfirmDeletePost;
