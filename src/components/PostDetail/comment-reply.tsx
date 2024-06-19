import { PostByPostIdQuery } from "@/gql/graphql";
import { Divider, Spinner, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import SummaryProfile from "../summary-profile";
import { UserResponse } from "@/api/user";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { PiDotsThreeBold } from "react-icons/pi";
import { formatDistanceToNow } from "date-fns";
import { FaRegHeart } from "react-icons/fa6";
import { useCommentStore } from "@/stores/comment-store";

const CommentReply = ({
  replyComments,
  commentID,
}: {
  replyComments: PostByPostIdQuery["postByPostId"]["post_comments"];
  commentID: string;
}) => {
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>({});
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);
  const { setParentID, setContent, setReplyUsername } = useCommentStore();

  if (!replyComments?.length) {
    return null;
  }

  return (
    <div className="flex flex-col ml-16">
      <div className="flex flex-row items-center my-2">
        <Divider className="w-6 bg-black h-[0.1px]" />
        <div className="ml-4 text-xs font-semibold text-neutral-500">
          <button
            className="text-xs font-semibold text-neutral-500 active:text-neutral-300"
            onClick={() => {
              replyComments?.length &&
                setShowReplies((prev) => ({
                  ...prev,
                  [commentID]: !prev[commentID],
                }));
            }}>
            {!!replyComments?.length && showReplies[commentID]
              ? "Hide replies"
              : `View replies (${replyComments?.length})`}
          </button>
        </div>
      </div>
      {!!replyComments?.length && showReplies[commentID] && (
        <>
          {replyComments?.map((reply, index) => (
            <div
              key={reply?.id || index}
              className="group flex items-start justify-between space-x-2.5 w-full my-3 pr-3.5"
              onMouseEnter={() => setHoveredCommentId(reply?.id || "")}
              onMouseLeave={() => setHoveredCommentId(null)}>
              <div className="flex items-center">
                <Tooltip
                  content={reply?.user && <SummaryProfile user={reply.user as UserResponse} />}
                  placement="bottom-start">
                  <Link href={`/${reply?.user.username}`} className="hover:text-neutral-300">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={getUserAvatarURL(reply?.user?.avatar)} />
                      <AvatarFallback>
                        <Spinner size="sm" />
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </Tooltip>
                <div className="mx-3">
                  <div className="flex items-center space-x-1.5 text-[13px] leading-[18px]">
                    <Link href={`/${reply?.user.username}`} className="font-semibold hover:text-neutral-300">
                      {reply?.user.username}
                    </Link>

                    <p className="font-normal text-black">
                      <Link href={`/${reply?.user.username}`} className="text-sky-600">
                        @{reply?.parent?.user.username}
                      </Link>{" "}
                      {reply?.content}
                    </p>
                  </div>
                  <div className="flex h-5 items-center space-x-2.5">
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(reply?.created_at ?? new Date()), {
                        addSuffix: true,
                      })}
                    </span>
                    <button className="text-xs font-semibold text-neutral-500">0 likes</button>
                    <button
                      className="text-xs font-semibold text-neutral-500"
                      onClick={() => {
                        setContent(`@${reply?.user.username} `);
                        setParentID(reply?.id || "");
                        setReplyUsername(reply?.user.username || "");
                      }}>
                      Reply
                    </button>
                    {hoveredCommentId === reply?.id && (
                      <PiDotsThreeBold
                        className="w-6 h-6 hover:stroke-gray115 cursor-pointer items-end"
                        stroke="#858585"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="items-center mt-3">
                <FaRegHeart size={12} />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CommentReply;
