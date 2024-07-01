import { friendKey } from "@/api/friend";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useNotificationsStore } from "@/stores/notification-store";
import { usePusherStore } from "@/stores/pusher-store";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import React, { MutableRefObject, RefObject, useEffect } from "react";
import useSound from "use-sound";

export const useInternalSocket = (toastRef: MutableRefObject<any>) => {
  const { pusherClient } = usePusherStore();
  const { authCanUse, authData } = useAuth();
  const queryClient = useQueryClient();
  const [playSound] = useSound("sounds/notification.mp3");
  const { addNotification } = useNotificationsStore();

  useEffect(() => {
    if (!authCanUse || !authData) return;

    pusherClient.subscribe(authData?.id);

    pusherClient.bind("internal-socket", (data: any) => {
      playSound();
      addNotification({
        type: data.type,
        username: data.username,
        avatar: data.avatar,
        message: data.message,
        createdAt: new Date().toISOString(),
      });
      switch (data.type) {
        case "friend-action":
          toastRef.current.show({
            severity: "info",
            summary: data.message,
            sticky: true,
            life: 3000,
            content: (props: any) => (
              <div className="flex flex-col items-start flex-1">
                <div className="flex items-center gap-2">
                  <Avatar image={getUserAvatarURL(data.avatar)} shape="circle" />
                  <span className="font-bold text-900">{data.username}</span>
                </div>
                <div className="font-medium text-lg my-2 text-900">{props.message.summary}</div>
                <Link href={`/${data.username}`}>
                  <Button label="View Profile" severity="info" />
                </Link>
              </div>
            ),
          });
          queryClient.invalidateQueries({
            queryKey: [friendKey, data.fromUserID],
          });
          break;
        case "post-like":
          toastRef.current.show({
            severity: "success",
            summary: "Can you send me the report?",
            sticky: true,
            content: (props: any) => (
              <div className="flex flex-column align-items-left" style={{ flex: "1" }}>
                <div className="flex align-items-center gap-2">
                  <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                  <span className="font-bold text-900">Amy Elsner</span>
                </div>
                <div className="font-medium text-lg my-3 text-900">{props.message.summary}</div>
                <Button className="p-button-sm flex" label="Reply" severity="success"></Button>
              </div>
            ),
          });
          break;
        default:
          break;
      }
    });

    return () => {
      pusherClient.unsubscribe(authData?.id);
    };
  }, [addNotification, authCanUse, authData, playSound, pusherClient, queryClient, toastRef]);
};
