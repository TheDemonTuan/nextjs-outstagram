import { SettingIcon } from "@/icons";
import Link from "next/link";
import React, { useCallback } from "react";
import ProfileSettings, { ProfileSettingModalKey } from "./profile-settings";
import { useModalStore } from "@/stores/modal-store";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";
import { TfiMoreAlt } from "react-icons/tfi";
import ProfileMoreOptions, { ProfileMoreOptionsModalKey } from "./profile-more-options";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";

import {
  FriendResponse,
  FriendStatus,
  friendAcceptRequest,
  friendGetByUserID,
  friendKey,
  friendRejectRequest,
  friendSendRequest,
} from "@/api/friend";
import { toast } from "sonner";
import { UserByUsernameQuery, UserProfileQuery } from "@/gql/graphql";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { SiVerizon } from "react-icons/si";
import { useAuth } from "@/hooks/useAuth";
import { ConfirmBanAccountModalKey } from "./confirm-ban-account";

interface ProfileActionProps {
  isMe: boolean;
  user: UserProfileQuery;
}

const btnClass =
  "cursor-pointer inline-flex items-center justify-center text-sm text-black font-medium py-2 px-5 rounded-md bg-gray-200/70 hover:bg-gray-300";

const ProfileAction = (props: ProfileActionProps) => {
  const { modalOpen } = useModalStore();
  const { user } = props.user.userProfile;
  const { authData } = useAuth();

  return (
    <>
      {props.isMe && (
        <div className="flex items-center gap-2">
          <Link href="/accounts/edit">
            <Button size="sm" className={btnClass}>
              <span>Edit profile</span>
            </Button>
          </Link>
          <Button size="sm" className={btnClass}>
            <Link href="/qr">
              <span>Share profile</span>
            </Link>
          </Button>
          <SettingIcon className="cursor-pointer h-6 inline-block" onClick={() => modalOpen(ProfileSettingModalKey)} />
          <ProfileSettings />
        </div>
      )}
      {!props.isMe && user && <ProfileActionGuest user={user} />}
    </>
  );
};

export default ProfileAction;

