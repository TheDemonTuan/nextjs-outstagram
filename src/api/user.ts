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
  birthday: string;
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