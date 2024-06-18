import { PostCommentByPostIDParams, postCommentByPostId, postKey } from "@/api/post";
import { PostComment } from "@/api/post_comment";
import { PostByPostIdQuery } from "@/gql/graphql";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Button, Spinner, Textarea } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { EmojiClickData } from "emoji-picker-react";
import dynamic from "next/dynamic";
import { BsEmojiAstonished } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useCommentStore } from "@/stores/comment-store";

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
      const fakeData = {
        ...commentPostData.data,
        user: {
          avatar: getUserAvatarURL(authData?.avatar || ""),
          username: authData?.username,
        },
      };
      queryClient.setQueryData([postKey, { id: postId }], (oldData: PostByPostIdQuery) => {
        return {
          ...oldData,
          postByPostId: {
            ...oldData.postByPostId,
            post_comments: [fakeData, ...(oldData.postByPostId.post_comments || [])],
          },
        };
      });
      setContent("");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Comment post failed!");
    },
  });

  useEffect(() => {
    textareaRef.current?.focus();
    if (content === "") {
      setParentID("");
    }
  }, [content]);

  const handlePostComment = (content: string, parentID: string) => {
    if (parentID) {
      const regex = /@(\w+)/g;
      const match = regex.exec(content);
      if (match) {
        const username = match[1];
        console.log(username);
        if (replyUsername !== username) {
          parentID = "";
        } else {
          content = content.replace(regex, "");
        }
      } else {
        parentID = "";
      }
      setParentID("");
      setReplyUsername("");
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
      <Textarea
        type="text"
        placeholder="Add a comment..."
        className="flex-1 border-none bg-transparent ring-0 focus px-2 mb-1"
        ref={textareaRef}
        value={content}
        size="sm"
        variant="underlined"
        maxLength={2200}
        maxRows={4}
        minRows={1}
        onValueChange={(value) => setContent(value)}
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
