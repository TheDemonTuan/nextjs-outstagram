import React from "react";

interface StoryProps {
  img: string;
  username: string;
}

const Story: React.FC<StoryProps> = ({ img, username }) => {
  return (
    <div>
      <div className="h-16 w-16 bg-gradient-to-tr from-yellow-500 to-red-600 p-[1.5px] rounded-full">
        <div className="bg-white w-full h-full rounded-full p-1">
          <img className="rounded-full w-full h-full" src={img} alt="" />
        </div>
      </div>
      <p className="text-xs w-16 truncate text-center pt-1">{username}</p>
    </div>
  );
};

export default Story;
