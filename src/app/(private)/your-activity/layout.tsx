import HeaderActivity from "@/components/YourActivity/header-activity";
import { LoadingTopBar } from "@/components/skeletons";
import { Card } from "@/components/ui/card";
import { AccountHistoryIcon, InteractionsIcon, RecentlyDeletedIcon, UserIcon, VideoPhotoActivityIcon } from "@/icons";
import React from "react";

export default function YourActivityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Card className="max-w-screen-2xl mx-[170px] mt-[30px] p-0 flex border h-[565px] w-[940px] rounded-none shadow-none">
        <HeaderActivity />
        <div className=" bg-white dark:bg-neutral-950 w-3/4">{children}</div>
      </Card>
    </>
  );
}
