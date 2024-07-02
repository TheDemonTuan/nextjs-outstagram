"use client";

import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import { BsChatDots, BsTrash3 } from "react-icons/bs";
import { ImMusic } from "react-icons/im";
import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { Avatar, AvatarImage } from "../ui/avatar";
import HighlightHashtags from "../highlight-hashtags";
import { BookMarkReelsCommentIcon, BookMarkReelsIcon, MessageCircleIcon, ShareReelsIcon } from "@/icons";
import { PostByPostIdQuery } from "@/gql/graphql";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { formatDistanceToNow } from "date-fns";

interface ReelsHeaderCommentsProps {
  reelHeaderData: PostByPostIdQuery;
}

const hostLocal = "http://localhost:3001";

export default function ReelsCommentsHeader({ reelHeaderData }: ReelsHeaderCommentsProps) {
  const reelData = reelHeaderData.postByPostId;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${hostLocal}/p/${reelData?.id}?utm_source=og_web_copy_link`);
  };
  const linkReels = `${hostLocal}/p/${reelData?.id}?utm_source=og_web_copy_link`;

  return (
    <>
      <div className="py-5 mx-6 bg-[#F8F8F8] rounded-xl">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center">
            <Link href={`/${reelData.user?.username}`}>
              <Avatar className="w-11 h-11">
                <AvatarImage src={getUserAvatarURL(reelData.user?.avatar) || ""} />
              </Avatar>
            </Link>
            <div className="ml-3 pt-0.5 flex flex-col">
              <Link
                href={`/${reelData.user?.username}`}
                className="relative z-10 text-[18px] leading-6 text-lg text font-bold hover:underline">
                {reelData.user?.username}
              </Link>

              <div className="relative z-0 text-sm -mt-0">
                {reelData.user?.full_name}
                <span className="relative -top-[3px] text-sm pl-1 pr-0.5 ">.</span>
                <span className="text-sm">
                  {" "}
                  {formatDistanceToNow(reelData.created_at || "", {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>
          <button className="border text-[15px] px-[21px] py-1 border-[#F02C56] text-white bg-[#F02C56]  hover:bg-opacity-85 font-semibold rounded-md">
            Add Friend
          </button>
        </div>

        <p className="px-4 mt-4 text-md">
          <HighlightHashtags text="Viva La Vida #lyrics #fyp" />
        </p>

        <p className="flex item-center gap-2 px-4 mt-2 text-sm">
          <ImMusic size="17" />
          original sound - {reelData.user?.username}
        </p>
      </div>

      <div className="flex items-center px-8 mt-4 space-x-2 justify-stretch">
        <div className="pb-4 text-center flex items-center">
          <button className="rounded-full bg-gray-200 p-2 cursor-pointer">
            <AiFillHeart color="#ff2626" size="22" />

            {/* <BiLoaderCircle className="animate-spin" size="25" /> */}
          </button>
          <span className=" pl-2 pr-4 text-sm text-gray-800 font-semibold ">{reelData.post_likes?.length}</span>
        </div>

        <div className="pb-4 text-center flex items-center">
          <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
            <MessageCircleIcon width={22} height={22} fill="#00000" />
          </div>
          <span className="text-sm pl-2 pr-4 text-gray-800 font-semibold">{reelData.post_comments?.length}</span>
        </div>

        <div className="pb-4 text-center flex items-center">
          <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
            <BookMarkReelsCommentIcon width={22} height={2} fill="#00000" />
          </div>
          <span className="text-sm pl-2 pr-4 text-gray-800 font-semibold">185</span>
        </div>

        <div className="pb-4 text-center flex items-center">
          <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
            <ShareReelsIcon width={22} height={22} />
          </div>
          <span className="text-sm pl-2 text-gray-800 font-semibold">185</span>
        </div>
      </div>
      <div className="relative flex items-center mt-1 mx-8 border py-1.5 rounded-lg bg-[#F1F1F2]">
        <input
          readOnly
          className="flex items-center px-3 w-[400px] border-none outline-0 bg-[#F1F1F2] cursor-text"
          value={linkReels}
          disabled
        />
        <button
          onClick={() => handleCopyLink}
          className="absolute right-0 border font-bold text-base py-1.5 px-4 border-none hover:bg-white rounded-r-lg">
          Copy link
        </button>
      </div>

      <div className="z-10 top-0 sticky mt-5 mx-8 font-bold border-b-2 pb-4 border-black">
        Comments <span>({reelData.post_comments?.length})</span>
      </div>
    </>
  );
}
