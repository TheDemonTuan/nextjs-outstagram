import Link from "next/link";
import PostsGrid from "./posts-grid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { notFound } from "next/navigation";
import { postKey } from "@/api/post";
import { graphQLClient } from "@/lib/graphql";
import { Post, PostByPostIdDocument, PostSuggestionsDocument, PostSuggestionsQuery } from "@/gql/graphql";
import { MorePostSkeleton } from "../skeletons";
import { log } from "console";

const MorePosts = ({ postId }: { postId: string }) => {
  const {
    data: postData,
    error: postError,
    isLoading: postIsLoading,
  } = useQuery({
    queryKey: [postKey, "suggestions", { postId }],
    queryFn: () => graphQLClient.request(PostSuggestionsDocument, { skipPostID: postId, limit: 6 }),
    enabled: !!postId,
  });

  useEffect(() => {
    if (postError) {
      notFound();
    }
  }, [postError]);

  if (postIsLoading) {
    return <MorePostSkeleton />;
  }

  if (!postData) {
    return <div>User not found</div>;
  }

  const postUsername = postData?.postSuggestions[0].user?.username;

  return (
    <div className="flex flex-col space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
      <p className="font-semibold text-sm text-neutral-500 dark:text-neutral-400">
        More posts from{" "}
        <Link href={`/${postUsername}`} className="dark:text-white text-black hover:opacity-50">
          {postUsername}
        </Link>{" "}
      </p>
      {postData && <PostsGrid postSuggestions={postData.postSuggestions as Post[]} />}
    </div>
  );
};

export default MorePosts;
