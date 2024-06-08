import http, { ApiSuccessResponse } from "@/lib/http";
import { PostResponse } from "./post";
import { PostLikeResponse } from "./post_like";

export const userKey = "users";

export interface UserResponse {
  id: string;
  username: string;
  full_name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  birthday: Date;
  gender: boolean;
  role: boolean;
  active: boolean;
  is_private: boolean;

  posts: PostResponse[];
  post_likes: PostLikeResponse[];
  post_comments: null;

  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export const userGetByUserID = async (userID: string) =>
  http.get<ApiSuccessResponse<UserResponse>>(`users/${userID}`).then((res) => res.data);

export const userGetMe = async () => http.get<ApiSuccessResponse<UserResponse>>(`users/me`).then((res) => res.data);

export const userChangeAvatar = async (avatar: File) =>
  http
    .patch<ApiSuccessResponse<string>>(
      "users/me/avatar",
      { avatar },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => res.data);

export interface UserEditProfileParams extends Pick<UserResponse, "username" | "full_name" | "bio" | "birthday"> {
  gender: string;
}

export const userEditProfile = async (params: UserEditProfileParams) =>
  http.patch<ApiSuccessResponse<UserResponse>>("users/me/profile", params).then((res) => res.data);

export const userEditPrivate = async () =>
  http.patch<ApiSuccessResponse<boolean>>("users/me/private").then((res) => res.data);

export const userEditEmail = async (email: string) =>
  http.patch<ApiSuccessResponse<string>>("users/me/email", { email }).then((res) => res.data);

export const userEditPhone = (phone: string) =>
  http.patch<ApiSuccessResponse<string>>("users/me/phone", { phone }).then((res) => res.data);

export const userDeleteAvatar = async () =>
  http.delete<ApiSuccessResponse<string>>("users/me/avatar").then((res) => res.data);
