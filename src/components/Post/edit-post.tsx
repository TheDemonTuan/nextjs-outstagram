import { useModalStore } from "@/stores/modal-store";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Spinner,
  Switch,
  Textarea,
  modal,
} from "@nextui-org/react";
import Image from "next/image";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { EmojiLookBottomIcon, VerifiedIcon } from "@/icons";
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
import { PostEditParams, PostPrivacy, PostResponse, postEdit, postKey } from "@/api/post";
import { toast } from "sonner";
import { AuthVerifyResponse, authKey } from "@/api/auth";

import { ScrollArea } from "../ui/scroll-area";
import Carousel from "./carousel";
import TextareaAutosize from "react-textarea-autosize";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useAuth } from "@/hooks/useAuth";
import { PostHomePage } from "@/graphql/post";
import { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import dynamic from "next/dynamic";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";

export const EditPostModalKey = "EditPost";
const maxLength = 2200;

interface PostFile {
  id: string;
  url: string;
  type: string;
}

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const EditPost = () => {
  const { modalClose, modalKey, modalData } = useModalStore();

  const queryClient = useQueryClient();
  const { authData } = useAuth();

  const editForm = useForm<EditPostFormValidate>({
    resolver: zodResolver(EditPostFormValidateSchema),
    defaultValues: {
      caption: "",
      privacy: PostPrivacy.PUBLIC.toString(),
    },
  });

  useEffect(() => {
    if (modalData) {
      const { caption, privacy } = modalData;
      const privacyValue =
        privacy === PostPrivacy.PUBLIC ? "0" : PostPrivacy.FRIEND === 1 ? "1" : PostPrivacy.PRIVATE === 2 ? "2" : "0";

      editForm.reset({
        ...editForm.getValues(),
        caption: caption,
        privacy: privacyValue,
      });
    }
  }, [editForm, modalData]);

  const { mutate: postEditMutate, isPending: postEditIsLoading } = useMutation<
    ApiSuccessResponse<PostResponse>,
    ApiErrorResponse,
    PostEditParams
  >({
    mutationFn: async (data) => await postEdit(data, modalData.id),
    onSuccess: (editPostData) => {
      const fakeData = {
        ...editPostData.data,
        user: {
          ...authData,
        },
      };

      if (!!queryClient.getQueryData([postKey, "home"])) {
        queryClient.setQueryData([postKey, "home"], (oldData: any) => {
          return {
            ...oldData,
            pages: [
              ...oldData.pages.map((page: any, index: any) => {
                return {
                  postHomePage: [
                    ...page.postHomePage.map((post: any) => {
                      if (post.id === modalData.id) {
                        return {
                          ...post,
                          privacy: fakeData.privacy,
                          caption: fakeData.caption,
                        };
                      }
                      return post;
                    }),
                  ],
                };
              }),
            ],
          };
        });
      }

      if (!!queryClient.getQueryData([postKey, "reels"])) {
        queryClient.setQueryData([postKey, "reels"], (oldData: any) => {
          return {
            ...oldData,
            pages: [
              ...oldData.pages.map((page: any, index: any) => {
                return {
                  postReel: [
                    ...page.postReel.map((post: any) => {
                      if (post.id === modalData.id) {
                        return {
                          ...post,
                          privacy: fakeData.privacy,
                          caption: fakeData.caption,
                        };
                      }
                      return post;
                    }),
                  ],
                };
              }),
            ],
          };
        });
      }

      if (!!queryClient.getQueryData([postKey, { id: modalData.id }])) {
        queryClient.setQueryData([postKey, { id: modalData.id }], (oldData: any) => {
          return {
            ...oldData,
            postByPostId: {
              ...oldData.postByPostId,
              privacy: fakeData.privacy,
              caption: fakeData.caption,
            },
          };
        });
      }

      toast.success("Post updated successfully!");
      editForm.reset();
      handleCloseModal();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Post update failed!");
    },
  });

  const slides = useMemo(() => {
    return modalData?.post_files?.map((file: PostFile) => ({
      id: file?.id ?? "",
      url: file?.url ?? "",
      className: "rounded-sm max-h-[500px] min-h-[240px] w-full object-contain",
    }));
  }, [modalData.post_files]);

  if (!modalData) {
    return null;
  }
  const onSubmit = async (data: EditPostFormValidate) => {
    postEditMutate({
      caption: data.caption,
      privacy: parseInt(data.privacy),
    });
  };

  const handleCloseModal = () => {
    editForm.reset();
    modalClose();
  };

  return (
    <Modal
      isOpen={modalKey === EditPostModalKey}
      onOpenChange={handleCloseModal}
      hideCloseButton={true}
      isDismissable={!postEditIsLoading}
      size="3xl">
      <ModalContent className="h-[545px] scrollbar-hide">
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
                <div className="relative overflow-hidden h-[500px] max-w-sm lg:max-w-lg w-3/5 flex justify-center items-center bg-black">
                  <Carousel slides={slides} type={modalData?.type} />
                </div>

                <Divider orientation="vertical" />
                <Form {...editForm}>
                  <form onSubmit={editForm.handleSubmit(onSubmit)} id="editFormID" className="w-2/5 flex flex-col">
                    <div className="flex items-center mx-3 my-4 gap-3">
                      <Avatar className="w-7 h-7 cursor-default">
                        <AvatarImage className="object-cover" src={getUserAvatarURL(modalData.user.avatar)} />
                        <AvatarFallback>
                          <Spinner size="sm" />
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex items-center space-x-1 cursor-text">
                        <span className="font-semibold text-sm">{modalData.user.username}</span>
                        {modalData.user.role && <VerifiedIcon className="w-3 h-3" />}
                      </div>
                    </div>
                    <FormField
                      control={editForm.control}
                      name="caption"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <>
                              <TextareaAutosize
                                {...field}
                                className="shadow-none bg-white w-72 mx-4 max-h-[170px] h-[170px] border-none focus:outline-none text-sm resize-none"
                                placeholder="Write a caption..."
                                maxLength={maxLength}
                                minRows={7}
                                maxRows={7}
                                autoFocus
                                required
                              />
                            </>
                          </FormControl>

                          <div className="flex items-center justify-between px-4 py-2">
                            <Popover placement="bottom-end" showArrow>
                              <PopoverTrigger>
                                <div>
                                  <EmojiLookBottomIcon className="text-lg  w-5 h-5 cursor-pointer" />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="p-0">
                                <Picker
                                  lazyLoadEmojis
                                  emojiVersion="5.0"
                                  onEmojiClick={(e) => {
                                    editForm.setValue("caption", editForm.getValues("caption") + e.emoji);
                                  }}
                                  emojiStyle={EmojiStyle.FACEBOOK}
                                  width={350}
                                  height={350}
                                />
                              </PopoverContent>
                            </Popover>

                            <span className="bottom-2 right-2 text-xs">{field.value?.length} / 2200</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />{" "}
                    <Divider />
                    <div className="h-[250px] overflow-y-auto">
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
                                    <RadioGroup
                                      {...field}
                                      defaultValue={field.value}
                                      onValueChange={(value) => field.onChange(value)}>
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
                                        <Radio value={PostPrivacy.PUBLIC.toString()} />
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <div className="flex space-x-2 items-center">
                                          <FaUserFriends size={20} />
                                          <div className="flex flex-col items-start">
                                            <div className="font-semibold">Friend</div>
                                            <span className="text-xs text-gray-500">Your friends on Outstagram</span>
                                          </div>
                                        </div>
                                        <Radio value={PostPrivacy.FRIEND.toString()} />
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <div className="flex space-x-2 items-center">
                                          <FaLock size={20} />
                                          <div className="flex flex-col items-start">
                                            <div className="font-semibold">Private</div>
                                            <span className="text-xs text-gray-500">Only me</span>
                                          </div>
                                        </div>
                                        <Radio value={PostPrivacy.PRIVATE.toString()} />
                                      </div>
                                    </RadioGroup>
                                  )}
                                />
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
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
