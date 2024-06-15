import http, { ApiSuccessResponse } from "@/lib/http";

export const inboxKey = "inbox";

export interface InboxResponse {
  id: string;
  from_user_id: string;
  to_user_id: string;
  message: string;
  is_read: boolean;
  files: null;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface InboxResponseParams {
  username: string;
  message: string;
}

export const inboxSendMessages = (params: InboxResponseParams) =>
  http
    .post<ApiSuccessResponse<InboxResponse>>(`inbox/${params.username}`, { message: params.message })
    .then((res) => res.data);
