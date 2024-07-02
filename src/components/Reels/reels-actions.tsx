import {
  BookMarkReelsIcon,
  BookmarkIcon,
  LikeHeartIcon,
  MessageCircleIcon,
  PlusReelsIcon,
  ShareReelsIcon,
  UnLikeHeartIcon,
} from "@/icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner, Tooltip } from "@nextui-org/react";
import { Friend, Post } from "@/gql/graphql";
import SummaryProfile from "../summary-profile";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { PostLikeResponse, postLike } from "@/api/post_like";
import { postKey } from "@/api/post";
import { toast } from "sonner";

interface ReelsActionProps {
  reelAction: Post;
  isLiked: boolean;
  postPage?: number;
}

export default function ReelsAction({ reelAction, isLiked, postPage }: ReelsActionProps) {
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
      if (!!queryClient.getQueryData([postKey, "reels-page"])) {
        queryClient.setQueryData([postKey, "reels-page"], (oldData: any) => {
          return {
            ...oldData,
            pages: [
              ...oldData.pages.map((page: any, index: any) => {
                return {
                  postReel: [
                    ...page.postReel.map((post: any) => {
                      if (post.id === reelAction.id) {
                        if (!post.post_likes?.length) {
                          return {
                            ...post,
                            post_likes: [fakeData],
                          };
                        }
                        const newLikes = post.post_likes.filter((like: any) => like.user_id !== authData?.id);
                        return {
                          ...post,
                          post_likes: [fakeData, ...newLikes],
                        };
                      }
                      return post;
                    }),
                  ],
                };
              }),
            ],
          };
        });
      }

      if (!!queryClient.getQueryData([postKey, { id: reelAction.id }])) {
        queryClient.setQueryData([postKey, { id: reelAction.id }], (oldData: any) => {
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
      console.log(error?.response?.data?.message);

      toast.error(error?.response?.data?.message || "Like post failed!");
    },
  });

  const handleLikePost = async () => {
    postLikeMutate(reelAction.id);
  };

  return (
    <>
      <div className="relative mr-[75px]">
        <div className="absolute bottom-0 pl-5 text-center text-xs text-gray-800 font-semibold">
          <Tooltip
            delay={1000}
            content={
              reelAction && (
                <SummaryProfile
                  username={reelAction.user?.username || ""}
                  full_name={reelAction.user?.full_name || ""}
                  avatar={reelAction.user?.avatar || ""}
                  role={reelAction.user?.role || false}
                  posts={[]}
                  friends={reelAction.user?.friends as Friend[]}
                />
              )
            }
            placement="bottom-start"
            className="rounded-md shadow-lg">
            <div className="relative mb-6">
              <Avatar className=" h-[50px] w-[50px] cursor-pointer">
                <AvatarImage src={getUserAvatarURL(reelAction.user?.avatar || "")} alt="user avatar" />
                <AvatarFallback>
                  <Spinner size="sm" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-[-5px] left-4 bg-red-500 rounded-full p-1 hover:bg-red-600 cursor-pointer">
                <PlusReelsIcon fill="#FFFFFF" />
              </div>
            </div>
          </Tooltip>
          <div className="space-y-2">
            <div className="mb-2">
              <button className="rounded-full bg-gray-200 p-3 cursor-pointer mb-1" onClick={handleLikePost}>
                {isLiked ? (
                  <LikeHeartIcon className="w-6 h-6 hover:stroke-gray115 cursor-pointer text-red-500" />
                ) : (
                  <LikeHeartIcon className="w-6 h-6 hover:stroke-gray115 cursor-pointer text-black" />
                )}
              </button>
              <span>{reelAction.post_likes?.length}</span>
            </div>

            <Link href={`/r/${reelAction.id}`}>
              <button className="rounded-full bg-gray-200 p-3 cursor-pointer mb-1 active:bg-gray-300 border-none">
                <MessageCircleIcon width={23} height={23} fill="#00000" />
              </button>
              <span>{reelAction.post_comments?.length}</span>
            </Link>

            <div>
              <button className="rounded-full bg-gray-200 p-3 cursor-pointer mb-1 active:bg-gray-300">
                <BookMarkReelsIcon width={22} height={22} className="" fill="#00000" />
              </button>
              <span className="">55</span>
            </div>

            <div>
              <button className="rounded-full bg-gray-200 p-3 cursor-pointer mb-1 active:bg-gray-300">
                <ShareReelsIcon width={22} height={22} />
              </button>
              <span className="">55</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
