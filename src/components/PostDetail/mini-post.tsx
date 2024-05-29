"use client";

import { PostResponse } from "@/api/post";
import { useAuth } from "@/hooks/useAuth";
import { ApiSuccessResponse } from "@/lib/http";
import { Avatar } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React from "react";
import { PiDotsThreeBold } from "react-icons/pi";

const MiniPost = ({ post }: { post: ApiSuccessResponse<PostResponse> }) => {
  const username = post.data.user_id;
  const href = `/${username}`;

  const { authData } = useAuth();

  const UserOwn = authData?.username;

  return (
    <div className="group p-3 px-3.5 flex items-start space-x-2.5">
      <Link href={href}>
        <Avatar
          src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg"
          className="w-8 h-8"
        />
      </Link>
      <div className="space-y-1">
        <div className="flex items-center space-x-1.5 text-[13px] leading-[18px]">
          <Link href={href} className="font-semibold">
            {username}
          </Link>
          <p className="font-normal text-black">{post.data.caption}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <span className="text-xs text-gray-500">
            {" "}
            {formatDistanceToNow(post.data.created_at, {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MiniPost;
