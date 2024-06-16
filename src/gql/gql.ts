/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query InboxGetAllBubble {\n    inboxGetAllBubble {\n      username\n      avatar\n      full_name\n      last_message\n      is_read\n      created_at\n    }\n  }\n": types.InboxGetAllBubbleDocument,
    "\n  query InboxGetByUsername($username: String!) {\n    inboxGetByUsername(username: $username) {\n      id\n      from_user_id\n      to_user_id\n      message\n      is_read\n      created_at\n      updated_at\n      deleted_at\n    }\n  }\n": types.InboxGetByUsernameDocument,
    "\n  query PostByUsername($username: String!) {\n    postByUsername(username: $username) {\n      id\n      user_id\n      caption\n      is_hide_like\n      is_hide_comment\n      active\n      post_files {\n        url\n      }\n      created_at\n    }\n  }\n": types.PostByUsernameDocument,
    "\n  query PostHomePage($page: Int!) {\n    postHomePage(page: $page) {\n      id\n      user_id\n      caption\n      is_hide_like\n      is_hide_comment\n      active\n      user {\n        avatar\n        username\n        full_name\n      }\n      post_files {\n        url\n      }\n      post_likes {\n        user_id\n        is_liked\n      }\n      created_at\n    }\n  }\n": types.PostHomePageDocument,
    "\n  query UserSearch($keyword: String!) {\n    userSearch(keyword: $keyword) {\n      id\n      username\n      full_name\n      avatar\n      active\n    }\n  }\n": types.UserSearchDocument,
    "\n  query UserSuggestion($count: Int!) {\n    userSuggestion(count: $count) {\n      id\n      username\n      full_name\n      avatar\n      active\n    }\n  }\n": types.UserSuggestionDocument,
    "\n  query UserByUsername($username: String!) {\n    userByUsername(username: $username) {\n      id\n      username\n      full_name\n      avatar\n      bio\n      role\n    }\n  }\n": types.UserByUsernameDocument,
    "\n  query UserProfile($username: String!) {\n    userProfile(username: $username) {\n      username\n      user {\n        id\n        username\n        full_name\n        email\n        phone\n        avatar\n        bio\n        birthday\n        gender\n        role\n        active\n        is_private\n        created_at\n        updated_at\n        deleted_at\n      }\n      posts {\n        id\n        user_id\n        caption\n        is_hide_like\n        is_hide_comment\n        active\n        created_at\n        updated_at\n        deleted_at\n        post_likes {\n          id\n          post_id\n          user_id\n          is_liked\n          created_at\n          updated_at\n          deleted_at\n        }\n        post_files {\n          id\n          post_id\n          url\n          type\n          active\n          created_at\n          updated_at\n          deleted_at\n        }   \n        user {\n          id\n          username\n          full_name\n          email\n          phone\n          avatar\n          bio\n          birthday\n          gender\n          role\n          active\n          is_private\n          created_at\n          updated_at\n          deleted_at\n        }\n      }\n      friends {\n        id\n        from_user_id\n        to_user_id\n        status\n        created_at\n        updated_at\n        deleted_at\n        to_user_info {\n          id\n          username\n          full_name\n          email\n          phone\n          avatar\n          bio\n          birthday\n          gender\n          role\n          active\n          is_private\n          created_at\n          updated_at\n          deleted_at\n        }\n        from_user_info {\n          id\n          username\n          full_name\n          email\n          phone\n          avatar\n          bio\n          birthday\n          gender\n          role\n          active\n          is_private\n          created_at\n          updated_at\n          deleted_at\n        }\n      }\n    }\n  }\n": types.UserProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query InboxGetAllBubble {\n    inboxGetAllBubble {\n      username\n      avatar\n      full_name\n      last_message\n      is_read\n      created_at\n    }\n  }\n"): (typeof documents)["\n  query InboxGetAllBubble {\n    inboxGetAllBubble {\n      username\n      avatar\n      full_name\n      last_message\n      is_read\n      created_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query InboxGetByUsername($username: String!) {\n    inboxGetByUsername(username: $username) {\n      id\n      from_user_id\n      to_user_id\n      message\n      is_read\n      created_at\n      updated_at\n      deleted_at\n    }\n  }\n"): (typeof documents)["\n  query InboxGetByUsername($username: String!) {\n    inboxGetByUsername(username: $username) {\n      id\n      from_user_id\n      to_user_id\n      message\n      is_read\n      created_at\n      updated_at\n      deleted_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PostByUsername($username: String!) {\n    postByUsername(username: $username) {\n      id\n      user_id\n      caption\n      is_hide_like\n      is_hide_comment\n      active\n      post_files {\n        url\n      }\n      created_at\n    }\n  }\n"): (typeof documents)["\n  query PostByUsername($username: String!) {\n    postByUsername(username: $username) {\n      id\n      user_id\n      caption\n      is_hide_like\n      is_hide_comment\n      active\n      post_files {\n        url\n      }\n      created_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PostHomePage($page: Int!) {\n    postHomePage(page: $page) {\n      id\n      user_id\n      caption\n      is_hide_like\n      is_hide_comment\n      active\n      user {\n        avatar\n        username\n        full_name\n      }\n      post_files {\n        url\n      }\n      post_likes {\n        user_id\n        is_liked\n      }\n      created_at\n    }\n  }\n"): (typeof documents)["\n  query PostHomePage($page: Int!) {\n    postHomePage(page: $page) {\n      id\n      user_id\n      caption\n      is_hide_like\n      is_hide_comment\n      active\n      user {\n        avatar\n        username\n        full_name\n      }\n      post_files {\n        url\n      }\n      post_likes {\n        user_id\n        is_liked\n      }\n      created_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserSearch($keyword: String!) {\n    userSearch(keyword: $keyword) {\n      id\n      username\n      full_name\n      avatar\n      active\n    }\n  }\n"): (typeof documents)["\n  query UserSearch($keyword: String!) {\n    userSearch(keyword: $keyword) {\n      id\n      username\n      full_name\n      avatar\n      active\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserSuggestion($count: Int!) {\n    userSuggestion(count: $count) {\n      id\n      username\n      full_name\n      avatar\n      active\n    }\n  }\n"): (typeof documents)["\n  query UserSuggestion($count: Int!) {\n    userSuggestion(count: $count) {\n      id\n      username\n      full_name\n      avatar\n      active\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserByUsername($username: String!) {\n    userByUsername(username: $username) {\n      id\n      username\n      full_name\n      avatar\n      bio\n      role\n    }\n  }\n"): (typeof documents)["\n  query UserByUsername($username: String!) {\n    userByUsername(username: $username) {\n      id\n      username\n      full_name\n      avatar\n      bio\n      role\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserProfile($username: String!) {\n    userProfile(username: $username) {\n      username\n      user {\n        id\n        username\n        full_name\n        email\n        phone\n        avatar\n        bio\n        birthday\n        gender\n        role\n        active\n        is_private\n        created_at\n        updated_at\n        deleted_at\n      }\n      posts {\n        id\n        user_id\n        caption\n        is_hide_like\n        is_hide_comment\n        active\n        created_at\n        updated_at\n        deleted_at\n        post_likes {\n          id\n          post_id\n          user_id\n          is_liked\n          created_at\n          updated_at\n          deleted_at\n        }\n        post_files {\n          id\n          post_id\n          url\n          type\n          active\n          created_at\n          updated_at\n          deleted_at\n        }   \n        user {\n          id\n          username\n          full_name\n          email\n          phone\n          avatar\n          bio\n          birthday\n          gender\n          role\n          active\n          is_private\n          created_at\n          updated_at\n          deleted_at\n        }\n      }\n      friends {\n        id\n        from_user_id\n        to_user_id\n        status\n        created_at\n        updated_at\n        deleted_at\n        to_user_info {\n          id\n          username\n          full_name\n          email\n          phone\n          avatar\n          bio\n          birthday\n          gender\n          role\n          active\n          is_private\n          created_at\n          updated_at\n          deleted_at\n        }\n        from_user_info {\n          id\n          username\n          full_name\n          email\n          phone\n          avatar\n          bio\n          birthday\n          gender\n          role\n          active\n          is_private\n          created_at\n          updated_at\n          deleted_at\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserProfile($username: String!) {\n    userProfile(username: $username) {\n      username\n      user {\n        id\n        username\n        full_name\n        email\n        phone\n        avatar\n        bio\n        birthday\n        gender\n        role\n        active\n        is_private\n        created_at\n        updated_at\n        deleted_at\n      }\n      posts {\n        id\n        user_id\n        caption\n        is_hide_like\n        is_hide_comment\n        active\n        created_at\n        updated_at\n        deleted_at\n        post_likes {\n          id\n          post_id\n          user_id\n          is_liked\n          created_at\n          updated_at\n          deleted_at\n        }\n        post_files {\n          id\n          post_id\n          url\n          type\n          active\n          created_at\n          updated_at\n          deleted_at\n        }   \n        user {\n          id\n          username\n          full_name\n          email\n          phone\n          avatar\n          bio\n          birthday\n          gender\n          role\n          active\n          is_private\n          created_at\n          updated_at\n          deleted_at\n        }\n      }\n      friends {\n        id\n        from_user_id\n        to_user_id\n        status\n        created_at\n        updated_at\n        deleted_at\n        to_user_info {\n          id\n          username\n          full_name\n          email\n          phone\n          avatar\n          bio\n          birthday\n          gender\n          role\n          active\n          is_private\n          created_at\n          updated_at\n          deleted_at\n        }\n        from_user_info {\n          id\n          username\n          full_name\n          email\n          phone\n          avatar\n          bio\n          birthday\n          gender\n          role\n          active\n          is_private\n          created_at\n          updated_at\n          deleted_at\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;