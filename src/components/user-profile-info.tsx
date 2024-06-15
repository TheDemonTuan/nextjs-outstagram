import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@nextui-org/react";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import Link from "next/link";
import { cn } from "@/lib/utils";
const UserProfileInfo = ({
  avatar,
  full_name,
  username,
  isShowFullName,
  className,
}: {
  avatar: string;
  full_name: string;
  username: string;
  isShowFullName: boolean;
  className: string;
}) => {
  return (
    <>
      <Link href={`/${username}`}>
        <Avatar className={cn(className)}>
          <AvatarImage className="object-cover" src={getUserAvatarURL(avatar)} />
          <AvatarFallback>
            <Spinner size="sm" />
          </AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex-1">
        <Link href={`/${username}`} className="font-semibold text-sm">
          {username}
        </Link>
        {isShowFullName && <h3 className="text-xs text-gray-400">{full_name}</h3>}
      </div>
    </>
  );
};

export default UserProfileInfo;
