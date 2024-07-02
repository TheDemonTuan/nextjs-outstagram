"use client";

import Post from "@/components/Post";
import MiniProfile from "@/components/mini-profile";
import Stories from "@/components/Story/stories";
import Suggestions from "@/components/suggestions";
import { Button } from "@nextui-org/react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const HomePage = () => {
  const { authCanUse } = useAuth();

  return (
    <div className="flex-auto grid grid-flow-col justify-evenly p-6">
      <div className="flex flex-col col-span-1 gap-4">
        <Stories />
        {authCanUse && <Post />}
        {!authCanUse && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-semibold">Welcome to Outstagram</p>
            <p className="text-sm text-gray-400">Sign in to see photos and videos from your friends.</p>
            <Link href="/login">
              <Button color="primary">Sign in</Button>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-6 w-80 p-4">
        {authCanUse && (
          <>
            <MiniProfile />
            <Suggestions />
          </>
        )}
        <div className="text-xs text-gray-300">
          <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · Top Accounts · Hashtags · Language</p>
          <p className="pt-5">© 2024 OUTSTAGRAM FROM METAN</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
