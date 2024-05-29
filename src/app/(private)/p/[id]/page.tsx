"use client";
import MorePosts from "@/components/PostDetail/more-posts";
import SinglePost from "@/components/PostDetail/single-post";
import { SinglePostSkeleton } from "@/components/skeletons";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

const PostPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div>
      <Suspense fallback={<SinglePostSkeleton />}>
        <SinglePost id={id} />
      </Suspense>
      <Separator className="my-12 max-w-3xl lg:max-w-4xl mx-auto" />
      <Suspense>
        <MorePosts />
      </Suspense>
    </div>
  );
};

export default PostPage;
