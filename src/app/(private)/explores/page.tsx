"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { ClipIcon, LikeHeartIcon, MessageCircleIcon, MultiFileIcon } from "@/icons";
import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PostType, postKey } from "@/api/post";
import { graphQLClient } from "@/lib/graphql";
import { Post, PostExploresDocument } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExploresSkeleton } from "@/components/skeletons";
import { Spinner } from "@nextui-org/react";

const ExplorePage = () => {
  const { ref, inView } = useInView();
  const { authData } = useAuth();
  const currentPage = useRef(1);
  const router = useRouter();
  const [hoveredVideo, setHoveredVideo] = useState("");

  const {
    status,
    data: postsData,
    error: postsError,
    isLoading: postsIsLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: [postKey, "explores-page"],
    queryFn: async ({ pageParam }) => graphQLClient.request(PostExploresDocument, { page: pageParam }),
    initialPageParam: currentPage.current,
    getNextPageParam: (lastPage) => {
      if (lastPage.postExplores.length === 0) {
        return undefined;
      }
      return ++currentPage.current;
    },
    getPreviousPageParam: (firstPage) => {
      return --currentPage.current;
    },
  });

  useEffect(() => {
    if (!postsIsLoading && !isFetchingNextPage && hasNextPage && inView) {
      fetchNextPage();
    }

    return () => {};
  }, [fetchNextPage, hasNextPage, inView, isFetching, isFetchingNextPage, postsIsLoading]);

  useEffect(() => {
    if (postsData && postsData.pages && postsData.pages.length > 0) {
      postsData.pages.forEach((page) => {
        page.postExplores.forEach((post) => {
          const video = document.getElementById(`video-${post.id}`) as HTMLVideoElement | null;
          const postMainElement = document.getElementById(`PostMain-${post.id}`);

          if (video && postMainElement) {
            const observer = new IntersectionObserver(
              (entries) => {
                entries[0].isIntersecting ? video.play() : video.pause();
              },
              { threshold: [0.6] }
            );

            observer.observe(postMainElement);
          }
        });
      });
    }
  }, [postsData]);

  if (postsIsLoading) {
    return <ExploresSkeleton />;
  }

  const calculateIndex = (index: number) => {
    const lastDigit = index % 10;
    return lastDigit === 2 || lastDigit === 5;
  };

  const handleMouseEnter = (postId: string) => {
    setHoveredVideo(postId.toString());
  };

  const handleMouseLeave = () => {
    setHoveredVideo("");
  };

  const sortPosts = (posts: Post[]) => {
    const sortedPosts = [];
    let reelIndex = 0;
    let otherIndex = 0;

    // Separate reel posts and other posts
    const reelPosts = posts.filter((post) => post.type === PostType.REEL);
    const otherPosts = posts.filter((post) => post.type !== PostType.REEL);

    for (let i = 0; i < posts.length; i++) {
      if (calculateIndex(i) && reelIndex < reelPosts.length) {
        sortedPosts.push(reelPosts[reelIndex++]);
      } else if (otherIndex < otherPosts.length) {
        sortedPosts.push(otherPosts[otherIndex++]);
      } else {
        sortedPosts.push(reelPosts[reelIndex++] || otherPosts[otherIndex++]);
      }
    }

    return sortedPosts;
  };

  return (
    <div className="max-w-5xl mx-5 p-8 xl:mx-auto">
      <div className="grid grid-cols-3 grid-rows-2 gap-1">
        {postsData?.pages.map((page, pageIndex) => {
          const sortedPosts = sortPosts(page?.postExplores as Post[]);
          return (
            <Fragment key={pageIndex}>
              {sortedPosts.map((post, index) => (
                <Link
                  href={`/r/${post.id}`}
                  key={post.id}
                  id={`PostMain-${post.id}`}
                  className={
                    calculateIndex(index) == false
                      ? "col-span-1 row-span-1 relative cursor-pointer w-full h-[20rem] group"
                      : "col-span-1 row-span-2 relative w-full h-[calc(40rem+2px)] group cursor-pointer"
                  }
                  onMouseEnter={() => handleMouseEnter(post.id)}
                  onMouseLeave={handleMouseLeave}>
                  {post.type === PostType.DEFAULT ? (
                    <Image
                      src={(post.post_files && post?.post_files[0]?.url) || ""}
                      className="w-full h-full object-cover"
                      width={500}
                      height={640}
                      alt={"image" + post.id}
                    />
                  ) : (
                    <video
                      id={`video-${post.id}`}
                      src={(post.post_files && post?.post_files[0]?.url) || ""}
                      className="w-full h-full object-cover"
                      autoPlay={hoveredVideo === post.id}
                      loop
                      muted
                      width={500}
                      height={640}
                    />
                  )}
                  {post.post_files && post?.post_files?.length > 1 && (
                    <div className="absolute top-2 right-2 bg-transparent bg-opacity-75 p-1 rounded-full">
                      <MultiFileIcon className="w-6 h-6" />
                    </div>
                  )}
                  {post.post_files && post?.type === PostType.REEL && (
                    <div className="absolute top-2 right-2 bg-transparent bg-opacity-75 p-1 rounded-full">
                      <ClipIcon className="w-8 h-8" />
                    </div>
                  )}
                  <div className="space-x-5 absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <div className="flex items-center font-bold space-x-2 mx-2">
                      <LikeHeartIcon className="text-white fill-white" />
                      <p className="text-white">{post.post_likes?.length}</p>
                    </div>
                    <div className="flex items-center font-bold space-x-2 mx-2">
                      <MessageCircleIcon className="text-white fill-white" />
                      <p className="text-white">{post.post_comments?.length}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </Fragment>
          );
        })}
      </div>
      {isFetchingNextPage ? (
        <div className="flex flex-col items-center gap-2">
          <Spinner size="md" />
        </div>
      ) : hasNextPage ? (
        <div className="flex flex-col items-center gap-2">
          <div ref={ref} />
          <Spinner size="md" />
        </div>
      ) : (
        authData && <ExploresSkeleton />
      )}
    </div>
  );
};

export default ExplorePage;
