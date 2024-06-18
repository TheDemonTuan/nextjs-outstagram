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
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import CreatePost, { CreatePostModalKey } from "./Post/create-post";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input, Skeleton, Spinner } from "@nextui-org/react";
import _ from "lodash";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { UserSearchDocument, UserSearchQuery } from "@/gql/graphql";
import { UserSearch } from "@/graphql/user";
import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "@/lib/graphql";
import { userKey } from "@/api/user";
import { SearchHeaderSkeleton } from "./skeletons";
import SideBarInbox from "./Chats/sidebar-inbox";
import AddPostModal, { AddPostModalKey } from "./Post/add-post";
import SelectPhotoModal, { SelectPhotoModalKey } from "./Post/select-photo";

const HeaderMenu = [
  {
    name: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    name: "Search",
    icon: SearchIcon,
    action: true,
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
    action: true,
  },
  {
    name: "Notifications",
    icon: Notifications,
    action: true,
  },
  {
    name: "New",
    icon: AddIcon,
    action: true,
  },
];

const DisabledMenuItems = ["Explores", "Reels", "Messages", "Notifications", "New"];

const MenuItemClass =
  "flex items-center space-x-4 text-gray-900 group hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200 ease-in-out";

const ShortMenuItemClass =
  "flex items-center justify-center space-x-4 text-gray-900 group hover:bg-gray-100 p-[9px] rounded-lg transition-colors duration-200 ease-in-out";

const ShortHeaderList = ["Search", "Notifications", "Messages"];
const ShortHeaderSpecialList = ["Messages"];

