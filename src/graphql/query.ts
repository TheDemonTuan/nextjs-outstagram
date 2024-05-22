import { gql } from "@apollo/client";

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
