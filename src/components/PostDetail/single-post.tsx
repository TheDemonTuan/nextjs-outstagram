import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";
import { PiDotsThreeBold } from "react-icons/pi";
import PostActions from "./post-actions";
import { Card } from "../ui/card";
import CommentForm from "./comment-form";
import Image from "next/image";
import SummaryProfile from "../summary-profile";
import MiniPost from "./mini-post";

const SinglePost = ({ id }: { id: string }) => {
  return (
    <>
      <Card className="max-w-3xl lg:max-w-4xl hidden md:flex mx-auto mt-9">
        <div className="relative overflow-hidden h-[600px] max-w-sm lg:max-w-lg w-full">
          <Image
            src="https://res.cloudinary.com/dsjzxokur/image/upload/v1718447676/posts/ehiplarfv0iai4ud3zh2.webp"
            alt="Post preview"
            fill
            className="md:rounded-l-md object-cover"
          />
        </div>

        <div className="flex max-w-sm flex-col flex-1">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link className="font-semibold text-[13px] leading-[18px]" href="/">
                  <div className="flex flex-row items-center  ">
                    <Avatar
                      src="https://images.pexels.com/photos/1042423/pexels-photo-1042423.jpeg?auto=compress&cs=tinysrgb&w=600"
                      className="w-9 h-9"
                    />
                    <div className="mx-2">
                      <span className="text-small">PostUsername</span>
                      <span className="font-bold text-medium"> • </span>
                      <span className="text-small hover:text-gray-500">Add friends</span>
                    </div>
                  </div>
                </Link>
              </HoverCardTrigger>
              {/* <SummaryProfile full_name={name} username={username} avatar={postImageSrc} /> */}
            </HoverCard>
            <PiDotsThreeBold className="w-6 h-6 hover:stroke-gray115 cursor-pointer" stroke="#262626" />
          </div>

          <div className="flex flex-col items-center gap-1.5 flex-1 justify-center">
            <p className="text-xl lg:text-2xl font-extrabold">No comments yet.</p>
            <p className="text-sm font-medium">Start the conversation.</p>
          </div>

          {/* {post.comments.length > 0 && (
            <ScrollArea className="hidden md:inline py-1.5 flex-1">
              <MiniPost post={post} />
              {post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </ScrollArea>
          )} */}

          <div className="px-2 hidden md:block mt-auto border-y p-2.5">
            <PostActions />
            <time className="text-[11px] uppercase text-zinc-500 font-medium">
              {/* {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })} */}
              time
            </time>
          </div>
          <CommentForm postId={id} className="hidden md:inline-flex" />
        </div>
      </Card>
      <div className="md:hidden">{/* <Post post={post} /> */}</div>
    </>
  );
};

export default SinglePost;
