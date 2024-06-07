import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useLazyQuery } from "@apollo/client";
import { Spinner, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SummaryProfile from "./summary-profile";
import { UserResponse } from "@/api/user";
import { UserSuggestionQuery } from "@/gql/graphql";
import { UserSuggestion } from "@/graphql/user";

const Suggestions = () => {
  const { authData } = useAuth();
  const [
    getUserSuggestionsResults,
    { data: userSuggestionData, loading: userSuggestionLoading, error: userSuggestionError },
  ] = useLazyQuery<UserSuggestionQuery>(UserSuggestion);

  useEffect(() => {
    if (authData?.id) {
      getUserSuggestionsResults({
        variables: {
          count: 5,
        },
      });
    }
  }, [authData?.id, getUserSuggestionsResults]);

  useEffect(() => {
    if (userSuggestionError) {
      toast.error("Failed to get user suggestions");
    }
  }, [userSuggestionError]);

  if (userSuggestionLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-semibold text-gray-400">Suggestions</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {userSuggestionData?.userSuggestion.map((user) => (
        <div key={user.username} className="flex items-center justify-between gap-3">
          <Tooltip content={user && <SummaryProfile user={user as UserResponse} />}>
            <Link className="flex items-center gap-2 text-sm font-medium" href={`/${user?.username}`}>
              <div className="flex flex-row gap-3">
                <Link href={`/${user.username}`}>
                  <Avatar className="w-11 h-11">
                    <AvatarImage className="object-cover" src={getUserAvatarURL(user.avatar)} />
                    <AvatarFallback>
                      <Spinner size="sm" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1">
                  <Link href={`/${user.username}`} className="font-semibold text-sm">
                    {user.username}
                  </Link>
                  <h3 className="text-xs text-gray-400">{user.full_name}</h3>
                </div>
              </div>
            </Link>
          </Tooltip>
          <button className="text-blue-400 text-xs font-bold">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
