import { EditIcon } from "@/icons";
import { Avatar } from "@nextui-org/react";
import UserBox from "./user-box";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useQuery } from "@tanstack/react-query";
import { inboxKey } from "@/api/inbox";
import { graphQLClient } from "@/lib/graphql";
import { InboxGetAllBubbleDocument } from "@/gql/graphql";
import Link from "next/link";
import { use, useEffect } from "react";
import { toast } from "sonner";
import { animateScroll } from "react-scroll";
import { cn } from "@/lib/utils";
import { useInboxStore } from "@/stores/inbox-store";

function SideBarInbox() {
  const { authData } = useAuth();
  const { username, setUser } = useInboxStore();

  const {
    data: inboxAllData,
    error: inboxALlError,
    isLoading: inboxALlIsLoading,
  } = useQuery({
    queryKey: [inboxKey, "all"],
    queryFn: () => graphQLClient.request(InboxGetAllBubbleDocument),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (inboxALlError) {
      toast.error("Failed to fetch inbox data");
    }
  }, [inboxALlError]);

  useEffect(() => {
    if (username) {
      const user = inboxAllData?.inboxGetAllBubble.find((inbox) => inbox.username === username);
      user && setUser(user);
    }
  }, [username, setUser, inboxAllData?.inboxGetAllBubble]);

  useEffect(() => {
    inboxAllData?.inboxGetAllBubble.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [inboxAllData]);

  // useEffect(() => {
  //   animateScroll.scrollToBottom({
  //     containerId: "chat-inbox",
  //     duration: 500,
  //     smooth: true,
  //   });
  // }, []);

  if (inboxALlIsLoading) return <div>Loading...</div>;

  if (!inboxAllData) return <div>No inbox data</div>;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-4">
        <div className="text-xl font-bold text-black-700 py-4 mt-1">{authData?.username}</div>
        <EditIcon className="mr-3" />
      </div>
      <div className="px-6">
        <Avatar src={getUserAvatarURL(authData?.avatar)} className="w-20 h-20" />
        <p className="text-gray-500 text-sm p-1 pl-2">Your note</p>
      </div>
      <div className="flex items-center justify-between p-2 px-6">
        <div className="text-base font-bold text-black-700">Messages</div>
        <div className="text-sm font-semibold text-gray-500">Requests</div>
      </div>
      <div className="flex flex-col overflow-y-auto">
        {inboxAllData.inboxGetAllBubble.map((inbox) => {
          return (
            <Link
              key={inbox.username}
              id={inbox.username}
              href={`/direct/inbox/${inbox.username}`}
              className={cn("px-6 hover:bg-[#EFEFEF] cursor-pointer", username === inbox.username && "bg-[#EFEFEF]")}>
              <UserBox inbox={inbox} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SideBarInbox;
