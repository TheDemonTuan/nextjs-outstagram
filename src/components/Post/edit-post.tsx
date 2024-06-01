import { useModalStore } from "@/stores/modal-store";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { EmojiLookBottomIcon } from "@/icons";
import { IoIosArrowUp } from "react-icons/io";
import { Input } from "../ui/input";

export const EditPostModalKey = "EditPost";

const EditPost = () => {
  const { modalClose, modalKey } = useModalStore();
  const [text, setText] = useState("");
  const maxLength = 2200;

  const handleChange = (event: any) => {
    const { value } = event.target;
    setText(value);
  };

  return (
    <Modal isOpen={modalKey === EditPostModalKey} onOpenChange={modalClose} hideCloseButton={true} size="3xl">
      <ModalContent className="h-[550px]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row justify-between items-center my-[-5px]">
              <button onClick={onClose} className="cursor-pointer font-normal text-sm ">
                Cancel
              </button>
              <div className="text-lg font-medium">Edit info</div>
              <div className="cursor-pointer text-sky-500 text-sm font-medium hover:text-sky-700 dark:hover:text-white disabled:cursor-not-allowed  dark:disabled:text-slate-500 disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:disabled:hover:text-slate-500">
                Done
              </div>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <div className="flex flex-row mt-[-7px] ml-[-25px]">
                <div className="w-3/5">
                  <div className="relative overflow-hidden h-[500px] max-w-sm lg:max-w-lg w-full ">
                    <Image
                      src="https://res.cloudinary.com/dsjzxokur/image/upload/v1716491951/posts/dl8e3rk8btbfmenpkr1z.webp"
                      alt="Post preview"
                      fill
                      className=" object-cover"
                    />
                  </div>
                </div>
                <Divider orientation="vertical" />
                <div>
                  <div className="flex flex-col">
                    <Link className="font-semibold text-[12px] leading-[18px]" href="/">
                      <div className="flex flex-row items-center mx-4 my-4 ">
                        <Avatar
                          src="https://images.pexels.com/photos/1042423/pexels-photo-1042423.jpeg?auto=compress&cs=tinysrgb&w=600"
                          className="w-7 h-7 object-cover "
                        />
                        <div className="mx-2">
                          <span>PostUsername</span>
                        </div>
                      </div>
                    </Link>
                    <div className="relative">
                      <span className="absolute left-2 bottom-2 text-lg ">
                        <EmojiLookBottomIcon className="w-5 h-5" />
                      </span>
                      <textarea
                        className="shadow-none bg-white w-72 mx-4 mr-[-10px] max-h-[170px] h-[170px] border-none focus:outline-none text-sm"
                        placeholder="Write a caption..."
                        maxLength={maxLength}
                        value={text}
                        onChange={handleChange}
                      />
                      <div className="absolute right-2 bottom-2 text-xs text-gray-500">
                        {text.length}/{maxLength}
                      </div>
                    </div>
                  </div>{" "}
                  <Divider />
                  <div className="flex flex-col ">
                    <div className="flex flex-row items-center justify-between my-4">
                      <span className="mx-4 font-semibold text-sm">Accessibility</span>
                      <IoIosArrowUp size={18} />
                    </div>
                    <div>
                      <p className=" text-gray-500 text-[11px] mx-4">
                        Alt text describes your photos for people with visual <br /> impairments. Alt text will be
                        automatically created for <br /> your photos or you can choose to write your own.
                      </p>
                    </div>
                    <div className="flex flex-row items-center">
                      <div className="relative overflow-hidden h-12 w-12 mx-4 my-4  ">
                        <Image
                          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1716491951/posts/dl8e3rk8btbfmenpkr1z.webp"
                          alt="Post preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Input className="w-52 h-12 shadow-none" />
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditPost;
