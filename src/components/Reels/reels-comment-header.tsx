"use client";

import Link from "next/link";
import { ImMusic } from "react-icons/im";
import { Avatar, AvatarImage } from "../ui/avatar";
import HighlightHashtags from "../highlight-hashtags";
import { BookMarkReelsCommentIcon, LikeHeartIcon, MessageCircleIcon, ShareReelsIcon } from "@/icons";
import { Friend, Post, PostByPostIdQuery } from "@/gql/graphql";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { PostLikeResponse, postLike } from "@/api/post_like";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { postKey } from "@/api/post";
import { toast } from "sonner";
import { Tooltip } from "@nextui-org/react";
import SummaryProfile from "../summary-profile";
import ReelReact from "./reel-react";
import { useState } from "react";

const hostLocal = "http://localhost:3001";
interface ReelsHeaderCommentsProps {
  reelHeaderData: PostByPostIdQuery;
  isLiked: boolean;
}

export default function ReelsCommentsHeader({ reelHeaderData, isLiked }: ReelsHeaderCommentsProps) {
  const reelData = reelHeaderData.postByPostId;
  const linkReels = `${hostLocal}/p/${reelData?.id}?utm_source=og_web_copy_link`;
  const [isExpanded, setIsExpanded] = useState(false);

  const queryClient = useQueryClient();
  const { authData } = useAuth();

  const { mutate: postLikeMutate } = useMutation<ApiSuccessResponse<PostLikeResponse>, ApiErrorResponse, string>({
    mutationFn: async (params) => await postLike(params),
    onSuccess: (likePostData) => {
      const fakeData = {
        ...likePostData.data,
        user: {
          ...authData,
        },
      };
      if (!!queryClient.getQueryData([postKey, "reels"])) {
        queryClient.setQueryData([postKey, "reels"], (oldData: any) => {
          return {
            ...oldData,
            pages: [
              ...oldData.pages.map((page: any, index: any) => {
                return {
                  postReel: [
                    ...page.postReel.map((reel: any) => {
                      if (reel.id === reelData.id) {
                        if (!reel.post_likes?.length) {
                          return {
                            ...reel,
                            post_likes: [fakeData],
                          };
                        }
                        const newLikes = reel.post_likes.filter((like: any) => like.user_id !== authData?.id);
                        return {
                          ...reel,
                          post_likes: [fakeData, ...newLikes],
                        };
                      }
                      return reel;
                    }),
                  ],
                };
              }),
            ],
          };
        });
      }

      if (!!queryClient.getQueryData([postKey, { id: reelData.id }])) {
        queryClient.setQueryData([postKey, { id: reelData.id }], (oldData: any) => {
          if (!oldData.postByPostId.post_likes?.length) {
            return {
              ...oldData,
              postByPostId: {
                ...oldData.postByPostId,
                post_likes: [fakeData],
              },
            };
          }
          const newLikes = oldData.postByPostId.post_likes.filter((like: any) => like.user_id !== authData?.id);
          return {
            ...oldData,
            postByPostId: {
              ...oldData.postByPostId,
              post_likes: [fakeData, ...newLikes],
            },
          };
        });
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Like post failed!");
    },
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${hostLocal}/r/${reelData?.id}?utm_source=og_web_copy_link`);
    toast.success("Link copied to clipboard");
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="py-5 mx-6 bg-[#F8F8F8] rounded-xl">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center">
            <Tooltip
              delay={1000}
              content={
                reelData && (
                  <SummaryProfile
                    username={reelData.user?.username || ""}
                    full_name={reelData.user?.full_name || ""}
                    avatar={reelData.user?.avatar || ""}
                    role={reelData.user?.role || false}
                    posts={[]}
                    friends={reelData.user?.friends as Friend[]}
                  />
                )
              }
              placement="bottom-start"
              className="rounded-md shadow-lg">
              <Link href={`/${reelData.user?.username}`}>
                <Avatar className="w-11 h-11">
                  <AvatarImage src={getUserAvatarURL(reelData.user?.avatar) || ""} />
                </Avatar>
              </Link>
            </Tooltip>
            <div className="ml-3 pt-0.5 flex flex-col">
              <Tooltip
                delay={1000}
                content={
                  reelData && (
                    <SummaryProfile
                      username={reelData.user?.username || ""}
                      full_name={reelData.user?.full_name || ""}
                      avatar={reelData.user?.avatar || ""}
                      role={reelData.user?.role || false}
                      posts={[]}
                      friends={reelData.user?.friends as Friend[]}
                    />
                  )
                }
                placement="bottom-start"
                className="rounded-md shadow-lg">
                <Link
                  href={`/${reelData.user?.username}`}
                  className="relative z-10 text-[18px] leading-6 text-lg text font-bold hover:underline">
                  {reelData.user?.username}
                </Link>
              </Tooltip>

              <div className="relative z-0 text-sm -mt-0">
                {reelData.user?.full_name}
                <span className="relative -top-[3px] text-sm pl-1 pr-0.5 ">.</span>
                <span className="text-sm">
                  {" "}
                  {formatDistanceToNow(reelData.created_at || "", {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>
          <button className="border text-[15px] px-[21px] py-1 border-[#F02C56] text-white bg-[#F02C56]  hover:bg-opacity-85 font-semibold rounded-md">
            Add Friend
          </button>
        </div>
        <div className="my-0 text-md px-4 mt-4">
          <p className={`${!isExpanded ? "line-clamp-[2]" : ""}`}>
            <HighlightHashtags text={reelData?.caption || ""} className="text-[#008DEA]" />
          </p>
          {(reelData.caption?.split("\n").length ?? 0) > 1 && (
            <button onClick={toggleExpand} className="font-semibold focus:outline-none inline-block">
              {isExpanded ? "...less" : "...more"}
            </button>
          )}
        </div>

        <p className="flex item-center gap-2 px-4 mt-2 text-sm">
          <ImMusic size="17" />
          original sound - {reelData.user?.username}
        </p>
      </div>

      <ReelReact reelReact={reelHeaderData.postByPostId as Post} isLiked={isLiked ?? false} orientation="horizontal" />
      <div className="relative flex items-center mt-1 mx-8 border py-1.5 rounded-lg bg-[#F1F1F2]">
        <input
          readOnly
          className="flex items-center px-3 w-[400px] border-none outline-0 bg-[#F1F1F2] cursor-text"
          value={linkReels}
          disabled
        />
        <button
          onClick={handleCopyLink}
          className="absolute right-0 border font-bold text-base py-1.5 px-4 border-none hover:bg-white rounded-r-lg">
          Copy link
        </button>
      </div>

      <div className="z-10 top-0 sticky mt-5 mx-8 font-bold pb-4 ">
        Comments <span>({reelData.post_comments?.length})</span>
      </div>
    </>
  );
}
