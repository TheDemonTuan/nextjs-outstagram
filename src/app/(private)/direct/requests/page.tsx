"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { BackIcon, HiddenRequestsIcon, MessageRequestsIcon } from "@/icons";
import React from "react";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";

const MessageRequests = () => {
  return (
    <div className="flex w-full">
      <div className="w-1/3 border">
        <div className="flex items-center mt-7 mb-9">
          <div onClick={() => history.back()} className="mx-4  cursor-pointer">
            <BackIcon />
          </div>
          <div className="text-2xl font-semibold">Message requests</div>
        </div>
        <div className="text-center">
          <p className="text-xs text-[#737373] mb-4">
            Open a chat to get more info about who&apos;s messaging you. They <br /> won&apos;t know that you&apos;ve
            seen it until you accept.
          </p>
          <span className="text-[#0095F6] font-semibold text-sm hover:text-[#1877F2] cursor-pointer mb-7">
            Decide who can message you
          </span>
        </div>

        <div className="pl-[22px] pr-[44px] py-2 mt-2 flex items-center space-x-3 text-[#737373] text-sm hover:bg-[#FAFAFA] cursor-pointer active:bg-[#EFEFEF]">
          <Avatar className="w-14 h-14 object-cover">
            <AvatarImage src="https://cdn.pixabay.com/photo/2023/06/13/03/37/girl-8059846_640.jpg" alt="User Avatar" />
          </Avatar>
          <span>Hello, Our team is currently looking for...</span>
          <span>·</span>
          <span>2w</span>
        </div>
        <Link
          href="/direct/requests/hidden"
          className="pl-[22px] pr-[44px] py-2 mt-2 flex justify-between items-center text-sm hover:bg-[#FAFAFA] cursor-pointer active:bg-[#EFEFEF]">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-[#EFEFEF] border border-[#EFEFEF]">
              <HiddenRequestsIcon className="p-4 w-14 h-14" />
            </div>
            <span className="text-base">Hidden requests</span>
          </div>
          <GoChevronRight size={23} />
        </Link>
        <div className="text-center cursor-pointer text-red-500 my-4">Delete all</div>
      </div>

      <div className="h-screen w-2/3 flex flex-col justify-center items-center space-y-3">
        <div className="border-2 border-black rounded-full w-28 h-28 flex justify-center items-center ">
          <MessageRequestsIcon />
        </div>
        <div className="text-xl">Message requests</div>
        <div className="text-sm text-gray-500">
          These messages are from people who you&apos;ve restricted or don&apos;t follow. They <br /> won&apos;t know
          that you&apos;ve viewed their request until you allow them to message you.
        </div>
      </div>
    </div>
  );
};

export default MessageRequests;
