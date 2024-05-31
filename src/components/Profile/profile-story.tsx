import React from "react";

interface StoryProps {
  img: string;
  username: string;
}

const ProfileStory: React.FC<StoryProps> = ({ img, username }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="h-20 w-20 bg-gray-200 p-[1.5px] rounded-full">
        <div className="bg-white rounded-full p-1 h-full w-full overflow-hidden">
          <img className="rounded-full h-full w-full object-cover" src={img} alt={username} />
        </div>
      </div>
      <p className="text-xs w-20 truncate text-center pt-2">{username}</p>
    </div>
  );
};

export default ProfileStory;
