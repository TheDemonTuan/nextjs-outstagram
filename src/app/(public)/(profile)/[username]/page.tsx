"use client";

import ProfileInformation from "@/components/Profile/profile-information";
import { IoMdGrid } from "react-icons/io";
import React, { useCallback, useEffect, useState } from "react";
import { BiMoviePlay } from "react-icons/bi";
import Gallery from "@/components/Profile/gallery";
import { toast } from "sonner";
import { notFound, useSearchParams } from "next/navigation";
import { FiBookmark } from "react-icons/fi";
import { Friend, UserProfileDocument, UserProfileQuery } from "@/gql/graphql";
import { graphQLClient } from "@/lib/graphql";
import { useQuery } from "@tanstack/react-query";
import { userKey } from "@/api/user";
import { Button, Skeleton } from "@nextui-org/react";
import { ProfileSkeleton } from "@/components/skeletons";
import { PrivateAccountIcon, ReelsIcon, ReelsProfileIcon, VideoAddIcon } from "@/icons";
import Reel from "@/components/Profile/reel";
import Saved from "@/components/Profile/saved";
import { useAuth } from "@/hooks/useAuth";

const renderActiveTabContent = (activeTab: string, userProfile: UserProfileQuery) => {
  switch (activeTab) {
    case "POSTS":
      return <Gallery userProfile={userProfile} />;
    case "REELS":
      return <Reel userProfile={userProfile} />;
    case "SAVED":
      return <Saved />;
    default:
      return null;
  }
};

const ProfilePage = ({ params }: { params: { username: string } }) => {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "POSTS";
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const { authData, authCanUse } = useAuth();

  const {
    data: userProfileData,
    error: userProfileError,
    isLoading: userProfileIsLoading,
  } = useQuery({
    queryKey: [userKey, "profile", { username: params.username }],
    queryFn: () => graphQLClient.request(UserProfileDocument, { username: params.username }),
    enabled: !!params.username,
  });

  useEffect(() => {
    if (userProfileError) {
      notFound();
    }
  }, [userProfileError]);

  const getClassNames = useCallback(
    (tab: string) =>
      `py-4 mx-2 text-sm font-normal flex gap-2 ${
        activeTab === tab ? "border-t border-gray-800 text-black" : "text-gray-400"
      }`,
    [activeTab]
  );

  if (userProfileIsLoading) {
    return <ProfileSkeleton />;
  }

  if (!userProfileData) {
    return <div>User not found</div>;
  }

  const isViewerFriendOrOwner =
    authData?.username === userProfileData.userProfile.username ||
    userProfileData.userProfile.user?.friends?.some(
      (friend) => friend?.to_user_info?.id === authData?.id || friend?.from_user_info?.id === authData?.id
    );

  const canViewPrivateProfile = userProfileData.userProfile.user?.is_private === false || isViewerFriendOrOwner;

  return (
    <div className="flex flex-col max-w-screen-lg mt-9 mx-28 mb-40">
      <ProfileInformation userProfile={userProfileData} />
      <div className="w-full">
        <hr className="border-gray-300 mt-14 border-t mx-28" />
      </div>
      {canViewPrivateProfile && (
        <div className="flex justify-center gap-10 mb-1">
          <button className={getClassNames("POSTS")} onClick={() => setActiveTab("POSTS")}>
            <IoMdGrid size="19" />
            POSTS
          </button>
          <button className={getClassNames("REELS")} onClick={() => setActiveTab("REELS")}>
            <ReelsProfileIcon width={19} height={19} />
            REELS
          </button>
          {authData?.username === userProfileData.userProfile.username && (
            <button className={getClassNames("SAVED")} onClick={() => setActiveTab("SAVED")}>
              <FiBookmark size={19} />
              SAVED
            </button>
          )}
        </div>
      )}

      {!canViewPrivateProfile && (
        <div className="flex flex-col items-center justify-center gap-5 mb-1 my-6">
          <div className="flex items-center space-x-3">
            <PrivateAccountIcon />
            <div className="flex flex-col">
              <span className="text-base font-semibold ">This account is private</span>
              <span className="text-sm text-[#737373]"> Follow to see their photos and videos.</span>
            </div>
          </div>
          {authCanUse && (
            <Button className="bg-[#0095F6] hover:bg-[#1877F2] text-sm text-white font-semibold px-5 py-3" radius="sm">
              Add Friend
            </Button>
          )}
        </div>
      )}
      {canViewPrivateProfile && renderActiveTabContent(activeTab, userProfileData)}
    </div>
  );
};

export default ProfilePage;
