"use client";

import Information from "@/components/Profile/information";
import { IoMdGrid } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { BiMoviePlay } from "react-icons/bi";
import Gallery from "@/components/Profile/gallery";
import { useLazyQuery } from "@apollo/client";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import { FiBookmark } from "react-icons/fi";
import ProfileStories from "@/components/Profile/profile-stories";
import { UserByUsernameQuery } from "@/gql/graphql";
import { UserByUsername } from "@/graphql/user";

const renderActiveTabContent = (activeTab: string, user: UserByUsernameQuery) => {
  switch (activeTab) {
    case "POSTS":
      // return <Gallery user={userData} />;
      break;
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
  const [getSearchResults, { data: userData, loading: userLoading, error: userError }] =
    useLazyQuery<UserByUsernameQuery>(UserByUsername);

  useEffect(() => {
    getSearchResults({ variables: { username: params.username } });
  }, [params.username]);

  useEffect(() => {
    if (userError) {
      toast.error("User not found");
      notFound();
    }
  }, [userError]);

  if (userLoading) {
    return <div>Loading user...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  const getClassNames = (tab: string) =>
    `py-4 mx-2 text-sm font-normal flex gap-2 ${
      activeTab === tab ? "border-t border-gray-800 text-black" : "text-gray-400"
    }`;

  return (
    <div className="flex flex-col max-full mt-9 mx-16 mb-40">
      <Information userData={userData} />
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
      {renderActiveTabContent(activeTab, userData)}
    </div>
  );
};

export default ProfilePage;
