import { postKey } from "@/api/post";
import { PostLikeResponse, postLike } from "@/api/post_like";
import { useAuth } from "@/hooks/useAuth";
import { BookmarkIcon, LikeHeartIcon, MessageCircleIcon, SendIcon, UnLikeHeartIcon } from "@/icons";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { useModalStore } from "@/stores/modal-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const PostReact = ({ postID, isLiked, postPage }: { postID: string; isLiked: boolean; postPage?: number }) => {
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
      }
      if (!!queryClient.getQueryData([postKey, "home-page"])) {
        queryClient.setQueryData([postKey, "home-page"], (oldData: any) => {
          return {
            ...oldData,
            pages: [
              ...oldData.pages.map((page: any, index: any) => {
                return {
                  postHomePage: [
                    ...page.postHomePage.map((post: any) => {
                      if (post.id === postID) {
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

      if (!!queryClient.getQueryData([postKey, { id: postID }])) {
        queryClient.setQueryData([postKey, { id: postID }], (oldData: any) => {
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

  const handleLikePost = async () => {
    postLikeMutate(postID);
  };

  return (
    <div className="flex items-center w-full">
      <div className="flex gap-4 items-center justify-center">
        <div onClick={handleLikePost}>
          {isLiked ? (
            <LikeHeartIcon className="w-6 h-6 hover:stroke-gray115 cursor-pointer text-red-500" />
          ) : (
            <UnLikeHeartIcon className="w-6 h-6 hover:stroke-gray115 cursor-pointer" />
          )}
          <span className="sr-only">Like</span>
        </div>
        <Link href={`/p/${postID}`} passHref>
          <MessageCircleIcon className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
          <span className="sr-only">Comment</span>
        </Link>
        <div>
          <SendIcon className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
          <span className="sr-only">Share</span>
        </div>
      </div>
      <div className="ml-auto">
        <BookmarkIcon className="w-6 h-6  hover:stroke-gray115 cursor-pointer" stroke="#262626" />
        <span className="sr-only">BookmarkIcon</span>
      </div>
    </div>
  );
};

export default PostReact;
