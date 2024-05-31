import React, { useRef, useState } from "react";
import stories from "./profile-stories.json";
import Story from "./profile-story";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

const ProfileStories: React.FC = () => {
  const storiesRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const onScroll = () => {
    if (storiesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = storiesRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (storiesRef.current) {
      storiesRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (storiesRef.current) {
      storiesRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex flex-row mt-10 mx-28">
      <div className="max-w-3xl justify-center">
        <div
          onScroll={onScroll}
          ref={storiesRef}
          className="flex space-x-8 overflow-x-scroll w-full border-gray-200 scroll-smooth scrollbar-hide mx-20">
          {stories.map((story, index) => (
            <Story
              key={`${story.id}-${index}`}
              img={story.avatar}
              username={`${story.first_name} ${story.last_name}`}
            />
          ))}
        </div>
      </div>
      <div className="absolute top-0 p-10 pt-7 w-full h-full flex justify-between z-10 items-center">
        <button onClick={scrollLeft}>
          <FaCircleChevronLeft
            color="black"
            size="20"
            className={`opacity-60 cursor-pointer drop-shadow-lg filter ${showLeft ? "visible" : "invisible"}`}
          />
        </button>
        <button onClick={scrollRight}>
          <FaCircleChevronRight
            color="black"
            size="20"
            className={`opacity-60 cursor-pointer drop-shadow-lg filter ${showRight ? "visible" : "invisible"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default ProfileStories;
