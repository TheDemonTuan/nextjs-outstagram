import React, { Fragment, useState } from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { useModalStore } from "@/stores/modal-store";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import EditPost, { EditPostModalKey } from "./edit-post";
import ConfirmDeletePost, { ConfirmDeletePostModalKey } from "./confirm-delete-post";
import { redirectHard } from "@/actions";
export const PostMoreOptionsModalKey = "PostMoreOptions";

const hostLocal = "http://localhost:3001";

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
    title: "Hide number of reacts",
  },
  {
    title: "Turn off comments",
  },
  {
    title: "Go to post",
    action: true,
  },
  {
    title: "About this account",
  },
  {
    title: "Cancel",
    action: true,
  },
];

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
    title: "Add to favorites",
  },
  {
    title: "Go to post",
    action: true,
  },
  {
    title: "Share to ...",
  },
  {
    title: "Copy link",
    action: true,
  },
  {
    title: "Embed",
  },
  {
    title: "About this account",
  },
  {
    title: "Cancel",
    action: true,
  },
];

const PostMoreOptions = ({ isGoToPost = false, isPostDetail }: { isGoToPost?: boolean; isPostDetail?: boolean }) => {
  const { modalOpen, modalClose, modalKey, modalData, setModalData } = useModalStore();
  const { authData } = useAuth();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${hostLocal}/p/${modalData?.id}?utm_source=og_web_copy_link`);
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
                                case "Copy link":
                                  handleCopyLink();
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
    </>
  );
};

export default PostMoreOptions;
