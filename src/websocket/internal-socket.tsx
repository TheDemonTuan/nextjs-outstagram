import { friendKey } from "@/api/friend";
import { postKey } from "@/api/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useNotificationsStore } from "@/stores/notification-store";
import { usePusherStore } from "@/stores/pusher-store";
import { Spinner } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { MutableRefObject, useEffect } from "react";
import toast from "react-hot-toast";
import useSound from "use-sound";

export const useInternalSocket = (toastRef: MutableRefObject<any>) => {
  const { pusherClient } = usePusherStore();
  const { authCanUse, authData } = useAuth();
  const queryClient = useQueryClient();
  const [playSound] = useSound(`/sounds/notification.mp3`);
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
              <div className="flex border-l border-gray-200">
                <Link
                  href={`/${data.username}`}
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  View
                </Link>
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
              <div className="flex border-l border-gray-200">
                <Link
                  href={`/${data.postType === "Normal" ? "p" : "r"}/${data.postID}`}
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  View
                </Link>
              </div>
            </div>
          ));
          if (!!queryClient.getQueryData([postKey, { id: data.postID }])) {
            const fakeLikeData = {
              ...data.postLike,
              user: {
                ...authData,
              },
            };
            queryClient.setQueryData([postKey, { id: data.postID }], (oldData: any) => {
              const newLikes = oldData.postByPostId.post_likes.filter((like: any) => like.user_id !== data.userID);
              return {
                ...oldData,
                postByPostId: {
                  ...oldData.postByPostId,
                  post_likes: [fakeLikeData, ...newLikes],
                },
              };
            });
          }
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
              <div className="flex border-l border-gray-200">
                <Link
                  href={`/${data.postType === "Normal" ? "p" : "r"}/${data.postID}`}
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  View
                </Link>
              </div>
            </div>
          ));
          if (!!queryClient.getQueryData([postKey, { id: data.postID }])) {
            const fakeCommentData = {
              ...data.postComment,
              user: {
                avatar: data.avatar,
                username: data.username,
              },
              parent: {
                id: data.parentID,
                user: {
                  username: data.parentUsername,
                },
              },
            };
            queryClient.setQueryData([postKey, { id: data.postID }], (oldData: any) => {
              return {
                ...oldData,
                postByPostId: {
                  ...oldData.postByPostId,
                  post_comments: [fakeCommentData, ...(oldData.postByPostId.post_comments || [])],
                },
              };
            });
          }
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
