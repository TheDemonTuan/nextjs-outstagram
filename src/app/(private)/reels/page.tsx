"use client";
import { useEffect, useState } from "react";
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

interface Reel {
  id: string;
  video_url: string;
  username: string;
  full_name: string;
  caption: string;
}

const reelsByReelID: Reel[] = [
  {
    id: "1",
    video_url: "https://videos.pexels.com/video-files/6423982/6423982-sd_360_640_29fps.mp4",
    username: "user1",
    full_name: "User One",
    caption: "Caption for user1",
  },
  {
    id: "2",
    video_url: "https://cdn.pixabay.com/video/2019/05/22/23881-337972830_tiny.mp4",
    username: "user2",
    full_name: "User Two",
    caption: "Caption for user2",
  },
  {
    id: "3",
    video_url: "https://cdn.pixabay.com/video/2021/04/13/70960-536644237_tiny.mp4",
    username: "user3",
    full_name: "User Three",
    caption: "Caption for user3",
  },
];

const ReelsPage = () => {
  const { ref } = useInView();
  const [hoveredVideo, setHoveredVideo] = useState("");

  useEffect(() => {
    if (reelsByReelID.length > 0) {
      reelsByReelID.forEach((post) => {
        const video = document.getElementById(`video-${post.id}`) as HTMLVideoElement;
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
    }
  }, []);

  const handleMouseEnter = (postId: string) => {
    setHoveredVideo(postId.toString());
  };

  const handleMouseLeave = () => {
    setHoveredVideo("");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-screen-2xl mx-auto">
        {reelsByReelID.map((post) => (
          <div key={post.id} id={`PostMain-${post.id}`} className="py-10 relative">
            <div className="pl-3 w-full px-4">
              <Link href={`/r/${post.id}`} className="flex">
                <div
                  className="relative h-[633px] max-w-[355px] flex items-center rounded-xl  bg-black border-y-1 border-white cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(post.id)}
                  onMouseLeave={handleMouseLeave}>
                  <video
                    id={`video-${post.id}`}
                    autoPlay
                    controls={hoveredVideo === post.id}
                    loop
                    muted
                    className="object-contain rounded-xl mx-auto h-full "
                    src={post.video_url}
                  />
                  {hoveredVideo === post.id && (
                    <>
                      <div className="absolute top-3 right-3">
                        <MoreOptionReelsIcon className="" fill="#ffff" />
                      </div>
                    </>
                  )}
                  <div className={`absolute bottom-2 left-3 text-white ${hoveredVideo === post.id ? "pb-14" : ""}`}>
                    <div className="font-medium  hover:underline cursor-pointer pb-2">{post.username}</div>
                    <p className="text-[15px] pb-1 break-words md:max-w-[400px] max-w-[300px]">{post.caption}</p>
                    <p className="text-[14px] pb-1 flex items-center text-white">
                      <ImMusic size="17" />
                      <span className="px-1">original sound - AWESOME</span>
                      <AiFillHeart size="20" />
                    </p>
                  </div>
                </div>

                <ReelsAction />
              </Link>
            </div>
          </div>
        ))}
        <div ref={ref}></div>
        {/* Example loading */}
        <div className="flex justify-center items-center h-full">
          <LoadingDotsReels />
        </div>
        <div className="flex justify-center items-center h-full">
          <ReelsSkeleton />
        </div>
      </div>
    </>
  );
};

export default ReelsPage;
