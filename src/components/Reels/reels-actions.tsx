import {
  BookMarkReelsIcon,
  BookmarkIcon,
  LikeHeartIcon,
  MessageCircleIcon,
  PlusReelsIcon,
  ShareReelsIcon,
  UnLikeHeartIcon,
} from "@/icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner, Tooltip } from "@nextui-org/react";
import { Friend, Post } from "@/gql/graphql";
import SummaryProfile from "../summary-profile";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import Link from "next/link";

interface ReelsActionProps {
  reelAction: Post;
}

export default function ReelsAction({ reelAction }: ReelsActionProps) {
  return (
    <>
      <div className="relative mr-[75px]">
        <div className="absolute bottom-0 pl-5 text-center text-xs text-gray-800 font-semibold">
          <Tooltip
            delay={1000}
            content={
              reelAction && (
                <SummaryProfile
                  username={reelAction.user?.username || ""}
                  full_name={reelAction.user?.full_name || ""}
                  avatar={reelAction.user?.avatar || ""}
                  role={reelAction.user?.role || false}
                  posts={[]}
                  friends={reelAction.user?.friends as Friend[]}
                />
              )
            }
            placement="bottom-start"
            className="rounded-md shadow-lg">
            <div className="relative mb-6">
              <Avatar className=" h-[50px] w-[50px] cursor-pointer">
                <AvatarImage src={getUserAvatarURL(reelAction.user?.avatar || "")} alt="user avatar" />
                <AvatarFallback>
                  <Spinner size="sm" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-[-5px] left-4 bg-red-500 rounded-full p-1 hover:bg-red-600 cursor-pointer">
                <PlusReelsIcon fill="#FFFFFF" />
              </div>
            </div>
          </Tooltip>
          <div className="space-y-2">
            <div className="mb-2">
              <button className="rounded-full bg-gray-200 p-3 cursor-pointer mb-1 ">
                {/* {!hasClickedLike ? (
                                <LikeHeartIcon color={likes?.length > 0 && userLiked ? '#ff2626' : ''} size="25"/>
                            ) : ( */}
                {/* <LikeHeartIcon width={22} height={22} fill="#00000" /> */}
                {/* )} */}
                <LikeHeartIcon width={23} height={23} fill="#00000" />
              </button>
              <span>{reelAction.post_likes?.length}</span>
            </div>

            <Link href={`/r/${reelAction.id}`}>
              <button className="rounded-full bg-gray-200 p-3 cursor-pointer mb-1 active:bg-gray-300">
                <MessageCircleIcon width={23} height={23} fill="#00000" />
              </button>
              <span>{reelAction.post_comments?.length}</span>
            </Link>

            <div>
              <button className="rounded-full bg-gray-200 p-3 cursor-pointer mb-1 active:bg-gray-300">
                <BookMarkReelsIcon width={22} height={22} className="" fill="#00000" />
              </button>
              <span className="">55</span>
            </div>

            <div>
              <button className="rounded-full bg-gray-200 p-3 cursor-pointer mb-1 active:bg-gray-300">
                <ShareReelsIcon width={22} height={22} />
              </button>
              <span className="">55</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
