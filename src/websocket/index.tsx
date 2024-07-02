"use client";

import { usePusherStore } from "@/stores/pusher-store";
import { useEffect, useRef } from "react";
import Pusher from "pusher-js";
import { useInternalSocket } from "./internal-socket";
import { Toaster } from "react-hot-toast";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { setPusherClient } = usePusherStore();
  const toast = useRef(null);

  useEffect(() => {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? "", {
      cluster: "ap1",
    });
    setPusherClient(pusher);
    // sendNotification("Hello", "This is a test notification");
  }, [setPusherClient]);

  useInternalSocket(toast);

  return (
    <>
      {children}
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};
