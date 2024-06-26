"use client";
import { postKey } from "@/api/post";
import { PostsHomeSkeleton } from "@/components/skeletons";
import { PostHomePageDocument } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { ImMusic } from "react-icons/im";
import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { graphQLClient } from "@/lib/graphql";
import ReelsAction from "@/components/Reels/reels-actions";
import { PiDotsThreeBold } from "react-icons/pi";
import { MoreOptionReelsIcon } from "@/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@nextui-org/react";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";

const ReelsPage = () => {
  const { ref, inView } = useInView();
  // const currentPage = useRef(1);

  // const {
  //   status,
  //   data: postsData,
  //   error: postsError,
  //   isLoading: postsIsLoading,
  //   isFetching,
  //   isFetchingNextPage,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useInfiniteQuery({
  //   queryKey: [postKey, "home-page"],
  //   queryFn: async ({ pageParam }) => graphQLClient.request(PostHomePageDocument, { page: pageParam }),
  //   initialPageParam: currentPage.current,
  //   getNextPageParam: (lastPage) => {
  //     if (lastPage.postHomePage.length === 0) {
  //       return undefined;
  //     }
  //     return ++currentPage.current;
  //   },
  // });

  // useEffect(() => {
  //   if (!postsIsLoading && !isFetchingNextPage && hasNextPage && inView) {
  //     fetchNextPage();
  //   }
  // }, [fetchNextPage, hasNextPage, inView, isFetching, isFetchingNextPage, postsIsLoading]);

  // useEffect(() => {
  //   if (postsData) {
  //     postsData.pages.forEach((page) => {
  //       page.postHomePage.forEach((post) => {
  //         const video = document.getElementById(`video-${post.id}`) as HTMLVideoElement;
  //         const postMainElement = document.getElementById(`PostMain-${post.id}`);

  //         if (video && postMainElement) {
  //           const observer = new IntersectionObserver(
  //             (entries) => {
  //               entries[0].isIntersecting ? video.play() : video.pause();
  //             },
  //             { threshold: [0.6] }
  //           );

  //           observer.observe(postMainElement);
  //         }
  //       });
  //     });
  //   }
  // }, [postsData]);

  // const [hoveredVideo, setHoveredVideo] = useState("");

  // const handleMouseEnter = (postId: string) => {
  //   setHoveredVideo(postId);
  // };

  // const handleMouseLeave = () => {
  //   setHoveredVideo("");
  // };

  // if (postsIsLoading) {
  //   return (
  //     <div className="flex flex-col items-center gap-2">
  //       <PostsHomeSkeleton />
  //       <PostsHomeSkeleton />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="mt-[10px] w-[calc(100%-90px)] max-w-[690px] mx-auto">
        <div
          // key={post.id}
          // id={`PostMain-${post.id}`}
          className="flex border-b py-6 relative"
          // onMouseEnter={() => handleMouseEnter(post.id)}
          // onMouseLeave={handleMouseLeave}
        >
          <Avatar className=" h-14 w-14 cursor-pointer">
            <AvatarImage
              src="https://images.pexels.com/photos/1042423/pexels-photo-1042423.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="user avatar"
            />
            <AvatarFallback>
              <Spinner size="sm" />
            </AvatarFallback>
          </Avatar>
          <div className="pl-3 w-full px-4">
            <div className="flex items-center justify-between pb-0.5">
              <Link href="/" className="space-x-2">
                <span className="font-bold hover:underline cursor-pointer">username</span>
                <span>full_name</span>
              </Link>
              <button className="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md">
                Follow
              </button>
            </div>
            <p className="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">caption</p>
            {/* <p className="text-[14px] text-gray-500 pb-0.5">#fun #cool #SuperAwesome</p>
                <p className="text-[14px] pb-0.5 flex items-center font-semibold">
                  <ImMusic size="17" />
                  <span className="px-1">original sound - AWESOME</span>
                  <AiFillHeart size="20" />
                </p> */}
            {/* min-h-[480px] 
                  max-h-[600px]
                  max-w-[350px] */}
            <Link href="/" className="mt-2.5 flex">
              <div className="relative min-h-[480px] max-h-[580px] max-w-[310px] flex items-center bg-black rounded-xl cursor-pointer">
                <video
                  // id={`video-${post.id}`}
                  loop
                  controls
                  muted
                  className="rounded-xl object-cover mx-auto h-full"
                  src="https://videos.pexels.com/video-files/6423982/6423982-sd_360_640_29fps.mp4"
                />
                {/* {hoveredVideo === post.id && (
                      <div className="absolute top-3 right-3">
                        <MoreOptionReelsIcon className="" fill="#ffff" />
                      </div>
                    )} */}
              </div>

              <ReelsAction />
            </Link>
          </div>
        </div>
        <div ref={ref}></div>
      </div>
    </>
  );
};

export default ReelsPage;
