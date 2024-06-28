"use client";
import { PostsPhotosAndVideosIcon, ReelsPhotosAndVideosIcon } from "@/icons";
import React, { useState } from "react";

const PhotoAndVideoPage = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    { name: "posts", icon: <PostsPhotosAndVideosIcon />, label: "POSTS" },
    { name: "reels", icon: <ReelsPhotosAndVideosIcon />, label: "REELS" },
  ];

  return (
    <div className="flex flex-col mx-6">
      <div className="w-full flex items-center justify-evenly text-sm border-b mt-1">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`flex items-center space-x-2 cursor-pointer py-4 ${
              activeTab === tab.name ? "text-black border-b-1 border-black" : "text-[#737373]"
            }`}
            onClick={() => setActiveTab(tab.name)}>
            {tab.icon}
            <span>{tab.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "posts" && <PostsComponent />}
        {activeTab === "reels" && <ReelsComponent />}
      </div>
    </div>
  );
};

export default PhotoAndVideoPage;

const PostsComponent = () => {
  return <div>Posts content goes here.</div>;
};

const ReelsComponent = () => {
  return <div>Reels content goes here.</div>;
};
