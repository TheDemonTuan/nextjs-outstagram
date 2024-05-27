import { useModalStore } from "@/stores/modal-store";
import { Input, Link } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

export const OptionChangeAvatarModalKey = "OptionChangeAvatar";

const OptionChangeAvatar = () => {
  const { modalClose, modalKey } = useModalStore();
  return (
    <Modal
      isOpen={modalKey === OptionChangeAvatarModalKey}
      onOpenChange={modalClose}
      hideCloseButton={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="my-3 cursor-pointer items-center">
              <p className="text-black text-lg my-4">Change Profile Photo</p>
              <hr className="w-full border-gray-300" />
              <div>
                <p className="text-sky-500 text-sm font-bold">Upload Photo</p>
              </div>
              <hr className="w-full border-gray-300 " />
              <Link href="/">
                <p className="text-sm font-bold text-red-500">
                  Remove Current Photo
                </p>
              </Link>
              <hr className="w-full border-gray-300" />
              <Link onPress={onClose}>
                <p className="text-black text-sm">Cancel</p>
              </Link>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OptionChangeAvatar;
