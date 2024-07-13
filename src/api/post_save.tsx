import http, { ApiSuccessResponse } from "@/lib/http";

export const savedKey = "saved";
export interface PostSaveResponse {
  id: string;
  post_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export const postSave = async (postId: string) =>
  http.post<ApiSuccessResponse<PostSaveResponse>>(`posts/me/save/${postId}`).then((res) => res.data);
