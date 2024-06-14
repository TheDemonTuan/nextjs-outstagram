import FormInbox from "@/components/Chats/form-inbox";
import FrameChat from "@/components/Chats/frame-inbox";
import HeaderInbox from "@/components/Chats/header-inbox";
import React from "react";

const Inbox = () => {
  return (
    <div className="h-full flex flex-col">
      <HeaderInbox />
      <FrameChat />
      <FormInbox />
    </div>
  );
};

export default Inbox;
