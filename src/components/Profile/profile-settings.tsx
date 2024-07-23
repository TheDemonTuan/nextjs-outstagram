import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Link } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import LogoutModal, { LogoutModalKey } from "../logout-modal";

export const ProfileSettingModalKey = "ProfileSettings";

const ListProfileSetting = [
  {
    title: "QR code",
    href: "/qr",
    action: true,
  },
  {
    title: "Settings and privacy",
    href: "/accounts/privacy-setting",
    action: true,
  },
  {
    title: "Logout",
    className: "text-red-500",
    action: true,
  },
  {
    title: "Cancel",
    action: true,
  },
];

const ProfileSettings = () => {
  const router = useRouter();
  const { modalClose, modalKey, modalOpen } = useModalStore();
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
                                case "QR code":
                                  if (optionItem.href) {
                                    router.push(optionItem.href);
                                  }
                                  break;
                                case "Settings and privacy":
                                  if (optionItem.href) {
                                    router.push(optionItem.href);
                                  }
                                  break;
                                case "Logout":
                                  modalOpen(LogoutModalKey);
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
      <LogoutModal />
    </>
  );
};

export default ProfileSettings;
