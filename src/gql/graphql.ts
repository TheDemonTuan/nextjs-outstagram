/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Friend = {
  __typename?: 'Friend';
  created_at?: Maybe<Scalars['String']['output']>;
  deleted_at?: Maybe<Scalars['String']['output']>;
  from_user_id: Scalars['ID']['output'];
  from_user_info?: Maybe<User>;
  id: Scalars['ID']['output'];
  status?: Maybe<Scalars['Int']['output']>;
  to_user_id: Scalars['ID']['output'];
  to_user_info?: Maybe<User>;
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type Inbox = {
  __typename?: 'Inbox';
  created_at?: Maybe<Scalars['String']['output']>;
  deleted_at?: Maybe<Scalars['String']['output']>;
  files?: Maybe<Array<Maybe<InboxFile>>>;
  from_user_id: Scalars['ID']['output'];
  from_user_info?: Maybe<User>;
  id: Scalars['ID']['output'];
  is_read?: Maybe<Scalars['Boolean']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  to_user_id: Scalars['ID']['output'];
  to_user_info?: Maybe<User>;
  updated_at?: Maybe<Scalars['String']['output']>;
};

export type InboxFile = {
  __typename?: 'InboxFile';
  active?: Maybe<Scalars['Boolean']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  deleted_at?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inbox_id: Scalars['ID']['output'];
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type InboxGetAllBubble = {
  __typename?: 'InboxGetAllBubble';
  avatar: Scalars['String']['output'];
  created_at: Scalars['String']['output'];
  full_name: Scalars['String']['output'];
  is_read: Scalars['Boolean']['output'];
  last_message: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Post = {
  __typename?: 'Post';
  active: Scalars['Boolean']['output'];
  caption: Scalars['String']['output'];
  created_at: Scalars['String']['output'];
  deleted_at?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  is_hide_comment: Scalars['Boolean']['output'];
  is_hide_like: Scalars['Boolean']['output'];
  post_comments?: Maybe<Array<Maybe<PostComment>>>;
  post_files?: Maybe<Array<Maybe<PostFile>>>;
  post_likes?: Maybe<Array<Maybe<PostLike>>>;
  privacy: Scalars['Int']['output'];
  updated_at?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  user_id: Scalars['ID']['output'];
};

export type PostComment = {
  __typename?: 'PostComment';
  active: Scalars['Boolean']['output'];
  content: Scalars['String']['output'];
  created_at: Scalars['String']['output'];
  deleted_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  parent?: Maybe<PostComment>;
  parent_id: Scalars['ID']['output'];
  post_id: Scalars['ID']['output'];
  updated_at: Scalars['String']['output'];
  user: User;
  user_id: Scalars['ID']['output'];
};

export type PostFile = {
  __typename?: 'PostFile';
  active?: Maybe<Scalars['Boolean']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  deleted_at?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  post_id?: Maybe<Scalars['ID']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type PostLike = {
  __typename?: 'PostLike';
  created_at?: Maybe<Scalars['String']['output']>;
  deleted_at?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  is_liked?: Maybe<Scalars['Boolean']['output']>;
  post_id?: Maybe<Scalars['ID']['output']>;
  updated_at?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['ID']['output']>;
};

export type Query = {
  __typename?: 'Query';
  inboxGetAllBubble: Array<InboxGetAllBubble>;
  inboxGetByUsername: Array<Inbox>;
  postByPostId: Post;
  postByUsername: Array<Post>;
  postHomePage: Array<Post>;
  userByUsername: User;
  userProfile: UserProfile;
  userSearch: Array<UserSearch>;
  userSuggestion: Array<UserSuggestion>;
};


export type QueryInboxGetByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryPostByPostIdArgs = {
  postID: Scalars['String']['input'];
};


export type QueryPostByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryPostHomePageArgs = {
  page: Scalars['Int']['input'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryUserProfileArgs = {
  username: Scalars['String']['input'];
};


export type QueryUserSearchArgs = {
  keyword: Scalars['String']['input'];
};


export type QueryUserSuggestionArgs = {
  count: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  active?: Maybe<Scalars['Boolean']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  deleted_at?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  is_private?: Maybe<Scalars['Boolean']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['Boolean']['output']>;
  updated_at?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  friends: Array<Friend>;
  posts: Array<Post>;
  user: User;
  username: Scalars['String']['output'];
};

export type UserSearch = {
  __typename?: 'UserSearch';
  active?: Maybe<Scalars['Boolean']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserSuggestion = {
  __typename?: 'UserSuggestion';
  active?: Maybe<Scalars['Boolean']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type InboxGetAllBubbleQueryVariables = Exact<{ [key: string]: never; }>;


export type InboxGetAllBubbleQuery = { __typename?: 'Query', inboxGetAllBubble: Array<{ __typename?: 'InboxGetAllBubble', username: string, avatar: string, full_name: string, last_message: string, is_read: boolean, created_at: string }> };

export type InboxGetByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type InboxGetByUsernameQuery = { __typename?: 'Query', inboxGetByUsername: Array<{ __typename?: 'Inbox', id: string, from_user_id: string, to_user_id: string, message?: string | null, is_read?: boolean | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null }> };

export type PostByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type PostByUsernameQuery = { __typename?: 'Query', postByUsername: Array<{ __typename?: 'Post', id: string, user_id: string, caption: string, is_hide_like: boolean, is_hide_comment: boolean, active: boolean, created_at: string, post_files?: Array<{ __typename?: 'PostFile', id?: string | null, url?: string | null, type?: string | null } | null> | null }> };

export type PostByPostIdQueryVariables = Exact<{
  postID: Scalars['String']['input'];
}>;


export type PostByPostIdQuery = { __typename?: 'Query', postByPostId: { __typename?: 'Post', id: string, user_id: string, caption: string, is_hide_like: boolean, is_hide_comment: boolean, privacy: number, active: boolean, created_at: string, updated_at?: string | null, deleted_at?: string | null, user?: { __typename?: 'User', avatar?: string | null, username?: string | null, full_name?: string | null, role?: boolean | null } | null, post_files?: Array<{ __typename?: 'PostFile', id?: string | null, url?: string | null, type?: string | null } | null> | null, post_comments?: Array<{ __typename?: 'PostComment', id: string, user_id: string, content: string, created_at: string } | null> | null } };

export type PostHomePageQueryVariables = Exact<{
  page: Scalars['Int']['input'];
}>;


export type PostHomePageQuery = { __typename?: 'Query', postHomePage: Array<{ __typename?: 'Post', id: string, user_id: string, caption: string, is_hide_like: boolean, is_hide_comment: boolean, active: boolean, privacy: number, created_at: string, user?: { __typename?: 'User', avatar?: string | null, username?: string | null, full_name?: string | null } | null, post_files?: Array<{ __typename?: 'PostFile', id?: string | null, url?: string | null, type?: string | null } | null> | null, post_likes?: Array<{ __typename?: 'PostLike', user_id?: string | null, is_liked?: boolean | null } | null> | null }> };

export type UserSearchQueryVariables = Exact<{
  keyword: Scalars['String']['input'];
}>;


export type UserSearchQuery = { __typename?: 'Query', userSearch: Array<{ __typename?: 'UserSearch', id?: string | null, username?: string | null, full_name?: string | null, avatar?: string | null, active?: boolean | null }> };

export type UserSuggestionQueryVariables = Exact<{
  count: Scalars['Int']['input'];
}>;


export type UserSuggestionQuery = { __typename?: 'Query', userSuggestion: Array<{ __typename?: 'UserSuggestion', id?: string | null, username?: string | null, full_name?: string | null, avatar?: string | null, active?: boolean | null }> };

export type UserByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserByUsernameQuery = { __typename?: 'Query', userByUsername: { __typename?: 'User', id: string, username?: string | null, full_name?: string | null, avatar?: string | null, bio?: string | null, role?: boolean | null } };

export type UserProfileQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserProfileQuery = { __typename?: 'Query', userProfile: { __typename?: 'UserProfile', username: string, user: { __typename?: 'User', id: string, username?: string | null, full_name?: string | null, email?: string | null, phone?: string | null, avatar?: string | null, bio?: string | null, birthday?: string | null, gender?: boolean | null, role?: boolean | null, active?: boolean | null, is_private?: boolean | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null }, posts: Array<{ __typename?: 'Post', id: string, user_id: string, caption: string, is_hide_like: boolean, is_hide_comment: boolean, active: boolean, created_at: string, updated_at?: string | null, deleted_at?: string | null, post_likes?: Array<{ __typename?: 'PostLike', id?: string | null, post_id?: string | null, user_id?: string | null, is_liked?: boolean | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null } | null> | null, post_files?: Array<{ __typename?: 'PostFile', id?: string | null, post_id?: string | null, url?: string | null, type?: string | null, active?: boolean | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null } | null> | null, user?: { __typename?: 'User', id: string, username?: string | null, full_name?: string | null, email?: string | null, phone?: string | null, avatar?: string | null, bio?: string | null, birthday?: string | null, gender?: boolean | null, role?: boolean | null, active?: boolean | null, is_private?: boolean | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null } | null }>, friends: Array<{ __typename?: 'Friend', id: string, from_user_id: string, to_user_id: string, status?: number | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null, to_user_info?: { __typename?: 'User', id: string, username?: string | null, full_name?: string | null, email?: string | null, phone?: string | null, avatar?: string | null, bio?: string | null, birthday?: string | null, gender?: boolean | null, role?: boolean | null, active?: boolean | null, is_private?: boolean | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null } | null, from_user_info?: { __typename?: 'User', id: string, username?: string | null, full_name?: string | null, email?: string | null, phone?: string | null, avatar?: string | null, bio?: string | null, birthday?: string | null, gender?: boolean | null, role?: boolean | null, active?: boolean | null, is_private?: boolean | null, created_at?: string | null, updated_at?: string | null, deleted_at?: string | null } | null }> } };


export const InboxGetAllBubbleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InboxGetAllBubble"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inboxGetAllBubble"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_message"}},{"kind":"Field","name":{"kind":"Name","value":"is_read"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<InboxGetAllBubbleQuery, InboxGetAllBubbleQueryVariables>;
export const InboxGetByUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InboxGetByUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inboxGetByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_user_id"}},{"kind":"Field","name":{"kind":"Name","value":"to_user_id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"is_read"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}}]}}]} as unknown as DocumentNode<InboxGetByUsernameQuery, InboxGetByUsernameQueryVariables>;
export const PostByUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostByUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"is_hide_like"}},{"kind":"Field","name":{"kind":"Name","value":"is_hide_comment"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"post_files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<PostByUsernameQuery, PostByUsernameQueryVariables>;
export const PostByPostIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostByPostId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postByPostId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"is_hide_like"}},{"kind":"Field","name":{"kind":"Name","value":"is_hide_comment"}},{"kind":"Field","name":{"kind":"Name","value":"privacy"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}},{"kind":"Field","name":{"kind":"Name","value":"post_files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"post_comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]} as unknown as DocumentNode<PostByPostIdQuery, PostByPostIdQueryVariables>;
export const PostHomePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostHomePage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postHomePage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"is_hide_like"}},{"kind":"Field","name":{"kind":"Name","value":"is_hide_comment"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"privacy"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"post_files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"post_likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_liked"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<PostHomePageQuery, PostHomePageQueryVariables>;
export const UserSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]} as unknown as DocumentNode<UserSearchQuery, UserSearchQueryVariables>;
export const UserSuggestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSuggestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"count"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSuggestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"Variable","name":{"kind":"Name","value":"count"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]} as unknown as DocumentNode<UserSuggestionQuery, UserSuggestionQueryVariables>;
export const UserByUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserByUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<UserByUsernameQuery, UserByUsernameQueryVariables>;
export const UserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"is_private"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"is_hide_like"}},{"kind":"Field","name":{"kind":"Name","value":"is_hide_comment"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}},{"kind":"Field","name":{"kind":"Name","value":"post_likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"post_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_liked"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"post_files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"post_id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"is_private"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"friends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"from_user_id"}},{"kind":"Field","name":{"kind":"Name","value":"to_user_id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}},{"kind":"Field","name":{"kind":"Name","value":"to_user_info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"is_private"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"from_user_info"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"is_private"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"deleted_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserProfileQuery, UserProfileQueryVariables>;