import { PostType, getSaved } from "@/api/post";
import { savedKey } from "@/api/post_save";
import { ClipSavedIcon, LikeHeartIcon, MessageCircleIcon, MultiFileIcon, PlayReelIcon } from "@/icons";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Saved = () => {
  const {
    data: savedData,
    error: savedError,
    isLoading: savedIsLoading,
  } = useQuery({
    queryKey: [savedKey, "profile"],
    queryFn: async () => await getSaved(),
  });

  if (!savedData || !savedData.data.length) {
    return (
      <div className="flex mx-28 flex-col my-5 space-y-3  max-w-screen-xl">
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
  }

  if (savedIsLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 mx-28 max-w-screen-xl">
      {savedData.data?.map((post) => {
        const postFiles = post?.post_files || [];
        const firstFile = postFiles[0];

        return (
          <Link key={post?.id} href={`/p/${post?.id}`} className="relative group cursor-pointer">
            <div className="w-full h-[300px]">
              {post?.type === PostType.REEL && firstFile?.url ? (
                <video
                  key={"video" + firstFile.id}
                  src={firstFile?.url || "/camera-b.png"}
                  controls={false}
                  className="object-cover w-full h-full rounded-md"
                />
              ) : (
                <Image
                  key={"image" + firstFile?.id}
                  className="object-cover w-full h-full rounded-md"
                  src={firstFile?.url || "/camera-b.png"}
                  alt={"image " + post?.id}
                  width={500}
                  height={500}
                  loading="lazy"
                />
              )}
              {postFiles?.length > 1 && (
                <div className="absolute top-2 right-2 bg-transparent bg-opacity-75 p-1 rounded-full">
                  <MultiFileIcon />
                </div>
              )}

              {post.type === PostType.REEL && (
                <div className="absolute top-2 right-2 bg-transparent bg-opacity-75 p-1 rounded-full">
                  <ClipSavedIcon />
                </div>
              )}
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

export default Saved;
