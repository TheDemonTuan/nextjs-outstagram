import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Input, Link, Spinner } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React, { Fragment } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { PostResponse, adminBlockPostByPostId, adminPostDelete, postDelete, postKey } from "@/api/post";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export const ConfirmBlockPostModalKey = "ConfirmBlockPost";

const ConfirmBlockPost = () => {
  const { modalClose, modalKey, modalData } = useModalStore();
  const queryClient = useQueryClient();
  const { authData } = useAuth();

  const ListConfirmBlockPost = [
    {
      title: modalData.active === true ? "Block" : "Unblock",
      className: "text-sm font-bold text-red-500",
      action: true,
    },
    {
      title: "Cancel",
      className: "text-black text-sm",
      action: true,
    },
  ];

  const { mutate: adminBlockPostMutate, isPending: adminBlockPostIsLoading } = useMutation<
    ApiSuccessResponse<boolean>,
    ApiErrorResponse
  >({
    mutationFn: async () => await adminBlockPostByPostId(modalData.id),
    onSuccess: () => {
      toast.success("Blocked post successfully!");
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Blocked post failed!");
    },
  });

  const handleAdminBlockPost = () => {
    adminBlockPostMutate();
  };

  return (
    <Modal
      isOpen={modalKey === ConfirmBlockPostModalKey}
      onOpenChange={modalClose}
      hideCloseButton={true}
      isDismissable={!adminBlockPostIsLoading}
      size="sm">
      <ModalContent>
        {() => {
          return (
            <>
              <ModalBody
                className={`mt-3 mb-3 cursor-pointer items-center p-0 ${
                  adminBlockPostIsLoading ? "pointer-events-none opacity-50" : ""
                }`}>
                <div className="my-5 text-center space-y-2">
                  <p className="text-black text-xl">
                    {" "}
                    {authData?.active === true
                      ? `Block post by ${modalData.user.username}`
                      : `Unblock post by ${modalData.user.username}`}
                    ?
                  </p>
                  <p className="text-[#737373] text-sm">
                    {!modalData.active ? (
                      <>
                        They will be able to see their posts <br /> on Outstagram. Are you sure you want to unblock this
                        post?
                      </>
                    ) : (
                      <>
                        They will not be able to see their posts <br /> on Outstagram. Are you sure you want to block
                        this post?
                      </>
                    )}
                  </p>
                </div>
                <hr className="w-full border-gray-300" />
                {ListConfirmBlockPost.map((optionItem, index) => {
                  return (
                    <Fragment key={index}>
                      <div
                        className="flex items-center gap-2"
                        onClick={() => {
                          if (optionItem?.action) {
                            switch (optionItem.title) {
                              case "Block":
                                handleAdminBlockPost();
                                break;
                              case "Unblock":
                                handleAdminBlockPost();
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
                      {index !== ListConfirmBlockPost.length - 1 && <hr className="w-full my-1 border-gray-300" />}
                    </Fragment>
                  );
                })}
                {adminBlockPostIsLoading && (
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

export default ConfirmBlockPost;
