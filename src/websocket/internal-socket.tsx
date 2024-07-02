import { friendKey } from "@/api/friend";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useNotificationsStore } from "@/stores/notification-store";
import { usePusherStore } from "@/stores/pusher-store";
import { Button, Spinner } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { MutableRefObject, RefObject, useEffect } from "react";
import toast from "react-hot-toast";
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
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <Link href={`/${data.username}`} className="flex-shrink-0 pt-0.5">
                    <Avatar className="w-11 h-11">
                      <AvatarImage className="object-cover" src={getUserAvatarURL(data.avatar)} />
                      <AvatarFallback>
                        <Spinner size="sm" />
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{data.username}</p>
                    <p className="mt-1 text-sm text-gray-500">{data.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ));
          queryClient.invalidateQueries({
            queryKey: [friendKey, data.fromUserID],
          });
          break;
        case "post-like":
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <Link href={`/${data.username}`} className="flex-shrink-0 pt-0.5">
                    <Avatar className="w-11 h-11">
                      <AvatarImage className="object-cover" src={getUserAvatarURL(data.avatar)} />
                      <AvatarFallback>
                        <Spinner size="sm" />
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{data.username}</p>
                    <p className="mt-1 text-sm text-gray-500">{data.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ));
          break;
        case "post-comment":
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <Link href={`/${data.username}`} className="flex-shrink-0 pt-0.5">
                    <Avatar className="w-11 h-11">
                      <AvatarImage className="object-cover" src={getUserAvatarURL(data.avatar)} />
                      <AvatarFallback>
                        <Spinner size="sm" />
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{data.username}</p>
                    <p className="mt-1 text-sm text-gray-500">{data.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ));
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
