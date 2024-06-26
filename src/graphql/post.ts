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
        active
        is_private
        friends {
          id
          from_user_id
          to_user_id
          status
          created_at
          updated_at
          deleted_at
          from_user_info {
            id
            username
            full_name
            email
            phone
            avatar
            bio
            birthday
            gender
            role
            active
            is_private
            created_at
            updated_at
            deleted_at
          }
          to_user_info {
            id
            username
            full_name
            email
            phone
            avatar
            bio
            birthday
            gender
            role
            active
            is_private
            created_at
            updated_at
            deleted_at
          }
        }
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
        id
        user_id
        is_liked
        user {
          username
          full_name
          avatar
          role
          active
          is_private
        }
      }
      post_comments {
        id
        content
        parent_id
        created_at
        user {
          avatar
          username
          full_name
          role
          friends {
            id
            from_user_id
            to_user_id
            status
            created_at
            updated_at
            deleted_at
            from_user_info {
              id
              username
              full_name
              email
              phone
              avatar
              bio
              birthday
              gender
              role
              active
              is_private
              created_at
              updated_at
              deleted_at
            }
            to_user_info {
              id
              username
              full_name
              email
              phone
              avatar
              bio
              birthday
              gender
              role
              active
              is_private
              created_at
              updated_at
              deleted_at
            }
          }
        }
        parent {
          id
          parent_id
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
        role
        active
        is_private
        friends {
          id
          from_user_id
          to_user_id
          status
          from_user_info {
            username
            full_name
            avatar
            role
            active
            is_private
          }
          to_user_info {
            username
            full_name
            avatar
            role
            active
            is_private
          }
        }
      }
      post_files {
        id
        url
        type
      }
      post_likes {
        id
        user_id
        is_liked
        user {
          username
          full_name
          avatar
          role
          is_private
          active
          friends {
            id
            from_user_id
            to_user_id
            status
            from_user_info {
              username
              full_name
              avatar
              role
              active
              is_private
            }
            to_user_info {
              username
              full_name
              avatar
              role
              active
              is_private
            }
          }
        }
      }
      post_comments {
        id
        user_id
        content
        user {
          username
        }
      }
      created_at
    }
  }
`);

export const PostSuggestions = graphql(`
  query PostSuggestions($skipPostID: String!, $limit: Int!) {
    postSuggestions(skipPostID: $skipPostID, limit: $limit) {
      id
      user_id
      caption
      is_hide_like
      is_hide_comment
      privacy
      active
      created_at
      updated_at
      deleted_at
      user{
        username
      }
      post_files {
        id
        url
        type
        active
      }
      post_likes {
        id
        is_liked
      }
      post_comments {
        id
        post_id
        user_id
        parent_id
      }
    }
  }
`);
