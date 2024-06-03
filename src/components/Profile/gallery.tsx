"use client";

import { UserResponse } from "@/api/user";
import { PostByUsernameQuery, UserByUsernameQuery } from "@/gql/graphql";
import { PostByUserName } from "@/graphql/post";
import { LikeHeartIcon, MessageCircleIcon, MultiFileIcon } from "@/icons";
import { useLazyQuery } from "@apollo/client";
import { Skeleton } from "@nextui-org/react";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Gallery = ({ user }: { user: UserByUsernameQuery }) => {
  const [getUserByUserNameResults, { data: postsData, loading: postsLoading, error: postsError }] =
    useLazyQuery<PostByUsernameQuery>(PostByUserName);

  const { userByUsername: userData } = user;

  useEffect(() => {
    getUserByUserNameResults({ variables: { username: userData?.username } });
  }, [user]);

  useEffect(() => {
    if (postsError) {
      toast.error("Error fetching posts");
    }
  }, [postsError]);

  if (!postsData || !postsData.postByUsername?.length) {
    return (
      <div className="flex flex-col items-center justify-center my-14">
        <div>
          {" "}
          <img src="/camera-b.png" alt="" className="w-16 h-16" />
        </div>
        <span className="font-black text-3xl mt-10">No Posts Yet</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 mx-28">
      {postsData?.postByUsername?.map((post, index) => {
        const postFiles = post?.post_files || [];
        return (
          <div key={`${index}`} className="relative group cursor-pointer">
            {postsLoading ? (
              <Skeleton className="object-cover overflow-hidden h-[310] fill" />
            ) : (
              <div className="w-full h-[310px]">
                <img
                  className="absolute top-0 left-0 object-cover w-full h-full"
                  src={post?.post_files?.[0]?.url || "/camera-b.png"}
                  alt={"image " + index}
                />
                {postFiles?.length > 1 && (
                  <div className="absolute top-2 right-2 bg-transparent bg-opacity-75 p-1 rounded-full">
                    <MultiFileIcon className="text-white" />
                  </div>
                )}
              </div>
            )}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-6">
              <div className="flex items-center font-bold space-x-1 mx-2">
                <LikeHeartIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>

              <div className="flex items-center font-bold space-x-1 mx-2">
                <MessageCircleIcon className="text-white fill-white" />
                <p className="text-white">1</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
