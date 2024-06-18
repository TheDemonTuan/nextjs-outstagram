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
import React, { Fragment, useEffect, useState } from "react";
import { EmojiLookBottomIcon } from "@/icons";
import { Input } from "../ui/input";
import UserProfileInfo from "../user-profile-info";
import { MdOutlinePublic } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EditPostFormValidate, EditPostFormValidateSchema } from "./edit-post-form.validate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { PostEditParams, PostResponse, postEdit } from "@/api/post";
import { toast } from "sonner";
import { AuthVerifyResponse, authKey } from "@/api/auth";
import { FormControl, FormField, FormItem, Form } from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";
import Carousel from "./carousel";

export const EditPostModalKey = "EditPost";
const maxLength = 2200;

interface PostFile {
  id: string;
  url: string;
  type: string;
}

const EditPost = () => {
  const { modalClose, modalKey, modalData } = useModalStore();

  const queryClient = useQueryClient();

  const editForm = useForm<EditPostFormValidate>({
    resolver: zodResolver(EditPostFormValidateSchema),
    defaultValues: {
      caption: "",
      privacy: "0",
    },
  });

  useEffect(() => {
    if (modalData) {
      const { caption, privacy } = modalData;
      const privacyValue = privacy === 0 ? "0" : privacy === 1 ? "1" : privacy === 2 ? "2" : "0";

      editForm.reset({
        ...editForm.getValues(),
        caption: caption || "",
        privacy: privacyValue,
      });
    }
  }, [modalData]);

  const { mutate: postEditMutate, isPending: postEditIsLoading } = useMutation<
    ApiSuccessResponse<PostResponse>,
    ApiErrorResponse,
    PostEditParams
  >({
    mutationFn: async (data) => await postEdit(data, modalData.id),
    onSuccess: (res) => {
      toast.success("Post updated successfully!");
      // queryClient.setQueryData([authKey], (oldData: ApiSuccessResponse<AuthVerifyResponse>) =>
      //   oldData
      //     ? {
      //         ...oldData,
      //         data: {
      //           user: {
      //             ...oldData.data.user,
      //             // ...res.data,
      //           },
      //         },
      //       }
      //     : oldData
      // );
      editForm.reset();
      modalClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Post update failed!");
    },
  });

  if (!modalData) {
    return null;
  }
  const onSubmit = async (data: EditPostFormValidate) => {
    postEditMutate({
      caption: data.caption,
      privacy: parseInt(data.privacy),
    });
  };

  return (
    <Modal
      isOpen={modalKey === EditPostModalKey}
      onOpenChange={modalClose}
      hideCloseButton={true}
      isDismissable={!postEditIsLoading}
      size="3xl">
      <ModalContent className="h-[545px]">
        {(onClose) => (
          <div
            className={`cursor-pointer items-center p-0  ${postEditIsLoading ? "pointer-events-none opacity-50" : ""}`}>
            <ModalHeader className="flex justify-between items-center p-2 mx-2">
              <button onClick={onClose} className="cursor-pointer font-normal text-sm ">
                Cancel
              </button>
              <div className="text-lg font-medium">Edit info</div>
              <button
                type="submit"
                form="editFormID"
                className="cursor-pointer text-sky-500 text-sm font-medium hover:text-sky-700 dark:hover:text-white disabled:cursor-not-allowed  dark:disabled:text-slate-500 disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:disabled:hover:text-slate-500">
                Done
              </button>
            </ModalHeader>
            <Divider />
            <ModalBody className="p-0">
              <div className="flex">
                <div className="relative overflow-hidden h-[500px] max-w-sm lg:max-w-lg  w-3/5 ">
                  <Carousel
                    slides={modalData.post_files.map((file: PostFile) => {
                      return {
                        id: file?.id ?? "",
                        url: file?.url ?? "",
                        type: file?.type === "1" ? 1 : 0,
                        className: "rounded-sm h-[500px] w-full object-cover",
                      };
                    })}
                  />
                </div>

                <Divider orientation="vertical" />
                <Form {...editForm}>
                  <form onSubmit={editForm.handleSubmit(onSubmit)} id="editFormID">
                    <div className="flex flex-col">
                      <div className="flex items-center mx-3 my-4 gap-3">
                        <UserProfileInfo
                          username={modalData.user.username}
                          full_name={""}
                          isShowFullName={false}
                          className="w-7 h-7"
                          avatar={modalData.user.avatar}
                          is_admin={false}
                        />
                      </div>
                      <FormField
                        control={editForm.control}
                        name="caption"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-2 bottom-2 text-lg ">
                                  <EmojiLookBottomIcon className="w-5 h-5 cursor-pointer" />
                                </span>
                                <textarea
                                  {...field}
                                  className="shadow-none bg-white w-72 mx-4 mr-[-10px] max-h-[170px] h-[170px] border-none focus:outline-none text-sm"
                                  placeholder="Write a caption..."
                                  maxLength={maxLength}
                                />
                                <span className="absolute bottom-3 right-2 text-xs">{field.value?.length} / 2200</span>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />{" "}
                      <Divider />
                      <ScrollArea className="h-[250px] mr-[-7px]">
                        <div className="flex flex-col px-3">
                          <Accordion type="single" collapsible className="w-full ">
                            <AccordionItem value="item1">
                              <AccordionTrigger className="font-semibold text-sm">Privacy</AccordionTrigger>
                              <AccordionContent>
                                <div className="flex flex-col space-y-3">
                                  <FormField
                                    control={editForm.control}
                                    name="privacy"
                                    render={({ field }) => (
                                      <RadioGroup {...field}>
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
                                          <Radio
                                            value="0"
                                            checked={field.value === "0"}
                                            onChange={() => field.onChange("0")}></Radio>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <div className="flex space-x-2 items-center">
                                            <FaLock size={20} />
                                            <div className="flex flex-col items-start">
                                              <div className="font-semibold">Private</div>
                                              <span className="text-xs text-gray-500">Only me</span>
                                            </div>
                                          </div>
                                          <Radio
                                            value="2"
                                            checked={field.value === "2"}
                                            onChange={() => field.onChange("2")}></Radio>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <div className="flex space-x-2 items-center">
                                            <FaUserFriends size={20} />
                                            <div className="flex flex-col items-start">
                                              <div className="font-semibold">Friend</div>
                                              <span className="text-xs text-gray-500">Your friends on Outstagram</span>
                                            </div>
                                          </div>
                                          <Radio
                                            value="1"
                                            checked={field.value === "1"}
                                            onChange={() => field.onChange("1")}></Radio>
                                        </div>
                                      </RadioGroup>
                                    )}
                                  />
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
                                    change this later by going to the <br /> ··· menu at the top of the post. To hide
                                    like counts on
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
                  </form>
                </Form>
              </div>
            </ModalBody>
            {postEditIsLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                <Spinner size="md" />
              </div>
            )}
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditPost;
