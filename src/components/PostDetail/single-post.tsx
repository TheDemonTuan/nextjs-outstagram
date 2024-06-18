import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Avatar, Tooltip } from "@nextui-org/react";
import { PiDotsThreeBold } from "react-icons/pi";
import { Card } from "../ui/card";
import CommentForm from "./comment-form";
import Image from "next/image";
import SummaryProfile from "../summary-profile";
import MiniPost from "./mini-post";
import { useEffect } from "react";
import { postGetByPostId, postKey } from "@/api/post";
import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "@/lib/graphql";
import { notFound } from "next/navigation";
import { PostByPostIdDocument } from "@/gql/graphql";
import UserProfileInfo from "../user-profile-info";
import PostMoreOptions, { PostMoreOptionsModalKey } from "../Post/post-more-options";
import { useModalStore } from "@/stores/modal-store";
import Likes, { LikesModalKey } from "../Post/likes";
import { SinglePostSkeleton } from "../skeletons";
import PostReact from "../Post/post-react";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import Carousel from "../Post/carousel";

const SinglePost = ({ id }: { id: string }) => {
  const { modalOpen, setModalData } = useModalStore();
  const {
    data: postData,
    error: postError,
    isLoading: postIsLoading,
  } = useQuery({
    queryKey: [postKey, { id }],
    queryFn: () => graphQLClient.request(PostByPostIdDocument, { postID: id }),
    enabled: !!id,
  });

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

  return (
    <>
      <Card className="max-w-3xl lg:max-w-4xl hidden md:flex mx-auto mt-9 rounded-none shadow-none">
        <div className="relative overflow-hidden h-[600px] max-w-sm lg:max-w-lg w-full">
          {postData?.postByPostId.post_files?.length ? (
            <Carousel
              slides={postData?.postByPostId.post_files.map((file) => {
                return {
                  id: file?.id ?? "",
                  url: file?.url ?? "",
                  type: file?.type === "1" ? 1 : 0,
                  className: "h-[600px] w-full object-cover md:rounded-l-none md:rounded-r-none",
                };
              })}
            />
          ) : null}
        </div>

        <div className="flex max-w-sm flex-col flex-1">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <Tooltip>
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
            <span
              onClick={() => {
                setModalData(postData);
                modalOpen(PostMoreOptionsModalKey);
              }}>
              <PiDotsThreeBold className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5 flex-1 justify-center">
            <p className="text-xl lg:text-2xl font-extrabold">No comments yet.</p>
            <p className="text-sm font-medium">Start the conversation.</p>
          </div>

          {/* {post.comments.length > 0 && (
            <ScrollArea className="hidden md:inline py-1.5 flex-1">
              <MiniPost post={postData.postByPostId} />
              {post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </ScrollArea>
          )} */}

          <div className="px-2 hidden md:block mt-auto border-y p-2.5">
            <PostReact postID={id} isLiked />
            <div className="flex flex-col">
              <span className="font-semibold text-sm cursor-pointer" onClick={() => modalOpen(LikesModalKey)}>
                1 likes
              </span>
              <time className="text-[12px] text-zinc-500 font-medium">
                {new Date(postData.postByPostId.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
          <CommentForm postId={id} />
        </div>
      </Card>
      {/* <div className="md:hidden"><Post post={post} /></div> */}
      <PostMoreOptions />
      <Likes />
    </>
  );
};

export default SinglePost;
