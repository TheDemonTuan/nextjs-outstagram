"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Spinner, Tooltip } from "@nextui-org/react";
import "react-image-gallery/styles/css/image-gallery.css";
import { PiDotsThreeBold } from "react-icons/pi";
import { formatDistanceToNow } from "date-fns";
import { useModalStore } from "@/stores/modal-store";
import { PostMoreOptionsModalKey } from "./post-more-options";
import PostReact from "./post-react";
import Share from "./share";
import { useAuth } from "@/hooks/useAuth";
import SummaryProfile from "../summary-profile";
import Carousel from "./carousel";
import { Friend, PostHomePageDocument, PostLike } from "@/gql/graphql";
import { UserResponse } from "@/api/user";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { postKey } from "@/api/post";
import { graphQLClient, graphqlAbortController } from "@/lib/graphql";
import { PostsHomeSkeleton } from "../skeletons";
import PostLikes, { LikesModalKey } from "./post-likes";
import { EmojiLookBottomIcon, VerifiedIcon } from "@/icons";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import UserProfileInfo from "../user-profile-info";
import { useRouter } from "next/navigation";
import { redirectHard } from "@/actions";
import dynamic from "next/dynamic";
import { Span } from "next/dist/trace";
import LikesView from "../likes-view";
import { FaRegHeart } from "react-icons/fa6";
import { pages } from "next/dist/build/templates/app-page";
import { MdOutlinePublic } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import HighlightHashtags from "../highlight-hashtags";
import PostPrivacy from "../privacy-post";

const PostMoreOptions = dynamic(() => import("./post-more-options"));

const Post = () => {
  const { modalOpen, setModalData } = useModalStore();
  const { ref, inView } = useInView();
  const { authData } = useAuth();
  const currentPage = useRef(1);
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        {postsData?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.postHomePage.map((post) => {
              const postLikes = post?.post_likes?.filter((like) => like?.is_liked);
              const isUserLiked = postLikes?.some((like) => like?.user_id === authData?.id);

              const userComments = post?.post_comments
                ?.filter((comment) => comment?.user_id === authData?.id)
                .slice(0, 2);

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
                              delay={1000}
                              content={
                                post && (
                                  <SummaryProfile
                                    username={post.user?.username || ""}
                                    full_name={post.user?.full_name || ""}
                                    avatar={post.user?.avatar || ""}
                                    role={post.user?.role || false}
                                    posts={[]}
                                    friends={post.user?.friends as Friend[]}
                                  />
                                )
                              }
                              placement="bottom-start"
                              className="rounded-md shadow-lg">
                              <div className="flex items-center text-center gap-2 text-sm font-medium">
                                <Link href={`/${post.user?.username || ""}`}>
                                  <Avatar className="">
                                    <AvatarImage
                                      className="object-cover"
                                      src={getUserAvatarURL(post.user?.avatar || "")}
                                    />
                                    <AvatarFallback>
                                      <Spinner size="sm" />
                                    </AvatarFallback>
                                  </Avatar>
                                </Link>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-1">
                                    <Link href={`/${post.user?.username || ""}`} className="font-semibold text-sm">
                                      {post.user?.username || ""}
                                    </Link>
                                    {post.user?.role && <VerifiedIcon className="w-3 h-3" />}
                                  </div>
                                  <div className="flex items-center">
                                    <Link
                                      href={`/p/${post.id}`}
                                      passHref
                                      scroll={false}
                                      className="text-xs text-gray-500"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        redirectHard(`/p/${post.id}`);
                                      }}>
                                      {formatDistanceToNow(post.created_at || "", {
                                        addSuffix: true,
                                      })}
                                    </Link>
                                    <span className="text-gray-500 ml-1"> • </span>

                                    <PostPrivacy privacy={post?.privacy || 0} />
                                  </div>
                                </div>
                              </div>
                            </Tooltip>
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
                                  slides={post.post_files.map((file) => {
                                    return {
                                      id: file?.id ?? "",
                                      url: file?.url ?? "",
                                      type: file?.type === "1" ? 1 : 0,
                                      className: "rounded-sm max-h-[590px] min-h-[240px] w-full object-contain",
                                    };
                                  })}
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

                          <LikesView
                            postLikes={postLikes as PostLike[]}
                            post_userID={post.user_id || ""}
                            current_userID={authData?.id || ""}
                            likesModalKey={LikesModalKey}
                          />

                          <div className="py-0 text-sm">
                            <p className={`font-bold ${!isExpanded ? "line-clamp-2" : ""}`}>
                              {post.user?.username}
                              {post.user?.role && (
                                <VerifiedIcon className="w-3 h-3 ml-1 mb-[0.4px] inline-block items-center" />
                              )}
                              <span className="font-normal ml-1 text-center">
                                <HighlightHashtags text={post?.caption || ""} />
                              </span>
                            </p>
                            {(post.caption?.split("\n").length ?? 0) > 2 && (
                              <button onClick={toggleExpand} className="text-neutral-500 focus:outline-none">
                                {isExpanded ? "less" : "more"}
                              </button>
                            )}
                          </div>

                          {post.post_comments && post.post_comments?.length > 0 && (
                            <Link className="text-neutral-500 text-sm" href={`/p/${post.id}`} passHref>
                              {`View all ${post.post_comments.length} comment${
                                post.post_comments.length > 1 ? "s" : ""
                              }`}
                            </Link>
                          )}
                        </CardFooter>
                      </Card>
                    </div>
                  </CardContent>
                  <CardFooter className="grid gap-1 px-2 py-1">
                    {userComments?.map((comment) => (
                      <div key={comment?.id} className="text-sm flex items-center justify-between">
                        <div>
                          <span className="font-bold">{comment?.user?.username}</span>
                          <span className="ml-1">{comment?.content}</span>
                        </div>
                        <FaRegHeart size={12} />
                      </div>
                    ))}
                  </CardFooter>
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
      {postsData && <PostMoreOptions />}
      <PostLikes />
    </>
  );
};

export default Post;
