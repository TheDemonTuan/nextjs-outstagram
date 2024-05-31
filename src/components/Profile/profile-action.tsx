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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import {
  FriendResponse,
  FriendStatus,
  friendGetList,
  friendKey,
  friendRejectRequest,
  friendSendRequest,
} from "@/api/friend";
import { toast } from "sonner";
import { IoPersonRemoveOutline } from "react-icons/io5";

interface ProfileActionProps {
  isMe: boolean;
  user: UserResponse;
}

const btnClass =
  "cursor-pointer inline-flex items-center justify-center text-sm text-black font-medium py-2 px-5 rounded-md bg-gray-200/70 hover:bg-gray-300";

const ProfileAction = (props: ProfileActionProps) => {
  const { modalOpen } = useModalStore();
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
      {!props.isMe && <ProfileActionGuest toUserID={props.user.id} />}
    </>
  );
};

export default ProfileAction;

const ProfileActionGuest = ({ toUserID }: { toUserID: string }) => {
  const { modalOpen } = useModalStore();
  const [friend, setFriend] = useState<FriendResponse | null>(null);
  const queryClient = useQueryClient();

  const { data: friendsData, isLoading: friendsIsLoading } = useQuery<
    ApiSuccessResponse<FriendResponse[]>,
    ApiErrorResponse,
    FriendResponse[]
  >({
    queryKey: [friendKey, "me"],
    queryFn: async () => friendGetList(),
    select: (data) => data.data,
  });

  const { mutate: friendSendRequestMutate, isPending: friendSendRequestIsPending } = useMutation<
    ApiSuccessResponse<FriendResponse>,
    ApiErrorResponse,
    string
  >({
    mutationFn: async (params) => await friendSendRequest(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [friendKey, "me"],
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
            queryKey: [friendKey, "me"],
        });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Reject friend request failed");
    },
  });

  useEffect(() => {
    setFriend(friendsData?.find((friend) => friend.ToUser.id === toUserID) ?? null);
  }, [toUserID, friendsData]);
  
  if (friendsIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex flex-row">
          {!friend || friend.status === FriendStatus.REJECTED ? (
            <Button
              color="primary"
              isLoading={friendSendRequestIsPending}
              startContent={<IoMdPersonAdd size={20} />}
              className={"p-2 rounded-lg text-sm"}
              onClick={() => friendSendRequestMutate(toUserID)}>
              Add friend
            </Button>
          ) : friend?.status === FriendStatus.ACCEPTED ? (
            <Button
              color="primary"
              isLoading={friendRejectIsPending}
              startContent={<IoPersonRemoveOutline size={20} />}
              className={"p-2 rounded-lg text-sm"}
              onClick={() => friendRejectMutate(toUserID)}>
              Remove friend
            </Button>
          ) : (
            friend?.status === FriendStatus.REQUESTED && (
              <Button
                color="primary"
                isLoading={friendRejectIsPending}
                startContent={<IoMdPersonAdd size={20} />}
                className={"p-2 rounded-lg text-sm"}
                onClick={() => friendRejectMutate(toUserID)}>
                Cancel request
              </Button>
            )
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
