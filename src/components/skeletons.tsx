import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "./ui/card";
import { Divider } from "@nextui-org/react";

export function ViewPostSkeleton() {
  return (
    <Dialog open>
      <DialogContent className="flex gap-0 flex-col md:flex-row items-start p-0 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-full max-h-[300px] lg:max-h-[500px] xl:max-h-[700px]">
        <Skeleton className="relative overflow-hidden h-full max-h-[300px] lg:max-h-[500px] xl:max-h-[700px] max-w-2xl w-full " />

        <div className="flex flex-col h-full py-4 pl-3.5 pr-6 flex-1">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-11 w-11 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-[200px]" />
              <Skeleton className="h-3 w-[150px]" />
            </div>
          </div>
          <div className="flex-1 my-4" />

          <div className="flex items-center w-full space-x-4">
            <div className="space-y-2 w-full">
              <Skeleton className="h-3 w-[100px] flex-1" />
              <Skeleton className="h-3 w-[200px]" />
              <Skeleton className="h-3 w-[50px]" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
    <Card className="max-w-3xl lg:max-w-4xl mx-auto hidden md:flex">
      <div className="relative overflow-hidden h-[450px] max-w-sm lg:max-w-lg  w-full">
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
