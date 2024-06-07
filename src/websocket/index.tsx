'use client'

import { usePusherStore } from "@/stores/pusher-store";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { useFriendNotificationSocket } from "./friend-notification";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { setPusherClient } = usePusherStore();

  useEffect(() => {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? "", {
      cluster: "ap1",
    });
    setPusherClient(pusher);
    // sendNotification("Hello", "This is a test notification");
  }, [setPusherClient]);

  useFriendNotificationSocket();
  return <>{children}</>;
};
