import React from "react";
import Image from "next/image";
import { Avatar, Button, Divider } from "@nextui-org/react";
import { MessagesIcon, MessagesSummaryProfileIcon } from "@/icons";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { UserResponse } from "@/api/user";

interface SummaryProfileProps {
  user: UserResponse;
}

const SummaryProfile = (props: SummaryProfileProps) => {
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row items-center space-x-2">
        <Avatar src={getUserAvatarURL(props.user.avatar)} className="rounded-full w-14 h-14" alt="User Avatar" />
        <div>
          <p className="font-semibold text-sm">{props.user.username}</p>
          <p className="text-sm font-normal text-gray-400">{props.user.full_name}</p>
        </div>
      </div>
      <div className="flex flex-col my-4 ">
        <div className="flex justify-between gap-2 font-semibold">
          <div className="">2,5M</div>
          <div className="">24k</div>
          <div className="">5M</div>
        </div>
        <div className="flex justify-between gap-2 text-sm">
          <div className="">posts</div>
          <div className="">friends</div>
          <div className="">following</div>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-1 mx-[-16px]">
        {props.user.posts && props.user.posts?.length > 0 ? (
          props.user.posts.map((url, index) => (
            <div key={index} className="flex-1">
              <Avatar src={url.caption} alt={`Image ${index + 1}`} className="w-full h-32" />
            </div>
          ))
        ) : (
          <>
            <div className="flex flex-col w-full h-32 justify-center items-center my-3">
              <Divider className="my-4" />
              <Image src="/camera.png" alt="" width={48} height={48} className="my-2" />
              <div className="font-bold text-base">No posts yet</div>
              <div className="text-sm text-gray-400 mx-2 text-center">
                When umaraliyevv.j shares photos and reels, you&apos;ll see them here.
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
  );
};

export default SummaryProfile;
