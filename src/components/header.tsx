"use client";

import {
  AddIcon,
  DiscoverIcon,
  HomeIcon,
  InstagramIcon,
  MessagesIcon,
  Notifications,
  ReelsIcon,
  SearchIcon,
} from "@/icons";
import { useModalStore } from "@/stores/modal-store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useCallback, useRef } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import CreatePost, { CreatePostModalKey } from "./Post/create-post";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, Input, Skeleton, Spinner } from "@nextui-org/react";
import _ from "lodash";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_USER } from "@/graphql/query";
import { UserSearchResponse } from "@/api/user";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { toast } from "sonner";

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
    name: "Explores",
    icon: DiscoverIcon,
    href: "/explores",
  },
  {
    name: "Reels",
    icon: ReelsIcon,
    href: "/reels",
  },
  {
    name: "Messages",
    icon: MessagesIcon,
    href: "/direct/inbox",
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

const DisabledMenuItems = ["Explores", "Reels", "Messages", "Notifications", "New"];

const MenuItemClass =
  "flex items-center space-x-4 text-gray-900 group hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200 ease-in-out";

const MenuItemClassDisabled = "flex items-center space-x-4 text-gray-900 group p-2 rounded-lg";

const ShortMenuItemClass =
  "flex items-center justify-center space-x-4 text-gray-900 group hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200 ease-in-out";

const ShortMenuItemClassDisabled = "flex items-center justify-center space-x-4 text-gray-900 group p-2 rounded-lg";

const Header = () => {
  const { modalOpen } = useModalStore();
  const pathName = usePathname();
  const { authData, authIsLoading, authIsError } = useAuth();
  const [isShortHeader, setIsShortHeader] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-dvh sticky top-0 border-r border-gray-300",
          isShortHeader ? "w-[75px] space-y-8 p-2" : "w-[245px] space-y-6 p-4 pt-6"
        )}>
        <Link href={"/"} className={cn(isShortHeader ? "flex items-center justify-center p-3" : "p-2")}>
          {!isShortHeader ? (
            <Image
              alt="Outstagram logo"
              className="object-cover w-auto h-auto"
              width={128}
              height={128}
              src="/logo.png"
              priority={true}
            />
          ) : (
            <InstagramIcon className="w-12 h-12" />
          )}
        </Link>
        {/* Menu */}
        <nav className="space-y-4">
          {HeaderMenu.map((item, index) => {
            const Icon = item.icon;
            const isActiveClass = item.href
              ? !index
                ? pathName === item.href
                : pathName.startsWith(item.href ?? "")
              : false;
            if (authIsError && DisabledMenuItems.includes(item.name)) {
              return (
                <Fragment key={index}>
                  <div className={cn(isShortHeader ? ShortMenuItemClassDisabled : MenuItemClassDisabled, "opacity-50")}>
                    <Icon className="w-7 h-7" />
                    {!isShortHeader && <span>{item.name}</span>}
                  </div>
                </Fragment>
              );
            }
            return (
              <Link
                key={index}
                href={item.href || "#"}
                className={cn(isShortHeader ? ShortMenuItemClass : MenuItemClass, isActiveClass && "font-bold")}
                onClick={(e) => {
                  if (!item.href && item.action) {
                    e.preventDefault();
                    // setIsShortHeader(false);
                    switch (item.name) {
                      case "New":
                        modalOpen(CreatePostModalKey);
                        break;
                      case "Search":
                        setIsShortHeader((prev) => {
                          setIsSearchOpen(!prev);
                          setIsNotificationsOpen(false);
                          return !prev;
                        });
                        break;
                      case "Notifications":
                        setIsShortHeader((prev) => {
                          setIsNotificationsOpen(!prev);
                          setIsSearchOpen(false);
                          return !prev;
                        });
                        break;
                      default:
                        break;
                    }
                  } else {
                    switch (item.name) {
                      case "Messages":
                        setIsShortHeader(true);
                        break;
                      default:
                        break;
                    }
                  }
                }}>
                <Icon className="w-7 h-7 group-hover:scale-105" />
                {!isShortHeader && <span>{item.name}</span>}
              </Link>
            );
          })}
          {/* Profile */}
          {!authIsLoading ? (
            authData && (
              <Link href={`/${authData?.username}`} className={cn(isShortHeader ? ShortMenuItemClass : MenuItemClass)}>
                <Avatar
                  src={getUserAvatarURL(authData?.avatar)}
                  alt={authData?.username}
                  className="w-7 h-7 border group-hover:scale-105"
                  fallback={<Spinner size="sm" />}
                />
                {!isShortHeader && <span>Profile</span>}
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
      {isShortHeader && (
        <div className="sticky w-[396px] rounded-xl h-dvh top-0 shadow">
          {isSearchOpen && <Search />}
          {isNotificationsOpen && <Notification />}
        </div>
      )}
    </>
  );
};

export default Header;

const Search = () => {
  const keyWordRef = useRef<HTMLInputElement>(null);

  const [getSearchResults, { data: searchData, loading: searchLoading }] = useLazyQuery<UserSearchResponse>(
    SEARCH_USER,
    {
      onError() {
        toast.error("Error while searching user");
      },
    }
  );

  const debouncedHandleSearch = useCallback(
    _.debounce(() => {
      const keyword = keyWordRef.current?.value;
      getSearchResults({
        variables: {
          keyword: keyword,
        },
      });
    }, 1000),
    []
  );

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex flex-col justify-between w-full h-40 p-4",
          !keyWordRef.current?.value && "border-b border-gray-300"
        )}>
        <span className="text-2xl p-2 font-semibold">Search</span>
        <Input
          autoFocus
          isClearable={!searchLoading}
          isDisabled={searchLoading}
          endContent={searchLoading && <Spinner size="sm" />}
          type="search"
          variant="faded"
          color="primary"
          placeholder="Search"
          defaultValue=""
          onClear={() => {
            keyWordRef.current?.focus();
            debouncedHandleSearch();
          }}
          className="w-full"
          ref={keyWordRef}
          onChange={debouncedHandleSearch}
        />
      </div>
      <div className={cn("flex flex-col", !keyWordRef.current?.value && "p-6")}>
        {keyWordRef.current?.value && !searchLoading && searchData?.search_user?.length && (
          <>
            {searchData?.search_user?.map((user) => {
              return (
                <div className="flex items-center" key={user.id}>
                  <Link
                    href={`/${user.username}`}
                    className="hover:bg-gray-200 w-full p-2 px-6 flex items-center gap-2 rounded-sm">
                    <Avatar
                      className="w-11 h-11 border"
                      src={getUserAvatarURL(user.avatar)}
                      fallback={<Spinner size="sm" />}
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{user.username}</span>
                      <span className="text-gray-400 text-sm">{user.full_name}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </>
        )}
        {keyWordRef.current?.value && !searchLoading && !searchData?.search_user?.length && (
          <div className="flex justify-center items-center flex-1">
            <span className="text-gray-500">No results</span>
          </div>
        )}
        {!keyWordRef.current?.value && (
          <div className="flex justify-between">
            <span className="font-semibold">Recent</span>
            <span className="text-primary hover:text-red-500 cursor-pointer">Clear all</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Notification = () => {
  return <div>Notification</div>;
};
