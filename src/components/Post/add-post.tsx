import { useModalStore } from "@/stores/modal-store";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Spinner,
  Switch,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import { EmojiLookBottomIcon } from "@/icons";
import UserProfileInfo from "../user-profile-info";
import { MdOutlinePublic } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { PostResponse, postCreate, postKey } from "@/api/post";
import { toast } from "sonner";
import { useRef, useState } from "react";
import Carousel from "./carousel";

export const AddPostModalKey = "AddPost";
const AddPostModal = () => {
  const { modalClose, modalKey, modalData } = useModalStore();
  const { authData } = useAuth();
  const queryClient = useQueryClient();
  const captionRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: createMutate, isPending: createIsPending } = useMutation<
    ApiSuccessResponse<PostResponse>,
    ApiErrorResponse,
    FormData
  >({
    mutationFn: async (params) => await postCreate(params),
    onSuccess: (res) => {
      toast.success("Add new post successfully!");
      queryClient.setQueryData([postKey, "me"], (oldData: ApiSuccessResponse<PostResponse[]>) =>
        oldData ? { ...oldData, data: [res.data, ...oldData.data] } : oldData
      );
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Add new post failed!");
    },
  });

  const handleAddPost = () => {
    const formData = new FormData();
    modalData.selectedFiles.forEach((file: File) => {
      formData.append("files", file);
    });
    formData.append("caption", captionRef.current?.value || "");
    createMutate(formData);
  };

  return (
    <Modal
      isOpen={modalKey === AddPostModalKey}
      onOpenChange={modalClose}
      hideCloseButton={true}
      isDismissable={!createIsPending}
      size="3xl">
      <ModalContent className="h-[545px]">
        {(onClose) => (
          <>
            <div
              className={`cursor-pointer items-center p-0 ${createIsPending ? "pointer-events-none opacity-50" : ""}`}>
              <ModalHeader className="flex justify-between items-center p-2 mx-2">
                <button onClick={onClose} className="cursor-pointer font-normal text-sm ">
                  Cancel
                </button>
                <div className="text-lg font-medium">Create new post</div>
                <button
                  type="button"
                  onClick={handleAddPost}
                  className="cursor-pointer text-sky-500 text-sm font-medium hover:text-sky-700 dark:hover:text-white disabled:cursor-not-allowed  dark:disabled:text-slate-500 disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:disabled:hover:text-slate-500">
                  Share
                </button>
              </ModalHeader>
              <Divider />
              <ModalBody className="p-0">
                <div className="flex">
                  <div className="relative overflow-hidden h-[500px] max-w-sm lg:max-w-lg  w-3/5 justify-center items-center flex bg-black">
                    <Carousel
                      slides={modalData.selectedFiles.map((file: File, index: number) => ({
                        id: index.toString(),
                        url: URL.createObjectURL(file),
                        type: file.type.startsWith("image/") ? 1 : 0,
                        className: "rounded-sm max-h-[500px] min-h-[240px] w-full object-cover",
                      }))}
                    />
                  </div>

                  <Divider orientation="vertical" />

                  <div className="flex flex-col">
                    <div className="flex items-center mx-3 my-4 gap-3">
                      <UserProfileInfo
                        username={authData?.username || ""}
                        full_name={""}
                        isShowFullName={false}
                        className="w-7 h-7"
                        avatar={authData?.avatar || ""}
                        is_admin={authData?.role || false}
                      />
                    </div>

                    <div className="relative">
                      <span className="absolute left-2 bottom-2 text-lg ">
                        <EmojiLookBottomIcon className="w-5 h-5 cursor-pointer" />
                      </span>
                      <textarea
                        className="shadow-none bg-white w-72 mx-4 mr-[-10px] max-h-[170px] h-[170px] border-none focus:outline-none text-sm"
                        placeholder="Write a caption..."
                        maxLength={2200}
                        ref={captionRef}
                      />
                    </div>

                    <Divider />
                    <ScrollArea className="h-[250px] mr-[-7px]">
                      <div className="flex flex-col px-3">
                        <Accordion type="single" collapsible className="w-full ">
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
                                        <span className="text-xs text-gray-500">
                                          No matter who is on or off Outstagram
                                        </span>
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

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item2">
                            <AccordionTrigger className="font-semibold text-sm">Advanced Settings</AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-col ">
                                <div className="flex items-center justify-between ">
                                  <div className="text-base">
                                    Hide like and view counts on
                                    <br /> this post
                                  </div>
                                  <Switch defaultSelected size="sm" />
                                </div>
                                <span className="text-xs text-neutral-500 my-2">
                                  Only you will see the total number of likes and views <br /> on this post. You can
                                  change this later by going to the <br /> ··· menu at the top of the post. To hide like
                                  counts on
                                  <br />
                                  other people's posts, go to your account settings.
                                  <br /> Learn more
                                </span>
                                <div className="flex items-center justify-between mt-3">
                                  <div className="text-base">Turn off commenting</div>
                                  <Switch defaultSelected size="sm" />
                                </div>
                                <span className="text-xs text-neutral-500 my-2">
                                  You can change this later by going to the ··· menu at <br /> the top of your post.
                                </span>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </ModalBody>
              {createIsPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                  <Spinner size="md" />
                </div>
              )}
            </div>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddPostModal;
