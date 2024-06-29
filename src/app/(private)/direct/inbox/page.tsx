"use client";
import { MessageRequestsIcon, YourMessageIcon } from "@/icons";
import { Button } from "@nextui-org/react";
import React from "react";

const InboxPage = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="mb-5">
        <YourMessageIcon />
      </div>
      <div className="flex flex-col items-center space-y-3">
        <div className="text-xl">Your messages</div>
        <div className="text-sm text-[#737373]">Send private photos and messages to a friend or group.</div>
        <Button
          className="bg-[#0095F6] hover:bg-[#1877F2] text-white text-sm font-semibold px-5 py-4"
          radius="sm"
          size="sm">
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default InboxPage;
