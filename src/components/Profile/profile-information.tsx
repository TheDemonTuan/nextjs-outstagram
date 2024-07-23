import { VerifiedIcon } from "@/icons";
import { Spinner, Tooltip, user } from "@nextui-org/react";
import React from "react";
import { useModalStore } from "@/stores/modal-store";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useAuth } from "@/hooks/useAuth";
import OptionChangeAvatar, { OptionChangeAvatarModalKey } from "./options-change-avatar";
import ProfileAction from "./profile-action";
import { UserProfileQuery } from "@/gql/graphql";
import Friends, { FriendsModalKey } from "./friends";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ProfileInformation = ({ userProfile }: { userProfile: UserProfileQuery }) => {
  const { modalOpen } = useModalStore();
  const { authData } = useAuth();
  const { posts, user, username } = userProfile.userProfile;

  const isCurrentUser = authData?.id === user?.id;

  const isViewerFriendOrOwner =
    authData?.username === userProfile.userProfile.username ||
    userProfile.userProfile.user?.friends?.some(
      (friend) => friend?.to_user_info?.id === authData?.id || friend?.from_user_info?.id === authData?.id
    );

  const canViewPrivateProfile = userProfile.userProfile.user?.is_private === false || isViewerFriendOrOwner;
  const accountNotBan = userProfile.userProfile.user?.active === true;

  const handleAvatarClick = () => {
    if (isCurrentUser) {
      modalOpen(OptionChangeAvatarModalKey);
    }
  };

  return (
    <>
      <div className="flex flex-row mx-28 max-w-screen-xl">
        <div className="mt-2 mx-16">
          <div
            className={`rounded-full w-40 h-40 ${isCurrentUser ? "cursor-pointer" : ""}`}
            onClick={handleAvatarClick}>
            <Avatar className="w-40 h-40 text text-large">
              <AvatarImage
                src={!isCurrentUser ? getUserAvatarURL(user?.avatar) : getUserAvatarURL(authData?.avatar)}
                alt="User Avatar"
              />
              <AvatarFallback>
                <Spinner size="md" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex flex-col mx-6">
          <div className="flex flex-row items-center">
            <div>
              <span className="text-black-700 text-xl leading-6">{username} </span>
            </div>
            {user?.role ? (
              <Tooltip color="primary" showArrow content="I'm Admin" className="mx-2 mr-5">
                <span className="mx-2 mr-5">
                  <VerifiedIcon className="w-5 h-5" />
                </span>
              </Tooltip>
            ) : (
              <div className="mx-2" />
            )}

            {authData && <ProfileAction isMe={authData.id === user?.id} user={userProfile} />}
          </div>
          <div className="mt-8 flex flex-row">
            <ProfileInformationStat
              userData={userProfile}
              isBan={accountNotBan || false}
              isPrivate={canViewPrivateProfile || false}
            />
          </div>
          <div className="flex flex-col">
            <div className="pt-6">
              <span className="text-base font-semibold text-black-700 mr-2 leading-5">{user?.full_name}</span>
            </div>
            <div className="pt-3">
              <p className="text-base text-black-700 mr-2 leading-5">{user?.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <OptionChangeAvatar />
    </>
  );
};

export default ProfileInformation;

const UserStat = ({ count, label }: { count: number; label: string }) => (
  <div className="mr-10">
    <span className="font-semibold text-base leading-5">{count}</span>{" "}
    <span className="text-base leading-5">{label}</span>
  </div>
);

const ProfileInformationStat = ({
  userData,
  isBan,
  isPrivate,
}: {
  userData: UserProfileQuery;
  isBan: boolean;
  isPrivate: boolean;
}) => {
  const { modalOpen } = useModalStore();
  const { user, posts } = userData.userProfile;
  return (
    <>
      {!isBan ? (
        <>
          <UserStat count={posts?.length || 0} label="Posts" />
          <div className="cursor-default">
            <UserStat count={0} label="Friends" />
          </div>
          <UserStat count={0} label="Following" />
          <Friends userData={userData} />
        </>
      ) : !isPrivate ? (
        <>
          <UserStat count={posts?.length || 0} label="Posts" />
          <div className="cursor-default">
            <UserStat count={user?.friends?.length || 0} label="Friends" />
          </div>
          <UserStat count={0} label="Following" />
          <Friends userData={userData} />
        </>
      ) : (
        <>
          <UserStat count={posts?.length || 0} label="Posts" />
          <div onClick={() => modalOpen(FriendsModalKey)} className="cursor-pointer">
            <UserStat count={user?.friends?.length || 0} label="Friends" />
          </div>
          <UserStat count={0} label="Following" />
          <Friends userData={userData} />
        </>
      )}
    </>
  );
};
