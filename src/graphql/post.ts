import { graphql } from "@/gql";

export const PostByUserName = graphql(`
  query PostByUsername($username: String!) {
    postByUsername(username: $username) {
      id
      user_id
      caption
      is_hide_like
      is_hide_comment
      active
      post_files {
        url
      }
      created_at
    }
  }
`);

export const PostHomePage = graphql(`
  query PostHomePage($page: Int!) {
    postHomePage(page: $page) {
      id
      user_id
      caption
      is_hide_like
      is_hide_comment
      active
      user {
        avatar
        username
        full_name
      }
      post_files {
        url
      }
      post_likes {
        user_id
        is_liked
      }
      created_at
    }
  }
`);
