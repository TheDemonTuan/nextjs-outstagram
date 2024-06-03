import { MentionIcon, PlusIcon, ReelsIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Input, Link } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React from "react";

export const ConfirmPublicAccountModalKey = "ConfirmPublicAccount";

const ListConfirmPublicAccount = [
  {
    title: "Switch to public",
    className: "text-sky-500 text-sm font-bold",
    action: true,
  },
  {
    title: "Cancel",
    className: "text-black text-sm",
    action: true,
  },
];

const ConfirmPublicAccount = () => {
  const { modalClose, modalKey } = useModalStore();
  return (
    <Modal
      isOpen={modalKey === ConfirmPublicAccountModalKey}
      onOpenChange={modalClose}
      hideCloseButton={true}
      size="md">
      <ModalContent>
        {(onClose) => {
          return (
            <>
              <ModalBody className="mt-3 mb-3 cursor-pointer items-center p-0">
                <p className="text-black text-xl my-4">Switch to public account?</p>

                <div className="text-sm mx-8 flex flex-col my-2">
                  <div className="flex flex-row items-center my-2">
                    <ReelsIcon className="w-7 h-7 mr-2" />
                    <div className="">
                      Anyone can see your posts, reels, and stories, <br /> and can use your original audio.
                    </div>
                  </div>
                  <div className="flex flex-row items-center my-2">
                    <MentionIcon className="w-7 h-7 mr-2" />
                    <div className="">
                      This won't change who can message, tag or <br /> @mention you.
                    </div>
                  </div>
                  <div className="flex flex-row items-center my-2">
                    <PlusIcon className="w-7 h-7 mr-2" />
                    <div className="">
                      People can remix your reels and download them <br /> as part of a remix. You can change this in{" "}
                      <br /> settings.
                    </div>
                  </div>
                </div>

                <hr className="w-full border-gray-300" />
                {ListConfirmPublicAccount.map((optionItem, index) => {
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
                              case "Switch to public":
                                break;
                              default:
                                break;
                            }
                          }
                        }}>
                        <p className={cn("text-black", optionItem?.className)}>{optionItem.title}</p>
                      </div>
                      {index !== ListConfirmPublicAccount.length - 1 && <hr className="w-full my-1 border-gray-300" />}
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

export default ConfirmPublicAccount;
