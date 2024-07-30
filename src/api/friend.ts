import http, { ApiSuccessResponse } from "@/lib/http";
import { UserResponse } from "./user";

export const friendKey = "friends";

export enum FriendStatus {
    REQUESTED = 0,
    ACCEPTED = 1,
    REJECTED = 2,
}

export interface FriendResponse {
    id: number;
    from_user_id: string;
    to_user_id: string;
    status: number;
    FromUser: UserResponse;
    ToUser: UserResponse;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}

export const friendGetList = async () =>
    http.get<ApiSuccessResponse<FriendResponse[]>>("friends").then((res) => res.data);

export const friendGetListMe = async () => 
    http.get<ApiSuccessResponse<FriendResponse[]>>("friends/me").then((res) => res.data);

export const friendSendRequest = async (toUserID: string) =>
    http
        .post<ApiSuccessResponse<FriendResponse>>(`friends/${toUserID}/request`)
        .then((res) => res.data);

export const friendRejectRequest = async (toUserID: string) =>
    http.delete<ApiSuccessResponse<FriendResponse>>(`friends/${toUserID}/reject`).then((res) => res.data);

export const friendGetByUserID = async (toUserID: string) =>
    http.get<ApiSuccessResponse<FriendResponse>>(`friends/${toUserID}`).then((res) => res.data);

export const friendAcceptRequest = async (toUserID: string) =>
    http.patch<ApiSuccessResponse<FriendResponse>>(`friends/${toUserID}/accept`).then((res) => res.data);