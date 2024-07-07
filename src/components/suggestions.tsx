import { UserResponse, userKey } from "@/api/user";
import { Friend, Post, UserSuggestionDocument } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { graphQLClient } from "@/lib/graphql";
import { AvatarGroup, Button, Tooltip } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { SuggestionsSkeleton } from "./skeletons";
import SummaryProfile from "./summary-profile";
import UserProfileInfo from "./user-profile-info";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";

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
        <h3 className="text-sm font-semibold text-[#737373]">Suggestions</h3>
        <Link href="/explore/people" className="text-xs font-semibold hover:text-[#737373]">
          See All
        </Link>
      </div>

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
          <Button className="mt-2 px-7 py-1 w-52 bg-gray-200 text-sm rounded-lg font-semibold" size="sm">
            See all
          </Button>
        </div>
      ) : (
        userSuggestionData?.userSuggestion.map((user) => (
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
        ))
      )}
    </div>
  );
};

export default Suggestions;
