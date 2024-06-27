import { UserResponse, userKey } from "@/api/user";
import { Friend, Post, UserSuggestionDocument } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { graphQLClient } from "@/lib/graphql";
import { Tooltip } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { SuggestionsSkeleton } from "./skeletons";
import SummaryProfile from "./summary-profile";
import UserProfileInfo from "./user-profile-info";

const Suggestions = () => {
  const { authData } = useAuth();
  const {
    data: userSuggestionData,
    error: userSuggestionError,
    isLoading: userSuggestionIsLoading,
  } = useQuery({
    queryKey: [userKey, "suggestions"],
    queryFn: () => graphQLClient.request(UserSuggestionDocument, { count: 5 }),
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
            content={
              user && (
                <SummaryProfile
                  username={user.username || ""}
                  full_name={user.full_name || ""}
                  avatar={user.avatar || ""}
                  role={user.role || false}
                  posts={user?.posts as Post[]}
                  friends={user.friends as Friend[]}
                />
              )
            }
            placement="bottom-start"
            className="rounded-md shadow-lg">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div className="flex flex-row gap-3 items-center">
                <UserProfileInfo
                  username={user.username || ""}
                  full_name="Suggested for you"
                  isShowFullName={true}
                  className="w-11 h-11"
                  avatar={user.avatar || ""}
                  is_admin={user.role || false}
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
