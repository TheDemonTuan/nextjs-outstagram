import React, { memo, useCallback, useMemo, useState } from "react";
import { Divider, Spinner, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { PiDotsThreeBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { Friend, PostByPostIdQuery } from "@/gql/graphql";
import { formatDistanceToNow } from "date-fns";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useCommentStore } from "@/stores/comment-store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SummaryProfile from "../summary-profile";
import { NIL as NIL_UUID } from "uuid";
import { useAuth } from "@/hooks/useAuth";
import { VerifiedIcon } from "@/icons";

const ViewComments = ({ comments }: { comments: PostByPostIdQuery["postByPostId"]["post_comments"] }) => {
  const { authData, authCanUse } = useAuth();
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);
  const { setParentID, setContent, setReplyUsername } = useCommentStore();
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>({});

  const handleReplyComment = useCallback(
    (id: string, username: string) => {
      setContent(`@${username} `);
      setParentID(id);
      setReplyUsername(username);
    },
    [setContent, setParentID, setReplyUsername]
  );

  return (
    <div className="flex flex-col">
      {comments?.map((comment) => {
        if (!comment) return null;
        if (comment?.parent_id && comment?.parent_id !== NIL_UUID) return null;
        const replyComments = comments?.filter((c) => c?.parent_id === comment?.id);
        const countReplies = (comments: PostByPostIdQuery["postByPostId"]["post_comments"], parentId: string) => {
          let replyCount = 0;

          comments?.forEach((comment) => {
            if (comment?.parent_id === parentId) {
              replyCount++;
              replyCount += countReplies(comments, comment.id);
            }
          });

          return replyCount;
        };

        const totalReplies = countReplies(comments, comment?.id);

        return (
          <div key={comment?.id}>
            <div
              className="group p-3 px-3.5 flex items-start justify-between space-x-2.5 w-full"
              onMouseEnter={() => setHoveredCommentId(comment?.id || "")}
              onMouseLeave={() => setHoveredCommentId(null)}>
              <div className="flex items-start">
                <Tooltip
                  delay={1000}
                  content={
                    comment && (
                      <SummaryProfile
                        username={comment?.user?.username || ""}
                        full_name={comment?.user?.full_name || ""}
                        avatar={comment?.user?.avatar || ""}
                        role={comment?.user?.role || false}
                        posts={[]}
                        friends={comment?.user?.friends as Friend[]}
                      />
                    )
                  }
                  placement="bottom-start"
                  className="rounded-md shadow-lg"
                  isDisabled={!authCanUse}>
                  <Link href={`/${comment?.user?.username}`}>
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
                    <div className="">
                      <Link href={`/${comment?.user?.username}`} className="font-semibold hover:text-neutral-300">
                        {comment?.user?.username}{" "}
                        {comment?.user?.role && (
                          <VerifiedIcon className="w-3 h-3 mb-[0.4px] inline-block items-center" />
                        )}
                      </Link>{" "}
                      <span className="font-normal text-black">{comment?.content}</span>
                    </div>
                  </div>
                  <div className="flex h-5 items-center space-x-2.5">
                    <Link href={`/p/${comment.post_id}/c/${comment.id}`} className="text-xs text-gray-500">
                      {comment?.created_at
                        ? formatDistanceToNow(comment?.created_at, { addSuffix: true })
                        : "Unknown time"}
                    </Link>
                    {authCanUse && (
                      <>
                        <button className="text-xs font-semibold text-neutral-500">0 likes</button>
                        <button
                          className="text-xs font-semibold text-neutral-500"
                          onClick={() => {
                            setContent(`@${comment?.user?.username} `);
                            setParentID(comment?.id || "");
                            setReplyUsername(comment?.user?.username || "");
                          }}>
                          Reply
                        </button>
                        {hoveredCommentId === comment?.id && (
                          <PiDotsThreeBold
                            className="w-6 h-6 hover:stroke-gray115 cursor-pointer items-end"
                            stroke="#858585"
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {authCanUse && (
                <div className="items-center mt-3">
                  <FaRegHeart size={12} />
                </div>
              )}
            </div>
            {!!replyComments.length && (
              <>
                <div className="flex flex-col ml-16">
                  <div className="flex flex-row items-center my-2">
                    <Divider className="w-6 bg-black h-[0.1px]" />
                    <div className="ml-4 text-xs font-semibold text-neutral-500">
                      <button
                        className="text-xs font-semibold text-neutral-500 active:text-neutral-300"
                        onClick={() => {
                          if (totalReplies)
                            setShowReplies((prev) => ({
                              ...prev,
                              [comment.id]: !prev[comment.id],
                            }));
                        }}>
                        {!!totalReplies && showReplies[comment.id] ? "Hide replies" : `View replies (${totalReplies})`}
                      </button>
                    </div>
                  </div>
                  {!!totalReplies && showReplies[comment.id] && (
                    <ReplyBox comments={comments} parentID={comment.id} handleReplyComment={handleReplyComment} />
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ViewComments;

// eslint-disable-next-line react/display-name
const ReplyBox = memo(
  ({
    comments,
    parentID,
    handleReplyComment,
  }: {
    comments: PostByPostIdQuery["postByPostId"]["post_comments"];
    parentID: string;
    handleReplyComment: (id: string, username: string) => void;
  }) => {
    const { authData, authCanUse } = useAuth();
    const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);

    const replyComments = useMemo(() => {
      return comments?.filter((c) => c?.parent_id === parentID);
    }, [comments, parentID]);

    if (!replyComments?.length) {
      return null;
    }

    return (
      <>
        {replyComments.map((reply) => (
          <>
            <div
              className="group flex items-start justify-between space-x-2.5 w-full my-3 pr-3.5"
              onMouseEnter={() => setHoveredCommentId(reply?.id || "")}
              onMouseLeave={() => setHoveredCommentId(null)}>
              <div className="flex items-start">
                <Tooltip
                  delay={1000}
                  content={
                    reply && (
                      <SummaryProfile
                        username={reply?.user?.username || ""}
                        full_name={reply?.user?.full_name || ""}
                        avatar={reply?.user?.avatar || ""}
                        role={reply?.user?.role || false}
                        posts={[]}
                        friends={reply?.user?.friends as Friend[]}
                      />
                    )
                  }
                  placement="bottom-start"
                  className="rounded-md shadow-lg"
                  isDisabled={!authCanUse}>
                  <Link href={`/${reply?.user?.username}`} className="hover:text-neutral-300">
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
                    <div>
                      <Link href={`/${reply?.user?.username}`} className="font-semibold hover:text-neutral-300">
                        {reply?.user?.username}{" "}
                        {reply?.user?.role && (
                          <VerifiedIcon className="w-3 h-3 mr-1 mb-[0.5px] inline-block items-center" />
                        )}
                      </Link>
                      <span className="font-normal text-black space-x-1">
                        <Link href={`/${reply?.user?.username}`} className="text-sky-600">
                          @{reply?.parent?.user?.username}
                        </Link>
                        <span>{reply?.content}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex h-5 items-center space-x-2.5">
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(reply?.created_at ?? new Date()), {
                        addSuffix: true,
                      })}
                    </span>
                    {authCanUse && (
                      <>
                        <button className="text-xs font-semibold text-neutral-500">0 likes</button>
                        <button
                          className="text-xs font-semibold text-neutral-500"
                          onClick={() => handleReplyComment(reply?.id || "", reply?.user?.username || "")}>
                          Reply
                        </button>
                        {hoveredCommentId === reply?.id && (
                          <PiDotsThreeBold
                            className="w-6 h-6 hover:stroke-gray115 cursor-pointer items-end"
                            stroke="#858585"
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {authCanUse && (
                <div className="items-center mt-3">
                  <FaRegHeart size={12} />
                </div>
              )}
            </div>
            <ReplyBox comments={comments} parentID={reply?.id || ""} handleReplyComment={handleReplyComment} />
          </>
        ))}
      </>
    );
  }
);
