"use client";

import Information from "@/components/Profile/information";
import ProfileStories from "@/components/Profile/profile-stories";
import { IoMdGrid } from "react-icons/io";
import React from "react"
import { ReelsIcon } from "@/icons";
import { BiComment, BiHeart, BiMoviePlay } from "react-icons/bi";
import Gallery from "@/components/Profile/gallery";

const ProfilePage = () => {
  return (
    <div className="max-w-5xl mx-5 p-10 xl:mx-auto mt-2">
      <Information />
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
  )
}

export default ProfilePage