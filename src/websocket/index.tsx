"use client";

import { usePusherStore } from "@/stores/pusher-store";
import { useEffect, useRef } from "react";
import Pusher from "pusher-js";
import { useInternalSocket } from "./internal-socket";
import { Toast } from "primereact/toast";

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
      <Toast ref={toast} position="bottom-center" />
    </>
  );
};
