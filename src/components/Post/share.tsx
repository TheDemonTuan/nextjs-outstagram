import { useModalStore } from "@/stores/modal-store";
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

export const SharedModalKey = "Share";

const Share = () => {
  const { modalClose, modalKey } = useModalStore();

  return (
    <>
      <Modal
        size="lg"
        isOpen={modalKey === SharedModalKey}
        onOpenChange={modalClose}
        hideCloseButton={false}
        backdrop="opaque"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1">
                Share
              </ModalHeader>
              <Divider />

              <div className="flex flex-row my-2 mx-5">
                <div className="text-black font-semibold text-base">To : </div>
                <div>
                  <input
                    type="text"
                    className="bg-white focus:outline-none mx-2 text-sm"
                  />
                </div>
              </div>

              <Divider />

              <ModalBody>
                <div className="flex flex-col ">
                  <div className="text-black text-sm font-semibold">
                    Suggested
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row my-2 mt-4 items-center">
                      <div>
                        <Avatar
                          src="https://i.pinimg.com/236x/5d/19/8e/5d198e7c77d142e70782c0db2316a00d.jpg"
                          className="w-11 h-11"
                        />
                      </div>
                      <div className="ml-2 flex flex-col ">
                        <div className="text-black font-normal text-sm">
                          Full name
                        </div>
                        <div className="text-gray-500 font-normal text-xs">
                          User name
                        </div>
                      </div>
                    </div>
                    <div>
                      <Checkbox defaultSelected radius="full" />
                    </div>
                  </div>

                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row my-2 mt-4 items-center">
                      <div>
                        <Avatar
                          src="https://i.pinimg.com/236x/5d/19/8e/5d198e7c77d142e70782c0db2316a00d.jpg"
                          className="w-11 h-11"
                        />
                      </div>
                      <div className="ml-2 flex flex-col ">
                        <div className="text-black font-normal text-sm">
                          Full name
                        </div>
                        <div className="text-gray-500 font-normal text-xs">
                          User name
                        </div>
                      </div>
                    </div>
                    <div>
                      <Checkbox defaultSelected radius="full" />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <Divider />
              <ModalFooter>
                <div className="w-full">
                  <Button color="primary" className="w-full">
                    Send
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Share;
