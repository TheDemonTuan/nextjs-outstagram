import { PostResponse, postKey } from "@/api/post";
import { PostLikeResponse, postLike } from "@/api/post_like";
import { useAuth } from "@/hooks/useAuth";
import { BookmarkIcon, LikeHeartIcon, MessageCircleIcon, SendIcon, UnLikeHeartIcon } from "@/icons";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const PostReact = ({ postID, isLiked }: { postID: string; isLiked: boolean }) => {
  const queryClient = useQueryClient();
  const { authData } = useAuth();

  const { mutate: postLikeMutate } = useMutation<ApiSuccessResponse<PostLikeResponse>, ApiErrorResponse, string>({
    mutationFn: async (params) => await postLike(params),
    onSuccess: (likePostData) => {
      queryClient.setQueryData([postKey, "me"], (oldData: ApiSuccessResponse<PostResponse[]>) => {
        return {
          ...oldData,
          data: oldData.data.map((post) => {
            if (post.id === postID) {
              return {
                ...post,
                post_likes: post.post_likes.map((postLike) => {
                  if (postLike.user_id === authData?.id) {
                    return {
                      ...postLike,
                      is_liked: likePostData.data.is_liked,
                    };
                  }
                  return postLike;
                }),
              };
            }
            return post;
          }),
        };
      });
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
        <div>
          <MessageCircleIcon className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
          <span className="sr-only">Comment</span>
        </div>
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
