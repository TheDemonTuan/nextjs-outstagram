import { PostType, postKey } from "@/api/post";
import { Friend, Post, PostByPostIdDocument, PostLike } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { graphQLClient } from "@/lib/graphql";
import { useModalStore } from "@/stores/modal-store";
import { Card, Modal, ModalContent, Tooltip } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import Carousel from "../Post/carousel";
import LikesView from "../likes-view";
import PostLikes, { LikesModalKey } from "../Post/post-likes";
import PostMoreOptions, { PostMoreOptionsModalKey } from "../Post/post-more-options";
import PostReact from "../Post/post-react";
import { ViewPostSkeleton } from "../skeletons";
import SummaryProfile from "../summary-profile";
import UserProfileInfo from "../user-profile-info";
import Comment from "./comment";
import CommentForm from "./comment-form";
import MiniPost from "./mini-post";
import Link from "next/link";
import ShareModal from "../Post/share-modal";
import CommentMoreOptions from "./comment-more-options";
import PostCommentLikes from "../Post/post-comment-likes";

function PostView({ id }: { id: string }) {
  const { modalOpen, setModalData, modalKey } = useModalStore();
  const router = useRouter();
  const { authData, authCanUse } = useAuth();

  const {
    data: postData,
    error: postError,
    isLoading: postIsLoading,
  } = useQuery({
    queryKey: [postKey, { id }],
    queryFn: () => graphQLClient.request(PostByPostIdDocument, { postID: id }),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  const postLikesFilter = useMemo(() => {
    return postData?.postByPostId.post_likes?.filter((like) => like?.is_liked);
  }, [postData?.postByPostId.post_likes]);

  const isLiked = useMemo(() => {
    return postLikesFilter?.some((like) => like?.user_id === authData?.id);
  }, [postLikesFilter, authData]);

  const isSaved = useMemo(() => {
    return postData?.postByPostId.post_saves?.some((save) => save?.user_id === authData?.id);
  }, [authData?.id, postData?.postByPostId?.post_saves]);

  useEffect(() => {
    if (postError) {
      notFound();
    }
  }, [postError]);

  if (postIsLoading) {
    return <ViewPostSkeleton />;
  }

  if (!postData) {
    notFound();
  }

  if (postData.postByPostId.type !== PostType.DEFAULT) {
    notFound();
  }

  if (!authData?.role) {
    if (!postData.postByPostId.active || !postData.postByPostId.user?.active) {
      notFound();
    }
  } else {
    if (!postData.postByPostId.user?.active) {
      notFound();
    }
  }

  return (
    <>
      <Modal isOpen={true} defaultOpen={true} onOpenChange={(open: boolean) => !open && router.back()} radius="lg">
        <ModalContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-full max-h-[300px] lg:max-h-[500px] xl:max-h-[700px] rounded-r-md rounded-l-none">
          <Card className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-lg rounded-r-none rounded-l-md">
            <div className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-3.5 pl-3.5 pr-5 justify-between">
              <Tooltip
                delay={1000}
                content={
                  postData.postByPostId && (
                    <SummaryProfile
                      username={postData.postByPostId.user?.username || ""}
                      full_name={postData.postByPostId.user?.full_name || ""}
                      avatar={postData.postByPostId.user?.avatar || ""}
                      role={postData.postByPostId.user?.role || false}
                      posts={[]}
                      friends={postData.postByPostId.user?.friends as Friend[]}
                      is_private={postData.postByPostId.user?.is_private || false}
                    />
                  )
                }
                placement="bottom-start"
                className="rounded-md shadow-lg"
                isDisabled={!authCanUse}>
                <div className="flex flex-row items-center gap-3 px-1">
                  <UserProfileInfo
                    username={postData?.postByPostId.user?.username || ""}
                    full_name={""}
                    isShowFullName={false}
                    className="w-8 h-8"
                    avatar={getUserAvatarURL(postData?.postByPostId.user?.avatar)}
                    is_admin={postData?.postByPostId.user?.role ?? false}
                  />
                </div>
              </Tooltip>
              {authCanUse && (
                <span
                  onClick={() => {
                    setModalData(postData.postByPostId);
                    modalOpen(PostMoreOptionsModalKey);
                  }}>
                  <PiDotsThreeBold className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
                </span>
              )}
            </div>

            <div
              className={`hidden md:inline border-b py-1.5 px-1  overflow-y-auto ${
                authCanUse && postData.postByPostId.is_hide_comment === false ? " h-[500px]" : "h-[600px]"
              }`}>
              <MiniPost post={postData.postByPostId} />
              {authCanUse && postData.postByPostId.is_hide_comment === false ? (
                <div className="flex flex-col">
                  <Comment
                    comments={postData?.postByPostId.post_comments}
                    commentLikes={postData?.postByPostId.post_comment_likes}
                    postID={postData.postByPostId.id}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1.5 h-[400px] justify-center">
                  <p className="text-xl lg:text-2xl font-extrabold">No comments yet.</p>
                  <p className="text-sm font-medium">Start the conversation.</p>
                </div>
              )}
            </div>

            <div className="px-5 py-4 hidden md:block mt-auto border-b p-2.5 space-y-3">
              {!postData.postByPostId.active ? (
                <p className="flex items-center justify-center my-5 text-sm font-semibold text-red-600 h-14">
                  Post are being blocked
                </p>
              ) : !authCanUse ? (
                <p className="flex items-center justify-center my-5 text-sm font-semibold text-gray-500 h-14">
                  <Link href="/login" className="text-[#0497F6] mr-1">
                    Log in{" "}
                  </Link>{" "}
                  to like or comment on this post.
                </p>
              ) : (
                <>
                  <PostReact
                    postReact={postData.postByPostId as Post}
                    isLiked={isLiked ?? false}
                    isSaved={isSaved ?? false}
                  />

                  <div className="flex flex-col space-y-1">
                    <LikesView
                      post={postData.postByPostId as Post}
                      current_userID={authData?.id || ""}
                      likesModalKey={LikesModalKey}
                    />

                    <span
                      className="text-xs text-gray-500 cursor-pointer active:text-gray-300"
                      onClick={() => window.location.reload()}>
                      {" "}
                      {formatDistanceToNow(postData.postByPostId.created_at || "", {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </>
              )}
            </div>
            {authCanUse && postData.postByPostId.is_hide_comment === false && postData.postByPostId.active && (
              <CommentForm postId={postData.postByPostId.id} />
            )}
          </Card>
          <Card className="relative h-full max-h-[300px] lg:max-h-[500px] xl:max-h-[700px] max-w-3xl w-full flex justify-center items-center bg-black rounded-none">
            {postData.postByPostId?.post_files?.length ? (
              <Carousel
                slides={postData.postByPostId.post_files.map((file) => {
                  return {
                    id: file?.id ?? "",
                    url: file?.url ?? "",
                    className: "max-h-[300px] lg:max-h-[500px] xl:max-h-[700px] w-full object-cover",
                  };
                })}
                type={postData.postByPostId.type ?? PostType.DEFAULT}
              />
            ) : null}
          </Card>
        </ModalContent>
      </Modal>
      <PostMoreOptions isPostDetail={true} />
      <PostLikes />
      <ShareModal />
      <CommentMoreOptions userId={postData.postByPostId.user_id} />
      <PostCommentLikes />
    </>
  );
}

export default PostView;
