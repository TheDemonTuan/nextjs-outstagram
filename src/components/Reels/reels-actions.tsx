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
import { Spinner } from "@nextui-org/react";

export default function ReelsAction() {
  return (
    <>
      <div className="relative mr-[75px]">
        <div className="absolute bottom-0 pl-5 space-y-2">
          <div className="relative">
            <Avatar className=" h-[50px] w-[50px] cursor-pointer my-6">
              <AvatarImage
                src="https://images.pexels.com/photos/1042423/pexels-photo-1042423.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="user avatar"
              />
              <AvatarFallback>
                <Spinner size="sm" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-[-5px] left-3.5 bg-red-500 rounded-full p-1 hover:bg-red-600">
              <PlusReelsIcon fill="#FFFFFF" />
            </div>
          </div>

          <div className=" text-center">
            <button className="rounded-full bg-gray-200 p-3 cursor-pointer">
              {/* {!hasClickedLike ? (
                                <LikeHeartIcon color={likes?.length > 0 && userLiked ? '#ff2626' : ''} size="25"/>
                            ) : ( */}
              <LikeHeartIcon width={22} height={22} fill="#00000" />
              {/* )} */}
            </button>
            <span className="text-xs text-gray-800 font-semibold">{/* {likes?.length} */} 1</span>
          </div>

          <button className=" text-center">
            <div className="rounded-full bg-gray-200 p-3 cursor-pointer">
              <MessageCircleIcon width={23} height={23} fill="#00000" />
            </div>
            <span className="text-xs text-gray-800 font-semibold">1</span>
          </button>

          <button className="text-center">
            <div className="rounded-full bg-gray-200 p-3 cursor-pointer">
              <BookMarkReelsIcon width={22} height={22} className="" fill="#00000" />
            </div>
            <span className="text-xs text-gray-800 font-semibold">55</span>
          </button>

          <button className="text-center">
            <div className="rounded-full bg-gray-200 p-3 cursor-pointer">
              <ShareReelsIcon width={22} height={22} />
            </div>
            <span className="text-xs text-gray-800 font-semibold">55</span>
          </button>
        </div>
      </div>
    </>
  );
}
