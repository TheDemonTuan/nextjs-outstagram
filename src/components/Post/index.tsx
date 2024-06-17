"use client";

import React, { Fragment, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Divider, Tooltip } from "@nextui-org/react";
import "react-image-gallery/styles/css/image-gallery.css";
import { PiDotsThreeBold } from "react-icons/pi";
import { formatDistanceToNow } from "date-fns";
import { useModalStore } from "@/stores/modal-store";
import PostMoreOptions, { PostMoreOptionsModalKey } from "./post-more-options";
import PostReact from "./post-react";
import Share from "./share";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import SummaryProfile from "../summary-profile";
import Carousel from "./carousel";
import { PostHomePageDocument } from "@/gql/graphql";
import { UserResponse } from "@/api/user";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { postKey } from "@/api/post";
import { graphQLClient, graphqlAbortController } from "@/lib/graphql";
import { PostsHomeSkeleton } from "../skeletons";
import Likes, { LikesModalKey } from "./likes";
import { EmojiLookBottomIcon } from "@/icons";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const Post = () => {
  const { modalOpen, setModalData } = useModalStore();
  const { ref, inView } = useInView();
  const { authData } = useAuth();
  const currentPage = useRef(1);

  const {
    status,
    data: postsData,
    error: postsError,
    isLoading: postsIsLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: [postKey, "home-page"],
    queryFn: async ({ pageParam }) => graphQLClient.request(PostHomePageDocument, { page: pageParam }),
    initialPageParam: currentPage.current,
    getNextPageParam: (lastPage) => {
      if (lastPage.postHomePage.length === 0) {
        return undefined;
      }
      return ++currentPage.current;
    },
    getPreviousPageParam: (firstPage) => {
      return --currentPage.current;
    },
  });

  useEffect(() => {
    if (!postsIsLoading && !isFetchingNextPage && hasNextPage && inView) {
      fetchNextPage();
    }

    return () => {};
  }, [fetchNextPage, hasNextPage, inView, isFetching, isFetchingNextPage, postsIsLoading]);

  if (postsIsLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <PostsHomeSkeleton />
        <PostsHomeSkeleton />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        {postsData?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.postHomePage.map((post) => {
              const postLikes = post?.post_likes?.filter((like) => like?.is_liked);
              const isUserLiked = postLikes?.some((like) => like?.user_id === authData?.id);
              return (
                <Card
                  key={post.id}
                  className="w-full max-w-lg overflow-hidden border-transparent bg-transparent shadow-none border-b-2">
                  <CardContent className="p-0">
                    <div className="grid gap-4">
                      <Card className="rounded-none shadow-none border-0">
                        <CardHeader className="p-2 flex flex-row items-center">
                          <div className="flex gap-1 items-center justify-center">
                            <Tooltip
                              content={post.user && <SummaryProfile user={post.user as UserResponse} />}
                              placement="bottom-start">
                              <Link
                                className="flex items-center gap-2 text-sm font-medium"
                                href={`/${post.user?.username}`}>
                                <Avatar className="w-9 h-9">
                                  <AvatarImage
                                    className="object-cover"
                                    alt={post.user?.username ?? "User Avatar"}
                                    src={getUserAvatarURL(post.user?.avatar)}
                                  />
                                  <AvatarFallback>{post.user?.username}</AvatarFallback>
                                </Avatar>
                                {post.user?.username}
                              </Link>
                            </Tooltip>
                            <span className="text-xs text-gray-500">
                              •{" "}
                              {formatDistanceToNow(post.created_at, {
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
                          {post?.post_files?.length ? (
                            <div className="relative">
                              <div className="slide-container">
                                <Carousel
                                  slides={post.post_files.map((file) => ({
                                    id: file?.id ?? "",
                                    url: file?.url ?? "",
                                    type: file?.type === "1" ? 1 : 0,
                                  }))}
                                />
                              </div>
                            </div>
                          ) : null}
                        </CardContent>
                        <CardFooter className="p-2 grid gap-2">
                          <PostReact
                            postID={post.id}
                            isLiked={isUserLiked ?? false}
                            postPage={pageIndex > 0 ? pageIndex : 0}
                          />
                          <span
                            className="font-semibold text-sm cursor-pointer"
                            onClick={() => modalOpen(LikesModalKey)}>
                            {postLikes?.length} likes
                          </span>
                          <div className="py-1 text-sm">
                            <span className="font-bold">{post.user?.username}</span>
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
                              <Link className=" text-neutral-400" href={`/p/${post.id}`}>
                                View all 39 comments
                              </Link>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2">
                    <div className="flex gap-2 justify-between w-full items-center">
                      <input
                        type="text"
                        name="body"
                        className="
                    bg-transparent
                    text-sm
                    border-none
                    focus:outline-none
                    flex-1
                    dark:text-neutral-400
                    placeholder-neutral-400
                    font-normal
                    disabled:opacity-30"
                        placeholder="Add a comment..."
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        hidden
                        type="submit"
                        className="text-sky-500 text-base font-semibold hover:text-sky-700 dark:hover:text-white disabled:cursor-not-allowed  dark:disabled:text-slate-500 disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:disabled:hover:text-slate-500">
                        Post
                      </button>
                      <EmojiLookBottomIcon className="w-4 h-4" />
                    </div>
                  </CardFooter>
                  <hr className="border-gray-300 w-full mt-2" />
                </Card>
              );
            })}
          </Fragment>
        ))}
        {isFetchingNextPage ? (
          <div className="flex flex-col items-center gap-2">
            <PostsHomeSkeleton />
            <PostsHomeSkeleton />
          </div>
        ) : hasNextPage ? (
          <div className="flex flex-col items-center gap-2">
            <div ref={ref} />
            <PostsHomeSkeleton />
            <PostsHomeSkeleton />
          </div>
        ) : (
          authData && (
            <div className="flex flex-col my-12 justify-center items-center text-center space-y-4">
              <Image src="/illo-confirm-refresh-light.png" alt="" className="object-cover" width={100} height={100} />
              <div className="space-y-1">
                <div className="text-xl">You&apos;ve completely caught up</div>
                <div className="text-sm text-neutral-500">You&apos;ve seen all new posts from the past 3 days.</div>
              </div>
              <Link href="/" className="text-sm font-semibold text-sky-500 cursor-pointer">
                View older posts
              </Link>
            </div>
          )
        )}
      </div>
      <PostMoreOptions />
      <Likes />
    </>
  );
};

export default Post;
