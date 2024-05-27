import { PostLikeResponse, postLike } from "@/api/post_like";
import { BookmarkIcon, LikeHeartIcon, MessageCircleIcon, SendIcon } from "@/icons";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const PostReact = ({ postID, isLiked }: { postID: string; isLiked: boolean }) => {
  const queryClient = useQueryClient();
  const { mutate: postLikeMutate } = useMutation<ApiSuccessResponse<PostLikeResponse>, ApiErrorResponse, string>({
    mutationFn: async (params) => await postLike(params),
    onSuccess: (likePostData) => {
      //   queryClient.invalidateQueries({
      //     queryKey: ["posts"],
      //   });
    },
    onError: (error) => {
      //   toast.error();
    },
  });

  const handleLikePost = async () => {
    // setIsLiked((prev) => !prev);
    postLikeMutate(postID);
  };

  return (
    <div className="flex items-center w-full">
      <div className="flex gap-4 items-center justify-center">
        <div onClick={handleLikePost}>
          <LikeHeartIcon className="w-6 h-6 hover:stroke-gray115 cursor-pointer text-red-500" stroke="#262626" />
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
