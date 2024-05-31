"use client";

import React, { Fragment, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookmarkIcon, FileWarningIcon, StarIcon } from "@/icons";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { PostResponse } from "@/api/post";
import { useQueries } from "@tanstack/react-query";
import { userGetByUserID, userKey } from "@/api/user";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Image from "next/image";
import { PiDotsThreeBold } from "react-icons/pi";
import { formatDistanceToNow } from "date-fns";
import { useModalStore } from "@/stores/modal-store";
import PostMoreOptions, { PostMoreOptionsModalKey } from "./post-more-options";
import PostReact from "./post-react";
import Share from "./share";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { HoverCard, HoverCardTrigger } from "../ui/hover-card";
import SummaryProfile from "../summary-profile";

const Post = ({ postData }: { postData: PostResponse[] }) => {
  const { modalOpen, setModalData } = useModalStore();
  const { authData } = useAuth();

  const listUserID = postData.map((post) => post.user_id);

  const userResults = useQueries({
    queries: listUserID.map((id) => ({
      queryKey: [userKey, id],
      queryFn: () => userGetByUserID(id),
    })),
  });

  return (
    <>
      <div className="flex flex-col col-span-2 items-center gap-2">
        {postData.map((post, index) => {
          const userData = userResults.find((result) => result.data?.data?.id === post.user_id)?.data?.data;
          const postLikes = post.post_likes.filter((like) => like.is_liked);
          const isUserLiked = postLikes.some((like) => like.user_id === authData?.id);
          return (
            <Fragment key={post.id}>
              <Card className="w-full max-w-lg overflow-hidden border-transparent bg-transparent shadow-none">
                <CardContent className="p-0">
                  <div className="grid gap-4">
                    <Card className="rounded-none shadow-none border-0">
                      <CardHeader className="p-2 flex flex-row items-center">
                        <div className="flex gap-1 items-center justify-center">
                          <Link className="flex items-center gap-2 text-sm font-medium" href={`/${userData?.username}`}>
                            <Avatar className="w-9 h-9">
                              <AvatarImage className="object-cover" alt={userData?.username} src={getUserAvatarURL(userData?.avatar)} />
                              <AvatarFallback>{userData?.username}</AvatarFallback>
                            </Avatar>
                            {userData?.full_name}
                          </Link>
                          <HoverCard>
                            <HoverCardTrigger>
                              <Link
                                className="flex items-center gap-2 text-sm font-medium"
                                href={`/${userData?.username}`}>
                                <Avatar className="w-9 h-9 border">
                                  <AvatarImage alt={userData?.username} src={getUserAvatarURL(userData?.avatar)} />
                                  <AvatarFallback>{userData?.username}</AvatarFallback>
                                </Avatar>
                                {userData?.full_name}
                              </Link>
                            </HoverCardTrigger>
                            <SummaryProfile
                              full_name={userData?.full_name}
                              username={userData?.username}
                              avatar={getUserAvatarURL(userData?.avatar)}
                            />
                          </HoverCard>
                          <span className="text-xs text-gray-500">
                            •{" "}
                            {formatDistanceToNow(post.updated_at, {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <span
                          className="ml-auto w-8 h-8 rounded-full"
                          onClick={() => {
                            setModalData(post);
                            modalOpen(PostMoreOptionsModalKey);
                          }}>
                          <PiDotsThreeBold className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
                        </span>
                      </CardHeader>
                      <Share />
                      <CardContent className="p-2">
                        {post.post_files.length ? (
                          <div className="slide-container">
                            <ImageGallery
                              items={post.post_files.map((file, index) => {
                                return {
                                  original: file.url,
                                  index,
                                };
                              })}
                              renderItem={(item) => {
                                return (
                                  <div className="image-gallery-image relative">
                                    <Image
                                      src={item.original}
                                      alt={userData?.username + " post image"}
                                      className="object-cover min-w-[468px] max-h-[564] w-full h-full rounded-lg shadow-lg"
                                      width={500}
                                      height={500}
                                      priority
                                    />
                                  </div>
                                );
                              }}
                              showPlayButton={false}
                              showThumbnails={false}
                            />
                          </div>
                        ) : null}
                      </CardContent>
                      <CardFooter className="p-2 pb-4 grid gap-2">
                        <PostReact postID={post.id} isLiked={isUserLiked} />
                        <span className="font-semibold text-sm">{postLikes?.length} likes</span>
                        <div className="py-1 text-sm">
                          <span className="font-bold">{userData?.username}</span>
                          <span className="ml-1">{post.caption}</span>
                        </div>
                        <div className="text-sm w-full grid gap-1.5">
                          <div>
                            <Link className="font-medium" href="#">
                              john
                            </Link>
                            Wow, this photo is absolutely stunning! 😍✨
                          </div>
                          <div>
                            <Link className="font-medium" href="#">
                              amelia
                            </Link>
                            This post just made my day! 😃👍
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              {index === postData.length - 1 ? null : <hr className="w-[512] border-gray-300" />}
            </Fragment>
          );
        })}
      </div>
      <PostMoreOptions />
    </>
  );
};

export default Post;
