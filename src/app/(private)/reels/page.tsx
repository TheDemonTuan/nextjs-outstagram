"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Spinner, Tooltip } from "@nextui-org/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { AudioMutedIcon, AudioPlayingIcon, MoreOptionReelsIcon, PlusReelsIcon, VerifiedIcon } from "@/icons";
import { AiFillHeart } from "react-icons/ai";
import { ImMusic } from "react-icons/im";
import { LoadingDotsReels, ReelsSkeleton } from "@/components/skeletons";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { PostPrivacy, PostType, postKey } from "@/api/post";
import { graphQLClient } from "@/lib/graphql";
import { Friend, Post, PostFile, PostReelDocument } from "@/gql/graphql";
import { useModalStore } from "@/stores/modal-store";
import PostMoreOptions, { PostMoreOptionsModalKey } from "@/components/Post/post-more-options";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SummaryProfile from "@/components/summary-profile";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import ReelReact from "@/components/Reels/reel-react";
import HighlightHashtags from "@/components/highlight-hashtags";
import PostPrivacyView from "@/components/privacy-post-view";
import { SiVerizon } from "react-icons/si";

const ReelsPage = () => {
  const [hoveredVideo, setHoveredVideo] = useState("");
  const currentPage = useRef(1);
  const { ref, inView } = useInView();
  const { modalOpen, setModalData } = useModalStore();
  const { authData } = useAuth();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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
    queryKey: [postKey, "reels"],
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !isMuted;
      }
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-screen-2xl mx-auto">
        {reelsData?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.postReel.map((reel) => {
              const postLikes = reel?.post_likes?.filter((like) => like?.is_liked);
              const isUserLiked = postLikes?.some((like) => like?.user_id === authData?.id);
              const displayedCaption = isExpanded
                ? reel.caption
                : reel.caption && reel.caption.length > 100
                ? `${reel.caption.substring(0, 40)}...`
                : reel.caption;
              return (
                <div key={reel.id} id={`PostMain-${reel.id}`} className="py-10 relative">
                  <div className="pl-3 w-full px-4">
                    <div className="flex">
                      <div
                        className="relative h-[633px] max-w-[355px] flex items-center rounded-xl bg-black border-white cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(reel.id)}
                        onMouseLeave={handleMouseLeave}>
                        <div
                          className="h-[633px] max-w-[355px] cursor-pointer"
                          onClick={() => handleVideoClick(reel.id)}>
                          <video
                            id={`video-${reel.id}`}
                            autoPlay
                            controls={hoveredVideo === reel.id}
                            loop
                            muted={isMuted}
                            className="object-cover rounded-xl mx-auto h-full"
                            src={reel.post_files?.[0]?.url ?? ""}
                          />
                        </div>

                        {hoveredVideo === reel.id && (
                          <>
                            <div
                              className="absolute top-3 right-3 z-10"
                              onClick={() => {
                                setModalData(reel);
                                modalOpen(PostMoreOptionsModalKey);
                              }}>
                              <MoreOptionReelsIcon fill="#ffff" />
                            </div>

                            <div className="absolute top-3 left-3 z-10 bg" onClick={toggleMute}>
                              <div className="rounded-full p-2 bg-slate-50 bg-opacity-20">
                                {isMuted ? <AudioMutedIcon /> : <AudioPlayingIcon />}
                              </div>
                            </div>
                          </>
                        )}
                        <div
                          className={`absolute left-3 right-3 text-white ${
                            hoveredVideo === reel.id ? "bottom-16" : "bottom-2"
                          }`}>
                          <div className="flex items-center -ml-1 ">
                            <PostPrivacyView
                              privacy={reel.privacy || PostPrivacy.PUBLIC}
                              size={16}
                              disabledTooltip={true}
                              color="#FFFFFF"
                            />
                            <span className="pl-1 align-middle text-sm">
                              {reel.privacy === PostPrivacy.PUBLIC
                                ? "Public"
                                : reel.privacy === PostPrivacy.FRIEND
                                ? "Friend"
                                : "Private"}
                            </span>
                          </div>

                          <Link
                            href={`/${reel.user?.username}`}
                            className="font-medium hover:underline cursor-pointer pb-2">
                            {reel.user?.username}

                            {reel?.user?.role && (
                              <VerifiedIcon className="w-4 h-4 mx-1 mb-[1px] items-center inline-block" />
                            )}
                          </Link>

                          <p className="text-[15px] pb-1 break-words md:max-w-[400px] max-w-[300px]">
                            <HighlightHashtags text={displayedCaption || ""} className="text-white" />
                            {reel.caption && reel.caption.length > 100 && (
                              <span className="cursor-pointer ml-4 font-semibold" onClick={toggleExpand}>
                                {isExpanded ? "less" : "more"}
                              </span>
                            )}
                          </p>

                          <p className="text-[14px] pb-1 flex items-center text-white">
                            <ImMusic size="17" />
                            <span className="px-1">original sound - {reel.user?.full_name}</span>
                            <AiFillHeart size="20" />
                          </p>
                        </div>
                      </div>
                      <div className="relative mr-[75px]">
                        <div className="absolute bottom-0 pl-5 text-center text-xs text-gray-800 font-semibold">
                          <Tooltip
                            delay={1000}
                            content={
                              reel && (
                                <SummaryProfile
                                  username={reel.user?.username || ""}
                                  full_name={reel.user?.full_name || ""}
                                  avatar={reel.user?.avatar || ""}
                                  role={reel.user?.role || false}
                                  posts={[]}
                                  friends={reel.user?.friends as Friend[]}
                                />
                              )
                            }
                            placement="bottom-start"
                            className="rounded-md shadow-lg">
                            <div className="relative mb-8">
                              <Link href={`/${reel.user?.username}`}>
                                <Avatar className=" h-[50px] w-[50px] cursor-pointer">
                                  <AvatarImage src={getUserAvatarURL(reel.user?.avatar || "")} alt="user avatar" />
                                  <AvatarFallback>
                                    <Spinner size="sm" />
                                  </AvatarFallback>
                                </Avatar>
                              </Link>
                              <button
                                disabled
                                className="absolute bottom-[-8px] left-4 bg-red-500 rounded-full p-1 hover:bg-red-600 cursor-pointer">
                                <SiVerizon color="#FFFFFF" />
                              </button>
                            </div>
                          </Tooltip>

                          <ReelReact
                            reelReact={reel as Post}
                            isLiked={isUserLiked ?? false}
                            postPage={pageIndex > 0 ? pageIndex : 0}
                            orientation="vertical"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Fragment>
        ))}
        <div ref={ref}></div>
        {isFetchingNextPage ? (
          <div className="flex justify-center items-center h-full mr-20 mb-5">
            <LoadingDotsReels />
          </div>
        ) : hasNextPage ? (
          <div className="flex justify-center items-center h-full mr-20 mb-5">
            <LoadingDotsReels />
          </div>
        ) : (
          authData && (
            <div>
              {" "}
              <div className="flex flex-col py-10 justify-center items-center text-center space-y-4 mr-20 border-t-1 w-[550px]">
                <Image src="/illo-confirm-refresh-light.png" alt="" className="object-cover" width={100} height={100} />
                <div className="space-y-1">
                  <div className="text-xl">You&apos;ve completely caught up</div>
                  <div className="text-sm text-neutral-500">You&apos;ve seen all new reels from the past 3 days.</div>
                </div>
                <Link href="/" className="text-sm font-semibold text-red-500 cursor-pointer">
                  View older reels
                </Link>
              </div>
            </div>
          )
        )}
      </div>
      {reelsData && <PostMoreOptions />}
    </>
  );
};

export default ReelsPage;
