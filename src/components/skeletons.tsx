import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "./ui/card";
import { Divider, Modal, ModalContent } from "@nextui-org/react";

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
