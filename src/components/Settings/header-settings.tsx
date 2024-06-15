"use client";

import { ContactInfoIcon, LockIcon, ShieldIcon, UserIcon } from "@/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const HeaderSettingsMenu = [
  {
    name: "Edit profile",
    icon: UserIcon,
    href: "/accounts/edit",
  },
  {
    name: "Change password",
    icon: ShieldIcon,
    href: "/accounts/change-password",
  },
  {
    name: "Contact info",
    icon: ContactInfoIcon,
    href: "/accounts/contact-info",
  },
  {
    name: "Private account",
    icon: LockIcon,
    href: "/accounts/privacy_setting",
  },
];

const isActive = "bg-[#EFEFEF]";

const HeaderSettings = () => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col w-80 h-dvh border-r border-gray-200 sticky top-0">
      <div className="mx-6 my-8">
        <div className="font-bold text-xl mb-5">Settings</div>
        <nav className="space-y-1 ">
          {HeaderSettingsMenu.map((item, index) => {
            const Icon = item.icon;
            const isActiveClass = item.href ? pathName.startsWith(item.href ?? "") : false;
            return (
              <Link
                key={index}
                href={item.href || "#"}
                className={`flex items-center space-x-4 text-gray-900 text-sm font-normal group hover:bg-[#EFEFEF] p-3 rounded-lg  transition-colors duration-200 ease-in-out ${
                  isActiveClass && isActive
                }`}>
                <Icon className="w-6 h-6 group-hover:scale-105" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default HeaderSettings;
