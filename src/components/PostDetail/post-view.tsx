"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogOverlay } from "../ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import MiniPost from "./mini-post";
import Comment from "./comment";
import CommentForm from "./comment-form";
import { PiDotsThreeBold } from "react-icons/pi";
import Image from "next/image";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import { useModalStore } from "@/stores/modal-store";
import PostMoreOptions, { PostMoreOptionsModalKey } from "../Post/post-more-options";
import Likes, { LikesModalKey } from "../Post/likes";
import { formatDistanceToNow } from "date-fns";
import { PostByPostIdQuery } from "@/gql/graphql";
import UserProfileInfo from "../user-profile-info";
import { Card, Modal, ModalBody, ModalContent, Tooltip } from "@nextui-org/react";
import PostReact from "../Post/post-react";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import Carousel from "../Post/carousel";
import SummaryProfile from "../summary-profile";
import { UserResponse } from "@/api/user";
import Link from "next/link";

function PostView({ post }: { post: PostByPostIdQuery["postByPostId"] }) {
  const { modalOpen, setModalData } = useModalStore();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, post_comments, post_likes } = post;

  return (
    <>
      <Modal
        isOpen={true}
        className="max-w-6xl rounded-sm"
        onOpenChange={(open: boolean) => !open && router.back()}
        defaultOpen={true}>
        <ModalContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-full max-h-[300px] lg:max-h-[500px] xl:max-h-[700px]">
          <Card className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-lg rounded-md">
            <div className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-3.5 pl-3.5 pr-5 justify-between">
              <Tooltip content={user && <SummaryProfile user={user as UserResponse} />} placement="bottom-start">
                <div className="flex flex-row items-center gap-3 px-1">
                  <UserProfileInfo
                    username={user?.username || ""}
                    full_name={""}
                    isShowFullName={false}
                    className="w-8 h-8"
                    avatar={getUserAvatarURL(user?.avatar)}
                    is_admin={user?.role ?? false}
                  />
                </div>
              </Tooltip>
              <span
                onClick={() => {
                  setModalData(post);
                  modalOpen(PostMoreOptionsModalKey);
                }}>
                <PiDotsThreeBold className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
              </span>
            </div>

            <div className="hidden md:inline border-b py-1.5 px-1  overflow-y-auto h-[500px]">
              <MiniPost post={post} />
              <div className="flex flex-col">
                <Comment comments={post_comments} />
              </div>
            </div>

            <div className="px-5 py-4 hidden md:block mt-auto border-b p-2.5 space-y-3">
              <PostReact postID={post.id} isLiked />
              <div className="flex flex-col space-y-1">
                {post_likes && post_likes.length > 0 ? (
                  <span className="font-semibold text-sm cursor-pointer" onClick={() => modalOpen(LikesModalKey)}>
                    {post_likes.length} likes
                  </span>
                ) : (
                  <div className="mt-1"></div>
                )}

                <span
                  className="text-xs text-gray-500 cursor-pointer active:text-gray-300"
                  onClick={() => window.location.reload()}>
                  {" "}
                  {formatDistanceToNow(post.created_at, {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
            <CommentForm postId={post.id} />
          </Card>
          <Card className="relative h-full max-h-[300px] lg:max-h-[500px] xl:max-h-[700px] max-w-3xl w-full flex justify-center items-center bg-black rounded-none">
            {post?.post_files?.length ? (
              <Carousel
                slides={post.post_files.map((file) => {
                  return {
                    id: file?.id ?? "",
                    url: file?.url ?? "",
                    type: file?.type === "1" ? 1 : 0,
                    className: "max-h-[300px] lg:max-h-[500px] xl:max-h-[700px] w-full object-cover",
                  };
                })}
              />
            ) : null}
          </Card>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PostView;
