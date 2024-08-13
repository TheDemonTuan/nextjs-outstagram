import React, { useRef, useState } from "react";
import Story from "./story";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useAuth } from "@/hooks/useAuth";
import { friendGetListMe, friendKey } from "@/api/friend";
import { useQuery } from "@tanstack/react-query";
import { Image } from "@nextui-org/react";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { PiUsersThreeLight } from "react-icons/pi";
import { StoriesSkeleton } from "../skeletons";

const STORY_ITEM_WIDTH = 80;
const MIN_STORIES = 8;

const Stories = () => {
  const storiesRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const { authData } = useAuth();

  const onScroll = () => {
    if (storiesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = storiesRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const {
    data: friendsData,
    error: friendError,
    isLoading: friendIsLoading,
  } = useQuery({
    queryKey: [friendKey, "home"],
    queryFn: async () => await friendGetListMe(),
  });

  const totalItems = friendsData?.data ? friendsData.data.length + 1 : 1;
  const containerWidth = Math.max(totalItems, MIN_STORIES) * STORY_ITEM_WIDTH;

  if (friendIsLoading) {
    return <StoriesSkeleton />;
  }

  return (
    <div className="relative w-max h-full">
      <div
        onScroll={onScroll}
        ref={storiesRef}
        className="flex items-center space-x-2 overflow-x-scroll max-w-xl bg-white border-gray-200 scroll-smooth scrollbar-hide"
        style={{ minWidth: containerWidth }}>
        <div className="space-y-1">
          <div className="flex flex-col justify-center items-center w-16 h-16 rounded-full bg-white relative">
            <Image
              className="object-cover w-14 h-14"
              width={256}
              height={256}
              radius="full"
              src={getUserAvatarURL(authData?.avatar)}
              alt="User Avatar"
            />
            <div className="bg-white border absolute w-8 h-5 rounded-xl z-10 bottom-0 shadow items-center justify-center flex">
              <PiUsersThreeLight size={17} />
            </div>
          </div>
          <p className="text-xs text-center w-16 truncate">Your Friends</p>
        </div>

        {friendsData?.data &&
          friendsData?.data.map((friend) => {
            const friendInfo = authData?.id === friend?.FromUser?.id ? friend?.ToUser : friend?.FromUser;

            return <Story key={friend.id} img={friendInfo.avatar} username={`${friendInfo.username}`} />;
          })}
      </div>
      <div className="absolute -left-4 top-6 w-full z-10">
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              if (storiesRef.current) {
                storiesRef.current.scrollLeft = storiesRef.current.scrollLeft - 300;
              }
            }}>
            <FaCircleChevronLeft
              color="white"
              size="20"
              className={`cursor-pointer drop-shadow-lg filter ${showLeft ? "visible" : "invisible"}`}
            />
          </button>
          <button
            onClick={() => {
              if (storiesRef.current) {
                storiesRef.current.scrollLeft = storiesRef.current.scrollLeft + 300;
              }
            }}>
            {friendsData?.data && friendsData?.data.length > 7 && (
              <FaCircleChevronRight
                color="white"
                size="20"
                className={`cursor-pointer drop-shadow-lg filter ${showRight ? "visible" : "invisible"}`}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stories;
