"use client";

import React, { Fragment, useState } from "react";
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
import { Button, select } from "@nextui-org/react";
import { PostResponse, postKey } from "@/api/post";
import { useQueries } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { UserResponse, userGetByUserID, userKey } from "@/api/user";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Image from "next/image";
import { PiDotsThreeBold } from "react-icons/pi";
import { formatDistanceToNow } from "date-fns";
import { useModalStore } from "@/stores/modal-store";
import MoreOptions, { MoreOptionsModalKey } from "./more-options";
import { useQuery, gql } from "@apollo/client";
import { useAuth } from "@/hooks/useAuth";
import PostReact from "./post-react";

const postsQuery = gql`
  query Posts_by_user_id($id: String!) {
    posts_by_user_id(id: $id) {
      active
      caption
      created_at
      id
      is_hide_comment
      is_hide_like
      user {
        avatar
        username
      }
      files {
        url
      }
    }
  }
`;

const Post = ({ postData }: { postData: PostResponse[] }) => {
  const { modalOpen } = useModalStore();

  const listUserID = postData.map((post) => post.user_id);

  const userResults = useQueries({
    queries: listUserID.map((id) => ({
      queryKey: [userKey, id],
      queryFn: () => userGetByUserID(id),
    })),
  });

  return (
    <div className="flex flex-col col-span-2 items-center gap-2">
      {postData.map((post, index) => {
        const userData = userResults.find((result) => result.data?.data?.id === post.user_id)?.data?.data;
        return (
          <Fragment key={post.id}>
            <Card className="w-full max-w-lg overflow-hidden border-transparent bg-transparent shadow-none">
              <CardContent className="p-0">
                <div className="grid gap-4">
                  <Card className="rounded-none shadow-none border-0">
                    <CardHeader className="p-4 flex flex-row items-center">
                      <div className="flex gap-1 items-center justify-center">
                        <Link className="flex items-center gap-2 text-sm font-medium" href="#">
                          <Avatar className="w-9 h-9 border">
                            <AvatarImage
                              alt={userData?.username}
                              src={!!userData?.avatar ? userData?.avatar : "/guest-avatar.png"}
                            />
                            <AvatarFallback>{userData?.username}</AvatarFallback>
                          </Avatar>
                          {userData?.full_name}
                        </Link>
                        <span className="text-sm text-gray-500">
                          •{" "}
                          {formatDistanceToNow(post.updated_at, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <MoreOptions />

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="ml-auto w-8 h-8 rounded-full"
                            isIconOnly
                            onClick={() => modalOpen(MoreOptionsModalKey)}
                            variant="light">
                            <PiDotsThreeBold className="w-6 h-6" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <BookmarkIcon className="w-4 h-4 mr-2" />
                            Save
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <StarIcon className="w-4 h-4 mr-2" />
                            Add to favorites
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FileWarningIcon className="w-4 h-4 mr-2" />
                            Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-2">
                      {post.post_images.length ? (
                        <div className="slide-container">
                          <ImageGallery
                            items={post.post_images.map((image, index) => {
                              return {
                                original: image.url,
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
                      <PostReact postID={post.id} isLiked={true} />
                      <span className="font-semibold text-sm">{post.post_likes?.length} likes</span>
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
  );
};

export default Post;
