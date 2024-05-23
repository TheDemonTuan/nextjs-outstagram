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

const UserStat = ({ count, label }: { count: number; label: string }) => (
  <div className="mr-10">
    <span className="font-semibold text-base leading-5">{count}</span>{" "}
    <span className="text-base leading-5">{label}</span>
  </div>
);

const btnClass =
  "cursor-pointer inline-flex items-center justify-center text-sm text-black font-medium py-2 px-3 rounded-md mr-4 bg-gray-200/70 hover:bg-gray-300";

const Information = ({ userData }: { userData: UserResponse }) => {
  const { modalOpen } = useModalStore();
  const { authData } = useAuth();

  return (
    <div className="grid grid-flow-col items-center justify-center">
      <div>
        <div className="rounded-full w-40 h-40">
          <Avatar src={getUserAvatarURL(userData.avatar)} className="w-32 h-32 text-large" />
        </div>
      </div>
      <div className="ml-5">
        <span className="text-black-700 text-xl mr-4 leading-6">
          {userData.username} <VerifiedIcon className="inline-block w-5 h-5" />
        </span>
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

        <div className="mt-5 flex">
          <UserStat count={200} label="posts" />
          <UserStat count={200} label="followers" />
          <UserStat count={200} label="following" />
        </div>

        <div>
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
