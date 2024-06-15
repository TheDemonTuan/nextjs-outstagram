import { postGetByPostId } from "@/api/post";
import PostView from "@/components/PostDetail/post-view";
import { Console } from "console";
import { notFound } from "next/navigation";
import React from "react";
type Props = {
  params: {
    id: string;
  };
};

const PostModal = async ({ params: { id } }: Props) => {
  const post = await postGetByPostId(id);
  if (!post) {
    notFound();
  }

  return <PostView id={id} post={post} />;
};

export default PostModal;
