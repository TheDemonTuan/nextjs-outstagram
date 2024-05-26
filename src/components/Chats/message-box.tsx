"use client";
import { Avatar, Image } from "@nextui-org/react";
import React from "react";

const MessageBox = () => {
  return (
    <div>
      <div className="flex justify-center py-9">
        <div className="flex flex-col items-center">
          <div>
            <Avatar
              alt="avatar"
              src="https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="w-24 h-24"
            />
          </div>
          <div className="pt-4 font-semibold text-lg text-black ">
            Ninh dan <br />
          </div>
          <div className="text-sm text-gray-500 font-light">
            ninh__dan.02 · Instagram{" "}
          </div>
          <div className="pt-4">
            <button className="py-[6px] px-4 rounded-md font-semibold text-sm bg-[#EFEFEF]">
              View Profile
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-3">
        <div className="text-xs text-gray-400">21:34 Fri</div>
      </div>
      <div className="flex gap-3 p-3 justify-end">
        <div className="flex flex-col gap-2 items-end">
          <div className="text-sm w-fit overflow-hidden bg-sky-500 text-white rounded-full py-2 px-3">
            message
          </div>
        </div>
      </div>
      <div className="flex gap-3 p-3 justify-start">
        <div className="">
          <Avatar
            alt="avatar"
            src="https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-8 h-8"
          />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <div className="text-sm w-fit overflow-hidden bg-sky-500 text-white rounded-md py-0">
            <Image
              alt="Image"
              height="288"
              width="288"
              src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 p-3 justify-start">
        <div className="flex">
          <Avatar
            alt="avatar"
            src="https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="w-8 h-8"
          />
        </div>
        <div className="flex gap-3 p-2justify-center">
          <div className="flex flex-col gap-2 items-center">
            <div className="text-sm w-fit overflow-hidden bg-[#EFEFEF] text-black rounded-full py-2 px-3">
              message
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 p-3 justify-end">
        <div className="flex flex-col gap-2 items-end">
          <div className="text-sm w-fit overflow-hidden text-white rounded-md py-0">
            <Image
              alt="Image"
              height="288"
              width="288"
              src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
