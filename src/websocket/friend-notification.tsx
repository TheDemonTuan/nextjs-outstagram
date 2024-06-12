import { friendKey } from "@/api/friend";
import { useAuth } from "@/hooks/useAuth";
import { usePusherStore } from "@/stores/pusher-store";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { toast } from "sonner";

export const useFriendNotificationSocket = () => {
  const { pusherClient } = usePusherStore();
  const { authData } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!authData) return;

    pusherClient.subscribe(authData?.id);

    pusherClient.bind("friend-notification", (data: any) => {
      toast.info(data.message);
      queryClient.invalidateQueries({
        queryKey: [friendKey, data.fromUserID],
      });
    });

    return () => {
      pusherClient.unsubscribe(authData?.id);
    };
  }, [authData, pusherClient, queryClient]);
};
