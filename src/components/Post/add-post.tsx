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
import { ArrowLeftIcon, EmojiLookBottomIcon, VerifiedIcon } from "@/icons";
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
import TextareaAutosize from "react-textarea-autosize";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import dynamic from "next/dynamic";
import { EmojiClickData } from "emoji-picker-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import SelectPhotoModal, { SelectPhotoModalKey } from "./select-photo";
import ConfirmDiscardPost, { ConfirmDiscardPostModalKey } from "./confirm-discard-post";

export const AddPostModalKey = "AddPost";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const AddPostModal = ({ onResetModalSelectPhoto }: { onResetModalSelectPhoto: () => void }) => {
  const { modalClose, modalKey, modalData, modalOpen, setModalData } = useModalStore();
  const { authData } = useAuth();
  const queryClient = useQueryClient();
  // const captionRef = useRef<HTMLTextAreaElement>(null);
  const [caption, setCaption] = useState("");
  const [charCount, setCharCount] = useState(0);

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
      onResetModalSelectPhoto();
      setModalData([]);
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
    // formData.append("caption", captionRef.current?.value || "");
    formData.append("caption", caption || "");
    createMutate(formData);
  };

  const handleEmojiClick = (e: EmojiClickData) => {
    setCaption(caption + e.emoji);
    setCharCount(caption.length + e.emoji.length);

    console.log("check emoji");
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
    setCharCount(e.target.value.length);
  };

  const isImage = modalData?.selectedFiles?.some((file: File) => file.type.startsWith("image/")) ?? false;

  const handleResetModalSelectPhoto = () => {
    setModalData([]);
    onResetModalSelectPhoto();
    modalClose();
  };

  return (
    <>
      <Modal
        isOpen={modalKey === AddPostModalKey}
        onOpenChange={() => handleResetModalSelectPhoto}
        hideCloseButton={true}
        isDismissable={!createIsPending}
        size="3xl">
        <ModalContent className="h-[545px]">
          {() => (
            <>
              <div
                className={`cursor-pointer items-center p-0 ${
                  createIsPending ? "pointer-events-none opacity-50" : ""
                }`}>
                <ModalHeader className="flex justify-between items-center p-2 mx-2">
                  <button
                    onClick={() => {
                      modalOpen(SelectPhotoModalKey);
                    }}
                    className="cursor-pointe font-normal text-sm ">
                    <ArrowLeftIcon className="w-3 h-3 " />
                  </button>

                  {isImage ? (
                    <span className="text-lg font-medium">Create new post</span>
                  ) : (
                    <div className="text-lg font-medium">New reel</div>
                  )}

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
                          className: "rounded-sm max-h-[500px] min-h-[240px] w-full object-contain",
                        }))}
                      />
                    </div>

                    <Divider orientation="vertical" />

                    <div className="flex flex-col">
                      <div className="flex items-center mx-3 my-4 gap-3">
                        <Avatar className="w-7 h-7 cursor-default">
                          <AvatarImage className="object-cover" src={getUserAvatarURL(authData?.avatar || "")} />
                          <AvatarFallback>
                            <Spinner size="sm" />
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex items-center space-x-1 cursor-text">
                          <span className="font-semibold text-sm">{authData?.username || ""}</span>
                          {authData?.role && <VerifiedIcon className="w-3 h-3" />}
                        </div>
                      </div>

                      <TextareaAutosize
                        className="shadow-none resize-none bg-white w-72 mx-4 mr-[-7px] max-h-[170px] h-[170px] border-none focus:outline-none text-sm"
                        placeholder="Write a caption..."
                        autoFocus
                        maxLength={2200}
                        value={caption}
                        // ref={captionRef}
                        maxRows={7}
                        minRows={7}
                        onChange={handleTextareaChange}
                      />
                      <div className="flex items-center justify-between px-4 py-2">
                        <Popover>
                          <PopoverTrigger>
                            <EmojiLookBottomIcon className="text-lg cursor-pointer w-5 h-5" />
                          </PopoverTrigger>
                          <PopoverContent className="relative w-fit h-fit z-50">
                            <Picker
                              className="absolute z-50 top-0 right-0"
                              lazyLoadEmojis
                              onEmojiClick={(e) => handleEmojiClick(e)}
                            />
                          </PopoverContent>
                        </Popover>
                        <span className="bottom-2 right-2 text-xs">{charCount} / 2200</span>
                      </div>

                      <Divider />
                      <div className="h-[250px] overflow-y-auto mr-[-7px]">
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
                                    change this later by going to the <br /> ··· menu at the top of the post. To hide
                                    like counts on
                                    <br />
                                    other people&apos;s posts, go to your account settings.
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

                            {isImage ? (
                              <span></span>
                            ) : (
                              <span className="text-xs text-neutral-500 my-3 flex">
                                Your followers can see your reel in their feeds and on <br /> your profile.
                              </span>
                            )}
                          </Accordion>
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                {createIsPending &&
                  (isImage ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                      <Spinner size="lg" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                      <Spinner size="lg" color="danger" />
                    </div>
                  ))}
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* <ConfirmDiscardPost onEventCloseModal={handleResetModalSelectPhoto} keyModal={AddPostModalKey} /> */}
    </>
  );
};

export default AddPostModal;
