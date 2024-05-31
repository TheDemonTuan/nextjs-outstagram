import React from "react";
import { HoverCard, HoverCardContent } from "./ui/hover-card";
import Image from "next/image";
import { Avatar, Button, Divider } from "@nextui-org/react";
import { MessagesIcon, MessagesSummaryProfileIcon } from "@/icons";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";

interface SummaryProfileProps {
  username?: string;
  full_name?: string;
  avatar?: string;
  listImageFirstOfPost?: string[];
}

const SummaryProfile: React.FC<SummaryProfileProps> = ({ username, full_name, avatar, listImageFirstOfPost }) => {
  return (
    <HoverCardContent align="start" className="w-96">
      <div className="flex flex-col">
        <div className="flex flex-row items-center space-x-2">
          <Avatar src={avatar} className="rounded-full w-14 h-14" alt="" />
          <div>
            <p className="font-semibold text-sm">{username}</p>
            <p className="text-sm font-normal text-gray-400">{full_name}</p>
          </div>
        </div>
        <div className="flex flex-col my-4 ">
          <div className="flex flex-row justify-between font-semibold">
            <div className="flex-1 text-center">2,5M</div>
            <div className="flex-1 text-center mx-12">24k</div>
            <div className="flex-1 text-center">5M</div>
          </div>
          <div className="flex flex-row justify-between  text-sm">
            <div className="flex-1 text-center">posts</div>
            <div className="flex-1 text-center mx-12">followers</div>
            <div className="flex-1 text-center">following</div>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-1 mx-[-16px]">
          {listImageFirstOfPost && listImageFirstOfPost.length > 0 ? (
            listImageFirstOfPost.map((src, index) => (
              <div key={index} className="flex-1">
                <img src={src} alt={`Image ${index + 1}`} className="w-full h-32" />
              </div>
            ))
          ) : (
            <>
              <div className="flex flex-col w-full h-32 justify-center items-center my-3">
                <Divider className="my-4" />
                <img src="/camera.png" alt="" className="w-12 h-12" />
                <div className="font-bold text-base">No posts yet</div>
                <div className="text-sm text-gray-400 mx-2 text-center">
                  When umaraliyevv.j shares photos and reels, you'll see them here.
                </div>
                <Divider className="my-4" />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-row items-center mt-4">
          <Button className="w-1/2 mx-1 h-9 text-white font-medium bg-primary-400 rounded-lg">
            {" "}
            <MessagesSummaryProfileIcon stroke="#FFFFFF" className="w-5 h-5" />
            Message
          </Button>
          <Button className="w-1/2 mx-1 h-9 font-medium bg-gray-200 rounded-lg">Following</Button>
        </div>
      </div>
    </HoverCardContent>
  );
};

export default SummaryProfile;
