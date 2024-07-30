import React, { useRef, useState } from "react";
import Story from "./story";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useAuth } from "@/hooks/useAuth";
import { friendGetListMe, friendKey } from "@/api/friend";
import { useQuery } from "@tanstack/react-query";

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

  return (
    <div className="relative w-max h-full">
      <div
        onScroll={onScroll}
        ref={storiesRef}
        className="flex items-center space-x-2 overflow-x-scroll max-w-xl bg-white border-gray-200 scroll-smooth scrollbar-hide">
        {friendsData?.data &&
          friendsData?.data.map((friend) => {
            const friendInfo = authData?.id === friend?.FromUser?.id ? friend?.ToUser : friend?.FromUser;

            return <Story key={friend.id} img={friendInfo.avatar} username={`${friendInfo.username}`} />;
          })}
      </div>
      <div className="absolute top-0 p-7 pt-3 w-full h-full flex justify-between z-10 items-center">
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
          {friendsData?.data && friendsData?.data.length > 8 && (
            <FaCircleChevronRight
              color="white"
              size="20"
              className={`cursor-pointer drop-shadow-lg filter ${showRight ? "visible" : "invisible"}`}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Stories;
