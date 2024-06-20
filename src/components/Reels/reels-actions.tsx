import {
  BookMarkReelsIcon,
  BookmarkIcon,
  LikeHeartIcon,
  MessageCircleIcon,
  ShareReelsIcon,
  UnLikeHeartIcon,
} from "@/icons";

export default function ReelsAction() {
  return (
    <>
      <div className="relative mr-[75px]">
        <div className="absolute bottom-0 pl-2 space-y-2">
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
