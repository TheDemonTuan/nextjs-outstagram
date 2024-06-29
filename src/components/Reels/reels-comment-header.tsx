"use client";

import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import { BsChatDots, BsTrash3 } from "react-icons/bs";
import { ImMusic } from "react-icons/im";
import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function ReelsCommentsHeader() {
  return (
    <>
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center">
          <Link href={`/`}>
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=400" />
            </Avatar>
          </Link>
          <div className="ml-3 pt-0.5">
            <Link href={`/`} className="relative z-10 text-[17px] font-semibold hover:underline">
              username
            </Link>

            <div className="relative z-0 text-[13px] -mt-5 font-light">
              fullname
              <span className="relative -top-[2px] text-[30px] pl-1 pr-0.5 ">.</span>
              <span className="font-medium">Time create</span>
            </div>
          </div>
        </div>
      </div>
      {/* <button>Add friends</button> */}

      <p className="px-8 mt-4 text-sm">caption</p>

      <p className="flex item-center gap-2 px-8 mt-4 text-sm font-bold">
        <ImMusic size="17" />
        original sound - username
      </p>

      <div className="flex items-center px-8 mt-8">
        <div>
          <div className="pb-4 text-center flex items-center">
            <button className="rounded-full bg-gray-200 p-2 cursor-pointer">
              <AiFillHeart color="#ff2626" size="25" />

              {/* <BiLoaderCircle className="animate-spin" size="25" /> */}
            </button>
            <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold">number like</span>
          </div>
        </div>

        <div className="pb-4 text-center flex items-center">
          <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
            <BsChatDots size={25} />
          </div>
          <span className="text-xs pl-2 text-gray-800 font-semibold">number comment</span>
        </div>
      </div>
    </>
  );
}
