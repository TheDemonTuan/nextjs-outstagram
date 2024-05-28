import { PostResponse } from "@/api/post";
import { UserResponse } from "@/api/user";
import { gql } from "@apollo/client";

export interface UserSearchResponse {
  search_user: Pick<
    UserResponse,
    "id" | "username" | "full_name" | "avatar" | "active"
  >[];
}
export const SEARCH_USER = gql`
  query Search_user($keyword: String!) {
    search_user(keyword: $keyword) {
      id
      username
      active
      avatar
      full_name
    }
  }
`;

export interface UserGetByUserNameResponse {
  get_user_by_username: UserResponse;
}
export const GET_USER_BY_USERNAME = gql`
  query Get_user_by_username($username: String!) {
    get_user_by_username(username: $username) {
      active
      avatar
      bio
      birthday
      created_at
      deleted_at
      email
      full_name
      gender
      id
      phone
      role
      updated_at
      username
    }
  }
`;

export interface PostGetByUserNameResponse {
  get_posts_by_username: PostResponse[];
}

export const GET_ALL_POST_BY_USER_ID = gql`
  query Get_posts_by_username($username: String!) {
    get_posts_by_username(username: $username) {
      active
      caption
      created_at
      id
      is_hide_comment
      is_hide_like
      user_id
      files {
          url
      }
    }
  }
`;
