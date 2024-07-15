import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Input, Link, Spinner } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React, { Fragment } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { PostResponse, adminPostDelete, postDelete, postKey } from "@/api/post";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

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
  const { authData } = useAuth();

  const { mutate: postDeleteMutate, isPending: postDeleteIsLoading } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse
  >({
    mutationFn: async () => await postDelete(modalData?.id),
    onSuccess: () => {
      toast.success("Delete post successfully!");

      queryClient.setQueryData([postKey, "home"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => {
            return {
              ...page,
              postHomePage: page.postHomePage.filter((post: any) => post.id !== modalData.id),
            };
          }),
        };
      });

      queryClient.setQueryData([postKey, "reels"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => {
            return {
              ...page,
              postReel: page.postReel.filter((post: any) => post.id !== modalData.id),
            };
          }),
        };
      });

      if (!!queryClient.getQueryData([postKey, { id: modalData.id }])) {
        queryClient.setQueryData([postKey, { id: modalData.id }], (oldData: any) => {
          return null;
        });
      }
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Delete post failed!");
    },
  });

  const { mutate: adminPostDeleteMutate, isPending: adminPostDeleteIsLoading } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse
  >({
    mutationFn: async () => await adminPostDelete(modalData?.id, modalData.user_id),
    onSuccess: () => {
      toast.success("Delete post successfully!");

      // queryClient.setQueryData([postKey, "home"], (oldData: any) => {
      //   if (!oldData) return oldData;
      //   return {
      //     ...oldData,
      //     pages: oldData.pages.map((page: any) => {
      //       return {
      //         ...page,
      //         postHomePage: page.postHomePage.filter((post: any) => post.id !== modalData.id),
      //       };
      //     }),
      //   };
      // });

      // queryClient.setQueryData([postKey, "reels"], (oldData: any) => {
      //   if (!oldData) return oldData;
      //   return {
      //     ...oldData,
      //     pages: oldData.pages.map((page: any) => {
      //       return {
      //         ...page,
      //         postReel: page.postReel.filter((post: any) => post.id !== modalData.id),
      //       };
      //     }),
      //   };
      // });

      // if (!!queryClient.getQueryData([postKey, { id: modalData.id }])) {
      //   queryClient.setQueryData([postKey, { id: modalData.id }], (oldData: any) => {
      //     return null;
      //   });
      // }
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

  const handleAdminPostDelete = () => {
    if (!modalData?.id) return;
    adminPostDeleteMutate();
  };

  return (
    <Modal
      isOpen={modalKey === ConfirmDeletePostModalKey}
      onOpenChange={modalClose}
      hideCloseButton={true}
      isDismissable={!postDeleteIsLoading || !adminPostDeleteIsLoading}
      size="sm">
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalBody
                className={`mt-3 mb-3 cursor-pointer items-center p-0 ${
                  postDeleteIsLoading || adminPostDeleteIsLoading ? "pointer-events-none opacity-50" : ""
                }`}>
                <div className="my-5 text-center">
                  <p className="text-black text-xl">
                    {" "}
                    {authData?.role === true ? `Delete post by ${modalData.user.username}` : `Delete post`}?
                  </p>
                  <p>Are you sure you want to delete this post?</p>
                </div>
                <hr className="w-full border-gray-300" />
                {ListConfirmDeletePost.map((optionItem, index) => {
                  return (
                    <Fragment key={index}>
                      <div
                        className="flex items-center gap-2"
                        onClick={() => {
                          if (optionItem?.action) {
                            switch (optionItem.title) {
                              case "Delete":
                                authData?.role === false ? handlePostDelete() : handleAdminPostDelete();
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
                    </Fragment>
                  );
                })}
                {postDeleteIsLoading ||
                  (adminPostDeleteIsLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                      <Spinner size="md" />
                    </div>
                  ))}
              </ModalBody>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeletePost;
