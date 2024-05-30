"use client";

import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { PiDotsThreeBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";

function Comment() {
  return (
    <div className="group p-3 px-3.5 flex items-start space-x-2.5 w-full">
      <Link href="/">
        <Avatar
          src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg"
          className="w-8 h-8"
        />
      </Link>
      <div className="space-y-1">
        <div className="flex items-center space-x-1.5 text-[13px] leading-[18px]">
          <Link href="/" className="font-semibold">
            ninhdan
          </Link>
          <p className="font-normal text-black">tui la dan đấđâsdasd</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <span className="text-xs text-gray-500">1d</span>
          <button className="text-xs font-semibold text-neutral-500">1 like</button>
          <button className="text-xs font-semibold text-neutral-500">Reply</button>
          <PiDotsThreeBold className="w-6 h-6 hover:stroke-gray115 cursor-pointer items-end" stroke="#262626" />
          <FaRegHeart size={12} />
        </div>
      </div>
    </div>
  );
}

export default Comment;
