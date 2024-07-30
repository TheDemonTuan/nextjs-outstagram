import React from "react";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";

const Story = ({ img, username }: { img: string; username: string }) => {
  return (
    <Link href={`/${username}`}>
      <div className="space-y-1">
        <div className="flex flex-col justify-center items-center w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFC500] via-[#FF105D] to-[#D300C5]">
          <div className="flex flex-col justify-center items-center w-14 h-14 rounded-full bg-white p-1">
            <Image
              as={NextImage}
              className="object-cover w-12 h-12"
              width={256}
              height={256}
              radius="full"
              src={getUserAvatarURL(img)}
              alt="User Avatar"
            />
          </div>
        </div>
        <p className="text-xs text-center w-16 truncate">{username}</p>
      </div>
    </Link>
  );
};

export default Story;
