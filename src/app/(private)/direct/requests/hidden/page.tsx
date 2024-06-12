import { HiddenRequestsIcon } from "@/icons";
import React from "react";

const HiddenRequests = () => {
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col justify-center items-center space-y-3">
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
