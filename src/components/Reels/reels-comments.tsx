import { useCallback, useEffect, useRef, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import TextareaAutosize from "react-textarea-autosize";
import { BsEmojiAstonished } from "react-icons/bs";
import { PostByPostIdQuery, PostComment } from "@/gql/graphql";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useCommentStore } from "@/stores/comment-store";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { PostCommentByPostIDParams, postCommentByPostId, postKey } from "@/api/post";
import { toast } from "sonner";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import dynamic from "next/dynamic";
import { EmojiClickData } from "emoji-picker-react";
import { Spinner } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ViewComments from "../PostDetail/comment";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const ReelsComments = ({
  reelComments,
  postId,
}: {
  reelComments: PostByPostIdQuery["postByPostId"]["post_comments"];
  postId: string;
}) => {
  const [inputFocused, setInputFocused] = useState(false);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const { authData } = useAuth();
  const { content, setContent, setParentID, parentID, replyUsername, setReplyUsername } = useCommentStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: postCommentMutate, isPending: postCommentIsPending } = useMutation<
    ApiSuccessResponse<PostComment>,
    ApiErrorResponse,
    PostCommentByPostIDParams
  >({
    mutationFn: (params) => postCommentByPostId(params),
    onSuccess: (commentPostData) => {
      const newData = fakeData(commentPostData);
      queryClient.setQueryData([postKey, { id: postId }], (oldData: PostByPostIdQuery) => {
        return {
          ...oldData,
          postByPostId: {
            ...oldData.postByPostId,
            post_comments: [newData, ...(oldData.postByPostId.post_comments || [])],
          },
        };
      });
      setContent("");
      setParentID("");
      setReplyUsername("");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Comment post failed!");
    },
  });

  const fakeData = useCallback(
    (commentPostData: ApiSuccessResponse<PostComment>) => {
      return {
        ...commentPostData.data,
        user: {
          avatar: getUserAvatarURL(authData?.avatar || ""),
          username: authData?.username,
        },
        parent: {
          id: parentID,
          user: {
            username: replyUsername,
          },
        },
      };
    },
    [authData?.avatar, authData?.username, parentID, replyUsername]
  );

  useEffect(() => {
    textareaRef.current?.focus();
    if (content === "") {
      setParentID("");
    }
  }, [content, setParentID]);

  const handlePostComment = (content: string, parentID: string) => {
    if (parentID) {
      const regex = /@(\w+)/g;
      const match = regex.exec(content);
      if (match) {
        const username = match[1];
        if (replyUsername !== username) {
          parentID = "";
        } else {
          content = content.replace(regex, "");
        }
      } else {
        parentID = "";
      }
    }

    postCommentMutate({
      postID: postId,
      content,
      parentID,
    });
  };

  const handleEmojiClick = (e: EmojiClickData) => {
    setContent(content + e.emoji);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
      <div className="relative z-0 w-full h-[calc(100%-273px)] overflow-y-auto scrollbar-hide cursor-pointer">
        {reelComments && reelComments?.length > 0 ? (
          <div className="mx-6 mt-5">
            <ViewComments comments={reelComments} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 h-[250px] justify-center">
            <p className="text-xl lg:text-2xl font-extrabold">No comments yet.</p>
            <p className="text-sm font-medium">Start the conversation.</p>
          </div>
        )}
        <div className="mb-5" />
      </div>

      <div className="flex items-center bottom-0 justify-between bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-1 sticky z-50 mt-auto">
        <div
          className={`bg-[#F1F1F2] relative flex items-center rounded-lg w-full lg:max-w-[440px] border-1 mt-auto ${
            inputFocused ? "border-gray-400" : "border-[#F1F1F2]"
          }`}>
          <TextareaAutosize
            className={cn(
              "bg-[#F1F1F2] resize-none text-sm focus:outline-none w-full lg:max-w-[410px] p-2 py-2 rounded-lg",
              postCommentIsPending && "cursor-not-allowed opacity-50"
            )}
            placeholder="Add comment..."
            ref={textareaRef}
            maxRows={4}
            autoFocus
            maxLength={135}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            disabled={postCommentIsPending}
            value={content}
            onChange={handleTextareaChange}
          />
          <div className="absolute right-2 flex items-center">
            {" "}
            <Popover>
              <PopoverTrigger>
                <BsEmojiAstonished className="text-lg cursor-pointer" size={20} />
              </PopoverTrigger>
              <PopoverContent className="relative w-fit h-fit">
                <Picker className="" lazyLoadEmojis onEmojiClick={(e) => handleEmojiClick(e)} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <button
          onClick={() => handlePostComment(content, parentID)}
          className="hover:bg-none cursor-pointer text-[#F02C56] ml-5 text-sm font-semibold hover:text-red-800 dark:hover:text-white disabled:cursor-default  dark:disabled:text-[#737373] disabled:text-[#737373]  dark:disabled:hover:text-slate-500  space-x-2
        "
          disabled={!content}>
          {postCommentIsPending ? <BiLoaderCircle className="animate-spin" color="#E91E62" size="20" /> : "Post"}
        </button>
      </div>
    </>
  );
};

export default ReelsComments;
