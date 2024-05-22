"use client";

import Information from "@/components/Profile/information";
import ProfileStories from "@/components/Profile/profile-stories";
import { IoMdGrid } from "react-icons/io";
import React, { useEffect } from "react";
import { BiMoviePlay } from "react-icons/bi";
import Gallery from "@/components/Profile/gallery";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_USERNAME } from "@/graphql/query";
import { UserGetByUserNameResponse } from "@/api/user";
import { toast } from "sonner";
import { notFound } from "next/navigation";

const ProfilePage = ({ params }: { params: { username: string } }) => {
  const [getSearchResults, { data: userData, loading: userLoading, error: userError }] =
    useLazyQuery<UserGetByUserNameResponse>(GET_USER_BY_USERNAME);

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
    return <div>Load user...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="max-w-5xl mx-5 p-10 xl:mx-auto mt-2">
      <Information userData={userData.get_user_by_username} />
      <ProfileStories />
      <hr className="border-gray-300 mt-14" />
      <div className="flex justify-center gap-10">
        <button className="focus:border-t border-gray-800 py-4 text-sm font-semibold flex gap-2 text-gray-400 focus:text-gray-600">
          <IoMdGrid size="19" />
          POSTS
        </button>
        <button className="focus:border-t border-gray-800 py-4 text-sm font-semibold flex gap-2 text-gray-400 focus:text-gray-600">
          <BiMoviePlay className="w-5 h-5" />
          REELS
        </button>
      </div>
      <Gallery />
    </div>
  );
};

export default ProfilePage;
