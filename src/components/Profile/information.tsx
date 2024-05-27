import { SettingIcon, VerifiedIcon } from "@/icons";
import { Avatar } from "@nextui-org/react";
import React from "react";
import { useModalStore } from "@/stores/modal-store";
import ProfileSettings, { ProfileSettingModalKey } from "./profile-settings";
import { UserResponse } from "@/api/user";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import OptionChangeAvatar, { OptionChangeAvatarModalKey } from "./options-change-avatar";

const UserStat = ({ count, label }: { count: number; label: string }) => (
  <div className="mr-10">
    <span className="font-semibold text-base leading-5">{count}</span>{" "}
    <span className="text-base leading-5">{label}</span>
  </div>
);

const btnClass =
  "cursor-pointer inline-flex items-center justify-center text-sm text-black font-medium py-1 px-5 rounded-md mr-4 bg-gray-200/70 hover:bg-gray-300";

const Information = ({ userData }: { userData: UserResponse }) => {
  const { modalOpen } = useModalStore();
  const { authData } = useAuth();

  return (
    <div className="flex flex-row mx-28">
      <div className="mt-2 mx-16">
        <div className="rounded-full w-40 h-40 cursor-pointer" onClick={() => modalOpen(OptionChangeAvatarModalKey)}>
          <Avatar src={getUserAvatarURL(userData.avatar)} className="w-36 h-36 text-large" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <div>
            <span className="text-black-700 text-xl leading-6">{userData.username} </span>
          </div>
          <div className="mx-2 mr-5">
            <VerifiedIcon className="w-5 h-5" />
          </div>

          {authData?.id === userData.id && (
            <>
              <Link href="/accounts/edit">
                <div className={cn(btnClass, "")}>
                  <span>Edit profile</span>
                </div>
              </Link>
              <Link href="/archive">
                <div className={btnClass}>
                  <span>View archive</span>
                </div>
              </Link>
              <SettingIcon
                className="cursor-pointer h-6 inline-block "
                onClick={() => modalOpen(ProfileSettingModalKey)}
              />
              <ProfileSettings />
            </>
          )}
          <OptionChangeAvatar />
        </div>

        <div className="mt-5 flex flex-row">
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
          <div className=" pt-5">
            <span className="text-base font-semibold text-black-700 mr-2 leading-5">{userData.full_name}</span>
          </div>
          <div className="">
            <p className="text-base text-black-700 mr-2 leading-5">{userData.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