const Header = () => {
  const { modalOpen } = useModalStore();
  const pathName = usePathname();
  const { authData, authIsLoading, authIsError } = useAuth();
  const [isShortHeader, setIsShortHeader] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState("");
  const [changeMenu, setChangeMenu] = React.useState(false);

  useEffect(() => {
    const currentLink = HeaderMenu.find((item, index) =>
      item.href ? (!index ? pathName === item.href : pathName.startsWith(item.href ?? "")) : false
    );

    if (currentLink?.name && ShortHeaderSpecialList.includes(currentLink?.name)) {
      setIsShortHeader(true);
    } else {
      setIsShortHeader(false);
    }

    currentLink ? setActiveMenu(currentLink?.name) : setActiveMenu("");
  }, [pathName, changeMenu]);

  return (
    <>
      <div
        className={cn(
          "fixed flex h-full border-gray-300 border-r z-50 bg-white",
          isShortHeader ? "w-[470px] rounded-r-lg" : "w-[245px] space-y-6 p-4 pt-6"
        )}>
        <div className={cn("flex flex-col gap-6", isShortHeader ? "w-[72px] p-[10px] mt-2 border-r" : "w-full")}>
          <Link href={"/"} className={cn("p-2", isShortHeader && "flex items-center justify-center")}>
            {!isShortHeader ? (
              <Image
                as={NextImage}
                className="w-auto h-auto"
                width={128}
                height={128}
                src="/logo.webp"
                alt="Outstagram Logo"
              />
            ) : (
              <InstagramIcon className="w-12 h-12" />
            )}
          </Link>
          {/* Menu */}
          <nav className={cn(isShortHeader ? "space-y-3" : "space-y-4")}>
            {HeaderMenu.map((item, index) => {
              const Icon = item.icon;
              const active = activeMenu === item?.name;
              if (authIsError && DisabledMenuItems.includes(item.name)) {
                return null;
              }
              return (
                <Link
                  key={index}
                  href={item.href || "#"}
                  className={cn(
                    isShortHeader ? ShortMenuItemClass : MenuItemClass,
                    active && "font-bold",
                    active && isShortHeader && "border-2"
                  )}
                  onClick={(e) => {
                    !item.href && e.preventDefault();
                    if (ShortHeaderSpecialList.includes(item.name) && !isShortHeader) return;
                    isShortHeader && setIsShortHeader(false);

                    setActiveMenu((prev) => {
                      if (prev === item.name && !ShortHeaderSpecialList.includes(item.name)) {
                        setChangeMenu(!changeMenu);
                        return "";
                      }
                      setIsShortHeader(ShortHeaderList.includes(item.name));
                      return item.name;
                    });

                    switch (item.name) {
                      case "New":
                        // modalOpen(CreatePostModalKey);
                        modalOpen(SelectPhotoModalKey);
                        break;
                      default:
                        break;
                    }
                  }}>
                  <Icon className={cn("w-[26px] h-[26px] group-hover:scale-105", active && "stroke-zinc-950")} />
                  {!isShortHeader && <span>{item.name}</span>}
                </Link>
              );
            })}
            {/* Profile */}
            {!authIsLoading ? (
              authData && (
                <Link
                  href={`/${authData?.username}`}
                  className={cn(isShortHeader ? ShortMenuItemClass : MenuItemClass)}>
                  <Avatar className="group-hover:scale-105 w-[26px] h-[26px]">
                    <AvatarImage className="object-cover" src={getUserAvatarURL(authData?.avatar)} />
                    <AvatarFallback>
                      <Spinner size="sm" />
                    </AvatarFallback>
                  </Avatar>
                  {!isShortHeader && <span>Profile</span>}
                </Link>
              )
            ) : (
              <div className={MenuItemClass}>
                <Skeleton className="flex rounded-full w-[26px] h-[26px]" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            )}
            {!authData && (
              <div className="flex flex-col w-full gap-2">
                <Link href="/login">
                  <Button className={cn("text-lg w-full", isShortHeader && "hidden")} color="primary">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className={cn("text-lg w-full", isShortHeader && "hidden")}>Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
          {/* <CreatePost /> */}
          <SelectPhotoModal />
        </div>
        {isShortHeader && (
          <div className="flex-auto">
            {activeMenu === "Search" && <Search />}
            {activeMenu === "Notifications" && <Notification />}
            {activeMenu === "Messages" && <SideBarInbox />}
          </div>
        )}
      </div>
      <div className={cn(activeMenu === "Messages" ? "w-[470px]" : "w-[245px]")} />
    </>
  );
};

export default Header;

const Search = () => {
  const keyWordRef = useRef<HTMLInputElement>(null);
  const [searchKeyword, setSearchKeyword] = React.useState("");

  const {
    data: searchData,
    error: searchError,
    isLoading: searchIsLoading,
  } = useQuery({
    queryKey: [userKey, "search", { keyword: searchKeyword }],
    queryFn: async () => graphQLClient.request(UserSearchDocument, { keyword: searchKeyword ?? "" }),
    enabled: !!searchKeyword,
    staleTime: 1000,
  });

  const debouncedHandleSearch = _.debounce(() => {
    setSearchKeyword(keyWordRef.current?.value || "");
  }, 1000);

  useEffect(() => {
    if (searchError) {
      toast.error("Something went wrong");
    }
  }, [searchError]);

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex flex-col justify-between w-full h-[155px] p-5",
          !keyWordRef.current?.value && "border-b border-gray-300"
        )}>
        <span className="text-2xl p-2 font-semibold">Search</span>
        <Input
          autoFocus
          isClearable={!searchIsLoading}
          isDisabled={searchIsLoading}
          endContent={searchIsLoading && <Spinner size="sm" />}
          type="search"
          variant="bordered"
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
        {searchIsLoading && (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <SearchHeaderSkeleton key={index} />
            ))}
          </>
        )}
        {!!keyWordRef.current?.value && !searchIsLoading && !!searchData?.userSearch?.length && (
          <>
            {searchData?.userSearch?.map((user) => {
              return (
                <div className="flex items-center" key={user.id}>
                  <Link
                    href={`/${user.username}`}
                    className="hover:bg-gray-200 w-full p-2 px-6 flex items-center gap-2 rounded-sm">
                    <Avatar className="w-11 h-11">
                      <AvatarImage className="object-cover" src={getUserAvatarURL(user.avatar)} />
                      <AvatarFallback>
                        <Spinner size="sm" />
                      </AvatarFallback>
                    </Avatar>
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
        {!!keyWordRef.current?.value && !searchIsLoading && !searchData?.userSearch?.length && (
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
