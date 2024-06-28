"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountHistoryIcon, InteractionsIcon, RecentlyDeletedIcon, VideoPhotoActivityIcon } from "@/icons";

const menuItems = [
  {
    href: "/your_activity/interactions",
    icon: <InteractionsIcon fill="#000000" stroke="#000000" />,
    title: "Interactions",
    description: ["Review and delete likes,", "comments and your other", "interactions."],
  },
  {
    href: "/your_activity/photos_and_videos",
    icon: <VideoPhotoActivityIcon fill="#000000" stroke="#000000" />,
    title: "Photo and Videos",
    description: ["View, archive or delete", "photos and videos you've", "shared."],
  },
  {
    href: "/your_activity/recently_deleted",
    icon: <RecentlyDeletedIcon fill="#000000" stroke="#000000" />,
    title: "Recently deleted",
    description: [
      "Only you can see these posts.",
      "They will be permanently deleted after the number of days shown. After that, you won't be able to restore them.",
    ],
  },
  {
    href: "/your_activity/account_history",
    icon: <AccountHistoryIcon fill="#000000" stroke="#000000" />,
    title: "Account History",
    description: ["Review changes that you've", "made to your account since", "you created it."],
  },
];

const isActive = "font-bold";

const HeaderActivity = () => {
  const pathName = usePathname();

  return (
    <div className="w-1/4 border shadow-none rounded-none">
      <div className="w-full ml-4 mr-6 font-bold my-4">Your activity</div>
      <hr />
      <div className="w-full ml-4 mr-6 flex flex-col mt-[18px]">
        {menuItems.map((item, index) => {
          const isActiveClass = pathName.startsWith(item.href) ? isActive : "";
          return (
            <Link key={index} href={item.href}>
              <div className="flex mb-[25px] cursor-pointer">
                <div className="mt-1">{item.icon}</div>
                <div className="flex flex-col px-7">
                  <span className={`text-sm ${isActiveClass}`}>{item.title}</span>
                  <p className="text-xs text-[#828282]">
                    {item.description.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderActivity;
