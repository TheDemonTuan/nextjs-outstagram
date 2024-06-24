import React, { useState } from "react";
import { Divider, Spinner, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { PiDotsThreeBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { PostByPostIdQuery } from "@/gql/graphql";
import { formatDistanceToNow } from "date-fns";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useCommentStore } from "@/stores/comment-store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SummaryProfile from "../summary-profile";
import { UserResponse } from "@/api/user";
import { NIL as NIL_UUID } from "uuid";
import CommentReply from "./comment-reply";

const ViewComments = ({ comments }: { comments: PostByPostIdQuery["postByPostId"]["post_comments"] }) => {
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);
  const { setParentID, setContent, setReplyUsername } = useCommentStore();

  return (
    <div className="flex flex-col">
      {comments?.map((comment) => {
        if (comment?.parent_id && comment?.parent_id !== NIL_UUID) return null;
        const replyComments = comments.filter((c) => c?.parent_id === comment?.id);

        return (
          <div key={comment?.id}>
            <div
              className="group p-3 px-3.5 flex items-start justify-between space-x-2.5 w-full"
              onMouseEnter={() => setHoveredCommentId(comment?.id || "")}
              onMouseLeave={() => setHoveredCommentId(null)}>
              <div className="flex items-start">
                <Tooltip
                  content={comment?.user && <SummaryProfile user={comment.user as UserResponse} />}
                  placement="bottom-start">
                  <Link href={`/${comment?.user.username}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={getUserAvatarURL(comment?.user?.avatar)} />
                      <AvatarFallback>
                        <Spinner size="sm" />
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </Tooltip>

                <div className="space-y-1 mx-3">
                  <div className="flex items-center space-x-1 text-[13px] leading-[18px]">
                    <div>
                      <Link href={`/${comment?.user.username}`} className="font-semibold hover:text-neutral-300">
                        {comment?.user?.username}
                      </Link>{" "}
                      <span className="font-normal text-black">{comment?.content}</span>
                    </div>
                  </div>
                  <div className="flex h-5 items-center space-x-2.5">
                    <span className="text-xs text-gray-500">
                      {comment?.created_at
                        ? formatDistanceToNow(comment?.created_at, { addSuffix: true })
                        : "Unknown time"}
                    </span>
                    <button className="text-xs font-semibold text-neutral-500">0 likes</button>
                    <button
                      className="text-xs font-semibold text-neutral-500"
                      onClick={() => {
                        setContent(`@${comment?.user.username} `);
                        setParentID(comment?.id || "");
                        setReplyUsername(comment?.user.username || "");
                      }}>
                      Reply
                    </button>
                    {hoveredCommentId === comment?.id && (
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
            {CommentReply({ replyComments, commentID: comment?.id || "" })}
          </div>
        );
      })}
    </div>
  );
};

export default ViewComments;
