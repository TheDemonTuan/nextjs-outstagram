import http, { ApiSuccessResponse } from "@/lib/http";

export interface PostLikeResponse {
  id: string;
  post_id: string;
  user_id: string;
  is_liked: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export const postLike = async (postId: string) =>
  http.post<ApiSuccessResponse<PostLikeResponse>>(`posts/me/like/${postId}`).then((res) => res.data);