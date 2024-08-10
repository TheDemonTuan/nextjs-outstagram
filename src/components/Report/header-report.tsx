"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountHistoryIcon, InteractionsIcon, RecentlyDeletedIcon, VideoPhotoActivityIcon } from "@/icons";
import { FaUsers } from "react-icons/fa6";
import { LuUserSquare2 } from "react-icons/lu";

const menuItems = [
  {
    href: "/report/interactions",
    icon: <InteractionsIcon fill="#000000" stroke="#000000" />,
    title: "Interactions",
    description: ["Review and delete likes,", "comments and your other", "interactions."],
  },
  {
    href: "/report/photos-and-videos",
    icon: <VideoPhotoActivityIcon fill="#000000" stroke="#000000" />,
    title: "Photo and Videos",
  },
  {
    href: "/report/members",
    icon: <LuUserSquare2 size={23} />,
    title: "Members",
  },
  // {
  //   href: "/your-activity/account-history",
  //   icon: <AccountHistoryIcon fill="#000000" stroke="#000000" />,
  //   title: "Account History",
  //   description: ["Review changes that you've", "made to your account since", "you created it."],
  // },
];

const isActive = "font-bold";

const HeaderReport = () => {
  const pathName = usePathname();

  return (
    <div className="w-1/4 border shadow-none rounded-none">
      <div className="w-full ml-4 mr-6 font-bold my-4">Report</div>
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
                  <p className="text-xs text-[#828282]"></p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderReport;
