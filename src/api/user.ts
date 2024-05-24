import http, { ApiSuccessResponse } from "@/lib/http";

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
  posts: null;
  post_likes: null;
  post_comments: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export const userGetByUserID = async (userID: string) =>
  http.get<ApiSuccessResponse<UserResponse>>(`users/${userID}`).then((res) => res.data);

export interface UserSearchResponse {
  search_user: Pick<UserResponse, "id" | "username" | "full_name" | "avatar" | "active">[];
}

export interface UserGetByUserNameResponse {
  get_user_by_username: UserResponse;
}
export const userGetMe = async () =>
  http.get<ApiSuccessResponse<UserResponse>>(`users/me`).then((res) => res.data);

export const userChangeAvatar = async (avatar: File) =>
  http
    .patch<ApiSuccessResponse<string>>("users/me/avatar", { avatar }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
