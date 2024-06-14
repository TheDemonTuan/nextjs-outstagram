"use client";

import ProfileInformation from "@/components/Profile/profile-information";
import { IoMdGrid } from "react-icons/io";
import React, { useCallback, useEffect, useState } from "react";
import { BiMoviePlay } from "react-icons/bi";
import Gallery from "@/components/Profile/gallery";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import { FiBookmark } from "react-icons/fi";
import ProfileStories from "@/components/Profile/profile-stories";
import { UserProfileDocument, UserProfileQuery } from "@/gql/graphql";
import { graphQLClient } from "@/lib/graphql";
import { useQuery } from "@tanstack/react-query";
import { userKey } from "@/api/user";

const renderActiveTabContent = (activeTab: string, userProfile: UserProfileQuery) => {
  switch (activeTab) {
    case "POSTS":
      return <Gallery userProfile={userProfile} />;
    case "REELS":
      return <div>Reels content goes here</div>;
    case "SAVED":
      return <div>Saved content goes here</div>;
    default:
      return null;
  }
};

const ProfilePage = ({ params }: { params: { username: string } }) => {
  const [activeTab, setActiveTab] = useState<string>("POSTS");

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
      toast.error("User not found");
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
    return <div>Loading user...</div>;
  }

  if (!userProfileData) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col max-full mt-9 mx-16 mb-40">
      <ProfileInformation userProfile={userProfileData} />
      <ProfileStories />
      <div className="w-full">
        <hr className="border-gray-300 mt-14 border-t mx-28" />
      </div>
      <div className="flex justify-center gap-10 mb-1">
        <button className={getClassNames("POSTS")} onClick={() => setActiveTab("POSTS")}>
          <IoMdGrid size="19" />
          POSTS
        </button>
        <button className={getClassNames("REELS")} onClick={() => setActiveTab("REELS")}>
          <BiMoviePlay className="w-5 h-5" />
          REELS
        </button>
        <button className={getClassNames("SAVED")} onClick={() => setActiveTab("SAVED")}>
          <FiBookmark size={19} />
          SAVED
        </button>
      </div>
      {renderActiveTabContent(activeTab, userProfileData)}
    </div>
  );
};

export default ProfilePage;
