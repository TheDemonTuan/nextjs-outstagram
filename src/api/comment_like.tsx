import http, { ApiSuccessResponse } from "@/lib/http";

export interface CommentLikeResponse {
  id: string;
  comment_id: string;
  user_id: string;
  is_comment_liked: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export const commentLike = async (commentId: string) =>
  http.post<ApiSuccessResponse<CommentLikeResponse>>(`posts/me/comment/like/${commentId}`).then((res) => res.data);
