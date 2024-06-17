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
  post_files: PostFileResponse[];
  post_likes: PostLikeResponse[];
  privacy: number;
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

export const postGetByPostId = async (postID: string) =>
  http.get<ApiSuccessResponse<PostResponse>>(`posts/${postID}`).then((res) => res.data);

export interface PostEditParams extends Pick<PostResponse, "caption" | "privacy"> {}

export const postEdit = async (params: PostEditParams, postID: string) =>
  http.put<ApiSuccessResponse<PostResponse>>(`posts/me/${postID}`, params).then((res) => res.data);

export const postDelete = async (postID:string) =>
  http.delete<ApiSuccessResponse<string>>(`posts/me/${postID}`).then((res) => res.data);

