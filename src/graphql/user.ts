import { graphql } from "@/gql";

export const UserSearch = graphql(`
  query UserSearch($keyword: String!) {
    userSearch(keyword: $keyword) {
      id
      username
      full_name
      avatar
      active
    }
  }
`);

export const UserSuggestion = graphql(`
  query UserSuggestion($count: Int!) {
    userSuggestion(count: $count) {
      id
      username
      full_name
      avatar
      active
    }
  }
`);

export const UserByUsername = graphql(`
  query UserByUsername($username: String!) {
    userByUsername(username: $username) {
      id
      username
      password
      full_name
      email
      phone
      avatar
      bio
      birthday
      gender
      role
    }
  }
`);
