"use client";
import { BackIcon, HiddenRequestsIcon } from "@/icons";
import React from "react";

const HiddenRequests = () => {
  return (
    <div className="flex w-full">
      <div className="w-1/3 border">
        <div className="flex items-center mt-7 mb-9">
          <div onClick={() => history.back()} className="mx-4  cursor-pointer">
            <BackIcon />
          </div>
          <div className="text-2xl font-semibold">Hidden requests</div>
        </div>
      </div>
      <div className="h-screen w-2/3 flex flex-col justify-center items-center space-y-3">
        <div className="border-2 border-black rounded-full w-28 h-28 flex justify-center items-center ">
          <HiddenRequestsIcon />
        </div>
        <div className="text-xl">HiddenRequests</div>
        <div className="text-sm text-gray-500">These are message requests that may be offensive or unwanted.</div>
      </div>
    </div>
  );
};

export default HiddenRequests;
