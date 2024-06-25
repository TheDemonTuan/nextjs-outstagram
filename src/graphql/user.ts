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
      role
      posts {
        id
        privacy
        active
        post_files {
          id
          url
          type
        }
      }
      friends {
        id
        from_user_id
        to_user_id
        status
      }
      
    }
  }
`);

export const UserByUsername = graphql(`
  query UserByUsername($username: String!) {
    userByUsername(username: $username) {
      id
      username
      full_name
      avatar
      bio
      role
    }
  }
`);

export const UserProfile = graphql(`
  query UserProfile($username: String!) {
    userProfile(username: $username) {
      username
      user {
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
      posts {
        id
        user_id
        caption
        is_hide_like
        is_hide_comment
        active
        created_at
        updated_at
        deleted_at
        post_likes {
          id
          post_id
          user_id
          is_liked
          created_at
          updated_at
          deleted_at
        }
        post_files {
          id
          post_id
          url
          type
          active
          created_at
          updated_at
          deleted_at
        } post_comments {
          id
          user_id
          parent_id
          content
        }
        user {
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
      friends {
        id
        from_user_id
        to_user_id
        status
        created_at
        updated_at
        deleted_at
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

      }
    }
  }
`);
