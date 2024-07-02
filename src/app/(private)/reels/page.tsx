"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Spinner } from "@nextui-org/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import ReelsAction from "@/components/Reels/reels-actions";
import { useInView } from "react-intersection-observer";
import { MoreOptionReelsIcon } from "@/icons";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { ImMusic } from "react-icons/im";
import { LoadingDotsReels, ReelsSkeleton } from "@/components/skeletons";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PostType, postKey } from "@/api/post";
import { graphQLClient } from "@/lib/graphql";
import { Post, PostFile, PostReelDocument } from "@/gql/graphql";
import { useModalStore } from "@/stores/modal-store";
import PostMoreOptions, { PostMoreOptionsModalKey } from "@/components/Post/post-more-options";
import { useRouter } from "next/navigation";

const ReelsPage = () => {
  const [hoveredVideo, setHoveredVideo] = useState("");
  const currentPage = useRef(1);
  const { ref, inView } = useInView();
  const { modalOpen, setModalData } = useModalStore();
  const router = useRouter();

  const {
    status,
    data: reelsData,
    error: reelsError,
    isLoading: reelsIsLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: [postKey, "reel-page"],
    queryFn: async ({ pageParam }) => graphQLClient.request(PostReelDocument, { page: pageParam }),
    initialPageParam: currentPage.current,
    getNextPageParam: (lastPage) => {
      if (lastPage.postReel.length === 0) {
        return undefined;
      }
      return ++currentPage.current;
    },
    getPreviousPageParam: (firstPage) => {
      return --currentPage.current;
    },
  });

  useEffect(() => {
    if (!reelsIsLoading && !isFetchingNextPage && hasNextPage && inView) {
      fetchNextPage();
    }

    return () => {};
  }, [fetchNextPage, hasNextPage, inView, isFetching, isFetchingNextPage, reelsIsLoading]);

  useEffect(() => {
    if (reelsData && reelsData.pages && reelsData.pages.length > 0) {
      reelsData.pages.forEach((page) => {
        page.postReel.forEach((post) => {
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
  }, [reelsData]);

  if (reelsIsLoading) {
    return (
      <div className="flex flex-col items-center justify-end gap-2 min-h-screen">
        <ReelsSkeleton />
      </div>
    );
  }

  const handleMouseEnter = (postId: string) => {
    setHoveredVideo(postId.toString());
  };

  const handleMouseLeave = () => {
    setHoveredVideo("");
  };

  const handleVideoClick = (reelId: string) => {
    router.push(`/r/${reelId}`);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-screen-2xl mx-auto">
        {reelsData?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.postReel.map((reel) => {
              return (
                <div key={reel.id} id={`PostMain-${reel.id}`} className="py-10 relative">
                  <div className="pl-3 w-full px-4">
                    <div className="flex">
                      <div
                        className="relative h-[633px] max-w-[355px] flex items-center rounded-xl bg-black border-white cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(reel.id)}
                        onMouseLeave={handleMouseLeave}>
                        <video
                          id={`video-${reel.id}`}
                          autoPlay
                          controls={hoveredVideo === reel.id}
                          loop
                          muted
                          className="object-cover rounded-xl mx-auto h-full"
                          src={reel.post_files?.[0]?.url ?? ""}
                          onClick={() => handleVideoClick(reel.id)}
                        />

                        {hoveredVideo === reel.id && (
                          <div
                            className="absolute top-3 right-3 z-10"
                            onClick={() => {
                              setModalData(reel);
                              modalOpen(PostMoreOptionsModalKey);
                            }}>
                            <MoreOptionReelsIcon fill="#ffff" />
                          </div>
                        )}
                        <div
                          className={`absolute left-3 text-white ${
                            hoveredVideo === reel.id ? "bottom-16" : "bottom-2 "
                          }`}>
                          <div className="font-medium hover:underline cursor-pointer pb-2">{reel.user?.username}</div>
                          <p className="text-[15px] pb-1 break-words md:max-w-[400px] max-w-[300px]">{reel.caption}</p>
                          <p className="text-[14px] pb-1 flex items-center text-white">
                            <ImMusic size="17" />
                            <span className="px-1">original sound - AWESOME</span>
                            <AiFillHeart size="20" />
                          </p>
                        </div>
                      </div>
                      <ReelsAction reelAction={reel as Post} />
                    </div>
                  </div>
                </div>
              );
            })}
          </Fragment>
        ))}
        <div ref={ref}></div>
        {isFetchingNextPage && (
          <div className="flex justify-center items-center h-full mr-20 mb-5">
            <LoadingDotsReels />
          </div>
        )}
        {hasNextPage && (
          <div className="flex justify-center items-center h-full mr-20 mb-5">
            <LoadingDotsReels />
          </div>
        )}
      </div>
      {reelsData && <PostMoreOptions />}
    </>
  );
};

export default ReelsPage;
