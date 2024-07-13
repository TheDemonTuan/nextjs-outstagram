import React, { Fragment, useState } from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { useModalStore } from "@/stores/modal-store";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import EditPost, { EditPostModalKey } from "./edit-post";
import ConfirmDeletePost, { ConfirmDeletePostModalKey } from "./confirm-delete-post";
import { redirectHard } from "@/actions";
import AboutThisAccount, { AboutThisAccountModalKey } from "../about-this-account";
import { toast } from "sonner";
import ShareModal, { ShareModalKey } from "./share-modal";
import { PostEditHiddenComment, PostEditHiddenCountLike, PostType } from "@/api/post";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
export const PostMoreOptionsModalKey = "PostMoreOptions";

const UserMoreOptions = [
  {
    title: "Report",
    className: "text-red-500 font-semibold",
  },
  {
    title: "Unfollow",
    className: "text-red-500 font-semibold",
  },
  {
    title: "Go to post",
    action: true,
  },
  {
    title: "Share to ...",
    action: true,
  },
  {
    title: "Copy link",
    action: true,
  },
  {
    title: "About this account",
    action: true,
  },
  {
    title: "Cancel",
    action: true,
  },
];

const PostMoreOptions = ({ isGoToPost = false, isPostDetail }: { isGoToPost?: boolean; isPostDetail?: boolean }) => {
  const { modalOpen, modalClose, modalKey, modalData, setModalData } = useModalStore();
  const { authData } = useAuth();

  console.log(modalData);

  const UserMeMoreOptions = [
    {
      title: "Delete",
      className: "text-red-500 font-semibold",
      action: true,
    },
    {
      title: "Edit",
      action: true,
    },
    {
      title: modalData.is_hide_like === true ? "Unhide like count to others" : "Hide like count to others",
      action: true,
    },
    {
      title: modalData.is_hide_comment === true ? "Turn on commenting" : "Turn off commenting",
      action: true,
    },
    {
      title: "Go to post",
      action: true,
    },
    {
      title: "About this account",
      action: true,
    },
    {
      title: "Cancel",
      action: true,
    },
  ];

  const { mutate: postEditHiddenCommentMutate, isPending: postEditHiddenCommentIsLoading } = useMutation<
    ApiSuccessResponse<boolean>,
    ApiErrorResponse
  >({
    mutationFn: async () => await PostEditHiddenComment(modalData.id),
    onSuccess: (res) => {
      toast.success("Update hidden comment successfully!");
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "update hidden comment failed!");
    },
  });

  const { mutate: postEditHiddenCountLikeMutate, isPending: postEditHiddenCountLikeIsLoading } = useMutation<
    ApiSuccessResponse<boolean>,
    ApiErrorResponse
  >({
    mutationFn: async () => await PostEditHiddenCountLike(modalData.id),
    onSuccess: (res) => {
      toast.success("Update hidden count like successfully!");
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "update hidden count like failed!");
    },
  });

  const handlePostEditHiddenComment = () => {
    postEditHiddenCommentMutate();
  };

  const handlePostEditHiddenCountLike = () => {
    postEditHiddenCountLikeMutate();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      modalData.type === PostType.DEFAULT
        ? `${process.env.NEXT_PUBLIC_CLIENT_HOST}/p/${modalData?.id}?utm_source=og_web_copy_link`
        : `${process.env.NEXT_PUBLIC_CLIENT_HOST}/r/${modalData?.id}?utm_source=og_web_copy_link`
    );
    toast.success("Link copied to clipboard!");
    modalClose();
  };

  return (
    <>
      <Modal isOpen={modalKey === PostMoreOptionsModalKey} onOpenChange={modalClose} hideCloseButton={true}>
        <ModalContent>
          {(onClose) => {
            const listOptionItem = authData?.id === modalData?.user_id ? UserMeMoreOptions : UserMoreOptions;
            return (
              <>
                <ModalBody className="mt-3 mb-3 cursor-pointer items-center p-0">
                  {listOptionItem.map((optionItem, index) => {
                    if (optionItem.title === "Go to post" && isGoToPost) {
                      return null;
                    }
                    return (
                      <Fragment key={index}>
                        <div
                          className="flex items-center gap-2"
                          onClick={() => {
                            if (optionItem?.action) {
                              switch (optionItem.title) {
                                case "Edit":
                                  setModalData(modalData);
                                  modalOpen(EditPostModalKey);
                                  break;
                                case "Delete":
                                  setModalData(modalData);
                                  modalOpen(ConfirmDeletePostModalKey);
                                  break;
                                case "Go to post":
                                  if (!isPostDetail) {
                                    modalClose();
                                    redirectHard(`/p/${modalData?.id}`);
                                  } else {
                                    modalClose();
                                    window.location.reload();
                                  }
                                  break;
                                case "About this account":
                                  setModalData(modalData);
                                  modalOpen(AboutThisAccountModalKey);
                                  break;
                                case "Copy link":
                                  handleCopyLink();
                                  break;
                                case "Share to ...":
                                  setModalData(modalData);
                                  modalOpen(ShareModalKey);
                                  break;
                                case "Turn off commenting":
                                  handlePostEditHiddenComment();
                                  break;
                                case "Hide like count to others":
                                  handlePostEditHiddenCountLike();
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
                        {index !== listOptionItem.length - 1 && <hr className="w-full border-gray-300" />}
                      </Fragment>
                    );
                  })}
                </ModalBody>
              </>
            );
          }}
        </ModalContent>
      </Modal>
      <EditPost />
      <ConfirmDeletePost />
      <AboutThisAccount />
      <ShareModal />
    </>
  );
};

export default PostMoreOptions;
