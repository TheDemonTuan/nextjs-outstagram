"use client";
import { useModalStore } from "@/stores/modal-store";
import { Card, Modal, ModalContent } from "@nextui-org/react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { TfiMoreAlt } from "react-icons/tfi";
import ReelsCommentsHeader from "./reels-comment-header";
import { useQuery } from "@tanstack/react-query";
import { PostType, postKey } from "@/api/post";
import { PostByPostIdDocument } from "@/gql/graphql";
import { graphQLClient } from "@/lib/graphql";
import { ReelDetailSkeleton } from "../skeletons";
import { useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import CommentForm from "../PostDetail/comment-form";
import ViewComments from "../PostDetail/comment";
import PostMoreOptions, { PostMoreOptionsModalKey } from "../Post/post-more-options";
import ShareModal from "../Post/share-modal";
import PostLikes from "../Post/post-likes";
import CommentMoreOptions from "../PostDetail/comment-more-options";

const ReelsView = ({ id }: { id: string }) => {
  const { modalOpen, setModalData, modalKey, modalClose } = useModalStore();
  const router = useRouter();
  const { authData, authCanUse } = useAuth();

  const {
    data: reelData,
    error: reelError,
    isLoading: reelIsLoading,
  } = useQuery({
    queryKey: [postKey, { id }],
    queryFn: () => graphQLClient.request(PostByPostIdDocument, { postID: id }),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  const postLikesFilter = useMemo(() => {
    return reelData?.postByPostId.post_likes?.filter((like) => like?.is_liked);
  }, [reelData?.postByPostId.post_likes]);

  const isLiked = useMemo(() => {
    return postLikesFilter?.some((like) => like?.user_id === authData?.id);
  }, [postLikesFilter, authData]);

  const isSaved = useMemo(() => {
    return reelData?.postByPostId.post_saves?.some((save) => save?.user_id === authData?.id);
  }, [authData?.id, reelData?.postByPostId?.post_saves]);

  useEffect(() => {
    if (reelError) {
      notFound();
    }
  }, [reelError]);

  if (reelIsLoading) {
    return <ReelDetailSkeleton />;
  }

  if (!reelData) {
    notFound();
  }

  if (reelData.postByPostId.type !== PostType.REEL) {
    notFound();
  }

  const loopThroughPostsUp = () => {
    console.log("loopThroughPostsUp");
  };
  const loopThroughPostsDown = () => {
    console.log("loopThroughPostsDown");
  };

  return (
    <>
      <Modal
        size="full"
        isOpen={true}
        defaultOpen={true}
        onOpenChange={(open: boolean) => {
          if (!open) {
            modalClose();
            router.back();
          }
        }}
        radius="lg">
        <ModalContent>
          <div className="lg:flex justify-between w-full h-screen bg-black overflow-auto">
            <div className="lg:w-[calc(100%-540px)] h-full relative">
              <button
                onClick={() => {
                  modalClose();
                  router.back();
                }}
                className="absolute text-white z-20 m-5 rounded-full bg-gray-400 bg-opacity-40 p-1.5 hover:bg-opacity-80">
                <AiOutlineClose size="27" />
              </button>
              {authCanUse && (
                <button
                  onClick={() => {
                    setModalData(reelData.postByPostId);
                    modalOpen(PostMoreOptionsModalKey);
                  }}
                  className="absolute z-20 right-4 top-6  flex items-center justify-center rounded-full bg-gray-400 bg-opacity-40  p-1.5 hover:bg-opacity-80">
                  <TfiMoreAlt size="30" color="#FFFFFF" className="p-1" />
                </button>
              )}

              <div className="absolute z-20 right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
                <button
                  onClick={() => loopThroughPostsUp()}
                  className="flex items-center justify-center rounded-full bg-gray-400 bg-opacity-40 p-1.5 hover:bg-opacity-80">
                  <BiChevronUp size="30" color="#FFFFFF" />
                </button>

                <button
                  onClick={() => loopThroughPostsDown()}
                  className="flex items-center justify-center rounded-full bg-gray-400 bg-opacity-40 p-1.5 hover:bg-opacity-80">
                  <BiChevronDown size="30" color="#FFFFFF" />
                </button>
              </div>

              <div>
                {reelData?.postByPostId?.post_files && reelData?.postByPostId?.post_files.length > 0 && (
                  <video
                    className="fixed object-cover w-full my-auto z-[0] h-screen"
                    src={reelData.postByPostId.post_files[0]?.url || ""}
                  />
                )}
                {reelData?.postByPostId?.post_files && reelData?.postByPostId?.post_files.length > 0 && (
                  <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
                    <video
                      autoPlay
                      controls
                      loop
                      muted
                      className="h-screen mx-auto"
                      src={reelData.postByPostId.post_files[0]?.url || ""}
                    />
                  </div>
                )}
              </div>
            </div>

            <div
              className="lg:max-w-[550px] relative w-full h-full bg-white 
              overflow-y-auto scrollbar-hide
              ">
              {/* ReelHeader */}
              <div className="pt-5 border-b-1">
                <ReelsCommentsHeader reelHeaderData={reelData} isLiked={isLiked ?? false} isSaved={isSaved ?? false} />
              </div>

              {/* ReelComment */}
              <div className="relative z-0 w-full h-[calc(100%-273px)] overflow-y-auto scrollbar-hide cursor-pointer">
                {reelData.postByPostId.post_comments &&
                reelData.postByPostId.post_comments?.length > 0 &&
                reelData.postByPostId.is_hide_comment === false ? (
                  <div className="mx-6 mt-5">
                    <ViewComments
                      comments={reelData.postByPostId.post_comments}
                      commentLikes={reelData.postByPostId.post_comment_likes}
                      postID={reelData.postByPostId.id}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 h-[250px] justify-center">
                    <p className="text-xl lg:text-2xl font-extrabold">No comments yet.</p>
                    <p className="text-sm font-medium">Start the conversation.</p>
                  </div>
                )}
                <div className="mb-5" />
              </div>
              {authCanUse ? (
                reelData.postByPostId.is_hide_comment === false && (
                  <div className="flex items-center bottom-0 justify-between bg-white lg:max-w-[550px] w-full py-5 px-8 border-t-1 sticky z-50">
                    <div className="rounded-lg w-full lg:max-w-[500px] border-1 mt-auto">
                      <CommentForm postId={reelData.postByPostId.id} />
                    </div>
                  </div>
                )
              ) : (
                <div className="flex items-center bottom-0 justify-between bg-white lg:max-w-[550px] w-full py-5 px-8 border-t-1 sticky z-50">
                  <div className="w-full flex items-center justify-center text-sm font-semibold text-gray-500">
                    <Link href="/login" className="text-[#F02C56] mr-1">
                      Log in{" "}
                    </Link>
                    to like or comment on this reel.
                  </div>
                </div>
              )}
            </div>
          </div>
        </ModalContent>
      </Modal>

      <PostMoreOptions isGoToPost={true} />
      <ShareModal />
      <PostLikes />
      <CommentMoreOptions userId={reelData.postByPostId.user_id} />
    </>
  );
};

export default ReelsView;
