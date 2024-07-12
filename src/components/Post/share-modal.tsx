import {
  CPShareIcon,
  EmailShareIcon,
  FacebookShareIcon,
  LinkedinShareIcon,
  MessageFacebookShareIcon,
  PinterestShareIcon,
  QRShareIcon,
  TelegramShareIcon,
  XShareIcon,
} from "@/icons";
import { useModalStore } from "@/stores/modal-store";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  LinkedinShareButton,
  PinterestIcon,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { LiaTelegramPlane } from "react-icons/lia";

export const ShareModalKey = "ShareModal";

const ShareModal = () => {
  const { modalClose, modalKey } = useModalStore();
  return (
    <>
      {" "}
      <Modal
        size="md"
        isOpen={modalKey === ShareModalKey}
        onOpenChange={modalClose}
        hideCloseButton={false}
        backdrop="opaque"
        scrollBehavior="inside">
        <ModalContent className="h-[400px] p-0">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-semibold items-center text-base border-b py-3">
                Share to...
              </ModalHeader>
              <ModalBody className="my-3">
                <div className="space-y-7">
                  <div className="flex items-center space-x-4">
                    <FacebookShareButton url="123">
                      <FacebookShareIcon />
                    </FacebookShareButton>
                    <div>Share to Facebook</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <FacebookMessengerShareButton appId="1217981644879628" url="123">
                      <MessageFacebookShareIcon />
                    </FacebookMessengerShareButton>
                    <div>Share in Message</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <TwitterShareButton url="123">
                      <XShareIcon />
                    </TwitterShareButton>
                    <div>Share to Twitter</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <TelegramShareButton url="">
                      <LiaTelegramPlane size={27} />
                    </TelegramShareButton>
                    <div>Share in Telegram</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <LinkedinShareButton url="123">
                      <LinkedinShareIcon />
                    </LinkedinShareButton>
                    <div>Share to Linkedin</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <PinterestShareIcon>
                      <PinterestShareIcon />
                    </PinterestShareIcon>
                    <div>Share to Pinterest</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <EmailShareButton url="123">
                      <EmailShareIcon />
                    </EmailShareButton>
                    <div>Share via Email</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <QRShareIcon />

                    <div>QR code</div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <CPShareIcon />

                    <div>Copy Link</div>
                  </div>
                  <button onClick={modalClose} className="text-[#00376b] mx-10">
                    Cancel
                  </button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareModal;
