import { BookmarkIcon, LikeHeartIcon, MessageCircleIcon, SendIcon } from "@/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  className?: string;
};

function PostActions({ className }: Props) {
  return (
    <div className={cn("relative flex items-start w-full gap-x-2", className)}>
      <div className="flex items-center w-full">
        <div className="flex gap-4 items-center justify-center">
          <div>
            <LikeHeartIcon className="w-6 h-6 hover:stroke-gray115 cursor-pointer text-red-500" />
            <span className="sr-only">Like</span>
          </div>
          <div>
            <Link href={`/`}>
              <MessageCircleIcon className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
              <span className="sr-only">Comment</span>
            </Link>
          </div>
          <div>
            <SendIcon className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
            <span className="sr-only">Share</span>
          </div>
        </div>
        <div className="ml-auto">
          <BookmarkIcon className="w-6 h-6  hover:stroke-gray115 cursor-pointer" stroke="#262626" />
          <span className="sr-only">BookmarkIcon</span>
        </div>
      </div>
    </div>
  );
}

export default PostActions;
