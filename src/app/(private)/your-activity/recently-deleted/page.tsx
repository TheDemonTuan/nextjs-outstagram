"use client";
import { PostsPhotosAndVideosIcon, ReelsPhotosAndVideosIcon } from "@/icons";
import Image from "next/image";
import React, { useState } from "react";

const RecentlyDeletedPage = () => {
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

      <span className="text-center my-4 text-xs text-[#737373]">
        Only you can see these posts. They will be permanently
        <br /> deleted after the number of days shown. After that, you won&apos;t be able to restore them.
      </span>

      <div className="overflow-y-auto max-h-[442px] scrollbar-hide">
        {activeTab === "posts" && <PostsComponent />}
        {activeTab === "reels" && <ReelsComponent />}
      </div>
    </div>
  );
};

export default RecentlyDeletedPage;

const PostsComponent = () => {
  return (
    <div className="grid grid-cols-5 gap-1">
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1718668878/posts/du9hfrxggsh6spnejrgu.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32 h-32"
        />
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1718668878/posts/du9hfrxggsh6spnejrgu.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32 h-32"
        />
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1718668878/posts/du9hfrxggsh6spnejrgu.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32 h-32"
        />
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1718668878/posts/du9hfrxggsh6spnejrgu.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32 h-32"
        />
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1718668878/posts/du9hfrxggsh6spnejrgu.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32 h-32"
        />
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1718668878/posts/du9hfrxggsh6spnejrgu.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32 h-32"
        />
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1718668878/posts/du9hfrxggsh6spnejrgu.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32 h-32"
        />
      </div>
    </div>
  );
};

const ReelsComponent = () => {
  return (
    <div className="grid grid-cols-5 gap-1">
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1719183177/posts/c9s6ahvlajdbn6wffpey.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32 h-[230px] object-cover"
        />
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1719183177/posts/c9s6ahvlajdbn6wffpey.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32  h-[230px] object-cover"
        />
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1719183177/posts/c9s6ahvlajdbn6wffpey.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32 h-[230px] object-cover"
        />
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1719183177/posts/c9s6ahvlajdbn6wffpey.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32 h-[230px] object-cover"
        />
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1719183177/posts/c9s6ahvlajdbn6wffpey.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32 h-[230px] object-cover"
        />
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1719183177/posts/c9s6ahvlajdbn6wffpey.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32 h-[230px] object-cover"
        />
      </div>
      <div>
        <Image
          src="https://res.cloudinary.com/dsjzxokur/image/upload/v1719183177/posts/c9s6ahvlajdbn6wffpey.webp"
          width={500}
          height={500}
          loading="lazy"
          alt=""
          className="w-32 h-[230px] object-cover"
        />
      </div>
    </div>
  );
};
