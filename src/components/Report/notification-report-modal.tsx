import { ReportTickIcon } from "@/icons";
import { useModalStore } from "@/stores/modal-store";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import React from "react";

export const NotificationReportModalKey = "NotificationReportModal";

const NotificationReportModal = () => {
  const { modalClose, modalKey } = useModalStore();

  return (
    <>
      <Modal
        isOpen={modalKey === NotificationReportModalKey}
        onOpenChange={modalClose}
        size="sm"
        hideCloseButton={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col items-center justify-center my-11 text-center">
                <ReportTickIcon />
                <div className="space-y-2 mt-4">
                  <span className="font-semibold">Thanks for letting us know</span>
                  <p className="text-sm text-[#737373]">
                    Your feedback is important in helping us keep the Instagram community safe.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="px-4 border-t-1">
                <Button
                  className="w-full bg-[#0095F6] font-bold text-white py-5"
                  radius="sm"
                  size="sm"
                  onClick={modalClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotificationReportModal;
