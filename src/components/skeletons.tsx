import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "./ui/card";
import { Divider, Modal, ModalContent } from "@nextui-org/react";
import { AiOutlineClose } from "react-icons/ai";
import { TfiMoreAlt } from "react-icons/tfi";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export function ViewPostSkeleton() {
  return (
    <Modal isOpen={true} hideCloseButton={true}>
      <ModalContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-full max-h-[300px] lg:max-h-[500px] xl:max-h-[700px] rounded-r-md rounded-l-none">
        <Skeleton className="relative overflow-hidden h-full max-h-[300px] lg:max-h-[500px] xl:max-h-[700px] max-w-2xl w-full rounded-none" />

        <div className="flex flex-col h-full py-4 pl-3.5 pr-6 flex-1 border-b-1">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-11 w-11 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </div>
          <div className="flex-1 my-4" />

          <div className="flex items-center w-full space-x-4 border-t-1">
            <div className="space-y-2 w-full my-2">
              <Skeleton className="h-3 w-[100px] flex-1" />
              <Skeleton className="h-3 w-[200px]" />
              <Skeleton className="h-3 w-[50px]" />
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}

function UserAvatarSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function SinglePostSkeleton() {
  return (
    <Card className="max-w-3xl lg:max-w-4xl hidden md:flex mx-auto mt-9 rounded-none shadow-none">
      <div className="relative overflow-hidden h-[600px] max-w-sm lg:max-w-lg w-full">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex max-w-sm flex-col flex-1">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </div>

        <div className="px-5 space-y-3 mt-8">
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
        </div>
      </div>
    </Card>
  );
}

export function MorePostSkeleton() {
  return (
    <div className="flex flex-col space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
      <Skeleton className="h-4 w-[200px]" />

      <div className="grid grid-cols-3 gap-1">
        <Skeleton className="h-44 md:h-64 lg:h-80 group col-span-1" />
        <Skeleton className="h-44 md:h-64 lg:h-80 group col-span-1" />
        <Skeleton className="h-44 md:h-64 lg:h-80 group col-span-1" />
        <Skeleton className="h-44 md:h-64 lg:h-80 group col-span-1" />
        <Skeleton className="h-44 md:h-64 lg:h-80 group col-span-1" />
        <Skeleton className="h-44 md:h-64 lg:h-80 group col-span-1" />
      </div>
    </div>
  );
}

export function PostsHomeSkeleton() {
  return (
    <div className="flex flex-col space-y-3 gap-3 mt-6">
      <div className="flex flex-row items-center space-y-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 mx-2 items-center">
          <Skeleton className="h-3 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
      <Skeleton className="h-[400px] w-[500px] rounded-md" />
    </div>
  );
}

export function SuggestionsSkeleton() {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="w-11 h-11 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col mt-9 mx-28 mb-40 max-w-screen-xl">
      <div className="flex flex-row mx-28">
        <div className="mt-2 mx-16">
          <div className="rounded-full w-40 h-40">
            <Skeleton className="w-40 h-40 rounded-full" />
          </div>
        </div>
        <div className="flex flex-col mx-6">
          <div className="flex flex-row ">
            <Skeleton className="h-10 w-72" />
          </div>
          <div className="mt-8 flex flex-row">
            <Skeleton className="h-5 w-64" />
          </div>
          <div className="flex flex-col">
            <div className="pt-6">
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="pt-3">
              <Skeleton className="h-5 w-56" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-10 mx-28">
        <div className="max-w-3xl justify-center">
          <div className="flex space-x-8  w-full border-gray-200 mx-20">
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 bg-gray-200 p-[1.5px] rounded-full">
                <div className="bg-white rounded-full p-1 h-full w-full overflow-hidden">
                  <Skeleton className="rounded-full h-full" />
                </div>
              </div>
              <Skeleton className="mt-2 w-20 h-2" />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 bg-gray-200 p-[1.5px] rounded-full">
                <div className="bg-white rounded-full p-1 h-full w-full overflow-hidden">
                  <Skeleton className="rounded-full h-full" />
                </div>
              </div>
              <Skeleton className="mt-2 w-20 h-2" />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 bg-gray-200 p-[1.5px] rounded-full">
                <div className="bg-white rounded-full p-1 h-full w-full overflow-hidden">
                  <Skeleton className="rounded-full h-full" />
                </div>
              </div>
              <Skeleton className="mt-2 w-20 h-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <hr className="border-gray-300 mt-14 border-t mx-28" />
      </div>
      <div className="flex justify-center mx-28 gap-10 mb-1 max-w-screen-xl">
        <button className="py-4 mx-2 text-sm font-normal flex gap-2">
          <Skeleton className="w-[72px] h-[22px] rounded-md " />
        </button>
        <button className="py-4 mx-2 text-sm font-normal flex gap-2">
          <Skeleton className="w-[72px] h-[22px] rounded-md " />
        </button>
        <button className="py-4 mx-2 text-sm font-normal flex gap-2">
          <Skeleton className="w-[72px] h-[22px] rounded-md " />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-1 mx-28">
        <Skeleton className="w-full h-[310px] rounded-md" />
        <Skeleton className="w-full h-[310px] rounded-md" />
        <Skeleton className="w-full h-[310px] rounded-md" />
      </div>
    </div>
  );
}

