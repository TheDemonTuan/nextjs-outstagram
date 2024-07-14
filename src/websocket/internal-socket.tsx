import { friendKey } from "@/api/friend";
import { inboxKey, InboxResponse } from "@/api/inbox";
import { postKey } from "@/api/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InboxGetAllBubbleQuery, InboxGetByUsernameQuery } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { moveElementToFront } from "@/lib/utils";
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
        case "inbox-action":
          // queryClient.invalidateQueries({
          //   queryKey: [inboxKey, { username: data.username }],
          // // });
          const fakeData = {
            id: data.messageID,
            from_user_id: data.fromUserID,
            to_user_id: data.toUserID,
            message: data.lastMessage,
            created_at: new Date().toISOString(),
          };
          queryClient.setQueryData([inboxKey, { username: data.username }], (data: InboxGetByUsernameQuery) => {
            return { ...data, inboxGetByUsername: [...data.inboxGetByUsername, fakeData] };
          });
          queryClient.setQueryData([inboxKey, "all"], (oldData: InboxGetAllBubbleQuery) => {
            let findUserNamePosition = oldData.inboxGetAllBubble.findIndex((inbox) => inbox.username === data.username);
            let cloneData = [...oldData.inboxGetAllBubble];

            if (findUserNamePosition === -1) {
              findUserNamePosition = 0;
              cloneData[findUserNamePosition] = {
                username: data.username,
                last_message: data.lastMessage,
                created_at: new Date().toISOString(),
                is_read: false,
                avatar: getUserAvatarURL(data.avatar),
                full_name: data.full_name || "",
              };
            } else {
              cloneData[findUserNamePosition].last_message = data.lastMessage;
              cloneData[findUserNamePosition].created_at = data.created_at;
              cloneData[findUserNamePosition].is_read = false;
            }
            findUserNamePosition >= 0 && moveElementToFront(cloneData, findUserNamePosition);
            if (!findUserNamePosition) {
              oldData.inboxGetAllBubble.shift();
              return {
                ...oldData,
                inboxGetAllBubble: [
                  {
                    ...cloneData[findUserNamePosition],
                  },
                  ...oldData.inboxGetAllBubble,
                ],
              };
            }
            return {
              ...oldData,
              inboxGetAllBubble: [...cloneData],
            };
          });
          break;
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
                  href={`/direct/inbox/${data.fromUserID}`}
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
