import { PostCommentByPostIDParams, postCommentByPostId, postKey } from "@/api/post";
import { PostComment } from "@/api/post_comment";
import { PostByPostIdQuery } from "@/gql/graphql";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Button, Spinner } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { EmojiClickData } from "emoji-picker-react";
import dynamic from "next/dynamic";
import { BsEmojiAstonished } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useCommentStore } from "@/stores/comment-store";
import { Textarea } from "../ui/textarea";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";

const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

const CommentForm = ({ postId }: { postId: string }) => {
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

  const fakeData = useCallback((commentPostData: ApiSuccessResponse<PostComment>) => {
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
  }, [authData?.avatar, authData?.username, parentID, replyUsername]);

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
    <div className="flex items-center space-x-2 px-5 p-2">
      <Popover>
        <PopoverTrigger>
          <BsEmojiAstonished className="text-lg cursor-pointer" size={20} />
        </PopoverTrigger>
        <PopoverContent className="relative w-fit h-fit">
          <Picker className="absolute z-50 top-0 right-0" lazyLoadEmojis onEmojiClick={(e) => handleEmojiClick(e)} />
        </PopoverContent>
      </Popover>
      <TextareaAutosize
        placeholder="Add a comment..."
        className={cn(
          "flex-1 border-none bg-transparent ring-0 focus p-2 mb-0 text-sm focus:no-underline bg-white resize-none focus:outline-none focus-visible:ring-0 shadow-none",
          postCommentIsPending && "cursor-not-allowed opacity-50"
        )}
        ref={textareaRef}
        maxLength={2200}
        maxRows={4}
        autoFocus
        disabled={postCommentIsPending}
        cacheMeasurements
        value={content}
        onChange={handleTextareaChange}
      />
      <button
        onClick={() => handlePostComment(content, parentID)}
        color="primary"
        disabled={!content}
        className="hover:bg-none cursor-pointer text-sky-500 text-sm font-semibold hover:text-sky-700 dark:hover:text-white disabled:cursor-default  dark:disabled:text-slate-500 disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:disabled:hover:text-slate-500  space-x-2
        ">
        {postCommentIsPending ? <Spinner size="sm" /> : "Post"}
      </button>
    </div>
  );
};

export default CommentForm;
