"use client";
import React from "react";
import MessageBox from "./message-box";

const FrameChat = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <MessageBox />
      <div className="pt-24"></div>
    </div>
  );
};

export default FrameChat;
