"use-client";
import { Avatar, Image } from "@nextui-org/react";
import React from "react";

const UserBox = () => {
  return (
    <div className="flex flex-row items-center">
      <div className="relative h-[70px] w-16">
        <div className="relative inline-block overflow-hidden w-16 h-[70px] py-2">
          <Avatar
            alt="avatar"
            src="https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-14 h-14"
          />
        </div>
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white bottom-2 left-10 h-3 w-3 md:h-3 md:w-3" />
      </div>
      <div className="  flex flex-col min-w-0">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-base font-normal text-black">User-messages</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">2m active </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
