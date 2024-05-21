"use client";

import { PostResponse, postGetAllFromMe, postKey } from "@/api/post";
import Post from "@/components/Post";
import MiniProfile from "@/components/mini-profile";
import Stories from "@/components/Story/stories";
import Suggestions from "@/components/suggestions";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Avatar, Button, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const HomePage = () => {
  const { data: postsData, isFetching: postsIsFetching } = useQuery<
    ApiSuccessResponse<PostResponse[]>,
    ApiErrorResponse,
    PostResponse[]
  >({
    queryKey: [postKey, "me"],
    queryFn: async () => postGetAllFromMe(),
    select: (data) => data.data,
  });

  return (
    <div className="flex-auto grid grid-flow-col justify-evenly p-8">
      <div className="flex flex-col col-span-2 items-center gap-2">
        <Stories />

        {postsIsFetching || !postsData ? (
          <Spinner label="Loading" color="primary" labelColor="primary" />
        ) : (
          <Post postData={postsData} />
        )}
      </div>
      <div className="flex flex-col p-5 space-y-6 w-80">
        <MiniProfile />
        <Suggestions />

        <div className="mt-auto text-xs text-gray-300">
          <p>
            About · Help · Press · API · Jobs · Privacy · Terms · Locations ·
            Top Accounts · Hashtags · Language
          </p>
          <p className="pt-5">© 2024 OUTSTAGRAM FROM METAN</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
