import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Link } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React, { Fragment } from "react";

export const ProfileSettingModalKey = "ProfileSettings";

const ListProfileSetting = [
  {
    title: "Apps and websites",
  },
  {
    title: "QR code",
  },
  {
    title: "Notifications",
  },
  {
    title: "Settings and privacy",
  },
  {
    title: "Meta Verified",
  },
  {
    title: "Supervision",
  },
  {
    title: "Logout",
    className: "text-red-500",
  },
  {
    title: "Cancel",
    action: true,
  },
];

const ProfileSettings = () => {
  const { modalClose, modalKey } = useModalStore();
  return (
    <>
      <Modal isOpen={modalKey === ProfileSettingModalKey} onOpenChange={modalClose} hideCloseButton={true}>
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalBody className="mt-3 mb-3 cursor-pointer items-center p-0">
                  {ListProfileSetting.map((optionItem, index) => {
                    return (
                      <Fragment key={index}>
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
                        {index !== ListProfileSetting.length - 1 && <hr className="w-full border-gray-300" />}
                      </Fragment>
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

export default ProfileSettings;
