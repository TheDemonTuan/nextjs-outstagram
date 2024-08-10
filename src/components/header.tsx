"use client";

import { postKey } from "@/api/post";
import { userKey } from "@/api/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserSearchDocument } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import {
  AddIcon,
  BookmarkIcon,
  DiscoverIcon,
  HomeIcon,
  InstagramIcon,
  MessagesIcon,
  Notifications,
  ReelsIcon,
  ReportAProblemIcon,
  SearchIcon,
  SettingIcon,
  SwitchAppearance,
  YourActivityIcon,
} from "@/icons";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { graphQLClient } from "@/lib/graphql";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { useNotificationsStore } from "@/stores/notification-store";
import {
  Badge,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
  Input,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import _ from "lodash";
import NextImage from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { toast } from "sonner";
import SideBarInbox from "./Chats/sidebar-inbox";
import LogoutModal, { LogoutModalKey } from "./logout-modal";
import SelectPhotoModal, { SelectPhotoModalKey } from "./Post/select-photo";
import { HeaderSkeleton, NotificationsSkeleton, SearchHeaderSkeleton } from "./skeletons";

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

const DisabledMenuItems = ["Reels", "Messages", "Notifications", "New"];

const MenuItemClass =
  "flex items-center space-x-4 text-gray-900 group hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200 ease-in-out";

const ShortMenuItemClass =
  "flex items-center justify-center space-x-4 text-gray-900 group hover:bg-gray-100 p-[9px] rounded-lg transition-colors duration-200 ease-in-out";

const ShortHeaderList = ["Search", "Notifications", "Messages"];
const ShortHeaderSpecialList = ["Messages"];

const Header = () => {
  const { modalOpen } = useModalStore();
  const pathName = usePathname();
  const { authData, authIsLoading, authIsError, authCanUse, authIsPending } = useAuth();
  const [isShortHeader, setIsShortHeader] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState("");
  const [changeMenu, setChangeMenu] = React.useState(false);
  const { total } = useNotificationsStore();
  const queryClient = useQueryClient();

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
                onClick={() => {
                  queryClient.invalidateQueries({
                    queryKey: [postKey, "home"],
                  });
                }}
              />
            ) : (
              <InstagramIcon
                className="w-12 h-12"
                onClick={() => {
                  queryClient.invalidateQueries({
                    queryKey: [postKey, "home"],
                  });
                }}
              />
            )}
          </Link>
          {authIsPending && <HeaderSkeleton />}
          {/* Menu */}
          <nav className={cn(isShortHeader ? "space-y-3" : "space-y-4", authIsLoading && "hidden")}>
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
                      case "Home":
                        queryClient.invalidateQueries({
                          queryKey: [postKey, "home"],
                        });
                        break;
                      case "Reels":
                        queryClient.invalidateQueries({
                          queryKey: [postKey, "reels"],
                        });
                        break;
                      case "New":
                        modalOpen(SelectPhotoModalKey);
                        break;
                      default:
                        break;
                    }
                  }}>
                  {item.name === "Notifications" ? (
                    <Badge color="danger" content={total} shape="circle">
                      <Icon className={cn("w-[26px] h-[26px] group-hover:scale-105", active && "stroke-zinc-950")} />
                    </Badge>
                  ) : (
                    <Icon
                      className={cn(
                        "w-[26px] h-[26px] group-hover:scale-105 p-overlay-badge",
                        active && "stroke-zinc-950"
                      )}
                    />
                  )}

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
          <div className={cn("h-full flex justify-start items-end py-2", !authCanUse && "hidden")}>
            <Dropdown placement="top-start">
              <DropdownTrigger className="active:font-extrabold">
                <div className={cn(MenuItemClass, "w-full cursor-pointer")}>
                  <AiOutlineMenu className={cn("w-7 h-7 group-hover:scale-105")} />
                  {!isShortHeader && <span className="text-lg">More</span>}
                </div>
              </DropdownTrigger>
              <DropdownMenu className="w-64" variant="flat">
                <DropdownSection showDivider={true}>
                  <DropdownItem
                    className="py-4 hover:bg-[#F2F2F2]"
                    href="/accounts/edit/"
                    startContent={<SettingIcon className="w-5 h-5 ml-2" />}>
                    <span className="mx-1">Settings</span>
                  </DropdownItem>
                  <DropdownItem
                    className="py-4 pl-4 hover:bg-[#F2F2F2]"
                    href="/your-activity/interactions"
                    startContent={<YourActivityIcon className="w-5 h-5 ml-2" />}>
                    <span className="mx-1">Your Activity</span>
                  </DropdownItem>
                  <DropdownItem
                    className="py-4 hover:bg-[#F2F2F2]"
                    href={`/${authData?.username}?tab=SAVED`}
                    startContent={<BookmarkIcon className="w-5 h-5 ml-2" stroke="#000000" />}>
                    {" "}
                    <span className="mx-1">Saved</span>
                  </DropdownItem>
                  {/* <DropdownItem
                    className="py-4 pl-4 hover:bg-[#F2F2F2]"
                    startContent={<SwitchAppearance className="w-5 h-5 ml-2" />}>
                    {" "}
                    <span className="mx-1">Switch appearance</span>
                  </DropdownItem> */}
                  {authData?.role === true && (
                    <DropdownItem
                      className="py-4 pl-4 hover:bg-[#F2F2F2]"
                      href="/report/interactions"
                      startContent={<ReportAProblemIcon className="w-5 h-5 pl-2" />}>
                      <span className="mx-1">Report a problem</span>
                    </DropdownItem>
                  )}
                </DropdownSection>
                <DropdownItem className="py-4 hover:bg-[#F2F2F2]" onClick={() => modalOpen(LogoutModalKey)}>
                  <span className="px-2">Log out</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* </div> */}
          </div>
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
      <SelectPhotoModal />
      <LogoutModal />
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
  const { notifications, resetTotal } = useNotificationsStore();

  useEffect(() => {
    resetTotal();
  }, [resetTotal]);

  return (
    <div className="overflow-y-auto max-h-[728px]">
      <div className="flex flex-col gap-2 py-4">
        <span className="font-bold text-2xl px-4">Notifications</span>
        <span className="font-bold text-lg px-4">New</span>
        <div className="flex flex-col gap-2">
          {notifications.map((notification, index) => (
            <Link
              href={`/${notification.username}`}
              className="flex justify-between items-center hover:bg-gray-100 p-2 rounded-md transition-colors duration-200 ease-in-out"
              key={index}>
              <div className="flex items-center gap-2 px-2">
                <Avatar className="w-11 h-11">
                  <AvatarImage src={getUserAvatarURL(notification.avatar)} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <span className="text-sm">
                  <span className="font-semibold">{notification.username}</span> {notification.message}
                  <span className="text-gray-400 text-xs">
                    {" "}
                    {formatDistanceToNow(notification.createdAt || "", {
                      addSuffix: true,
                    })}
                  </span>
                </span>
              </div>
              {/* <NextImage src={notification.image} alt="" width={44} height={44} className="w-12 h-12 rounded-lg" /> */}
            </Link>
          ))}

          {/* <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="w-11 h-11">
                    <AvatarImage src="https://images.pexels.com/photos/395196/pexels-photo-395196.jpeg?auto=compress&cs=tinysrgb&w=600" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <span className="text-sm mx-3">
                    <span className="font-semibold">username</span> liked your post.
                    <span className="text-gray-400"> 3 d</span>
                  </span>
                </div>
                <NextImage
                  src="https://res.cloudinary.com/dsjzxokur/image/upload/v1718659293/posts/er0rkgfcmo5gzfmibgrp.webp"
                  alt=""
                  width={44}
                  height={44}
                  className="w-12 h-12 rounded-lg"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="w-11 h-11">
                    <AvatarImage src="https://images.pexels.com/photos/395196/pexels-photo-395196.jpeg?auto=compress&cs=tinysrgb&w=600" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <span className="text-sm mx-3">
                    <span className="font-semibold">username</span> mentioned you in a comment: @......
                    <span className="text-gray-400"> 3 d</span>
                  </span>
                </div>
                <NextImage
                  src="https://res.cloudinary.com/dsjzxokur/image/upload/v1718659293/posts/er0rkgfcmo5gzfmibgrp.webp"
                  alt=""
                  width={44}
                  height={44}
                  className="w-12 h-12 rounded-lg"
                />
              </div> */}
        </div>
        <Divider className="my-5" />

        {/* <div>
            <span className="font-bold text-lg">This month</span>
            <div className="my-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="w-11 h-11">
                    <AvatarImage src="https://images.pexels.com/photos/395196/pexels-photo-395196.jpeg?auto=compress&cs=tinysrgb&w=600" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <span className="text-sm mx-3">
                    <span className="font-semibold">jack maria</span> posted a thread that you might like: Lorem Ipsum
                    is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,....
                    <span className="text-gray-400"> 3 d</span>
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="w-11 h-11">
                    <AvatarImage src="https://images.pexels.com/photos/395196/pexels-photo-395196.jpeg?auto=compress&cs=tinysrgb&w=600" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <span className="text-sm mx-3">
                    <span className="font-semibold">username</span> mentioned you in a comment: @......
                    <span className="text-gray-400"> 3 d</span>
                  </span>
                </div>
                <NextImage
                  src="https://res.cloudinary.com/dsjzxokur/image/upload/v1718659293/posts/er0rkgfcmo5gzfmibgrp.webp"
                  alt=""
                  width={44}
                  height={44}
                  className="w-12 h-12 rounded-lg"
                />
              </div>
            </div>
            <Divider className="my-5" />
          </div> */}
        {/* <div>
            <span className="font-bold text-lg">Earlier</span>
            <div className="my-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="w-11 h-11">
                    <AvatarImage src="https://images.pexels.com/photos/395196/pexels-photo-395196.jpeg?auto=compress&cs=tinysrgb&w=600" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <span className="text-sm mx-3">
                    <span className="font-semibold">jack maria</span> posted a thread that you might like: Lorem Ipsum
                    is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,....
                    <span className="text-gray-400"> 3 d</span>
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="w-11 h-11">
                    <AvatarImage src="https://images.pexels.com/photos/395196/pexels-photo-395196.jpeg?auto=compress&cs=tinysrgb&w=600" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <span className="text-sm mx-3">
                    <span className="font-semibold">username</span> started following you.
                    <span className="text-gray-400"> 10 d</span>
                  </span>
                </div>
                <Button size="sm" className="font-semibold text-sm bg-gray-200/70 hover:bg-gray-300 px-6">
                  Following
                </Button>
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
};
