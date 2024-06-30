import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { FaRegHeart } from "react-icons/fa6";

export default function SingleComment() {
  return (
    <>
      <div id="SingleComment" className="flex flex-col px-8 mt-6">
        <div className="flex flex-col pb-5">
          <div className="flex items-start w-full">
            <Link href={`/`}>
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=400" />
              </Avatar>
            </Link>
            <div className="flex flex-col ml-3 w-full">
              <span className="font-medium flex items-center">usernameCmt</span>
              <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col item-center space-y-2">
                  <p className="text-sm">comment text</p>
                  <div className="flex items-center space-x-5">
                    <span className="text-sm text-[#737373]">23h</span>
                    <span className="text-sm text-[#737373]">Reply</span>
                  </div>
                </div>

                <div className="flex flex-col items-center text-[#737373]">
                  <FaRegHeart size={20} />
                  <span>12</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start w-full pt-3 pl-10">
            <Link href={`/`}>
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=400" />
              </Avatar>
            </Link>
            <div className="flex flex-col ml-3 w-full">
              <span className="font-medium flex items-center">usernameCmt</span>
              <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col item-center space-y-2">
                  <p className="text-sm">comment text</p>
                  <div className="flex items-center space-x-5">
                    <span className="text-sm text-[#737373]">23h</span>
                    <span className="text-sm text-[#737373]">Reply</span>
                  </div>
                </div>

                <div className="flex flex-col items-center text-[#737373]">
                  <FaRegHeart size={20} />
                  <span>12</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* comment 2 */}
        <div className="flex items-start relative w-full ">
          <Link href={`/`}>
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg?auto=compress&cs=tinysrgb&w=400" />
            </Avatar>
          </Link>
          <div className="flex flex-col ml-3 w-full">
            <span className="font-medium flex items-center">usernameCmt</span>
            <div className="flex flex-row items-start justify-between">
              <div className="flex flex-col item-center space-y-2">
                <p className="text-sm">comment text</p>
                <div className="flex items-center space-x-5">
                  <span className="text-sm text-[#737373]">23h</span>
                  <span className="text-sm text-[#737373]">Reply</span>
                </div>
              </div>

              <div className="flex flex-col items-center text-[#737373]">
                <FaRegHeart size={20} />
                <span>12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
