"use client";
import { useModalStore } from "@/stores/modal-store";
import { Link, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import React from "react";

export const MoreOptionsProfileAdminModalKey = "MoreOptions";
const MoreOptionsProfileAdmin = () => {
  const { modalClose, modalKey } = useModalStore();
  return (
    <Modal isOpen={modalKey === MoreOptionsProfileAdminModalKey} onOpenChange={modalClose} hideCloseButton={true}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="mt-3 mb-3 cursor-pointer items-center">
              <Link href="/">
                <p className="text-danger font-bold">Ban account</p>
              </Link>
              <hr className="w-full border-gray-300" />
              <Link href="/">
                <p className="text-danger font-bold">Delete account</p>
              </Link>
              <hr className="w-full border-gray-300" />
              <Link onPress={onClose}>
                <p className="text-black">Cancel</p>
              </Link>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MoreOptionsProfileAdmin;
