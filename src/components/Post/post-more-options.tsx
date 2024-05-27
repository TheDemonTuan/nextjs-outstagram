import React from "react";
import { Link } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { useModalStore } from "@/stores/modal-store";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const PostMoreOptionsModalKey = "PostMoreOptions";

const UserMeMoreOptions = [
  {
    title: "Delete",
    className: "text-red-500 font-semibold",
    action: true,
  },
  {
    title: "Edit",
  },
  {
    title: "Hide number of reacts",
  },
  {
    title: "Turn off comments",
  },
  {
    title: "Go to post",
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
  },
  {
    title: "Share to ...",
  },
  {
    title: "Copy link",
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

const PostMoreOptions = () => {
  const { modalClose, modalKey, modalData } = useModalStore();
  const { authData } = useAuth();

  return (
    <Modal isOpen={modalKey === PostMoreOptionsModalKey} onOpenChange={modalClose} hideCloseButton={true}>
      <ModalContent>
        {(onClose) => {
          const listOptionItem = authData?.id === modalData?.user_id ? UserMeMoreOptions : UserMoreOptions;
          return (
            <>
              <ModalBody className="mt-3 mb-3 cursor-pointer items-center p-0">
                {listOptionItem.map((optionItem, index) => {
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
                              default:
                                break;
                            }
                          }
                        }}>
                        <p className={cn("text-black", optionItem?.className)}>{optionItem.title}</p>
                      </div>
                      {index !== listOptionItem.length - 1 && <hr className="w-full border-gray-300" />}
                    </>
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

export default PostMoreOptions;
