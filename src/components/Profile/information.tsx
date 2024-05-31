import { SettingIcon, VerifiedIcon } from "@/icons";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import React from "react";
import { useModalStore } from "@/stores/modal-store";
import ProfileSettings, { ProfileSettingModalKey } from "./profile-settings";
import { UserResponse } from "@/api/user";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import OptionChangeAvatar, { OptionChangeAvatarModalKey } from "./options-change-avatar";
import { SlArrowDown } from "react-icons/sl";
import { TfiMoreAlt } from "react-icons/tfi";
import { FiUserPlus } from "react-icons/fi";
import ProfileMoreOptions, { ProfileMoreOptionsModalKey } from "./profile-more-options";
import { IoMdPersonAdd } from "react-icons/io";
import ProfileAction from "./profile-action";

const UserStat = ({ count, label }: { count: number; label: string }) => (
  <div className="mr-10">
    <span className="font-semibold text-base leading-5">{count}</span>{" "}
    <span className="text-base leading-5">{label}</span>
  </div>
);

const Information = ({ userData }: { userData: UserResponse }) => {
  const { modalOpen } = useModalStore();
  const { authData } = useAuth();

  return (
    <>
      <div className="flex flex-row mx-28">
        <div className="mt-2 mx-16">
          <div className="rounded-full w-40 h-40 cursor-pointer" onClick={() => modalOpen(OptionChangeAvatarModalKey)}>
            <Avatar src={getUserAvatarURL(userData.avatar)} className="w-40 h-40 text-large" />
          </div>
        </div>
        <div className="flex flex-col mx-6">
          <div className="flex flex-row items-center">
            <div>
              <span className="text-black-700 text-xl leading-6">{userData.username} </span>
            </div>
            {userData.role ? (
              <Tooltip color="primary" showArrow content="I'm Admin" className="mx-2 mr-5">
                <span className="mx-2 mr-5">
                  <VerifiedIcon className="w-5 h-5" />
                </span>
              </Tooltip>
            ) : (
              <div className="mx-2"></div>
            )}

            {authData && <ProfileAction isMe={authData.id === userData.id} user={userData} />}
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
              <span className="text-base font-semibold text-black-700 mr-2 leading-5">{userData.full_name}</span>
            </div>
            <div className="">
              <p className="text-base text-black-700 mr-2 leading-5">{userData.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <OptionChangeAvatar />
    </>
  );
};

export default Information;
