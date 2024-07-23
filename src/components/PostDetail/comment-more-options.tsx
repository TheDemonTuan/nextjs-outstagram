import {
  DeleteCommentArgs,
  adminDeleteCommentOnPostByCommentId,
  postDeleteCommentOnPostByCommentId,
  postKey,
} from "@/api/post";
import { PostComment } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

export const CommentMoreOptionsModalKey = "CommentMoreOptions";

const PostNotCommentMoreOptions = [
  {
    title: "Report",
    className: "text-sm font-bold text-red-500",
    action: true,
  },
  {
    title: "Cancel",
    className: "text-black text-sm",
    action: true,
  },
];

const PostMeMoreOptions = [
  {
    title: "Report",
    className: "text-sm font-bold text-red-500",
    action: true,
  },
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

const PostNotMeCommentedMoreOptions = [
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

const CommentMoreOptions = ({ userId }: { userId: string }) => {
  const { modalData, modalClose, modalKey } = useModalStore();
  const { authData } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: postDeleteCommentOnPostByCommentIdMutate, isPending: postDeleteCommentOnPostByCommentIdIsPending } =
    useMutation<ApiSuccessResponse<string>, ApiErrorResponse, DeleteCommentArgs>({
      mutationFn: (params) => postDeleteCommentOnPostByCommentId(params),
      onSuccess: () => {
        toast.success("Delete comment successfully!");
        if (!!queryClient.getQueryData([postKey, { id: modalData?.post_id }])) {
          queryClient.setQueryData([postKey, { id: modalData?.post_id }], (oldData: any) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              post_comments: oldData.post_comments.filter((comment: any) => comment.id !== modalData?.id),
            };
          });
        }
        modalClose();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Comment post failed!");
      },
    });

  const { mutate: adminDeleteCommentOnPostByCommentIdMutate, isPending: adminDeleteCommentOnPostByCommentIdIsPending } =
    useMutation<ApiSuccessResponse<string>, ApiErrorResponse, DeleteCommentArgs>({
      mutationFn: (params) => adminDeleteCommentOnPostByCommentId(params),
      onSuccess: () => {
        toast.success("Delete comment successfully!");
        if (!!queryClient.getQueryData([postKey, { id: modalData?.post_id }])) {
          queryClient.setQueryData([postKey, { id: modalData?.post_id }], (oldData: any) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              post_comments: oldData.post_comments.filter((comment: PostComment) => comment.id !== modalData?.id),
            };
          });
        }

        modalClose();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Comment post failed!");
      },
    });

  const handleDeleteComment = () => {
    const postID = modalData?.post_id;
    const commentID = modalData?.id;
    const userID = modalData?.user?.id;

    if (postID && commentID) {
      if (authData?.id === userId) {
        postDeleteCommentOnPostByCommentIdMutate({
          postID,
          commentID,
          userID,
        });
      } else {
        postDeleteCommentOnPostByCommentIdMutate({
          postID,
          commentID,
        });
      }
    }
  };

  const handleAdminDeleteComment = () => {
    const postID = modalData?.post_id;
    const commentID = modalData?.id;
    const userID = modalData?.user?.id;

    adminDeleteCommentOnPostByCommentIdMutate({
      postID,
      commentID,
      userID,
    });
  };

  const hasCommented = authData?.id === modalData?.user?.id;

  return (
    <>
      <Modal
        size="sm"
        isOpen={modalKey === CommentMoreOptionsModalKey}
        onOpenChange={modalClose}
        hideCloseButton={true}>
        <ModalContent>
          {() => {
            const listOptionItem =
              (authData?.role === true && authData?.id !== userId && !hasCommented) ||
              (authData?.id === userId && !hasCommented)
                ? PostMeMoreOptions
                : hasCommented
                ? PostNotMeCommentedMoreOptions
                : PostNotCommentMoreOptions;

            return (
              <>
                <ModalBody className="mt-3 mb-3 cursor-pointer items-center p-0">
                  {listOptionItem.map((optionItem, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div
                          key={index}
                          className="flex items-center gap-2"
                          onClick={() => {
                            if (optionItem?.action) {
                              switch (optionItem.title) {
                                case "Report":
                                  break;
                                case "Delete":
                                  authData?.role === true && authData?.id !== userId && !hasCommented
                                    ? handleAdminDeleteComment()
                                    : handleDeleteComment();
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
                      </React.Fragment>
                    );
                  })}
                </ModalBody>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentMoreOptions;
