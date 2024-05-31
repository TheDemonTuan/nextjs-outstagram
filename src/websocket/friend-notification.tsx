import { useAuth } from "@/hooks/useAuth";
import { usePusherStore } from "@/stores/pusher-store";
import React, { useEffect } from "react";
import { toast } from "sonner";

export const useFriendNotificationSocket = () => {
  const { pusherClient } = usePusherStore();
  const { authData } = useAuth();

  useEffect(() => {
    pusherClient.subscribe(authData?.id ?? "my-channel");

    pusherClient.bind("friend-notification", (data: any) => {
      // setMessage(data.message);
      toast.info(data.message);
    });

    return () => {
      pusherClient.unsubscribe(authData?.id ?? "my-channel");
    };
  }, [authData]);
};
