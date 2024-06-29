import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import SingleComment from "./reels-single-comment";

export default function ReelsComments() {
  return (
    <>
      <div id="Comments" className="relative bg-[#F8F8F8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto">
        <div className="pt-2" />

        <div>
          <div className="text-center mt-6 text-xl text-gray-500">No comments...</div>

          <div>
            <SingleComment />
          </div>
        </div>

        <div className="mb-28" />
      </div>

      <div
        id="CreateComment"
        className="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2">
        <div
        //   className={`bg-[#F1F1F2] flex items-center rounded-lg w-full lg:max-w-[420px] ${inputFocused ? "border-2 border-gray-400" : "border-2 border-[#F1F1F2]"}`}
        >
          <input
            className="bg-[#F1F1F2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg"
            type="text"
            placeholder="Add comment..."
          />
        </div>

        <button
        //   className={`font-semibold text-sm ml-5 pr-1${comment ? "text-[#F02C56] cursor-pointer" : "text-gray-400"}`}
        >
          Post
        </button>

        <BiLoaderCircle className="animate-spin" color="#E91E62" size="20" />
      </div>
    </>
  );
}
