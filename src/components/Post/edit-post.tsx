import { useModalStore } from "@/stores/modal-store";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { EmojiLookBottomIcon } from "@/icons";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Input } from "../ui/input";
import UserProfileInfo from "../user-profile-info";
import { MdOutlinePublic } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { Form, useForm } from "react-hook-form";
import { EditPostFormValidate, EditPostFormValidateSchema } from "./edit-post-form.validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { PostEditParams, PostResponse, postEdit } from "@/api/post";
import { toast } from "sonner";
import { AuthVerifyResponse, authKey } from "@/api/auth";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const EditPostModalKey = "EditPost";

const EditPost = () => {
  const { modalClose, modalKey, modalData } = useModalStore();
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
            <ModalHeader className="flex justify-between items-center my-[-5px]">
              <button onClick={onClose} className="cursor-pointer font-normal text-sm ">
                Cancel
              </button>
              <div className="text-lg font-medium">Edit info</div>
              <div className="cursor-pointer text-sky-500 text-sm font-medium hover:text-sky-700 dark:hover:text-white disabled:cursor-not-allowed  dark:disabled:text-slate-500 disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:disabled:hover:text-slate-500">
                <button type="submit" form="editPostForm" className="border-none">
                  Done
                </button>
              </div>
            </ModalHeader>
            <Divider />
            <ModalBody>
              <div className="flex flex-row mt-[-7px] ml-[-25px]">
                <div className="w-3/5">
                  <div className="relative overflow-hidden h-[500px] max-w-sm lg:max-w-lg w-full ">
                    <Image src={modalData.post_files?.[0].url} alt="Post preview" fill className=" object-cover" />
                  </div>
                </div>
                <Divider orientation="vertical" />
                <div>
                  <div className="flex flex-col">
                    <div className="flex items-center mx-4 my-4 gap-3">
                      <UserProfileInfo
                        username={modalData.user.username}
                        full_name={""}
                        isShowFullName={false}
                        className="w-7 h-7"
                        avatar={modalData.user.avatar}
                        is_admin={false}
                      />
                    </div>

                    <div className="relative">
                      <span className="absolute left-2 bottom-2 text-lg ">
                        <EmojiLookBottomIcon className="w-5 h-5 cursor-pointer" />
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
                  <div className="flex flex-col">
                    <Accordion type="single" collapsible className="w-full mx-3">
                      <AccordionItem value="item1">
                        <AccordionTrigger className="font-semibold text-sm">Privacy</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-3">
                            <RadioGroup>
                              <div className="flex justify-between items-center">
                                <div className="flex space-x-2 items-center">
                                  <MdOutlinePublic size={20} />
                                  <div className="flex flex-col items-start">
                                    <div className="font-semibold">Public</div>
                                    <span className="text-xs text-gray-500">No matter who is on or off Outstagram</span>
                                  </div>
                                </div>
                                <Radio value="0"></Radio>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex space-x-2 items-center">
                                  <FaLock size={20} />
                                  <div className="flex flex-col items-start">
                                    <div className="font-semibold">Private</div>
                                    <span className="text-xs text-gray-500">Only me</span>
                                  </div>
                                </div>
                                <Radio value="2"></Radio>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex space-x-2 items-center">
                                  <FaUserFriends size={20} />
                                  <div className="flex flex-col items-start">
                                    <div className="font-semibold">Friend</div>
                                    <span className="text-xs text-gray-500">Your friends on Outstagram</span>
                                  </div>
                                </div>
                                <Radio value="1"></Radio>
                              </div>
                            </RadioGroup>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="flex flex-col">
                      <Accordion type="single" collapsible className="w-full mx-3">
                        <AccordionItem value="item2">
                          <AccordionTrigger className="font-semibold text-sm">Accessibility</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-gray-500 text-[12px]">
                              Alt text describes your photos for people with visual <br /> impairments. Alt text will be
                              automatically created for <br /> your photos or you can choose to write your own.
                            </p>
                            <div className="flex flex-row items-center">
                              <div className="relative overflow-hidden h-10 w-10 mx-3 my-3">
                                <Image
                                  src={modalData.post_files?.[0].url}
                                  alt="Post preview"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <Input className="w-52 h-12 shadow-none" />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
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
