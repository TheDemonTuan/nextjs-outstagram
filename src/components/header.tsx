"use client";

import { AddIcon, DiscoverIcon, HomeIcon, MessagesIcon, Notifications, ReelsIcon, SearchIcon } from "@/icons";
import { useModalStore } from "@/stores/modal-store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import "react-image-gallery/styles/css/image-gallery.css";
import CreatePost, { CreatePostModalKey } from "./Post/create-post";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "@nextui-org/react";

const HeaderMenu = [
  {
    name: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    name: "Search",
    icon: SearchIcon,
    action: (callback: Function) => callback,
  },
  {
    name: "Explore",
    icon: DiscoverIcon,
    href: "/explore",
  },
  {
    name: "Reels",
    icon: ReelsIcon,
    href: "/reels",
  },
  {
    name: "Messages",
    icon: MessagesIcon,
    href: "/messages",
  },
  {
    name: "Notifications",
    icon: Notifications,
    action: (callback: Function) => callback,
  },
  {
    name: "New",
    icon: AddIcon,
    action: (callback: Function) => callback,
  },
];

const MenuItemClass =
  "flex items-center space-x-4 text-gray-900 group hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200 ease-in-out";

const Header = () => {
  const { modalOpen } = useModalStore();
  const pathName = usePathname();
  const { authData, authIsLoading } = useAuth();

  console.log(authData);


  return (
    <div className="flex flex-col w-64 h-dvh p-2 border-r border-gray-200 sticky top-0">
      <Link href={"/"} className="p-4">
        <Image
          alt="Outstagram logo"
          className="w-auto h-auto"
          height={128}
          src="/logo.png"
          width={128}
          priority={true}
        />
      </Link>
      <nav className="space-y-4 p-2">
        {HeaderMenu.map((item, index) => {
          const Icon = item.icon;
          const isActiveClass = item.href
            ? !index
              ? pathName === item.href
              : pathName.startsWith(item.href ?? "")
            : false;

          return (
            <Link
              key={index}
              href={item.href || "#"}
              className={cn(MenuItemClass, isActiveClass && "font-bold")}
              onClick={(e) => {
                e.preventDefault();
                switch (item.name) {
                  case "New":
                    modalOpen(CreatePostModalKey);
                    break;
                  case "Search":
                    break;
                  case "Notifications":
                    break;
                  default:
                    break;
                }
              }}>
              <Icon className="w-7 h-7 group-hover:scale-105" />
              <span>{item.name}</span>
            </Link>
          );
        })}
        {/* Profile */}
        {!authIsLoading ? (
          authData && (
            <Link href={`/${authData?.username}`} className={MenuItemClass}>
              <Avatar className="w-7 h-7 border group-hover:scale-105">
                <AvatarImage
                  alt={authData?.username}
                  src={!!authData?.avatar ? authData?.avatar : "/guest-avatar.png"}
                />
                <AvatarFallback>{authData?.username}</AvatarFallback>
              </Avatar>
              <span>Profile</span>
            </Link>
          )
        ) : (
          <div className={MenuItemClass}>
            <div>
              <Skeleton className="flex rounded-full w-7 h-7" />
            </div>
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        )}
      </nav>
      <CreatePost />
    </div>
  );
};

export default Header;
