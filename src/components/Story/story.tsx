import React from "react";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";

interface StoryProps {
  img: string;
  username: string;
}

const Story: React.FC<StoryProps> = ({ img, username }) => {
  return (
    <div className="space-y-1">
      <div className="flex flex-col justify-center items-center w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 via-red-500 to-pink-500 p-[3px]">
        <Image
          as={NextImage}
          className="object-cover"
          width={256}
          height={256}
          radius="full"
          src={img}
          alt="User Avatar"
        />
      </div>
      <p className="text-xs text-center w-16 truncate">{username}</p>
    </div>
  );
};

export default Story;
