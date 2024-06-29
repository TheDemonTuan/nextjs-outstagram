import { UserProfileQuery } from "@/gql/graphql";
import { ClipIcon, LikeHeartIcon, MessageCircleIcon, PlayReelIcon } from "@/icons";
import { useModalStore } from "@/stores/modal-store";
import Link from "next/link";
import React from "react";
import SelectPhotoModal, { SelectPhotoModalKey } from "../Post/select-photo";

const Reel = ({ userProfile }: { userProfile: UserProfileQuery }) => {
  const { modalOpen } = useModalStore();
  const { posts } = userProfile.userProfile;

  if (!posts || !posts.length) {
    return (
      <>
        <div className="flex flex-col items-center justify-start my-5 space-y-3">
          <span className="font-black text-2xl">Share a moment with the world</span>
          <span
            onClick={() => modalOpen(SelectPhotoModalKey)}
            className="font-medium text-sky-500 cursor-pointer hover:opacity-80">
            Create your first reel
          </span>
        </div>
        <SelectPhotoModal defaultTab="reels" />
      </>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-1 mx-28 max-w-screen-xl">
      {posts?.map((post) => {
        const postFiles = post?.post_files || [];
        const firstFile = postFiles[0];

        if (!firstFile || firstFile.type !== "0") {
          return null;
        }

        return (
          <Link key={post?.id} href={`/p/${post?.id}`} passHref className="relative group cursor-pointer">
            <video
              key={"video" + firstFile.id}
              src={firstFile?.url || "/camera-b.png"}
              controls={false}
              muted
              autoPlay
              loop
              className="object-cover w-full h-[360px] rounded-md"
            />

            <div className="absolute bottom-2 left-2 bg-transparent group-hover:opacity-0 bg-opacity-75 p-1 rounded-full">
              <PlayReelIcon />
            </div>

            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-6 rounded-md">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">{post?.post_likes?.length || 0}</p>
              </div>

              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">{post?.post_comments?.length || 0}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Reel;
