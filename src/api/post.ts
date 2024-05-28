import http, { ApiSuccessResponse } from "@/lib/http";
import { PostFileResponse } from "./post_file";
import { PostLikeResponse } from "./post_like";

export const postKey = "posts";

export interface PostResponse {
  id: string;
  user_id: string;
  caption: string;
  is_hide_like: boolean;
  is_hide_comment: boolean;
  active: boolean;
  files: PostFileResponse[];
  post_likes: PostLikeResponse[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export const postGetAllFromMe = async () =>
  http.get<ApiSuccessResponse<PostResponse[]>>("posts/me").then((res) => res.data);

export const postCreate = async (data: FormData) =>
  http
    .post<ApiSuccessResponse<PostResponse>>("posts/me", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);