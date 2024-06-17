"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogOverlay } from "../ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import MiniPost from "./mini-post";
import Comment from "./comment";
import ViewPost from "./view-post";
import PostActions from "./post-actions";
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
import { Tooltip } from "@nextui-org/react";

function PostView({ id, post }: { id: string; post: PostByPostIdQuery["postByPostId"] }) {
  const { modalOpen, setModalData } = useModalStore();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const username = post.user_id;

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={(open: boolean) => !open && router.back()}>
      <DialogContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-full max-h-[300px] lg:max-h-[500px] xl:max-h-[700px]">
        <div className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-lg">
          <div className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-3.5 pl-3.5 pr-6 justify-between">
            <Tooltip>
              <div className="flex flex-row items-center gap-3">
                <UserProfileInfo
                  username={username || ""}
                  full_name={""}
                  isShowFullName={false}
                  className="w-8 h-8"
                  avatar="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg"
                  is_admin={false}
                />
              </div>
            </Tooltip>
            <span
              onClick={() => {
                setModalData(post);
                modalOpen(PostMoreOptionsModalKey);
              }}>
              <PiDotsThreeBold className="w-6 h-6 hover:stroke-gray115 cursor-pointer mx-5" stroke="#262626" />
            </span>
          </div>

          <ScrollArea className="hidden md:inline border-b py-1.5">
            <MiniPost post={post} />
            <div className="flex flex-col">
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
            </div>
          </ScrollArea>
          <ViewPost className="hidden md:flex border-b" />

          <div className="px-2 hidden md:block mt-auto border-b p-2.5">
            <PostActions inputRef={inputRef} />
            <div className="flex flex-col">
              <span className="font-semibold text-sm cursor-pointer" onClick={() => modalOpen(LikesModalKey)}>
                1 likes
              </span>

              <span className="text-xs text-gray-500">
                {" "}
                {formatDistanceToNow(post.created_at, {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          <CommentForm postId={id} className="hidden md:inline-flex" inputRef={inputRef} />
        </div>
        <div className="relative overflow-hidden h-full max-h-[300px] lg:max-h-[500px] xl:max-h-[700px] max-w-2xl w-full ">
          <Image
            src="https://res.cloudinary.com/dsjzxokur/image/upload/v1717240756/posts/rpw1xrecy7viw0znosas.webp"
            fill
            objectFit="cover"
            alt="Post Image"
            className="md:rounded-l-md object-cover"
          />
        </div>
        <PostActions className="md:hidden border-b p-2.5" />
        <CommentForm postId={id} className="md:hidden" inputRef={inputRef} />
        <ViewPost className="md:hidden" />
      </DialogContent>
    </Dialog>
  );
}

export default PostView;
