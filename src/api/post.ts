import http, { ApiSuccessResponse } from "@/lib/http";
import { PostFileResponse } from "./post_file";
import { PostLikeResponse } from "./post_like";
import { PostComment } from "./post_comment";

export const postKey = "posts";

export enum PostType {
  DEFAULT,
  REEL,
}

export enum PostPrivacy {
  PUBLIC,
  FRIEND,
  PRIVATE,

}

export interface PostResponse {
  id: string;
  user_id: string;
  caption: string;
  is_hide_like: boolean;
  is_hide_comment: boolean;
  active: boolean;
  post_files: PostFileResponse[];
  post_likes: PostLikeResponse[];
  type: PostType
  privacy: PostPrivacy;
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

export const PostEditHiddenComment = async (postID: string) =>
  http.patch<ApiSuccessResponse<boolean>>(`posts/me/isHiddenComment/${postID}`).then((res) => res.data);

export const PostEditHiddenCountLike = async (postID: string) =>
  http.patch<ApiSuccessResponse<boolean>>(`posts/me/isHiddenLike/${postID}`).then((res) => res.data);

export const postDelete = async (postID: string) =>
  http.delete<ApiSuccessResponse<string>>(`posts/me/${postID}`).then((res) => res.data);

export interface PostCommentByPostIDParams {
  postID: string;
  content: string;
  parentID?: string;
}

export const postCommentByPostId = (params: PostCommentByPostIDParams) =>
  http
    .post<ApiSuccessResponse<PostComment>>(
      `posts/me/comment/${params.postID}${params?.parentID ? `?parentID=${params?.parentID}` : ""}`,
      { content: params.content }
    )
    .then((res) => res.data);
