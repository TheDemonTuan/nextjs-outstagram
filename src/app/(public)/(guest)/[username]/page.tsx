"use client";

import Information from "@/components/Profile/information";
import ProfileStories from "@/components/Profile/profile-stories";
import { IoMdGrid } from "react-icons/io";
import React, { useEffect } from "react";
import { BiMoviePlay } from "react-icons/bi";
import Gallery from "@/components/Profile/gallery";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_USERNAME, UserGetByUserNameResponse } from "@/graphql/query";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import { FiBookmark } from "react-icons/fi";
import { usePusherStore } from "@/stores/pusher-store";

const ProfilePage = ({ params }: { params: { username: string } }) => {
  const [getSearchResults, { data: userData, loading: userLoading, error: userError }] =
    useLazyQuery<UserGetByUserNameResponse>(GET_USER_BY_USERNAME);
  const { pusherClient } = usePusherStore();

  useEffect(() => {
    pusherClient.subscribe("my-channel");
    pusherClient.bind("my-event", (data: any) => {
      // setMessage(data.message);
      toast.info(data.message);
    });
    return () => {
      pusherClient.unsubscribe("my-channel");
      // pusher.disconnect();
    };
  }, []);

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
    <div className="flex flex-col mt-9 mx-14 mb-40">
      <Information userData={userData.get_user_by_username} />
      {/* <ProfileStories /> */}
      <div className="w-full">
        <hr className="border-gray-300 mt-14 border-t mx-28" />
      </div>
      <div className="flex justify-center gap-10 mb-1">
        <button className="focus:border-t border-gray-800 py-4 mx-2 text-sm font-normal flex gap-2 text-gray-400 focus:text-black">
          <IoMdGrid size="19" />
          POSTS
        </button>
        <button className="focus:border-t border-gray-800 py-4 mx-2  text-sm font-normal flex gap-2 text-gray-400 focus:text-black">
          <BiMoviePlay className="w-5 h-5" />
          REELS
        </button>
        <button className="focus:border-t border-gray-800 py-4 mx-2 text-sm font-normal flex gap-2 text-gray-400 focus:text-black">
          <FiBookmark size={19} />
          SAVED
        </button>
      </div>
      <Gallery user={userData.get_user_by_username} />
    </div>
  );
};

export default ProfilePage;
