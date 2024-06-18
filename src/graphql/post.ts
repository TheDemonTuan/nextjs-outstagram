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
        id
        url
        type
      }
      created_at
    }
  }
`);

export const PostByPostID = graphql(`
  query PostByPostId($postID: String!) {
    postByPostId(postID: $postID) {
      id
      user_id
      caption
      is_hide_like
      is_hide_comment
      privacy
      active
      user {
        avatar
        username
        full_name
        role
      }
      created_at
      updated_at
      deleted_at
      post_files {
        id
        url
        type
      }
      post_likes {
        user_id
        is_liked
      }
      post_comments {
        id
        content
        parent_id
        created_at
        user {
          avatar
          username
        }
        parent {
          user {
            avatar
            username
          }
        }
      }
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
      privacy
      user {
        avatar
        username
        full_name
      }
      post_files {
        id
        url
        type
      }
      post_likes {
        user_id
        is_liked
      }
      created_at
    }
  }
`);
