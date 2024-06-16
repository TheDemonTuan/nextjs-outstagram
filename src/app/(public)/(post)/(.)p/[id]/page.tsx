"use client";

import { postGetByPostId, postKey } from "@/api/post";
import PostView from "@/components/PostDetail/post-view";
import { PostByPostIdDocument } from "@/gql/graphql";
import { graphQLClient } from "@/lib/graphql";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React, { useEffect } from "react";
type Props = {
  params: {
    id: string;
  };
};

const PostModal = ({ params: { id } }: Props) => {
  const {
    data: postData,
    error: postError,
    isLoading: postIsLoading,
  } = useQuery({
    queryKey: [postKey, { id }],
    queryFn: () => graphQLClient.request(PostByPostIdDocument, { postID: id }),
    enabled: !!id,
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

  const { postByPostId } = postData;

  return <PostView id={id} post={postByPostId} />;
};

export default PostModal;
