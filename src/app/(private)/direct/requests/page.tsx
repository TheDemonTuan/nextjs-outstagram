import { HiddenRequestsIcon, MessageRequestsIcon } from "@/icons";
import React from "react";

const MessageRequests = () => {
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col justify-center items-center space-y-3">
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
