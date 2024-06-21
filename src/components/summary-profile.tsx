import React from "react";
import Image from "next/image";
import { Button, Divider } from "@nextui-org/react";
import { MessagesIcon, MessagesSummaryProfileIcon } from "@/icons";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { UserResponse } from "@/api/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

interface SummaryProfileProps {
  user: UserResponse;
}

const SummaryProfile = (props: SummaryProfileProps) => {
  return (
    <Link href={`/${props.user.username}`} className="flex flex-col p-2">
      <div className="flex flex-row items-center space-x-3">
        <Avatar className="w-14 h-14">
          <AvatarImage src={getUserAvatarURL(props.user.avatar)} />
        </Avatar>

        <div>
          <p className="font-bold text-sm">{props.user.username}</p>
          <p className="text-sm font-normal text-gray-400">{props.user.full_name}</p>
        </div>
      </div>
      <div className="flex mt-7 mb-3  justify-between mx-5">
        <div className="text-center font-extrabold">
          342 <br />
          <span className="font-normal">posts</span>
        </div>
        <h3 className="text-center  font-extrabold">
          120k <br />
          <span className="font-normal">friends</span>
        </h3>
        <h3 className="text-center  font-extrabold">
          285
          <br />
          <span className="font-normal">following</span>
        </h3>
      </div>
      <div className="flex flex-row items-center space-x-1 mx-[-16px]">
        {props.user.posts && props.user.posts?.length > 0 ? (
          props.user.posts.map((postFile, index) => (
            <div key={index} className="flex-1">
              <Image src={postFile?.post_files[0].url} alt={`Image ${index + 1}`} className="w-full h-32" />
            </div>
          ))
        ) : (
          <>
            <div className="flex flex-col w-full h-32 justify-center items-center my-3">
              <Divider className="my-4" />
              <Image src="/camera.png" alt="" width={48} height={48} className="my-2" />
              <div className="font-bold text-base">No posts yet</div>
              <div className="text-sm text-gray-400 mx-2 text-center">
                When {props.user.username} shares photos and reels, you&apos;ll see them here.
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
    </Link>
  );
};

export default SummaryProfile;
