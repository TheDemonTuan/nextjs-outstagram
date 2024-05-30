import React from "react";
import { Link } from "@nextui-org/react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { useModalStore } from "@/stores/modal-store";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const ProfileMoreOptionsModalKey = "ProfileMoreOptions";

const UserAdminMoreOptions = [
  {
    title: "Ban account",
    className: "text-red-500 font-semibold",
    action: true,
  },
  {
    title: "Delete account",
    className: "text-red-500 font-semibold",
    action: true,
  },
  {
    title: "Cancel",
    action: true,
  },
];

const UserNotMeMoreOptions = [
  {
    title: "Block",
    className: "text-red-500 font-semibold",
  },
  {
    title: "Restrict",
    className: "text-red-500 font-semibold",
  },
  {
    title: "Report",
    className: "text-red-500 font-semibold",
  },
  {
    title: "Share to ...",
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

const ProfileMoreOptions = () => {
  const { modalClose, modalKey } = useModalStore();
  const { authData } = useAuth();

  return (
    <Modal isOpen={modalKey === ProfileMoreOptionsModalKey} onOpenChange={modalClose} hideCloseButton={true}>
      <ModalContent>
        {(onClose) => {
          const listOptionItem = authData?.role === true ? UserAdminMoreOptions : UserNotMeMoreOptions;
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

export default ProfileMoreOptions;
