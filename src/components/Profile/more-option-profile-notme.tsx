"use client";
import { useModalStore } from "@/stores/modal-store";
import { Link, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import React from "react";

export const MoreOptionsProfileNotMeModalKey = "MoreOptions";
const MoreOptionsProfileNotMe = () => {
  const { modalClose, modalKey } = useModalStore();
  return (
    <Modal isOpen={modalKey === MoreOptionsProfileNotMeModalKey} onOpenChange={modalClose} hideCloseButton={true}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="mt-3 mb-3 cursor-pointer items-center">
              <Link href="/">
                <p className="text-danger font-bold">Block</p>
              </Link>
              <hr className="w-full border-gray-300" />
              <Link href="/">
                <p className="text-danger font-bold">Restrict</p>
              </Link>
              <hr className="w-full border-gray-300" />
              <Link href="/">
                <p className="text-danger font-bold">Report</p>
              </Link>
              <hr className="w-full border-gray-300" />
              <Link href="/">
                <p className="text-black">Share to...</p>
              </Link>
              <hr className="w-full border-gray-300" />
              <Link href="/">
                <p className="text-black">Embed</p>
              </Link>
              <hr className="w-full border-gray-300" />
              <Link href="/">
                <p className="text-black">About this account</p>
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

export default MoreOptionsProfileNotMe;
