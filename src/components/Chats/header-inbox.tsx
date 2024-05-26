"use client";
import { InformationIcon, PhoneIcon, VideoIcon } from "@/icons";
import { Avatar } from "@nextui-org/react";
import React from "react";

const HeaderInbox = () => {
  return (
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-[3px]  px-4 lg:px-6 justify-between items-center shadow-sm sticky top-0 z-20">
      <div className="flex gap-0 items-center">
        <div className="relative h-[70px] w-16">
          <div className="relative inline-block overflow-hidden w-16 h-[70px] py-3">
            <Avatar
              alt="avatar"
              src="https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-12 h-12"
            />
          </div>
          <span className="absolute block rounded-full bg-green-500 ring-2 ring-white bottom-3 left-9 h-3 w-3 md:h-3 md:w-3" />
        </div>
        <div className="  flex flex-col min-w-0">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center">
              <p className="text- font-bold text-black">User-messages</p>
            </div>
            <div>
              <p className="text-xs font-light text-neutral-500">2m active </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="px-2">
          <PhoneIcon />
        </div>
        <div className="px-2">
          <VideoIcon />
        </div>
        <div className="px-2">
          <InformationIcon />
        </div>
      </div>
    </div>
  );
};

export default HeaderInbox;
