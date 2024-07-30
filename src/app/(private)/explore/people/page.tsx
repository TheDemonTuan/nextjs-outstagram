"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar as AvatarNextUI, AvatarGroup, Spinner, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { VerifiedIcon } from "@/icons";
import { Friend, Post, UserSuggestionDocument } from "@/gql/graphql";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { userKey } from "@/api/user";
import { graphQLClient } from "@/lib/graphql";
import { toast } from "sonner";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import SummaryProfile from "@/components/summary-profile";
import { PeopleSuggestionsSkeleton } from "@/components/skeletons";

const getDifferenceInDays = (date1: Date, date2: Date) => {
  const timeDifference = date2.getTime() - date1.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference;
};

const PeoplePage = () => {
  const {
    data: userSuggestionData,
    error: userSuggestionError,
    isLoading: userSuggestionIsLoading,
  } = useQuery({
    queryKey: [userKey, "suggestions"],
    queryFn: () => graphQLClient.request(UserSuggestionDocument, { count: 30 }),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (userSuggestionError) {
      toast.error("Failed to get user suggestions");
    }
  }, [userSuggestionError]);

  if (userSuggestionIsLoading) {
    return (
      <>
        <PeopleSuggestionsSkeleton />
      </>
    );
  }

  return (
    <>
      <div className="max-w-xl h-full mx-auto my-[76px]">
        <span className="text-lg font-semibold">Suggested</span>
        <div className="flex flex-col mx-1 space-y-4 my-5">
          {userSuggestionData?.userSuggestion.length === 0 ? (
            <div className="text-center text-sm font-semibold flex flex-col items-center">
              <AvatarGroup isBordered>
                <Avatar className="h-14 w-14">
                  <AvatarImage className="object-cover" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                </Avatar>
                <Avatar className="h-14 w-14">
                  <AvatarImage className="object-cover" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                </Avatar>
                <Avatar className="h-14 w-14">
                  <AvatarImage className="object-cover" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                </Avatar>
                <Avatar className="h-14 w-14">
                  <AvatarImage className="object-cover" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                </Avatar>
                <Avatar className="h-14 w-14">
                  <AvatarImage className="object-cover" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                </Avatar>
                <Avatar className="h-14 w-14">
                  <AvatarImage className="object-cover" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                </Avatar>
              </AvatarGroup>

              <p className="my-3">Currently, there are no suggestions. Find more people to add as friends!</p>
            </div>
          ) : (
            userSuggestionData?.userSuggestion?.map((user) => {
              const isNewUser = user.created_at && getDifferenceInDays(new Date(user.created_at), new Date()) <= 7;
              return (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex flex-row gap-3 items-center">
                    <Tooltip
                      delay={1000}
                      content={
                        user && (
                          <SummaryProfile
                            username={user.username || ""}
                            full_name={user.full_name || ""}
                            avatar={user.avatar || ""}
                            role={user.role || false}
                            posts={user?.posts as Post[]}
                            friends={user.friends as Friend[]}
                            is_private={user.is_private || false}
                          />
                        )
                      }
                      placement="bottom-start"
                      className="rounded-md shadow-lg">
                      <Link href={`/${user.username}`}>
                        <Avatar className="h-12 w-12">
                          <AvatarImage className="object-cover" src={getUserAvatarURL(user.avatar)} />
                          <AvatarFallback>
                            <Spinner size="sm" />
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                    </Tooltip>
                    <div className="flex-1">
                      <div className="flex items-center space-x-1">
                        <Tooltip
                          delay={1000}
                          content={
                            user && (
                              <SummaryProfile
                                username={user.username || ""}
                                full_name={user.full_name || ""}
                                avatar={user.avatar || ""}
                                role={user.role || false}
                                posts={user?.posts as Post[]}
                                friends={user.friends as Friend[]}
                                is_private={user.is_private || false}
                              />
                            )
                          }
                          placement="bottom-start"
                          className="rounded-md shadow-lg">
                          <Link href={`/${user.username}`} className="font-bold text-[14px] leading-[18px]">
                            {user.username}
                          </Link>
                        </Tooltip>
                        {user.role && <VerifiedIcon className="w-3 h-3" />}
                      </div>
                      <h3 className="text-[14px] leading-[18px] text-[#737373]">{user.full_name}</h3>
                      <h3 className="text-[12px] leading-[16px] text-[#737373]">
                        {isNewUser ? "New to Outstagram" : "Suggested for you"}
                      </h3>
                    </div>
                  </div>
                  {/* <button className="bg-[#0095F6] hover:bg-[#1877F2] rounded-md  px-4 py-1.5 text-sm font-medium text-white">
                    Add Friend
                  </button> */}
                  <Link
                    href={`/${user.username}`}
                    className="bg-[#0095F6] hover:bg-[#1877F2] rounded-md  px-4 py-1.5 text-sm font-medium text-white">
                    Go to profile
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="text-center space-y-2 flex flex-col items-center text-[#00376b] font-semibold">
        <div className="flex items-center space-x-4 text-[14px] leading-[18px]">
          <span>ABOUT</span>
          <span>HELP</span>
          <span>PRESS</span>
          <span>API</span>
          <span>JOBS</span>
          <span>PRIVACY</span>
          <span>TERMS</span>
        </div>
        <div className="flex items-center space-x-4 text-[14px] leading-[18px]">
          <span>LOCATIONS</span>
          <span className="text-sm font-normal text-[#1C1E21]">language</span>
          <span>METAN VERIFIED</span>
        </div>
        <span className="text-[14px] leading-[18px] text-[#737373]">© 2024 OUTSTAGRAM FROM METAN</span>
      </div>
    </>
  );
};

export default PeoplePage;
