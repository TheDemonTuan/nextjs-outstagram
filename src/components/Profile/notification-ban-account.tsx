import { useModalStore } from "@/stores/modal-store";
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter, Divider, Button } from "@nextui-org/react";
import React, { Fragment } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLockClosedOutline, IoWarningOutline } from "react-icons/io5";
import { LuBan } from "react-icons/lu";

export const NotificationBanAccountModalKey = "NotificationBanAccount";

const NotificationBanAccount = () => {
  const { modalData, modalClose, modalKey, modalOpen } = useModalStore();

  return (
    <Modal
      isOpen={modalKey === NotificationBanAccountModalKey}
      onOpenChange={modalClose}
      hideCloseButton={true}
      size="xs"
      radius="none">
      <ModalContent className="">
        {() => (
          <>
            <ModalHeader className="flex flex-col text-center space-y-2">
              <p className="text-xl font-bold">
                We assigned your <br /> account on October <br /> 31, 2024
              </p>
              <p className="text-[#737373] text-xs">You have 30 days left to appeal this decision</p>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <span className="font-bold">What does this mean?</span>
              <div className="flex flex-col ml-2 space-y-2">
                <div className="flex items-start space-x-3">
                  <IoWarningOutline size={30} />
                  <div className="text-sm">Your account does not comply with our Community Guidelines.</div>
                </div>
                <div className="flex items-start space-x-3">
                  <LuBan size={30} />
                  <div className="text-sm">
                    If we can&apos;t confirm your account, we&apos;ll permanently disable it.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <IoLockClosedOutline size={30} />
                  <div className="text-sm">
                    This account isn&apos;t visible to everyone on Instagram and you can&apos;t use it.
                  </div>
                </div>
              </div>
            </ModalBody>
            <Divider />
            <ModalFooter className="flex flex-col py-2">
              <span className="font-bold">What can I do?</span>
              <div className="flex items-start ml-2 space-x-3">
                <FaRegCalendarAlt size={30} />
                <div className="text-sm">
                  You still have <span className="font-bold">30 days</span> to appeal this <br /> decision. Let&apos;s
                  follow the instructions to request a reconsideration.
                </div>
              </div>
            </ModalFooter>
            <Divider />
            <ModalFooter className="py-3">
              <Button color="primary" className="w-full text-white text-sm font-semibold" isDisabled radius="sm">
                Protest the decision
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NotificationBanAccount;
