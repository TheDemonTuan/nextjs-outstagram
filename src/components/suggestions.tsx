import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { Spinner, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SummaryProfile from "./summary-profile";
import { UserResponse, userKey } from "@/api/user";
import { UserSuggestionDocument } from "@/gql/graphql";
import { graphQLClient } from "@/lib/graphql";
import { useQuery } from "@tanstack/react-query";
import { SuggestionsSkeleton } from "./skeletons";
import UserProfileInfo from "./user-profile-info";
import { HoverCard, HoverCardTrigger } from "./ui/hover-card";
import { HoverCardContent } from "@radix-ui/react-hover-card";

const Suggestions = () => {
  const { authData } = useAuth();
  const {
    data: userSuggestionData,
    error: userSuggestionError,
    isLoading: userSuggestionIsLoading,
  } = useQuery({
    queryKey: [userKey, "home-page"],
    queryFn: () => graphQLClient.request(UserSuggestionDocument, { count: 5 }),
  });

  useEffect(() => {
    if (userSuggestionError) {
      toast.error("Failed to get user suggestions");
    }
  }, [userSuggestionError]);

  if (userSuggestionIsLoading) {
    return (
      <>
        <SuggestionsSkeleton />
        <SuggestionsSkeleton />
        <SuggestionsSkeleton />
        <SuggestionsSkeleton />
        <SuggestionsSkeleton />
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-semibold text-gray-400">Suggestions</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {userSuggestionData?.userSuggestion.map((user) => (
        <div key={user.username} className="flex items-center justify-between gap-3">
          <Tooltip
            delay={1000}
            content={user && <SummaryProfile user={user as UserResponse} />}
            placement="bottom-start">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="flex flex-row gap-3 items-center">
                <UserProfileInfo
                  username={user.username || ""}
                  full_name="Suggested for you"
                  isShowFullName={true}
                  className="w-11 h-11"
                  avatar={user.avatar || ""}
                  is_admin={false}
                />
              </div>
            </div>
          </Tooltip>
          <button className="text-blue-400 text-xs font-bold">Add friends</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
