"use client";

import { PostByPostIdQuery } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React from "react";
import UserProfileInfo from "../user-profile-info";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";

const MiniPost = ({ post }: { post: PostByPostIdQuery["postByPostId"] }) => {
  const username = post.user?.username;
  const href = `/${username}`;

  const isEdited = post.created_at !== post.updated_at;

  return (
    <div className="group p-3 px-3.5 flex items-start space-x-2.5">
      <Link href={href}>
        <Avatar src={getUserAvatarURL(post.user?.avatar) || ""} className="w-8 h-8" />
      </Link>
      <div className="space-y-1">
        <div className="flex items-center space-x-1.5 text-[13px] leading-[18px]">
          <Link href={href} className="font-semibold">
            {username}
          </Link>
          <p className="font-normal text-black">{post.caption}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          {!isEdited ? (
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
          ) : (
            <span className="text-xs text-gray-500">
              Edited · {formatDistanceToNow(new Date(post.updated_at || ""), { addSuffix: true })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniPost;
