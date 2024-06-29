import Image from "next/image";
import React from "react";

const Saved = () => {
  return (
    <div className="flex mx-28 flex-col my-5 space-y-3">
      <span className="text-xs text-[#737373] mb-10">Only you can see what you&apos;ve saved</span>

      <div className="flex flex-col items-center space-y-5">
        <Image width={62} height={62} src="/bookmark.png" alt="bookmark icon" className="object-cover" />
        <span className="font-black text-3xl">Save</span>
        <span className="text-sm">
          Save photos and videos that you want to see again. No <br /> one is notified, and only you can see what
          you&apos;ve saved.
        </span>
      </div>
    </div>
  );
};

export default Saved;
