import Link from "next/link";
import PostsGrid from "./posts-grid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { notFound } from "next/navigation";
import { postKey } from "@/api/post";
import { graphQLClient } from "@/lib/graphql";
import { PostByPostIdDocument } from "@/gql/graphql";

const MorePosts = ({ postId }: { postId: string }) => {
  const {
    data: postData,
    error: postError,
    isLoading: postIsLoading,
  } = useQuery({
    queryKey: [postKey, { postId }],
    queryFn: () => graphQLClient.request(PostByPostIdDocument, { postID: postId }),
    enabled: !!postId,
  });

  useEffect(() => {
    if (postError) {
      notFound();
    }
  }, [postError]);

  if (postIsLoading) {
    return <div>Loading...</div>;
  }

  if (!postData) {
    return <div>User not found</div>;
  }

  const postUsername = postData?.postByPostId.user_id;

  return (
    <div className="flex flex-col space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
      <p className="font-semibold text-sm text-neutral-500 dark:text-neutral-400">
        More posts from{" "}
        <Link href="/" className="dark:text-white text-black hover:opacity-50">
          {postUsername}
        </Link>{" "}
      </p>

      <PostsGrid />
    </div>
  );
};

export default MorePosts;
