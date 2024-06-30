"use client";
import { useModalStore } from "@/stores/modal-store";
import { Card, Modal, ModalContent } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { TfiMoreAlt } from "react-icons/tfi";
import ReelsCommentsHeader from "./reels-comment-header";
import ReelsComments from "./reels-comments";

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

function ReelsView({ id }: { id: string }) {
  const { modalOpen, setModalData, modalKey, modalClose } = useModalStore();
  const router = useRouter();

  const loopThroughPostsUp = () => {
    console.log("loopThroughPostsUp");
  };
  const loopThroughPostsDown = () => {
    console.log("loopThroughPostsDown");
  };

  return (
    <>
      <Modal size="full" isOpen={true} defaultOpen={true} onOpenChange={modalClose} radius="lg">
        <ModalContent>
          <div className="lg:flex justify-between w-full h-screen bg-black overflow-auto">
            <div className="lg:w-[calc(100%-540px)] h-full relative">
              <Link
                href={`/reels`}
                className="absolute text-white z-20 m-5 rounded-full bg-gray-400 bg-opacity-40 p-1.5 hover:bg-gray-800">
                <AiOutlineClose size="27" />
              </Link>

              <button
                onClick={() => loopThroughPostsUp()}
                className="absolute z-20 right-4 top-6  flex items-center justify-center rounded-full bg-gray-400 bg-opacity-40  p-1.5 hover:bg-gray-800">
                <TfiMoreAlt size="30" color="#FFFFFF" className="p-1" />
              </button>

              <div className="absolute z-20 right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
                <button
                  onClick={() => loopThroughPostsUp()}
                  className="flex items-center justify-center rounded-full bg-gray-400 bg-opacity-40 p-1.5 hover:bg-gray-800">
                  <BiChevronUp size="30" color="#FFFFFF" />
                </button>

                <button
                  onClick={() => loopThroughPostsDown()}
                  className="flex items-center justify-center rounded-full bg-gray-400 bg-opacity-40 p-1.5 hover:bg-gray-800">
                  <BiChevronDown size="30" color="#FFFFFF" />
                </button>
              </div>

              <div>
                <video
                  className="fixed object-cover w-full my-auto z-[0] h-screen"
                  src="https://cdn.pixabay.com/video/2020/01/18/31377-386628887_tiny.mp4"
                />

                <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
                  <video
                    autoPlay
                    controls
                    loop
                    muted
                    className="h-screen mx-auto"
                    src="https://cdn.pixabay.com/video/2020/01/18/31377-386628887_tiny.mp4"
                  />
                </div>
              </div>
            </div>

            <div
              id="InfoSection"
              className="lg:max-w-[550px] relative w-full h-full bg-white overflow-y-auto scrollbar-hide">
              <div className="pt-5 border-b-1">
                <ReelsCommentsHeader />
              </div>

              <ReelsComments />
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReelsView;
