import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import SingleComment from "./reels-single-comment";
import TextareaAutosize from "react-textarea-autosize";
import { BsEmojiAstonished } from "react-icons/bs";

export default function ReelsComments() {
  const [inputFocused, setInputFocused] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <>
      <div id="Comments" className="relative z-0 w-full h-[calc(100%-273px)] overflow-y-auto scrollbar-hide">
        {/* <div className="text-center mt-6 text-2xl font-bold">No comments...</div> */}
        <SingleComment />
        <SingleComment />
        <SingleComment />
        <div className="mb-28" />
      </div>

      <div
        id="CreateComment"
        className="flex items-center bottom-0 justify-between bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-1 sticky z-50 my-auto">
        <div
          className={`bg-[#F1F1F2] relative flex items-center rounded-lg w-full lg:max-w-[440px] border-1 my-auto  z-50 ${
            inputFocused ? "border-gray-400" : "border-[#F1F1F2]"
          }`}>
          <TextareaAutosize
            className="bg-[#F1F1F2] resize-none text-base focus:outline-none w-full lg:max-w-[410px] p-2 py-3 rounded-lg"
            placeholder="Add comment..."
            minRows={1}
            maxRows={3}
            autoFocus
            maxLength={135}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="absolute right-2">
            {" "}
            <BsEmojiAstonished className="text-lg cursor-pointer" size={20} />
          </div>
        </div>

        <button
          className={`font-semibold text-sm ml-5 pr-1${comment ? "text-[#F02C56] cursor-pointer" : "text-gray-400"}`}>
          Post
        </button>

        {/* <BiLoaderCircle className="animate-spin" color="#E91E62" size="20" /> */}
      </div>
    </>
  );
}
