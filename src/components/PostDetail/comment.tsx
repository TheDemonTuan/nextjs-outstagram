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

const ViewComments = ({ comments }: { comments: PostByPostIdQuery["postByPostId"]["post_comments"] }) => {
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);
  const { setParentID, setContent, setReplyUsername } = useCommentStore();
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>({});

  return (
    <div className="flex flex-col">
      {comments?.map((comment) => {
        const replyComments = comments.filter((c) => c?.parent_id === comment?.id);
        if (comment?.parent_id) return null;

        return (
          <div key={comment?.id}>
            <div
              className="group p-3 px-3.5 flex flex-row items-start justify-between space-x-2.5 w-full"
              onMouseEnter={() => setHoveredCommentId(comment?.id || "")}
              onMouseLeave={() => setHoveredCommentId(null)}>
              <div className="flex flex-row items-center">
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
                    <Link href={`/${comment?.user.username}`} className="font-semibold hover:text-neutral-300">
                      {comment?.user?.username}
                    </Link>

                    <p className="font-normal text-black">{comment?.content}</p>
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
            {replyComments?.length > 0 && (
              <div className="flex flex-col ml-16">
                <div className="flex flex-row items-center my-2">
                  <Divider className="w-6 bg-black h-[0.1px]" />
                  <div className="ml-4 text-xs font-semibold text-neutral-500">
                    <button
                      className="text-xs font-semibold text-neutral-500 active:text-neutral-300"
                      onClick={() => {
                        if (comment) {
                          setShowReplies((prev) => ({
                            ...prev,
                            [comment.id]: !prev[comment.id],
                          }));
                        }
                      }}>
                      {comment && showReplies[comment.id] ? "Hide replies" : `View replies (${replyComments?.length})`}
                    </button>
                  </div>
                </div>
                {comment && showReplies[comment.id] && (
                  <>
                    {replyComments?.map((reply, index) => (
                      <div
                        key={reply?.id || index}
                        className="group flex flex-row items-start justify-between space-x-2.5 w-full my-3 pr-3.5"
                        onMouseEnter={() => setHoveredCommentId(reply?.id || "")}
                        onMouseLeave={() => setHoveredCommentId(null)}>
                        <div className="flex flex-row items-center">
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
                          <div className="space-y-1 mx-3">
                            <div className="flex items-center space-x-1.5 text-[13px] leading-[18px]">
                              <Link href={`/${reply?.user.username}`} className="font-semibold hover:text-neutral-300">
                                {reply?.user.username}
                              </Link>

                              <p className="font-normal text-black">
                                <Link href={`/${comment?.user.username}`} className="text-sky-600">
                                  @{comment?.user.username}
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
                                  setContent(`@${reply?.parent?.user.username} `);
                                  setParentID(comment?.id || "");
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
                    <></>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ViewComments;
