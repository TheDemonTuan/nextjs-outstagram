import { UserProfileQuery } from "@/gql/graphql";
import { LikeHeartIcon, MessageCircleIcon, MultiFileIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Gallery = ({ userProfile }: { userProfile: UserProfileQuery }) => {
  const { friends, posts, user, username } = userProfile.userProfile;

  if (!posts || !posts.length) {
    return (
      <div className="flex flex-col items-center justify-center my-14">
        <Image width={64} height={64} src="/camera-b.png" alt="camera icon" />
        <span className="font-black text-3xl mt-10">No Posts Yet</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 mx-28">
      {posts?.map((post) => {
        const postFiles = post?.post_files || [];
        return (
          <Link key={post.id} href={`/p/${post.id}`} className="relative group cursor-pointer">
            <div className="w-full h-[310px]">
              <Image
                className="absolute top-0 left-0 object-cover w-full h-full rounded-md"
                src={post?.post_files?.[0]?.url || "/camera-b.png"}
                alt={"image " + post.id}
                fill
              />
              {postFiles?.length > 1 && (
                <div className="absolute top-2 right-2 bg-transparent bg-opacity-75 p-1 rounded-full">
                  <MultiFileIcon className="text-white" />
                </div>
              )}
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-6">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">{post?.post_likes?.length || 0}</p>
              </div>

              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Gallery;