export function SearchHeaderSkeleton() {
  return (
    <div className=" w-full p-2 px-6 flex items-center gap-2 rounded-sm">
      <Skeleton className="w-11 h-11 rounded-full" />
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-4 w-[250px] " />
        <Skeleton className="h-4 w-[200px] " />
      </div>
    </div>
  );
}

export function LoadingDotsReels() {
  return (
    <>
      <div className="reels"></div>
      <div className="reels red"></div>
    </>
  );
}

export function LoadingTopBar() {
  return (
    <>
      <div className="h-1 bg-custom-gradient bg-[length:500%] animate-[LoadingBarProgress_2s_linear_infinite,LoadingBarEnter_.5s_ease-out] transform-origin-left w-full"></div>
      <div className="fixed left-0 right-0 top-0 z-12"></div>
    </>
  );
}

export function ReelsSkeleton() {
  return (
    <div className="flex flex-col space-y-3 mb-10">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-9 w-9 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function ExploresSkeleton() {
  return (
    <div className="max-w-5xl mx-5 p-8 xl:mx-auto">
      <div className="grid grid-cols-3 grid-rows-2 gap-1">
        <Skeleton className="col-span-1 row-span-1 w-full h-[20rem] group" />{" "}
        <Skeleton className="col-span-1 row-span-1 w-full h-[20rem] group" />{" "}
        <Skeleton className="col-span-1 row-span-2 w-full h-[40rem] group" />{" "}
        <Skeleton className="col-span-1 row-span-1 w-full h-[20rem] group" />{" "}
        <Skeleton className="col-span-1 row-span-1 w-full h-[20rem] group" />{" "}
      </div>
    </div>
  );
}

export function NotificationsSkeleton() {
  const skeletonItems = Array.from({ length: 20 }).map((_, index) => (
    <div
      key={index}
      className="flex justify-between items-center hover:bg-gray-100 p-2 rounded-md transition-colors duration-200 ease-in-out">
      <div className="flex items-center gap-2 px-2">
        <Skeleton className="h-11 w-11 rounded-full" />
        <Skeleton className="h-4 w-[260px]" />
      </div>
      <Skeleton className="h-12 w-12 rounded-lg" />
    </div>
  ));

  return (
    <div className="max-h-[728px]">
      <div className="flex flex-col gap-2 py-4">
        <span className="font-bold text-2xl px-4">Notifications</span>
        <div className="mx-4">
          <Skeleton className="h-4 w-[100px] rounded-md" />
        </div>
        <div className="flex flex-col gap-2">{skeletonItems}</div>
      </div>
    </div>
  );
}

export function ReelDetailSkeleton() {
  return (
    <>
      <Modal size="full" isOpen={true} defaultOpen={true} hideCloseButton={true} radius="lg">
        <ModalContent>
          <div className="lg:flex justify-between w-full h-screen overflow-auto">
            <Skeleton className="lg:w-[calc(100%-540px)] bg-black h-full relative rounded-none">
              <Skeleton className="absolute text-white z-20 m-5 rounded-full bg-gray-400 bg-opacity-40 p-1.5 ">
                <AiOutlineClose size="27" />
              </Skeleton>

              <Skeleton className="absolute z-20 right-4 top-6  flex items-center justify-center rounded-full bg-gray-400 bg-opacity-40  p-1.5 ">
                <TfiMoreAlt size="30" color="#FFFFFF" className="p-1" />
              </Skeleton>

              <div className="absolute z-20 right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
                <Skeleton className="flex items-center justify-center rounded-full bg-gray-400 bg-opacity-40 p-1.5 ">
                  <BiChevronUp size="30" color="#FFFFFF" />
                </Skeleton>

                <Skeleton className="flex items-center justify-center rounded-full bg-gray-400 bg-opacity-40 p-1.5 ">
                  <BiChevronDown size="30" color="#FFFFFF" />
                </Skeleton>
              </div>
            </Skeleton>

            <div
              className="lg:max-w-[550px] relative w-full h-full bg-white 
              overflow-y-auto scrollbar-hide
              ">
              <div className="pt-5 border-b-1">
                <div className="py-5 mx-6 bg-[#F8F8F8] rounded-xl">
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center">
                      <Skeleton className="h-11 w-11 rounded-full" />

                      <div className="ml-3 pt-0.5 flex flex-col space-y-2">
                        <Skeleton className="h-4 w-[150px] rounded-none" />
                        <Skeleton className="h-3 w-[250px] rounded-none" />
                      </div>
                    </div>
                    <Skeleton className=" px-[21px] py-1 h-9 w-[130px]  rounded-md" />
                  </div>

                  <p className="px-4 mt-4 space-y-2">
                    <Skeleton className="h-3 w-[470px] rounded-none" />
                    <Skeleton className="h-3 w-[470px] rounded-none" />
                  </p>

                  <p className="flex item-center gap-2 px-4 mt-2 text-sm">
                    <Skeleton className="h-2 w-[200px] rounded-none" />
                  </p>
                </div>

                <div className="flex items-center px-8  my-4 space-x-7 justify-stretch">
                  <Skeleton className="rounded-full w-9 h-9" />

                  <Skeleton className="rounded-full w-9 h-9" />

                  <Skeleton className="rounded-full w-9 h-9" />

                  <Skeleton className="rounded-full w-9 h-9" />
                </div>

                <div className="relative flex items-center mt-1 mx-8 border py-1.5 rounded-lg bg-[#F1F1F2]">
                  <Skeleton className="flex items-center px-3  w-[400px] h-6 border-none outline-0 bg-[#F1F1F2] cursor-text" />
                </div>
                <div className="pb-4 mt-5">
                  <Skeleton className="z-10 top-0 sticky h-4  w-[150px] rounded-none mx-8 " />
                </div>
              </div>

              <div className="relative z-0 w-full h-[calc(100%-273px)] overflow-y-auto scrollbar-hide cursor-pointer">
                <div className="mx-6 mt-5">
                  {" "}
                  <div className="group p-3 px-3.5 flex items-start justify-between space-x-2.5 w-full">
                    <div className="flex items-start">
                      <Skeleton className="w-8 h-8 rounded-full" />

                      <div className="space-y-1 mx-3">
                        <div className="flex items-center space-x-1 text-[13px] leading-[18px]">
                          <Skeleton className="h-3 w-[400px] rounded-none" />
                        </div>
                        <div className="flex h-5 items-center space-x-2.5">
                          <Skeleton className="h-3 w-[200px] rounded-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group p-3 px-3.5 flex items-start justify-between space-x-2.5 w-full">
                    <div className="flex items-start">
                      <Skeleton className="w-8 h-8 rounded-full" />

                      <div className="space-y-1 mx-3">
                        <div className="flex items-center space-x-1 text-[13px] leading-[18px]">
                          <Skeleton className="h-3 w-[400px] rounded-none" />
                        </div>
                        <div className="flex h-5 items-center space-x-2.5">
                          <Skeleton className="h-3 w-[200px] rounded-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group p-3 px-3.5 flex items-start justify-between space-x-2.5 w-full">
                    <div className="flex items-start">
                      <Skeleton className="w-8 h-8 rounded-full" />

                      <div className="space-y-1 mx-3">
                        <div className="flex items-center space-x-1 text-[13px] leading-[18px]">
                          <Skeleton className="h-3 w-[400px] rounded-none" />
                        </div>
                        <div className="flex h-5 items-center space-x-2.5">
                          <Skeleton className="h-3 w-[200px] rounded-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group p-3 px-3.5 flex items-start justify-between space-x-2.5 w-full">
                    <div className="flex items-start">
                      <Skeleton className="w-8 h-8 rounded-full" />

                      <div className="space-y-1 mx-3">
                        <div className="flex items-center space-x-1 text-[13px] leading-[18px]">
                          <Skeleton className="h-3 w-[400px] rounded-none" />
                        </div>
                        <div className="flex h-5 items-center space-x-2.5">
                          <Skeleton className="h-3 w-[200px] rounded-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group p-3 px-3.5 flex items-start justify-between space-x-2.5 w-full">
                    <div className="flex items-start">
                      <Skeleton className="w-8 h-8 rounded-full" />

                      <div className="space-y-1 mx-3">
                        <div className="flex items-center space-x-1 text-[13px] leading-[18px]">
                          <Skeleton className="h-3 w-[400px] rounded-none" />
                        </div>
                        <div className="flex h-5 items-center space-x-2.5">
                          <Skeleton className="h-3 w-[200px] rounded-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center bottom-0 h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-1 sticky z-50 mt-auto">
                <Skeleton
                  className=" relative flex items-center rounded-lg h-10 w-full lg:max-w-[550px]  mt-auto 
                    "
                />
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
