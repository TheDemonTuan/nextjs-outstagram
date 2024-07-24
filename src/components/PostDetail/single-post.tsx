import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Avatar, Tooltip } from "@nextui-org/react";
import { PiDotsThreeBold } from "react-icons/pi";
import CommentForm from "./comment-form";
import Comment from "./comment";
import Image from "next/image";
import SummaryProfile from "../summary-profile";
import MiniPost from "./mini-post";
import { useEffect, useMemo } from "react";
import { PostType, postGetByPostId, postKey } from "@/api/post";
import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "@/lib/graphql";
import { notFound } from "next/navigation";
import { Friend, Post, PostByPostIdDocument, PostLike } from "@/gql/graphql";
import UserProfileInfo from "../user-profile-info";
import PostMoreOptions, { PostMoreOptionsModalKey } from "../Post/post-more-options";
import { useModalStore } from "@/stores/modal-store";
import PostLikes, { LikesModalKey } from "../Post/post-likes";
import { SinglePostSkeleton } from "../skeletons";
import PostReact from "../Post/post-react";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import Carousel from "../Post/carousel";
import LikesView from "../likes-view";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "../ui/card";
import ShareModal from "../Post/share-modal";
import CommentMoreOptions from "./comment-more-options";

const SinglePost = ({ id }: { id: string }) => {
  const { modalOpen, setModalData } = useModalStore();
  const { authData, authCanUse } = useAuth();
  const {
    data: postData,
    error: postError,
    isLoading: postIsLoading,
  } = useQuery({
    queryKey: [postKey, { id }],
    queryFn: () => graphQLClient.request(PostByPostIdDocument, { postID: id }),
    enabled: !!id,
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
    return <SinglePostSkeleton />;
  }

  if (!postData) {
    return <div>User not found</div>;
  }

  if (postData.postByPostId.type !== PostType.DEFAULT) {
    return notFound();
  }

  return (
    <>
      <Card className="max-w-3xl lg:max-w-4xl hidden md:flex mx-auto mt-9 rounded-none shadow-none">
        <div className="relative overflow-hidden h-[600px] max-w-sm lg:max-w-lg w-full flex items-center justify-center bg-black">
          {postData?.postByPostId.post_files?.length ? (
            <Carousel
              slides={postData?.postByPostId.post_files.map((file) => {
                return {
                  id: file?.id ?? "",
                  url: file?.url ?? "",
                  className: "h-[600px] w-full object-cover md:rounded-l-none md:rounded-r-none",
                };
              })}
              type={postData.postByPostId.type ?? PostType.DEFAULT}
            />
          ) : null}
        </div>

        <div className="flex max-w-sm flex-col flex-1 lg:max-w-lg w-full h-[600px]">
          <div className="flex items-center justify-between border-b px-3 py-3">
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
              <div className="flex flex-row items-center gap-3 font-semibold text-[13px] leading-[18px]">
                <UserProfileInfo
                  username={postData.postByPostId.user?.username || ""}
                  full_name={""}
                  isShowFullName={false}
                  className="w-9 h-9"
                  avatar={getUserAvatarURL(postData.postByPostId.user?.avatar)}
                  is_admin={postData.postByPostId.user?.role || false}
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
          <div className="hidden md:inline py-1.5 overflow-y-auto max-h-[360px]">
            <MiniPost post={postData.postByPostId} />
            {(postData.postByPostId.post_comments && postData.postByPostId.post_comments?.length <= 0) ||
            postData.postByPostId.is_hide_comment === true ? (
              <div className="flex flex-col items-center gap-1.5 h-[250px] justify-center">
                <p className="text-xl lg:text-2xl font-extrabold">No comments yet.</p>
                <p className="text-sm font-medium">Start the conversation.</p>
              </div>
            ) : (
              <div className="flex flex-col">
                <Comment
                  comments={postData.postByPostId.post_comments}
                  commentLikes={postData.postByPostId.post_comment_likes}
                  postID={postData.postByPostId.id}
                />
              </div>
            )}
          </div>

          <div className="px-5 py-4 hidden md:block mt-auto border-b border-t p-2.5 space-y-3 sticky z-20">
            {authCanUse ? (
              <>
                <PostReact
                  postReact={postData.postByPostId as Post}
                  isLiked={isLiked ?? false}
                  isSaved={isSaved ?? false}
                />
                <div className="flex flex-col">
                  <LikesView
                    post={postData.postByPostId as Post}
                    current_userID={authData?.id || ""}
                    likesModalKey={LikesModalKey}
                  />

                  <time className="text-[12px] text-zinc-500 font-medium">
                    {new Date(postData.postByPostId.created_at || "").toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </>
            ) : (
              <p className="flex items-center justify-center my-16 text-md font-medium text-gray-400">
                <Link href="/login" className="text-[#0497F6] mr-1">
                  Log in{" "}
                </Link>{" "}
                to like or comment on this post.
              </p>
            )}
          </div>
          {authCanUse && postData.postByPostId.is_hide_comment === false && <CommentForm postId={id} />}
        </div>
      </Card>
      {/* <div className="md:hidden"><Post post={post} /></div> */}
      <PostMoreOptions isGoToPost={true} />
      <PostLikes />
      <ShareModal />
      <CommentMoreOptions userId={postData.postByPostId.user_id} />
    </>
  );
};

export default SinglePost;
