import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React, { Fragment } from "react";

export const ConfirmDiscardPostModalKey = "ConfirmDiscardPost";

const ListConfirmDiscardPost = [
  {
    title: "Discard",
    className: "text-sm font-bold text-red-500",
    action: true,
  },
  {
    title: "Cancel",
    className: "text-black text-sm",
    action: true,
  },
];

const ConfirmDiscardPost = ({
  // onCloseModalSelectPhoto,
  onEventCloseModal,
  // onResetModalSelectPhoto,
  // onCloseModalParent,
  // onBackTypePhoto,
  keyModal,
}: {
  onEventCloseModal: () => void;
  // onCloseModalAddPost?: () => void;
  keyModal: string;
  // onBackTypePhoto?: () => void;
}) => {
  const { modalClose, modalKey, modalOpen } = useModalStore();

  const handlePostDiscard = () => {
    onEventCloseModal();
    modalClose();
  };

  const handleCloseDiscardPostModal = () => {
    modalOpen(keyModal);
  };
  return (
    <Modal
      isOpen={modalKey === ConfirmDiscardPostModalKey}
      onOpenChange={handleCloseDiscardPostModal}
      hideCloseButton={true}
      isDismissable={false}
      size="sm">
      <ModalContent>
        {() => {
          return (
            <>
              <ModalBody className="mt-3 mb-3 cursor-pointer items-center p-0 ">
                <div className="my-5 text-center">
                  <p className="text-black text-xl">Discard post?</p>
                  <p>If you leave, your edits won&apos;t be saved.</p>
                </div>
                <hr className="w-full border-gray-300" />
                {ListConfirmDiscardPost.map((optionItem, index) => {
                  return (
                    <Fragment key={index}>
                      <div
                        className="flex items-center gap-2"
                        onClick={() => {
                          if (optionItem?.action) {
                            switch (optionItem.title) {
                              case "Discard":
                                handlePostDiscard();
                                break;
                              case "Cancel":
                                handleCloseDiscardPostModal();
                                break;
                              default:
                                break;
                            }
                          }
                        }}>
                        <p className={cn("text-black", optionItem?.className)}>{optionItem.title}</p>
                      </div>
                      {index !== ListConfirmDiscardPost.length - 1 && <hr className="w-full my-1 border-gray-300" />}
                    </Fragment>
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

export default ConfirmDiscardPost;
