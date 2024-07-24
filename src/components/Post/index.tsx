"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger, Spinner, Tooltip } from "@nextui-org/react";
import "react-image-gallery/styles/css/image-gallery.css";
import { PiDotsThreeBold } from "react-icons/pi";
import { formatDistanceToNow } from "date-fns";
import { useModalStore } from "@/stores/modal-store";
import { PostMoreOptionsModalKey } from "./post-more-options";
import PostReact from "./post-react";
import { useAuth } from "@/hooks/useAuth";
import SummaryProfile from "../summary-profile";
import Carousel from "./carousel";
import { Friend, Post as PostGraphql, PostHomePageDocument } from "@/gql/graphql";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PostPrivacy, PostType, postKey } from "@/api/post";
import { graphQLClient, graphqlAbortController } from "@/lib/graphql";
import { PostsHomeSkeleton } from "../skeletons";
import PostLikes, { LikesModalKey } from "./post-likes";
import { EmojiLookBottomIcon, LikeDoubleTapIcon, VerifiedIcon } from "@/icons";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import HighlightHashtags from "../highlight-hashtags";
import PostPrivacyView from "../privacy-post-view";
import TextareaAutosize from "react-textarea-autosize";
import { EmojiStyle } from "emoji-picker-react";
import ShareModal from "./share-modal";
import { ImBlocked } from "react-icons/im";
const PostMoreOptions = dynamic(() => import("./post-more-options"));

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const Post = () => {
  const { modalOpen, setModalData } = useModalStore();
  const { ref, inView } = useInView();
  const { authData } = useAuth();
  const currentPage = useRef(1);
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLikeIcons, setShowLikeIcons] = useState<{ [key: string]: { visible: boolean } }>({});

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
    queryKey: [postKey, "home"],
    queryFn: async ({ pageParam }) => {
      const result = await graphQLClient.request(PostHomePageDocument, { page: pageParam });
      if (!authData?.role) {
        result.postHomePage = result.postHomePage.filter((post) => post.active && post.user?.active);
      } else {
        result.postHomePage = result.postHomePage.filter((post) => post.user?.active);
      }
      return result;
    },
    // graphQLClient.request(PostHomePageDocument, { page: pageParam }),
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

  const handleDoubleClick = (postId: string) => {
    setShowLikeIcons((prevState) => ({
      ...prevState,
      [postId]: { visible: true },
    }));
    setTimeout(() => {
      setShowLikeIcons((prevState) => ({
        ...prevState,
        [postId]: { visible: false },
      }));
    }, 1000);
  };
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        {postsData?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.postHomePage.map((post) => {
              const postLikes = post?.post_likes?.filter((like) => like?.is_liked);
              const isUserLiked = postLikes?.some((like) => like?.user_id === authData?.id);

              const isSaved = post?.post_saves?.some((save) => save?.user_id === authData?.id);

              const getRandomCount = () => Math.floor(Math.random() * 3);

              const filteredComments = post?.post_comments
                ?.filter((comment) => !comment?.parent_id)
                ?.sort(() => Math.random() - 0.5);

              const userComments = filteredComments
                ?.filter((comment) => comment?.user_id === authData?.id)
                ?.slice(0, getRandomCount());

              const commentsToShow =
                userComments && userComments?.length > 0
                  ? userComments
                  : filteredComments
                      ?.filter((comment) => comment?.user_id !== authData?.id)
                      ?.slice(0, getRandomCount());

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
                                    is_private={post.user?.is_private || false}
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
                                    {post.active ? (
                                      <PostPrivacyView privacy={post?.privacy || PostPrivacy.PUBLIC} size={12} />
                                    ) : (
                                      <ImBlocked size={12} color="#65676B" className="ml-1" />
                                    )}
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
                        <CardContent className="p-2">
                          {post?.post_files?.length ? (
                            <div className="relative">
                              <div className="slide-container" onDoubleClick={() => handleDoubleClick(post.id)}>
                                <Carousel
                                  slides={post.post_files.map((file) => {
                                    return {
                                      id: file?.id ?? "",
                                      url: file?.url ?? "",
                                      className: "rounded-sm max-h-[590px] min-h-[240px] w-full object-contain",
                                    };
                                  })}
                                  type={post.type || PostType.DEFAULT}
                                />
                              </div>
                              {showLikeIcons[post.id]?.visible && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span
                                    style={{
                                      transform: `scale(1)`,
                                      opacity: "1",
                                      animation: "likeAnimation 0.6s ease",
                                    }}>
                                    <LikeDoubleTapIcon />
                                  </span>
                                </div>
                              )}
                            </div>
                          ) : null}
                        </CardContent>
                        <CardFooter className="p-2 grid gap-2">
                          <PostReact
                            postReact={post as PostGraphql}
                            isLiked={isUserLiked ?? false}
                            isSaved={isSaved ?? false}
                            postPage={pageIndex > 0 ? pageIndex : 0}
                          />

                          <LikesView
                            post={post as PostGraphql}
                            current_userID={authData?.id || ""}
                            likesModalKey={LikesModalKey}
                          />

                          <div className="py-0 text-sm">
                            <p className={`font-bold ${!isExpanded ? "line-clamp-[2]" : ""}`}>
                              {post.user?.username}
                              {post.user?.role && (
                                <VerifiedIcon className="w-3 h-3 ml-1 mb-[0.4px] inline-block items-center" />
                              )}
                              <span className="font-normal ml-1 text-center">
                                <HighlightHashtags text={post?.caption || ""} className="text-[#00376b]" />
                              </span>
                            </p>

                            {(post.caption?.split("\n").length ?? 0) > 2 && (
                              <button
                                onClick={toggleExpand}
                                className="text-neutral-500 focus:outline-none inline-block">
                                {isExpanded ? "...less" : "...more"}
                              </button>
                            )}
                          </div>

                          {post.post_comments && post.post_comments?.length > 0 && post.is_hide_comment === false && (
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
                  {post.is_hide_comment === false && (
                    <>
                      <CardFooter className="grid gap-1 px-2 py-1">
                        {commentsToShow?.map((comment) => (
                          <div key={comment?.id} className="text-sm flex items-center justify-between space-x-2">
                            <div>
                              <Tooltip
                                delay={1000}
                                content={
                                  comment?.user && (
                                    <SummaryProfile
                                      username={comment?.user.username || ""}
                                      full_name={comment?.user.full_name || ""}
                                      avatar={comment?.user.avatar || ""}
                                      role={comment.user.role || false}
                                      posts={[]}
                                      friends={comment?.user.friends as Friend[]}
                                      is_private={comment?.user.is_private || false}
                                    />
                                  )
                                }
                                placement="bottom-start"
                                className="rounded-md shadow-lg">
                                <Link href={`/${comment?.user?.username}`} className="font-bold">
                                  {comment?.user?.username}
                                </Link>
                              </Tooltip>
                              {comment?.user?.role && <VerifiedIcon className="w-3 h-3 inline-block ml-1" />}
                              <span className="ml-1">{comment?.content}</span>
                            </div>
                            <div>
                              <FaRegHeart size={12} className="ml-2 cursor-pointer" />
                            </div>
                          </div>
                        ))}
                      </CardFooter>
                      <CardFooter className="p-2">
                        <div className="flex gap-2 justify-between w-full items-center">
                          <TextareaAutosize
                            maxRows={4}
                            cacheMeasurements
                            className="bg-transparent text-sm border-none focus:outline-none flex-1 dark:text-neutral-400 placeholder-neutral-400 font-normal disabled:opacity-30 resize-none"
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

                          <Popover placement="top-start" showArrow={true}>
                            <PopoverTrigger>
                              <div className="hover:opacity-50 cursor-pointer">
                                {" "}
                                <EmojiLookBottomIcon className="w-4 h-4" />
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Picker
                                lazyLoadEmojis
                                emojiVersion="5.0"
                                // onEmojiClick={(e) => handleEmojiClick(e)}
                                emojiStyle={EmojiStyle.FACEBOOK}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </CardFooter>
                    </>
                  )}

                  <hr className="border-gray-300 w-full mt-2" />
                </Card>
              );
            })}
          </Fragment>
        ))}
        {isFetchingNextPage ? (
          <div className="flex flex-col items-center gap-2 mt-6">
            <Spinner size="lg" color="default" />
          </div>
        ) : hasNextPage ? (
          <div className="flex flex-col items-center gap-2 mt-6">
            <div ref={ref} />
            <Spinner size="lg" color="default" />
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
      <ShareModal />
    </>
  );
};

export default Post;
