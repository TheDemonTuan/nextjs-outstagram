import { SettingIcon, VerifiedIcon } from "@/icons";
import { Avatar } from "@nextui-org/react";
import React from "react";
import { useModalStore } from "@/stores/modal-store";
import ProfileSettings, { ProfileSettingModalKey } from "./profile-settings";
import { UserResponse } from "@/api/user";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const UserStat = ({ count, label }: { count: number; label: string }) => (
  <div className="mr-10">
    <span className="font-semibold text-sm leading-5">{count}</span>{" "}
    <span className="font-normal text-sm leading-5">{label}</span>
  </div>
);

const Information = ({ userData }: { userData: UserResponse }) => {
  const { modalOpen } = useModalStore();
  const { authData } = useAuth();

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-4 gap-4 ">
        <div className="col-span-1">
          <div className="rounded-full w-40 h-40">
            <Avatar
              src={getUserAvatarURL(userData.avatar)}
              className="w-37 h-37 text-large"
            />
          </div>
        </div>
        <div className="col-span-2 ml-5">
          <div className=" inline-flex">
            <span className="text-black-700 text-2xl mr-4 leading-6">
              {userData.username} <VerifiedIcon className="inline-flex" />
            </span>
          </div>
          {authData?.id === userData.id && (
            <>
              <Link href="/edit-profile">
                <div className="cursor-pointer inline-flex items-center justify-center text-xs text-gray-700 font-semibold py-2 px-3 border-none rounded mr-4 bg-[#DBDBDB] w-24">
                  <span>Edit profile</span>
                </div>
              </Link>
              <Link href="/archive">
                <div className="cursor-pointer inline-flex items-center justify-center text-xs text-gray-700 font-semibold py-2 px-3 border-none rounded mr-4 bg-[#DBDBDB] w-24">
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
              <span className="text-base font-semibold text-black-700 mr-2 leading-5">
                {userData.full_name}
              </span>
            </div>
            <div className="">
              <p className="text-base text-black-700 mr-2 leading-5">
                {userData.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
