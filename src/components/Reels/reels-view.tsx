"use client";
import { useModalStore } from "@/stores/modal-store";
import { Card, Modal, ModalContent } from "@nextui-org/react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { TfiMoreAlt } from "react-icons/tfi";
import ReelsCommentsHeader from "./reels-comment-header";
import ReelsComments from "./reels-comments";
import { useQuery } from "@tanstack/react-query";
import { postKey } from "@/api/post";
import { PostByPostIdDocument } from "@/gql/graphql";
import { graphQLClient } from "@/lib/graphql";
import { ViewPostSkeleton } from "../skeletons";
import { useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";

const ReelsView = ({ id }: { id: string }) => {
  const { modalOpen, setModalData, modalKey, modalClose } = useModalStore();
  const router = useRouter();
  const { authData } = useAuth();

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

  useEffect(() => {
    if (reelError) {
      notFound();
    }
  }, [reelError]);

  if (reelIsLoading) {
    return <ViewPostSkeleton />;
  }

  if (!reelData) {
    return <div>Post not found</div>;
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
          <div className="lg:flex justify-between w-full h-screen bg-black">
            <div className="lg:w-[calc(100%-540px)] h-full relative">
              <button
                onClick={() => {
                  modalClose();
                  router.back();
                }}
                className="absolute text-white z-20 m-5 rounded-full bg-gray-400 bg-opacity-40 p-1.5 hover:bg-gray-800">
                <AiOutlineClose size="27" />
              </button>

              <button
                onClick={() => loopThroughPostsUp()}
                className="absolute z-20 right-4 top-6  flex items-center justify-center rounded-full bg-gray-400 bg-opacity-40  p-1.5 hover:bg-gray-800">
                <TfiMoreAlt size="30" color="#FFFFFF" className="p-1" />
              </button>

              <div className="absolute z-20 right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
                <button
                  onClick={() => loopThroughPostsUp()}
                  className="flex items-center justify-center rounded-full bg-gray-400 bg-opacity-40 p-1.5 hover:bg-gray-800">
                  <BiChevronUp size="30" color="#FFFFFF" />
                </button>

                <button
                  onClick={() => loopThroughPostsDown()}
                  className="flex items-center justify-center rounded-full bg-gray-400 bg-opacity-40 p-1.5 hover:bg-gray-800">
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
              id="InfoSection"
              className="lg:max-w-[550px] relative w-full h-full bg-white 
              overflow-y-auto scrollbar-hide
              ">
              <div className="pt-5 border-b-1">
                <ReelsCommentsHeader reelHeaderData={reelData} isLiked={isLiked ?? false} />
              </div>

              <ReelsComments reelComments={reelData.postByPostId.post_comments} postId={reelData.postByPostId.id} />
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReelsView;
