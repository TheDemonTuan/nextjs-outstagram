import { GET_USER_SUGGESTIONS, UserSuggestionsResponse } from "@/graphql/query";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useLazyQuery } from "@apollo/client";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { HoverCard, HoverCardTrigger } from "./ui/hover-card";
import SummaryProfile from "./summary-profile";

const Suggestions = () => {
  const { authData } = useAuth();
  const [
    getUserSuggestionsResults,
    { data: userSuggestionsData, loading: userSuggestionsLoading, error: userSuggestionsError },
  ] = useLazyQuery<UserSuggestionsResponse>(GET_USER_SUGGESTIONS);

  useEffect(() => {
    if (authData?.id) {
      getUserSuggestionsResults({
        variables: {
          userID: authData.id,
          count: 5,
        },
      });
    }
  }, [authData?.id]);

  useEffect(() => {
    if (userSuggestionsError) {
      toast.error("Failed to get user suggestions");
    }
  }, [userSuggestionsError]);

  if (userSuggestionsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-semibold text-gray-400">Suggestions</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {userSuggestionsData?.get_user_suggestions.map((user) => (
        <div key={user.username} className="flex items-center justify-between gap-3">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex flex-row gap-3">
                <Link href={`/${user.username}`}>
                  <Avatar className="w-11 h-11" src={getUserAvatarURL(user.avatar)} />
                </Link>
                <div className="flex-1">
                  <Link href={`/${user.username}`} className="font-semibold text-sm">
                    {user.username}
                  </Link>
                  <h3 className="text-xs text-gray-400">{user.full_name}</h3>
                </div>
              </div>
            </HoverCardTrigger>
            <SummaryProfile
              avatar={getUserAvatarURL(user.avatar)}
              full_name={user.full_name}
              username={user.username}
            />
          </HoverCard>
          <button className="text-blue-400 text-xs font-bold">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
