import { VerifiedIcon } from "@/icons";
import { Avatar, Tooltip } from "@nextui-org/react";
import React from "react";
import { useModalStore } from "@/stores/modal-store";
import { UserResponse } from "@/api/user";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useAuth } from "@/hooks/useAuth";
import OptionChangeAvatar, { OptionChangeAvatarModalKey } from "./options-change-avatar";
import ProfileAction from "./profile-action";
import { UserByUsernameQuery } from "@/gql/graphql";

const UserStat = ({ count, label }: { count: number; label: string }) => (
  <div className="mr-10">
    <span className="font-semibold text-base leading-5">{count}</span>{" "}
    <span className="text-base leading-5">{label}</span>
  </div>
);

const Information = ({ userData: user }: { userData: UserByUsernameQuery }) => {
  const { modalOpen } = useModalStore();
  const { authData } = useAuth();
  const { userByUsername } = user;

  return (
    <>
      <div className="flex flex-row mx-28">
        <div className="mt-2 mx-16">
          <div className="rounded-full w-40 h-40 cursor-pointer" onClick={() => modalOpen(OptionChangeAvatarModalKey)}>
            <Avatar src={getUserAvatarURL(userByUsername?.avatar)} className="w-40 h-40 text-large" />
          </div>
        </div>
        <div className="flex flex-col mx-6">
          <div className="flex flex-row items-center">
            <div>
              <span className="text-black-700 text-xl leading-6">{userByUsername?.username} </span>
            </div>
            {userByUsername?.role ? (
              <Tooltip color="primary" showArrow content="I'm Admin" className="mx-2 mr-5">
                <span className="mx-2 mr-5">
                  <VerifiedIcon className="w-5 h-5" />
                </span>
              </Tooltip>
            ) : (
              <div className="mx-2"></div>
            )}

            {authData && <ProfileAction isMe={authData.id === userByUsername?.id} user={user} />}
          </div>
          <div className="mt-6 flex flex-row">
            <div>
              <UserStat count={200} label="posts" />
            </div>
            <div>
              <UserStat count={200} label="followers" />
            </div>
            <div>
              <UserStat count={200} label="following" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className=" pt-4">
              <span className="text-base font-semibold text-black-700 mr-2 leading-5">{userByUsername?.full_name}</span>
            </div>
            <div className="">
              <p className="text-base text-black-700 mr-2 leading-5">{userByUsername?.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <OptionChangeAvatar />
    </>
  );
};

export default Information;
