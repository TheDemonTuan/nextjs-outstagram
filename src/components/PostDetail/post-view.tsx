"use client";
import { PostResponse } from "@/api/post";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";
import { ApiSuccessResponse } from "@/lib/http";
import MiniPost from "./mini-post";
import Comment from "./comment";
import ViewPost from "./view-post";
import PostActions from "./post-actions";
import CommentForm from "./comment-form";
import { PiDotsThreeBold } from "react-icons/pi";
import { Button } from "../ui/button";
import Image from "next/image";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import SummaryProfile from "../summary-profile";
import { useModalStore } from "@/stores/modal-store";
import PostMoreOptions, { PostMoreOptionsModalKey } from "../Post/post-more-options";

function PostView({ id, post }: { id: string; post: ApiSuccessResponse<PostResponse> }) {
  const { modalOpen, setModalData } = useModalStore();
  const router = useRouter();
  const pathname = usePathname();
  const isPostModal = pathname === `/p/${id}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const username = post.data.user_id;
  const href = `/${username}`;
  return (
    <Dialog open={isPostModal} onOpenChange={(open: any) => !open && router.back()}>
      <DialogContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-full max-h-[300px] lg:max-h-[500px] xl:max-h-[700px]">
        <div className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-lg">
          <DialogHeader className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-3.5 pl-3.5 pr-6 justify-between">
            <div>
              <HoverCard>
                <HoverCardTrigger>
                  <div className="flex flex-row items-center">
                    <div className="">
                      <Link href={href}>
                        <Avatar
                          src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg"
                          className="w-8 h-8"
                        />
                      </Link>
                    </div>
                    <div className="pl-3.5">
                      <Link href={href} className="font-semibold text-[13px] leading-[18px]">
                        {username}
                      </Link>
                    </div>
                  </div>
                </HoverCardTrigger>
                {/* <SummaryProfile full_name={name} username={usernamepost} avatar={postImageSrc} /> */}
              </HoverCard>
            </div>
            <div>
              <span
                onClick={() => {
                  setModalData(post);
                  modalOpen(PostMoreOptionsModalKey);
                }}>
                <PiDotsThreeBold className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
              </span>
            </div>
          </DialogHeader>

          <PostMoreOptions />

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
            <PostActions />
            <time className="text-[11px]  uppercase text-zinc-500 font-medium">
              {new Date(post.data.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </time>
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
