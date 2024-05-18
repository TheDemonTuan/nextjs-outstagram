"use client";

import { PostResponse, postGetAllFromMe } from "@/api/post";
import Post from "@/components/Post";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const HomePage = () => {
  const { data: postsData, isFetching: postsIsFetching } = useQuery<
    ApiSuccessResponse<PostResponse[]>,
    ApiErrorResponse,
    PostResponse[]
  >({
    queryKey: ["posts", "me"],
    queryFn: async () => postGetAllFromMe(),
    select: (data) => data.data,
  });

  if (postsIsFetching || !postsData) return <div>Loading...</div>;

  return (
    <div className="flex-auto grid grid-flow-col justify-evenly p-8">
      <Post postData={postsData} />
      <div className="flex flex-col p-5 space-y-6 w-80">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* <Avatar>
              <AvatarImage alt="may_lily profile" src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
            <span className="font-bold text-gray-900">may_lily</span>
          </div>
          <Button className="text-gray-900" variant="ghost">
            ...
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Link className="text-gray-900" href="#">
              thedemontuan
            </Link>
            <span className="text-sm text-gray-500">Chuyên</span>
          </div>
          {/* <Avatar>
            <AvatarImage alt="thedemontuan profile" src="/placeholder.svg?height=30&width=30" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
        </div>
        <div className="space-y-4">
          <h2 className="text-gray-900">Gợi ý cho bạn</h2>
          <Link className="block text-sm text-right text-gray-900" href="#">
            Xem tất cả
          </Link>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {/* <Avatar>
                <AvatarImage alt="quockhar profile" src="/placeholder.svg?height=30&width=30" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar> */}
              <Link className="text-gray-900" href="#">
                quockhar
              </Link>
            </div>
            <Button className="text-gray-900" variant="bordered">
              Theo dõi
            </Button>
          </div>
        </div>
        <div className="mt-auto text-xs text-gray-500">
          <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · Top Accounts · Hashtags · Language</p>
          <p>© 2024 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;