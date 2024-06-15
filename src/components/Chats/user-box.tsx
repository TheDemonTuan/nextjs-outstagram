import { InboxGetAllBubbleQuery } from "@/gql/graphql";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { Avatar } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import React from "react";

const UserBox = ({ inbox }: { inbox: InboxGetAllBubbleQuery["inboxGetAllBubble"][number] }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="relative inline-block overflow-hidden py-2">
        <Avatar alt="avatar" src={getUserAvatarURL(inbox.avatar)} className="w-14 h-14" />
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white bottom-2 left-10 h-3 w-3 md:h-3 md:w-3" />
      </div>
      <div className="flex flex-col focus:outline-none p-2">
        <p className="text-base font-medium text-black">{inbox.full_name}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm font-normal text-gray-500">{inbox.last_message}</p>
          <p className="text-sm font-normal text-gray-500">
            •{" "}
            {formatDistanceToNow(inbox.created_at, {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
