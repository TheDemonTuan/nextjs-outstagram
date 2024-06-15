"use client";

import ChatInbox from "@/components/Chats/frame-inbox";
import { useInboxStore } from "@/stores/inbox-store";
import { useEffect } from "react";

const ChatInboxPage = ({ params }: { params: { username: string } }) => {
  const { setUserName } = useInboxStore();

  useEffect(() => {
    setUserName(params.username);
  }, [params.username, setUserName]);

  return <ChatInbox username={params.username} />;
};

export default ChatInboxPage;
