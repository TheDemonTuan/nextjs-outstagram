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
import SelectPhotoModal, { SelectPhotoModalKey } from "./select-photo";

const PostReact = ({ postID, isLiked, postPage }: { postID: string; isLiked: boolean; postPage?: number }) => {
  const queryClient = useQueryClient();
  const { authData } = useAuth();
  const { modalOpen, setModalData } = useModalStore();

  const { mutate: postLikeMutate } = useMutation<ApiSuccessResponse<PostLikeResponse>, ApiErrorResponse, string>({
    mutationFn: async (params) => await postLike(params),
    onSuccess: (likePostData) => {
      queryClient.setQueryData([postKey, "home-page"], (oldData: any) => {
        return {
          ...oldData,
          pages: [
            ...oldData.pages.map((page: any, index: any) => {
              if (index === postPage) {
                return {
                  postHomePage: [
                    ...page.postHomePage.map((post: any) => {
                      if (post.id === postID) {
                        if (!post.post_likes?.length) {
                          return {
                            ...post,
                            post_likes: [likePostData.data],
                          };
                        }
                        return {
                          ...post,
                          post_likes: [
                            ...post.post_likes.map((like: any) => {
                              if (like.user_id === authData?.id) {
                                return {
                                  ...like,
                                  is_liked: likePostData.data.is_liked,
                                };
                              }
                              return like;
                            }),
                          ],
                        };
                      }
                      return post;
                    }),
                  ],
                };
              }
              return page;
            }),
          ],
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
