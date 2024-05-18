"use client";

import { AddIcon, DiscoverIcon, HomeIcon, MessagesIcon, ReelsIcon, SearchIcon } from "@/icons";
import { useModalStore } from "@/stores/modal-store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import "react-image-gallery/styles/css/image-gallery.css";
import CreatePost from "./Post/create-post";

const HeaderMenu = [
  {
    name: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    name: "Search",
    icon: SearchIcon,
    action: () => console.log("Search"),
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
    icon: FaRegHeart,
    action: () => console.log("Notifications"),
  },
  {
    name: "New",
    icon: AddIcon,
    action: () => {
      const { modalOpen, modalIsOpen } = useModalStore();
      console.log(modalIsOpen);
    },
  },
];

const isActive = "font-bold";

const Header = () => {
  const pathName = usePathname();
  const { modalOpen, modalIsOpen } = useModalStore();

  return (
    <div className="flex flex-col w-64 h-dvh p-2 border-r border-gray-200 sticky top-0">
      <Link href={"/"} className="p-4">
        <Image alt="Outstagram logo" className="w-auto h-auto" height={128} src="/logo.png" width={128} priority={true} />
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
              className={`flex items-center space-x-4 text-gray-900 group hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200 ease-in-out ${isActiveClass && isActive
                }`}
              onClick={modalOpen}>
              <Icon className="w-7 h-7 group-hover:scale-105" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <CreatePost />
    </div>
  );
};

export default Header;