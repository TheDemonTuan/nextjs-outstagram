"use client";

import { PostResponse, postGetAllFromMe, postKey } from "@/api/post";
import Post from "@/components/Post";
import MiniProfile from "@/components/mini-profile";
import Stories from "@/components/Story/stories";
import Suggestions from "@/components/suggestions";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Button, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const HomePage = () => {
  const { authData } = useAuth();
  const { data: postsData, isLoading: postsIsLoading } = useQuery<
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
        {!postsIsLoading && postsData && <Post postData={postsData} />}
        {!authData && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-semibold">Welcome to Outstagram</p>
            <p className="text-sm text-gray-400">
              Sign in to see photos and videos from your friends.
            </p>
            <Link href="/login">
              <Button color="primary">Sign in</Button>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col p-5 space-y-6 w-80">
        {authData && (
          <>
            <MiniProfile />
            <Suggestions />
          </>
        )}
        <div className="text-xs text-gray-300">
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
