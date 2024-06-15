import { graphql } from "@/gql";

export const InboxGetAllBubble = graphql(`
  query InboxGetAllBubble {
    inboxGetAllBubble {
      username
      avatar
      full_name
      last_message
      is_read
      created_at
    }
  }
`);

export const InboxGetByUserName = graphql(`
  query InboxGetByUsername($username: String!) {
    inboxGetByUsername(username: $username) {
      id
      from_user_id
      to_user_id
      message
      is_read
      created_at
      updated_at
      deleted_at
    }
  }
`);
