"use client";

import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { PiDotsThreeBold } from "react-icons/pi";

function Comment() {
  return (
    <div className="group p-3 px-3.5  flex items-start space-x-2.5">
      <Link href="/">
        <Avatar src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg" />
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 leading-none text-sm">
          <Link href="/" className="font-semibold">
            ninhdan
          </Link>
          <p className="font-medium">tui la dan</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <div>thoi gian </div>
          <button className="text-xs font-semibold text-neutral-500">Reply</button>
          <PiDotsThreeBold className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
        </div>
      </div>
    </div>
  );
}

export default Comment;
