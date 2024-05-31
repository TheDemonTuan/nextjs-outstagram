import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Input, Link } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React from "react";

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
  const { modalClose, modalKey } = useModalStore();
  return (
    <Modal isOpen={modalKey === ConfirmDeletePostModalKey} onOpenChange={modalClose} hideCloseButton={true}>
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalBody className="mt-3 mb-3 cursor-pointer items-center p-0">
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
              </ModalBody>
            </>
          );
        }}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeletePost;
