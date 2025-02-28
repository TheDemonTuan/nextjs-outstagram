import {
  BookMarkReelsCommentIcon,
  BookMarkReelsIcon,
  LikeHeartIcon,
  MessageCircleIcon,
  SavedBookMarkReelsCommentIcon,
  SavedBookMarkReelsIcon,
  ShareReelsIcon,
} from "@/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { PostLikeResponse, postLike } from "@/api/post_like";
import { postKey } from "@/api/post";
import { toast } from "sonner";
import { Post } from "@/gql/graphql";
import Link from "next/link";
import { memo, useMemo } from "react";
import { useModalStore } from "@/stores/modal-store";
import { ShareModalKey } from "../Post/share-modal";
import PostLikes, { LikesModalKey } from "../Post/post-likes";
import { PostSaveResponse, postSave } from "@/api/post_save";

interface ReelReactProps {
  reelReact: Post;
  isLiked: boolean;
  isSaved: boolean;
  postPage?: number;
  orientation?: "horizontal" | "vertical";
}
// eslint-disable-next-line react/display-name
const ReelReact = memo(({ reelReact, isLiked, isSaved, postPage, orientation = "horizontal" }: ReelReactProps) => {
  const queryClient = useQueryClient();
  const { authData, authCanUse } = useAuth();
  const { modalOpen, setModalData } = useModalStore();

  const { mutate: postLikeMutate } = useMutation<ApiSuccessResponse<PostLikeResponse>, ApiErrorResponse, string>({
    mutationFn: async (params) => await postLike(params),
    onSuccess: (likePostData) => {
      const fakeData = {
        ...likePostData.data,
        user: {
          ...authData,
        },
      };
      if (queryClient.getQueryData([postKey, "reels"])) {
        queryClient.setQueryData([postKey, "reels"], (oldData: any) => {
          return {
            ...oldData,
            pages: [
              ...oldData.pages.map((page: any, index: any) => {
                return {
                  postReel: [
                    ...page.postReel.map((reel: any) => {
                      if (reel.id === reelReact.id) {
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

      if (queryClient.getQueryData([postKey, { id: reelReact.id }])) {
        queryClient.setQueryData([postKey, { id: reelReact.id }], (oldData: any) => {
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

  const { mutate: reelSaveMutate } = useMutation<ApiSuccessResponse<PostSaveResponse>, ApiErrorResponse, string>({
    mutationFn: async (params) => await postSave(params),
    onSuccess: (savePostData) => {
      const fakeData = {
        ...savePostData.data,
        user: {
          ...authData,
        },
      };
      if (queryClient.getQueryData([postKey, "reels"])) {
        queryClient.setQueryData([postKey, "reels"], (oldData: any) => {
          return {
            ...oldData,
            pages: [
              ...oldData.pages.map((page: any, index: any) => {
                return {
                  postReel: [
                    ...page.postReel.map((reel: any) => {
                      if (reel.id === reelReact.id) {
                        if (!reel.post_saves?.length) {
                          return {
                            ...reel,
                            post_saves: [fakeData],
                          };
                        }
                        const newSaves = reel.post_saves.filter((save: any) => save.user_id !== authData?.id);
                        return {
                          ...reel,
                          post_saves: [fakeData, ...newSaves],
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

      if (queryClient.getQueryData([postKey, { id: reelReact.id }])) {
        queryClient.setQueryData([postKey, { id: reelReact.id }], (oldData: any) => {
          if (!oldData.postByPostId.post_saves?.length) {
            return {
              ...oldData,
              postByPostId: {
                ...oldData.postByPostId,
                post_saves: [fakeData],
              },
            };
          }
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

  const totalLiked = useMemo(
    () => reelReact.post_likes?.filter((like) => like?.is_liked)?.length,
    [reelReact.post_likes]
  );

  const totalSaved = useMemo(
    () => reelReact.post_saves?.filter((save) => save?.post_id)?.length,
    [reelReact.post_saves]
  );

  const handleLikePost = async () => {
    postLikeMutate(reelReact.id);
  };

  const handleSavePost = async () => {
    reelSaveMutate(reelReact.id);
  };

  return (
    <>
      <div
        className={`flex ${
          orientation === "horizontal" ? " px-8 mt-4 space-x-2 justify-stretch" : "flex-col space-y-3"
        } items-center`}>
        <div className={`${orientation === "horizontal" ? "pb-4 text-center flex items-center" : ""}`}>
          <button
            disabled={!authCanUse || !reelReact.active}
            className={`rounded-full ${!authCanUse || !reelReact.active ? "" : "cursor-pointer"} bg-gray-200 ${
              orientation === "horizontal" ? " p-2.5 " : "p-3 mb-1"
            }`}
            onClick={handleLikePost}>
            {isLiked ? (
              <LikeHeartIcon
                className={`hover:stroke-gray115 cursor-pointer  text-red-500 ${
                  orientation === "horizontal" ? "w-[22px] h-[22px]" : "w-6 h-6"
                }`}
              />
            ) : (
              <LikeHeartIcon
                className={`hover:stroke-gray115 ${
                  !authCanUse || !reelReact.active ? "" : "cursor-pointer"
                } text-black ${orientation === "horizontal" ? "w-[22px] h-[22px]" : "w-6 h-6"}`}
              />
            )}
          </button>
          {reelReact.is_hide_like === false ? (
            <div
              className={`${
                orientation === "horizontal"
                  ? "text-sm pl-2 pr-4 text-gray-800 font-semibold cursor-pointer"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                setModalData(reelReact);
                modalOpen(LikesModalKey);
              }}>
              {totalLiked}
            </div>
          ) : (
            <div className="mx-3 my-3"></div>
          )}
        </div>

        {reelReact.is_hide_comment === false &&
          (orientation === "horizontal" ? (
            <div className="pb-4 text-center flex items-center">
              <button
                className={`rounded-full bg-gray-200 p-2 ${!authCanUse || !reelReact.active ? "" : "cursor-pointer"}`}
                disabled={!authCanUse || !reelReact.active}>
                <MessageCircleIcon width={22} height={22} fill="#00000" />
              </button>
              <span className="text-sm pl-2 pr-4 text-gray-800 font-semibold">{reelReact.post_comments?.length}</span>
            </div>
          ) : (
            <Link href={`/r/${reelReact.id}`}>
              <button className="rounded-full bg-gray-200 p-3 cursor-pointer mb-1 active:bg-gray-300 border-none">
                <MessageCircleIcon width={23} height={23} fill="#00000" />
              </button>
              <span>{reelReact.post_comments?.length}</span>
            </Link>
          ))}

        {reelReact.user_id !== authData?.id &&
          (orientation === "horizontal" ? (
            <div className="pb-4 text-center flex items-center">
              <button
                className={`rounded-full bg-gray-200 p-2 ${!authCanUse || !reelReact.active ? "" : "cursor-pointer"}`}
                disabled={!authCanUse || !reelReact.active}
                onClick={handleSavePost}>
                {isSaved ? (
                  <SavedBookMarkReelsCommentIcon width={22} height={2} fill="#00000" />
                ) : (
                  <BookMarkReelsCommentIcon width={22} height={2} fill="#00000" />
                )}
              </button>
              <span className="text-sm pl-2 pr-4 text-gray-800 font-semibold">{totalSaved}</span>
            </div>
          ) : (
            <div>
              <button
                className="rounded-full bg-gray-200 p-3 cursor-pointer mb-1 active:bg-gray-300"
                onClick={handleSavePost}>
                {isSaved ? (
                  <SavedBookMarkReelsIcon width={22} height={22} fill="#00000" />
                ) : (
                  <BookMarkReelsIcon width={22} height={22} fill="#00000" />
                )}
              </button>
              <span className="">{totalSaved}</span>
            </div>
          ))}

        {orientation === "horizontal" ? (
          <div className="pb-4 text-center flex items-center">
            <button
              className={`rounded-full bg-gray-200 p-2 ${!authCanUse || !reelReact.active ? "" : "cursor-pointer"}`}
              disabled={!authCanUse || !reelReact.active}
              onClick={() => {
                setModalData(reelReact);
                modalOpen(ShareModalKey);
              }}>
              <ShareReelsIcon width={22} height={22} />
            </button>
          </div>
        ) : (
          <div>
            <button
              className="rounded-full bg-gray-200 p-3 cursor-pointer mb-1 active:bg-gray-300"
              onClick={() => {
                setModalData(reelReact);
                modalOpen(ShareModalKey);
              }}>
              <ShareReelsIcon width={22} height={22} />
            </button>
          </div>
        )}
      </div>
    </>
  );
});

export default ReelReact;
