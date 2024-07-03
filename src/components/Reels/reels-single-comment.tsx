import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { FaRegHeart } from "react-icons/fa6";
import { Friend, PostByPostIdQuery } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { useCommentStore } from "@/stores/comment-store";
import { memo, useCallback, useMemo, useState } from "react";
import { NIL as NIL_UUID } from "uuid";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Divider, Spinner, Tooltip } from "@nextui-org/react";
import SummaryProfile from "../summary-profile";
import { formatDistanceToNow } from "date-fns";

const SingleComment = ({ singleComments }: { singleComments: PostByPostIdQuery["postByPostId"]["post_comments"] }) => {
  const { authData } = useAuth();
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
    <>
      <div id="SingleComment" className="flex flex-col px-8 mt-6 ">
        {singleComments?.map((comment) => {
          if (!comment) return null;
          if (comment?.parent_id && comment?.parent_id !== NIL_UUID) return null;
          const replyComments = singleComments?.filter((c) => c?.parent_id === comment?.id);
          return (
            <div key={comment?.id} className="flex flex-col pb-5">
              <div className="flex items-start w-full">
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
                  className="rounded-md shadow-lg">
                  <Link href={`/${comment?.user?.username}`}>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={getUserAvatarURL(comment?.user?.avatar)} />
                      <AvatarFallback>
                        <Spinner size="sm" />
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </Tooltip>
                <div className="flex flex-col ml-3 w-full">
                  <Link href={`/${comment?.user?.username}`} className="font-medium flex items-center">
                    {comment?.user?.username}
                  </Link>
                  <div className="flex flex-row items-start justify-between">
                    <div className="flex flex-col item-center space-y-2">
                      <p className="text-sm">{comment?.content}</p>
                      <div className="flex items-center space-x-5">
                        <span className="text-sm text-[#737373]">
                          {" "}
                          {comment?.created_at
                            ? formatDistanceToNow(comment?.created_at, { addSuffix: true })
                            : "Unknown time"}
                        </span>
                        <span
                          className="text-sm text-[#737373]"
                          onClick={() => {
                            setContent(`@${comment?.user?.username} `);
                            setParentID(comment?.id || "");
                            setReplyUsername(comment?.user?.username || "");
                          }}>
                          Reply
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-[#737373] pl-5">
                      <FaRegHeart size={18} />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
              {!!replyComments.length && (
                <>
                  <div className="flex flex-col ml-14">
                    <div className="flex flex-row items-center my-2">
                      <Divider className="w-6 bg-black h-[0.1px]" />
                      <div className="ml-4 text-xs font-semibold text-neutral-500">
                        <button
                          className="text-xs font-semibold text-neutral-500 active:text-neutral-300"
                          onClick={() => {
                            replyComments?.length &&
                              setShowReplies((prev) => ({
                                ...prev,
                                [comment.id]: !prev[comment.id],
                              }));
                          }}>
                          {!!replyComments?.length && showReplies[comment.id]
                            ? "Hide replies"
                            : `View replies (${replyComments?.length})`}
                        </button>
                      </div>
                    </div>
                    {!!replyComments?.length && showReplies[comment.id] && (
                      <ReplyBox
                        comments={singleComments}
                        parentID={comment.id}
                        handleReplyComment={handleReplyComment}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SingleComment;

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
    const { authData } = useAuth();
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
            <div className="flex items-start w-full pt-3 ">
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
                className="rounded-md shadow-lg">
                <Link href={`/${reply?.user?.username}`}>
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={getUserAvatarURL(reply?.user?.avatar)} />
                    <AvatarFallback>
                      <Spinner size="sm" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </Tooltip>
              <div className="flex flex-col ml-3 w-full">
                <Link href={`/${reply?.user?.username}`} className="font-medium flex items-center">
                  {" "}
                  {reply?.user?.username}
                </Link>
                <div className="flex flex-row items-start justify-between">
                  <div className="flex flex-col item-center space-y-2">
                    <p className="text-sm">
                      <Link href={`/${reply?.user?.username}`} className="text-sky-600">
                        @{reply?.parent?.user?.username}
                      </Link>{" "}
                      {reply?.content}
                    </p>
                    <div className="flex items-center space-x-5">
                      <span className="text-sm text-[#737373]">
                        {" "}
                        {formatDistanceToNow(new Date(reply?.created_at ?? new Date()), {
                          addSuffix: true,
                        })}
                      </span>
                      <button
                        onClick={() => handleReplyComment(reply?.id || "", reply?.user?.username || "")}
                        className="text-sm text-[#737373]">
                        Reply
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-[#737373]  pl-5">
                    <FaRegHeart size={18} />
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
            <ReplyBox comments={comments} parentID={reply?.id || ""} handleReplyComment={handleReplyComment} />
          </>
        ))}
      </>
    );
  }
);
