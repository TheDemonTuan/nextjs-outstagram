import { useModalStore } from "@/stores/modal-store";
import { Avatar, Button, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import React from "react";

export const LikesModalKey = "PostLikes";

const PostLikes = () => {
  const { modalClose, modalKey } = useModalStore();
  return (
    <>
      <Modal size="md" isOpen={modalKey === LikesModalKey} onOpenChange={modalClose} scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center my-[-5px] text-base">Likes</ModalHeader>
              <Divider />
              <ModalBody className="flex flex-col max-h-80">
                <div className="flex flex-row space-y-2 cursor-pointer justify-between">
                  <div className="flex items-center">
                    <div>
                      <Avatar
                        src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600"
                        className="w-11 h-11"
                      />
                    </div>
                    <div className="flex flex-col mx-2 ">
                      <div className="text-sm font-bold">ilmimohamm</div>
                      <div className="text-xs font-normal text-gray-500"> md Zain Ali 308</div>
                    </div>
                  </div>
                  <div className="">
                    <Button size="sm" className="bg-neutral-200 hover:bg-neutral-300 font-semibold text-sm px-4">
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="flex flex-row space-y-2 cursor-pointer justify-between">
                  <div className="flex items-center">
                    <div>
                      <Avatar
                        src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600"
                        className="w-11 h-11"
                      />
                    </div>
                    <div className="flex flex-col mx-2 ">
                      <div className="text-sm font-bold">ilmimohamm</div>
                      <div className="text-xs font-normal text-gray-500"> md Zain Ali 308</div>
                    </div>
                  </div>
                  <div className="">
                    <Button size="sm" className="bg-neutral-200 hover:bg-neutral-300 font-semibold text-sm px-4">
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="flex flex-row space-y-2 cursor-pointer justify-between">
                  <div className="flex items-center">
                    <div>
                      <Avatar
                        src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600"
                        className="w-11 h-11"
                      />
                    </div>
                    <div className="flex flex-col mx-2 ">
                      <div className="text-sm font-bold">ilmimohamm</div>
                      <div className="text-xs font-normal text-gray-500"> md Zain Ali 308</div>
                    </div>
                  </div>
                  <div className="">
                    <Button size="sm" className="bg-neutral-200 hover:bg-neutral-300 font-semibold text-sm px-4">
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="flex flex-row space-y-2 cursor-pointer justify-between">
                  <div className="flex items-center">
                    <div>
                      <Avatar
                        src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600"
                        className="w-11 h-11"
                      />
                    </div>
                    <div className="flex flex-col mx-2 ">
                      <div className="text-sm font-bold">ilmimohamm</div>
                      <div className="text-xs font-normal text-gray-500"> md Zain Ali 308</div>
                    </div>
                  </div>
                  <div className="">
                    <Button size="sm" className="bg-neutral-200 hover:bg-neutral-300 font-semibold text-sm px-4">
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="flex flex-row space-y-2 cursor-pointer justify-between">
                  <div className="flex items-center">
                    <div>
                      <Avatar
                        src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600"
                        className="w-11 h-11"
                      />
                    </div>
                    <div className="flex flex-col mx-2 ">
                      <div className="text-sm font-bold">ilmimohamm</div>
                      <div className="text-xs font-normal text-gray-500"> md Zain Ali 308</div>
                    </div>
                  </div>
                  <div className="">
                    <Button size="sm" className="bg-neutral-200 hover:bg-neutral-300 font-semibold text-sm px-4">
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="flex flex-row space-y-2 cursor-pointer justify-between">
                  <div className="flex items-center">
                    <div>
                      <Avatar
                        src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600"
                        className="w-11 h-11"
                      />
                    </div>
                    <div className="flex flex-col mx-2 ">
                      <div className="text-sm font-bold">ilmimohamm</div>
                      <div className="text-xs font-normal text-gray-500"> md Zain Ali 308</div>
                    </div>
                  </div>
                  <div className="">
                    <Button size="sm" className="bg-neutral-200 hover:bg-neutral-300 font-semibold text-sm px-4">
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="mt-1"></div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostLikes;
