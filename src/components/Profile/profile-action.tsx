import { UserResponse } from "@/api/user";
import { SettingIcon } from "@/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProfileSettings, { ProfileSettingModalKey } from "./profile-settings";
import { useModalStore } from "@/stores/modal-store";
import { Button } from "@nextui-org/react";
import { IoMdPersonAdd } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";
import { TfiMoreAlt } from "react-icons/tfi";
import ProfileMoreOptions, { ProfileMoreOptionsModalKey } from "./profile-more-options";
import { UseMutateFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import {
  FriendResponse,
  FriendStatus,
  friendGetByUserID,
  friendGetList,
  friendKey,
  friendRejectRequest,
  friendSendRequest,
} from "@/api/friend";
import { toast } from "sonner";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { UserByUsernameQuery } from "@/gql/graphql";

interface ProfileActionProps {
  isMe: boolean;
  user: UserByUsernameQuery;
}

const btnClass =
  "cursor-pointer inline-flex items-center justify-center text-sm text-black font-medium py-2 px-5 rounded-md bg-gray-200/70 hover:bg-gray-300";

const ProfileAction = (props: ProfileActionProps) => {
  const { modalOpen } = useModalStore();
  const { userByUsername } = props.user;

  return (
    <>
      {props.isMe && (
        <div className="flex items-center gap-2">
          <Link href="/accounts/edit">
            <div className={btnClass}>
              <span>Edit profile</span>
            </div>
          </Link>
          <Link href="/archive">
            <div className={btnClass}>
              <span>View archive</span>
            </div>
          </Link>
          <SettingIcon className="cursor-pointer h-6 inline-block" onClick={() => modalOpen(ProfileSettingModalKey)} />
          <ProfileSettings />
        </div>
      )}
      {!props.isMe && userByUsername?.id && <ProfileActionGuest toUserID={userByUsername?.id} />}
    </>
  );
};

export default ProfileAction;

const ProfileActionGuestBtn = (name: string, icon: React.ReactNode, onClick: () => void, isLoading: boolean) => {
  return (
    <Button
      color="primary"
      isLoading={isLoading}
      startContent={icon}
      className={"p-2 rounded-lg text-sm"}
      onClick={onClick}>
      {name}
    </Button>
  );
};

const ProfileActionGuestLogic = (
  toUserID: string,
  friend: FriendResponse,
  friendSendRequestMutate: UseMutateFunction<ApiSuccessResponse<FriendResponse>, ApiErrorResponse, string, unknown>,
  friendRejectMutate: UseMutateFunction<ApiSuccessResponse<FriendResponse>, ApiErrorResponse, string, unknown>,
  friendSendRequestIsPending: boolean,
  friendRejectIsPending: boolean
) => {
  const btnAddFriend = ProfileActionGuestBtn(
    "Add friend",
    <IoMdPersonAdd size={20} />,
    () => {
      friendSendRequestMutate(toUserID);
    },
    friendSendRequestIsPending
  );

  const btnRemoveFriend = ProfileActionGuestBtn(
    "Remove friend",
    <IoPersonRemoveOutline size={20} />,
    () => {
      friendRejectMutate(toUserID);
    },
    friendRejectIsPending
  );

  const btnCancelRequest = ProfileActionGuestBtn(
    "Cancel request",
    <IoPersonRemoveOutline size={20} />,
    () => {
      friendRejectMutate(toUserID);
    },
    friendRejectIsPending
  );

  const btnAcceptRequest = ProfileActionGuestBtn(
    "Accept request",
    <FiUserPlus size={20} />,
    () => {
      friendSendRequestMutate(toUserID);
    },
    friendSendRequestIsPending
  );

  switch (friend?.status) {
    case FriendStatus.REQUESTED:
      if (friend?.from_user_id === toUserID) return btnAcceptRequest;
      return btnCancelRequest;
    case FriendStatus.ACCEPTED:
      return btnRemoveFriend;
    case FriendStatus.REJECTED:
      return btnAddFriend;
    default:
      return btnAddFriend;
  }
};

const ProfileActionGuest = ({ toUserID }: { toUserID: string }) => {
  const { modalOpen } = useModalStore();
  const queryClient = useQueryClient();

  const {
    data: friendData,
    isLoading: friendIsLoading,
    isError: friendIsError,
  } = useQuery<ApiSuccessResponse<FriendResponse>, ApiErrorResponse, FriendResponse>({
    queryKey: [friendKey, toUserID],
    queryFn: async () => friendGetByUserID(toUserID),
    select: (data) => data.data,
    enabled: !!toUserID,
  });

  const { mutate: friendSendRequestMutate, isPending: friendSendRequestIsPending } = useMutation<
    ApiSuccessResponse<FriendResponse>,
    ApiErrorResponse,
    string
  >({
    mutationFn: async (params) => await friendSendRequest(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [friendKey, toUserID],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Send friend request failed!");
    },
  });

  const { mutate: friendRejectMutate, isPending: friendRejectIsPending } = useMutation<
    ApiSuccessResponse<FriendResponse>,
    ApiErrorResponse,
    string
  >({
    mutationFn: async (params) => await friendRejectRequest(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [friendKey, toUserID],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Reject friend request failed");
    },
  });

  useEffect(() => {
    if (friendIsError) {
      toast.error("Error fetching friend data");
    }
  }, [toUserID]);

  if (friendIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex flex-row">
          {friendData &&
            ProfileActionGuestLogic(
              toUserID,
              friendData,
              friendSendRequestMutate,
              friendRejectMutate,
              friendSendRequestIsPending,
              friendRejectIsPending
            )}
        </div>
        <div>
          <button className={btnClass}>Message</button>
        </div>
        <div>
          <button className="cursor-pointer inline-flex items-center justify-center text-sm text-black font-medium py-1 px-3 rounded-md mr-2 bg-gray-200/70 hover:bg-gray-300">
            <FiUserPlus size={18} />
          </button>
        </div>
        <div className="ml-2 cursor-pointer">
          <TfiMoreAlt size={20} onClick={() => modalOpen(ProfileMoreOptionsModalKey)} />
        </div>
      </div>
      <ProfileMoreOptions />
    </>
  );
};
