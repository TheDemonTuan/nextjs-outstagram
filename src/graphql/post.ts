import { graphql } from "@/gql";

export const PostByUserName = graphql(`
  query PostByUsername($username: String!) {
    postByUsername(username: $username) {
      id
      user_id
      caption
      is_hide_like
      is_hide_comment
      type
      active
      post_files {
        id
        url
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
      type
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
        post_id
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
      type
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

export const PostReel = graphql(`
  query PostReel($page: Int!) {
    postReel(page: $page) {
        id
        user_id
        caption
        is_hide_like
        is_hide_comment
        privacy
        type
        active
        created_at
        user {
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
            friends {
                id
                from_user_id
                to_user_id
                status
            }
        }
        post_files {
            id
            url
            active
        }
        post_likes {
            id
            post_id
            user_id
            is_liked
        }
        post_comments {
            id
            post_id
            user_id
            parent_id
            content
            active
        }
    }
  }
`);

export const PostExplores = graphql (`
    query PostExplores($page: Int!) {
    postExplores(page: $page) {
        id
        user_id
        caption
        is_hide_like
        is_hide_comment
        privacy
        type
        active
        created_at
        updated_at
        deleted_at
        post_files {
            id
            url
            active
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
        }
        post_likes {
            id
            post_id
            user_id
            is_liked
        }
        post_comments {
            id
            post_id
            user_id
            parent_id
            content
            active
        }
    }
  }`
)


export const PostSuggestions = graphql(`
  query PostSuggestions($skipPostID: String!, $limit: Int!) {
    postSuggestions(skipPostID: $skipPostID, limit: $limit) {
      id
      user_id
      caption
      is_hide_like
      is_hide_comment
      privacy
      type
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


