import { useModalStore } from "@/stores/modal-store";
import { Button, Checkbox, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const NewMessageModalKey = "NewMessage";
const NewMessage = () => {
  const { modalClose, modalKey } = useModalStore();
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };
  return (
    <>
      <Modal
        size="xl"
        className="h-[480px]"
        isOpen={modalKey === NewMessageModalKey}
        onClose={modalClose}
        scrollBehavior="inside"
        hideCloseButton={false}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold items-center text-lg">New Message</ModalHeader>
              <div className="border-y py-2 px-4 flex items-center space-x-5">
                <span className="font-semibold text-base">To:</span>

                <input
                  className="focus:outline-none  text-[14px] leading-[18px] w-full"
                  type="text"
                  placeholder="Search..."
                />
              </div>

              <ModalBody>
                <div className="flex flex-col my-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-11 h-11">
                        <AvatarImage src="https://images.pexels.com/photos/1020016/pexels-photo-1020016.jpeg?auto=compress&cs=tinysrgb&w=600" />
                        <AvatarFallback>
                          {" "}
                          <Spinner size="sm" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="text-base">Username</div>
                        <div className="text-[14px] leading-[18px] text-[#737373]">Username</div>
                      </div>
                    </div>

                    <Checkbox defaultSelected radius="full" color="default" size="lg"></Checkbox>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="px-4">
                <Button className="w-full bg-[#0095F6] font-bold text-white py-5" radius="sm">
                  Chat
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewMessage;
