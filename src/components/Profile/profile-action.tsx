import { UserResponse } from "@/api/user";
import { SettingIcon } from "@/icons";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
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
  friendAcceptRequest,
  friendGetByUserID,
  friendGetList,
  friendKey,
  friendRejectRequest,
  friendSendRequest,
} from "@/api/friend";
import { toast } from "sonner";
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
            <Button size="sm" className={btnClass}>
              <span>Edit profile</span>
            </Button>
          </Link>
          <Link href="/archive">
            <Button size="sm" className={btnClass}>
              <span>View archive</span>
            </Button>
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
      console.log(error);

      toast.error(error?.response?.data?.message || "Reject friend request failed");
    },
  });

  const { mutate: friendAcceptRequestMutate, isPending: friendAcceptRequestIsPending } = useMutation<
    ApiSuccessResponse<FriendResponse>,
    ApiErrorResponse,
    string
  >({
    mutationFn: async (params) => await friendAcceptRequest(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [friendKey, toUserID],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Accept friend request failed");
    },
  });

  useEffect(() => {
    if (friendIsError) {
      toast.error("Error fetching friend data");
    }
  }, [friendIsError, toUserID]);

  const handleSendRequest = useCallback(() => {
    friendSendRequestMutate(toUserID);
  }, [friendSendRequestMutate, toUserID]);

  const handleRejectRequest = useCallback(() => {
    friendRejectMutate(toUserID);
  }, [friendRejectMutate, toUserID]);

  const handleAcceptRequest = useCallback(() => {
    friendAcceptRequestMutate(toUserID);
  }, [friendAcceptRequestMutate, toUserID]);

  const btnAddFriend = (
    <Button
      size="sm"
      isLoading={friendSendRequestIsPending}
      className="cursor-pointer inline-flex items-center justify-center text-sm text-white font-medium py-2 px-5 rounded-md bg-[#0096F6] hover:bg-[#1877F2]"
      onClick={handleSendRequest}>
      Add friend
    </Button>
  );

  const btnRemoveFriend = (
    <Button size="sm" isLoading={friendRejectIsPending} className={btnClass} onClick={handleRejectRequest}>
      Remove friend
    </Button>
  );

  const btnCancelRequest = (
    <Button size="sm" isLoading={friendRejectIsPending} className={btnClass} onClick={handleRejectRequest}>
      Cancel request
    </Button>
  );

  const btnAcceptRequest = (
    <Button
      size="sm"
      isLoading={friendAcceptRequestIsPending}
      className="cursor-pointer inline-flex items-center justify-center text-sm text-white font-medium py-2 px-5 rounded-md bg-[#0096F6] hover:bg-[#1877F2]"
      onClick={handleAcceptRequest}>
      Accept request
    </Button>
  );

  const renderButton = () => {
    switch (friendData?.status) {
      case FriendStatus.REQUESTED:
        return friendData?.from_user_id === toUserID ? btnAcceptRequest : btnCancelRequest;
      case FriendStatus.ACCEPTED:
        return btnRemoveFriend;
      case FriendStatus.REJECTED:
        return btnAddFriend;
      default:
        return btnAddFriend;
    }
  };

  if (friendIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex flex-row">{renderButton && renderButton()}</div>
        <div>
          <Button size="sm" className={btnClass}>
            Message
          </Button>
        </div>
        <div>
          <Button
            size="sm"
            className="cursor-pointer inline-flex items-center justify-center text-sm text-black font-medium py-1 px-3 rounded-md mr-2 bg-gray-200/70 hover:bg-gray-300">
            <FiUserPlus size={18} />
          </Button>
        </div>
        <div className="ml-2 cursor-pointer">
          <TfiMoreAlt size={20} onClick={() => modalOpen(ProfileMoreOptionsModalKey)} />
        </div>
      </div>
      <ProfileMoreOptions />
    </>
  );
};
