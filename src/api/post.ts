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
  post_comments: PostComment[];
  type: PostType;
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

export const getSaved = async () =>
  http.get<ApiSuccessResponse<PostResponse[]>>(`posts/me/saved`).then((res) => res.data);

export const postGetDeleted = async () => 
  http.get<ApiSuccessResponse<PostResponse[]>>(`posts/me/deleted`).then((res) => res.data);

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

export const adminPostDelete = async (postID: string, userID: string) => 
  http.delete<ApiSuccessResponse<string>>(`admin/posts/${postID}/${userID}`).then((res) => res.data)

export const adminBlockPostByPostId = async (PostID: string) => 
  http.post<ApiSuccessResponse<boolean>>(`admin/block/posts/${PostID}`).then((res) => res.data)

export interface DeleteCommentArgs  {
  postID: string;
  commentID: string;
  userID?: string;
};

export const postDeleteCommentOnPostByCommentId = async (params: DeleteCommentArgs) =>
  http.delete<ApiSuccessResponse<string>>(`posts/comment/${params.commentID}/${params.postID}${params.userID ? `?userID=${params.userID}` : ""}`).then((res)=>res.data);

export const adminDeleteCommentOnPostByCommentId = async (params: DeleteCommentArgs) =>
  http.delete<ApiSuccessResponse<string>>(`admin/comments/${params.commentID}/${params.postID}/${params.userID}`).then((res)=>res.data);

export interface RestorePostsParams {
  post_ids: string[];
}

export const postMeRestore = async (params: RestorePostsParams) => 
  http.patch<ApiSuccessResponse<PostResponse[]>>(`posts/me/restore`, params).then((res) => res.data);