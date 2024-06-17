import { PostCommentByPostIDParams, postCommentByPostId } from "@/api/post";
import { PostComment } from "@/gql/graphql";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Textarea } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const CommentForm = ({ postId }: { postId: string }) => {
  const [content, setContent] = useState("");

  const { mutate: postCommentMutate } = useMutation<
    ApiSuccessResponse<PostComment>,
    ApiErrorResponse,
    PostCommentByPostIDParams
  >({
    mutationFn: async (params) => await postCommentByPostId(params),
    onSuccess: (commentPostData) => {},
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Comment post failed!");
    },
  });

  const handlePostComment = (content: string, parentID: string) => {
    postCommentMutate({
      postID: postId,
      content,
      parentID,
    });
  };
  return (
    <div>
      <Textarea
        type="text"
        placeholder="Add a comment..."
        className="bg-transparent text-sm border-none focus:outline-none flex-1 dark:text-neutral-400 placeholder-neutral-400 font-normal disabled:opacity-30"
        // ref={inputRef}
        value={content}
        onValueChange={(value) => setContent(value)}
      />
      <button
        onClick={() => handlePostComment(content, "")}
        className="text-sky-500 text-sm font-semibold hover:text-sky-700 dark:hover:text-white disabled:cursor-not-allowed  dark:disabled:text-slate-500 disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:disabled:hover:text-slate-500">
        Post
      </button>
    </div>
  );
};

export default CommentForm;
