import { postKey } from "@/api/post";
import { PostLikeResponse, postLike } from "@/api/post_like";
import { useAuth } from "@/hooks/useAuth";
import { BookmarkIcon, LikeHeartIcon, MessageCircleIcon, SavedBookmarkIcon, SendIcon, UnLikeHeartIcon } from "@/icons";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { useModalStore } from "@/stores/modal-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { ShareModalKey } from "./share-modal";
import { Post } from "@/gql/graphql";
import { PostSaveResponse, postSave, savedKey } from "@/api/post_save";

const PostReact = ({
  isLiked,
  isSaved,
  postReact,
  postPage,
}: {
  isLiked: boolean;
  isSaved: boolean;
  postReact: Post;
  postPage?: number;
}) => {
  const queryClient = useQueryClient();
  const { authData } = useAuth();
  const { setModalData, modalOpen } = useModalStore();

  const { mutate: postLikeMutate } = useMutation<ApiSuccessResponse<PostLikeResponse>, ApiErrorResponse, string>({
    mutationFn: async (params) => await postLike(params),
    onSuccess: (likePostData) => {
      const fakeData = {
        ...likePostData.data,
        user: {
          ...authData,
        },
      };
      if (!!queryClient.getQueryData([postKey, "home"])) {
        queryClient.setQueryData([postKey, "home"], (oldData: any) => {
          return {
            ...oldData,
            pages: [
              ...oldData.pages.map((page: any, index: any) => {
                return {
                  postHomePage: [
                    ...page.postHomePage.map((post: any) => {
                      if (post.id === postReact.id) {
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

      if (!!queryClient.getQueryData([postKey, { id: postReact.id }])) {
        queryClient.setQueryData([postKey, { id: postReact.id }], (oldData: any) => {
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

  const { mutate: postSaveMutate } = useMutation<ApiSuccessResponse<PostSaveResponse>, ApiErrorResponse, string>({
    mutationFn: async (params) => await postSave(params),
    onSuccess: (savePostData) => {
      const fakeData = {
        ...savePostData.data,
        user: {
          ...authData,
        },
      };
      if (!!queryClient.getQueryData([postKey, "home"])) {
        queryClient.setQueryData([postKey, "home"], (oldData: any) => {
          return {
            ...oldData,
            pages: [
              ...oldData.pages.map((page: any, index: any) => {
                return {
                  postHomePage: [
                    ...page.postHomePage.map((post: any) => {
                      if (post.id === postReact.id) {
                        if (!post.post_saves?.length) {
                          return {
                            ...post,
                            post_saves: [fakeData],
                          };
                        }
                        const newSaves = post.post_saves.filter((save: any) => save.user_id !== authData?.id);
                        return {
                          ...post,
                          post_saves: [fakeData, ...newSaves],
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

      if (!!queryClient.getQueryData([postKey, { id: postReact.id }])) {
        queryClient.setQueryData([postKey, { id: postReact.id }], (oldData: any) => {
          const newSaves = oldData.postByPostId.post_saves.filter((save: any) => save.user_id !== authData?.id);
          return {
            ...oldData,
            postByPostId: {
              ...oldData.postByPostId,
              post_saves: [fakeData, ...newSaves],
            },
          };
        });
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Saved post failed!");
    },
  });

  const handleLikePost = async () => {
    postLikeMutate(postReact.id);
  };

  const handleSavePost = async () => {
    postSaveMutate(postReact.id);
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
        {postReact.is_hide_comment === false && (
          <Link href={`/p/${postReact.id}`} passHref>
            <MessageCircleIcon className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
            <span className="sr-only">Comment</span>
          </Link>
        )}

        <div
          onClick={() => {
            setModalData(postReact);
            modalOpen(ShareModalKey);
          }}>
          <SendIcon className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
          <span className="sr-only">Share</span>
        </div>
      </div>
      {postReact.user_id !== authData?.id && (
        <div className="ml-auto" onClick={handleSavePost}>
          {isSaved ? (
            <SavedBookmarkIcon className="w-6 h-6 hover:stroke-gray115  cursor-pointer" stroke="#262626" />
          ) : (
            <BookmarkIcon className="w-6 h-6 hover:stroke-gray115  cursor-pointer" stroke="#262626" />
          )}
          <span className="sr-only">Save</span>
        </div>
      )}
    </div>
  );
};

export default PostReact;
