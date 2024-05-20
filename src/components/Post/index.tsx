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
import { BookmarkIcon, FileWarningIcon, HeartIcon, MessageCircleIcon, SendIcon, StarIcon } from "@/icons";
import Link from "next/link";
import { Button, select } from "@nextui-org/react";
import { PostResponse, postKey } from "@/api/post";
import { useQueries, useQuery } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { UserResponse, userGetByUserID, userKey } from "@/api/user";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Image from "next/image";
import { PiDotsThreeBold } from "react-icons/pi";
import { formatDistanceToNow } from "date-fns";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

const Post = ({ postData }: { postData: PostResponse[] }) => {
  const listUserID = postData.map((post) => post.user_id);

  const userResults = useQueries({
    queries: listUserID.map((id) => ({
      queryKey: [userKey, id],
      queryFn: () => userGetByUserID(id),
    })),
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                          • {formatDistanceToNow(post.updated_at, { addSuffix: true })}
                        </span>
                      </div>

                      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true} >
                        <ModalContent>
                          {(onClose) => (
                            <>
                              <ModalBody className="mt-3 mb-3 cursor-pointer items-center">
                                <Link href="/">
                                  <p className="text-danger font-bold">
                                    Report
                                  </p>

                                </Link>
                                <hr className="w-full border-gray-300" />
                                <Link href="/">
                                  <p className="text-danger font-bold">
                                    Unfollow
                                  </p>
                                </Link>
                                <hr className="w-full border-gray-300" />
                                <Link href="/">
                                  <p className="text-black">
                                    Add to favorites
                                  </p>
                                </Link>
                                <hr className="w-full border-gray-300" />
                                <Link href="/">
                                  <p className="text-black">
                                    Go to post
                                  </p>
                                </Link>
                                <hr className="w-full border-gray-300" />
                                <Link href="/">
                                  <p className="text-black">
                                    Share to ...
                                  </p>
                                </Link>
                                <hr className="w-full border-gray-300" />
                                <Link href="/">
                                  <p className="text-black">
                                    Copy link
                                  </p>
                                </Link>
                                <hr className="w-full border-gray-300" />
                                <Link href="/" >
                                  <p className="text-black">
                                    Embed
                                  </p>
                                </Link>
                                <hr className="w-full border-gray-300" />
                                <Link href="/" >
                                  <p className="text-black">
                                    About this account
                                  </p>
                                </Link>
                                <hr className="w-full border-gray-300" />
                                <Button variant="light" onPress={onClose}>
                                  <p className="text-black text-base">
                                    Cancel
                                  </p>
                                </Button>

                              </ModalBody>
                            </>
                          )}
                        </ModalContent>
                      </Modal>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="ml-auto w-8 h-8 rounded-full" isIconOnly onClick={onOpen} variant="light">
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
                    <CardFooter className="p-2 pb-4 grid gap-1">
                      <div className="flex items-center w-full">
                        <Button isIconOnly variant="light">
                          <HeartIcon className="w-6 h-6 text-red-500" />
                          <span className="sr-only">Like</span>
                        </Button>
                        <Button isIconOnly variant="light">
                          <MessageCircleIcon className="w-6 h-6" />
                          <span className="sr-only">Comment</span>
                        </Button>
                        <Button isIconOnly variant="light">
                          <SendIcon className="w-6 h-6" />
                          <span className="sr-only">Share</span>
                        </Button>
                        <Button className="ml-auto" isIconOnly variant="light">
                          <BookmarkIcon className="w-6 h-6" />
                          <span className="sr-only">Comment</span>
                        </Button>
                      </div>
                      <span className="font-semibold px-2 text-sm">{post.post_likes?.length} likes</span>
                      <div className="px-2 py-1 text-sm">
                        <span className="font-bold">{userData?.username}</span>
                        <span className="ml-1">{post.caption}</span>
                      </div>
                      <div className="px-2 text-sm w-full grid gap-1.5">
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