const ProfileActionGuest = ({ user }: { user: UserProfileQuery["userProfile"]["user"] }) => {
  const { modalOpen, setModalData } = useModalStore();
  const queryClient = useQueryClient();
  const { authData } = useAuth();

  const {
    data: friendData,
    error: friendError,
    status: friendStatus,
    isLoading: friendIsLoading,
  } = useQuery<ApiSuccessResponse<FriendResponse>, ApiErrorResponse, FriendResponse>({
    queryKey: [friendKey, user?.id],
    queryFn: async () => friendGetByUserID(user?.id || ""),
    select: (data) => data.data,
    enabled: !!user?.id,
  });

  const { mutate: friendSendRequestMutate, isPending: friendSendRequestIsPending } = useMutation<
    ApiSuccessResponse<FriendResponse>,
    ApiErrorResponse,
    string
  >({
    mutationFn: async (params) => await friendSendRequest(params),
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Send friend request failed!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [friendKey, user?.id],
      });
    },
  });

  const { mutate: friendRejectMutate, isPending: friendRejectIsPending } = useMutation<
    ApiSuccessResponse<FriendResponse>,
    ApiErrorResponse,
    string
  >({
    mutationFn: async (params) => await friendRejectRequest(params),
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Reject friend request failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [friendKey, user?.id],
      });
    },
  });

  const { mutate: friendAcceptRequestMutate, isPending: friendAcceptRequestIsPending } = useMutation<
    ApiSuccessResponse<FriendResponse>,
    ApiErrorResponse,
    string
  >({
    mutationFn: async (params) => await friendAcceptRequest(params),
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Accept friend request failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [friendKey, user?.id],
      });
    },
  });

  const handleSendRequest = useCallback(() => {
    friendSendRequestMutate(user?.id || "");
  }, [friendSendRequestMutate, user?.id]);

  const handleRejectRequest = useCallback(() => {
    friendRejectMutate(user?.id || "");
  }, [friendRejectMutate, user?.id]);

  const handleAcceptRequest = useCallback(() => {
    friendAcceptRequestMutate(user?.id || "");
  }, [friendAcceptRequestMutate, user?.id]);

  const btnAddFriend = (
    <Button
      size="sm"
      isLoading={friendSendRequestIsPending}
      className="cursor-pointer inline-flex items-center justify-center text-sm text-white font-medium py-2 px-5 rounded-md bg-[#0096F6] hover:bg-[#1877F2]"
      onClick={handleSendRequest}>
      Add friends
    </Button>
  );

  const btnRemoveFriend = (
    <Dropdown placement="bottom-start" radius="sm">
      <DropdownTrigger>
        <Button
          size="sm"
          isLoading={friendRejectIsPending}
          className="cursor-pointer inline-flex items-center justify-center text-sm text-white font-medium py-2 px-5 rounded-md bg-[#0096F6] hover:bg-[#1877F2]">
          <BsFillPersonCheckFill /> Friend
        </Button>
      </DropdownTrigger>
      <DropdownMenu className="my-1 mx-2 space-y-2" variant="faded" aria-label="Dropdown Variants">
        <DropdownItem key="unfollow" showDivider className="rounded-md">
          <span className="font-semibold text-center text-danger">Unfollow</span>
        </DropdownItem>
        <DropdownItem key="unfriend" onClick={handleRejectRequest}>
          <span className="font-semibold text-center text-danger">Unfriend</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  const btnCancelRequest = (
    <Button size="sm" isLoading={friendRejectIsPending} className={btnClass} onClick={handleRejectRequest}>
      Cancel request
    </Button>
  );

  const btnAcceptRequest = (
    <Dropdown placement="bottom-start" radius="sm">
      <DropdownTrigger>
        <Button
          size="sm"
          isLoading={friendAcceptRequestIsPending}
          className="cursor-pointer inline-flex items-center justify-center text-sm text-white font-medium py-2 px-5 rounded-md bg-[#0096F6] hover:bg-[#1877F2]">
          <SiVerizon />
          Feedback
        </Button>
      </DropdownTrigger>
      <DropdownMenu className="my-1 mx-2 space-y-2" variant="faded" aria-label="Dropdown Variants">
        <DropdownItem key="confirm" onClick={handleAcceptRequest} showDivider className="rounded-md">
          <span className="font-semibold text-primary">Confirm</span>
        </DropdownItem>
        <DropdownItem key="delete invitation" onClick={handleRejectRequest} className="rounded-md">
          <span className="font-semibold text-danger">Delete invitation</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  const renderButton = () => {
    switch (friendData?.status) {
      case FriendStatus.REQUESTED:
        return friendData?.from_user_id === user?.id ? btnAcceptRequest : btnCancelRequest;
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

  if (!user?.active) {
    return (
      <>
        <div className="flex items-center gap-2">
          {authData?.role ? (
            <Button
              size="sm"
              className="cursor-pointer inline-flex items-center justify-center text-sm text-white font-medium py-2 px-5 rounded-md bg-[#0096F6] hover:bg-[#1877F2]"
              onClick={() => {
                setModalData(user);
                modalOpen(ConfirmBanAccountModalKey);
              }}>
              Unban
            </Button>
          ) : (
            <Button
              className="cursor-pointer inline-flex items-center justify-center text-sm text-black font-medium py-2 px-5 rounded-md bg-gray-200/70 "
              isDisabled
              size="sm">
              Banned
            </Button>
          )}
          <div className="ml-2 cursor-pointer">
            <TfiMoreAlt
              size={20}
              onClick={() => {
                setModalData(user), modalOpen(ProfileMoreOptionsModalKey);
              }}
            />
          </div>
        </div>
        <ProfileMoreOptions />
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex flex-row">{renderButton && renderButton()}</div>
        <div>
          <Link href={`/direct/inbox/${user?.username}`} className={btnClass}>
            Message
          </Link>
        </div>

        <div className="ml-2 cursor-pointer">
          <TfiMoreAlt
            size={20}
            onClick={() => {
              setModalData(user), modalOpen(ProfileMoreOptionsModalKey);
            }}
          />
        </div>
      </div>
      <ProfileMoreOptions />
    </>
  );
};
