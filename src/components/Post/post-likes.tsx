import { Friend, PostLike } from "@/gql/graphql";
import { useModalStore } from "@/stores/modal-store";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import React, { Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { VerifiedIcon } from "@/icons";
import Link from "next/link";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import SummaryProfile from "../summary-profile";

export const LikesModalKey = "PostLikes";

const PostLikes = () => {
  const { modalData, modalClose, modalKey } = useModalStore();

  return (
    <Modal
      size="sm"
      isOpen={modalKey === LikesModalKey}
      onOpenChange={modalClose}
      scrollBehavior="inside"
      className="h-[400px]">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col items-center my-[-5px] text-base">Likes</ModalHeader>
            <Divider />

            <ModalBody className="flex flex-col max-h-80 my-2">
              {/* <span className="text-gray-500 text-xs text-center">
                siyad_abdali can see the total number of people who liked this post.
              </span> */}

              {modalData?.map((like: PostLike) => (
                <Fragment key={like.id}>
                  <div className="flex space-y-2 cursor-pointer justify-between">
                    <div className="flex items-center">
                      <Tooltip
                        delay={1000}
                        content={
                          like && (
                            <SummaryProfile
                              username={like?.user?.username || ""}
                              full_name={like?.user?.full_name || ""}
                              avatar={like?.user?.avatar || ""}
                              role={like?.user?.role || false}
                              posts={[]}
                              friends={like?.user?.friends as Friend[]}
                            />
                          )
                        }
                        placement="bottom-start"
                        className="rounded-md shadow-lg">
                        <Link href={`/${like?.user?.username}`}>
                          <Avatar className="w-11 h-11">
                            <AvatarImage src={getUserAvatarURL(like?.user?.avatar) || ""} />
                            <AvatarFallback>
                              <Spinner size="sm" />
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                      </Tooltip>
                      <div className="flex flex-col mx-2">
                        <div className="flex items-center space-x-1">
                          <Tooltip
                            delay={1000}
                            content={
                              like && (
                                <SummaryProfile
                                  username={like?.user?.username || ""}
                                  full_name={like?.user?.full_name || ""}
                                  avatar={like?.user?.avatar || ""}
                                  role={like?.user?.role || false}
                                  posts={[]}
                                  friends={like?.user?.friends as Friend[]}
                                />
                              )
                            }
                            placement="bottom-start"
                            className="rounded-md shadow-lg">
                            <Link href={`/${like?.user?.username}`} className="text-sm font-bold">
                              {like?.user?.username || ""}
                            </Link>
                          </Tooltip>
                          {like?.user?.role && <VerifiedIcon className="w-3 h-3" />}
                        </div>
                        <div className="text-xs font-normal text-gray-500">{like?.user?.full_name || ""}</div>
                      </div>
                    </div>
                    <div className="">
                      <Button size="sm" className="bg-neutral-200 hover:bg-neutral-300 font-semibold text-sm px-4">
                        Remove
                      </Button>
                    </div>
                  </div>
                </Fragment>
              ))}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PostLikes;
