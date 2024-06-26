"use client";

import { Friend, PostByPostIdQuery } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React from "react";
import UserProfileInfo from "../user-profile-info";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Spinner } from "@nextui-org/spinner";
import { Tooltip } from "@nextui-org/react";
import SummaryProfile from "../summary-profile";
import { UserResponse } from "@/api/user";

const MiniPost = ({ post }: { post: PostByPostIdQuery["postByPostId"] }) => {
  const username = post.user?.username;
  const href = `/${username}`;

  const isEdited = post.created_at !== post.updated_at;

  return (
    <div className="group p-3 px-3.5 flex items-start space-x-2.5">
      <Link href={href}>
        <Tooltip
          delay={1000}
          content={
            post && (
              <SummaryProfile
                username={post.user?.username || ""}
                full_name={post.user?.full_name || ""}
                avatar={post.user?.avatar || ""}
                posts={[]}
                friends={post.user?.friends as Friend[]}
              />
            )
          }
          placement="bottom-start"
          className="rounded-md shadow-lg">
          <Avatar className="w-8 h-8">
            <AvatarImage src={getUserAvatarURL(post?.user?.avatar) || ""} />
            <AvatarFallback>
              <Spinner size="sm" />
            </AvatarFallback>
          </Avatar>
        </Tooltip>
      </Link>

      <div className="space-y-1">
        <div className="flex items-center space-x-1.5 text-[13px] leading-[18px]">
          <div>
            <Tooltip
              delay={1000}
              content={
                post && (
                  <SummaryProfile
                    username={post.user?.username || ""}
                    full_name={post.user?.full_name || ""}
                    avatar={post.user?.avatar || ""}
                    posts={[]}
                    friends={post.user?.friends as Friend[]}
                  />
                )
              }
              placement="bottom-start"
              className="rounded-md shadow-lg">
              <Link href={href} className="font-semibold">
                {username}
              </Link>
            </Tooltip>{" "}
            <span className="font-normal text-black">{post.caption}</span>
          </div>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          {!isEdited ? (
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(post.created_at || ""), { addSuffix: true })}
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
