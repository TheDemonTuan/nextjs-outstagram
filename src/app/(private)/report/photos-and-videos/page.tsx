"use client";
import { redirectHard } from "@/actions";
import { PostResponse, PostType, RestorePostsParams, postGetAllFromMe, postKey, postMeDeleteList } from "@/api/post";
import { ReportStatus, ReportType, ReportWithTypeResponse, getAllReport, updateStatusReport } from "@/api/report";
import { ReportReasonDescriptions } from "@/components/Report/reason";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { MultiFileIcon, PlayReelIcon, PostsPhotosAndVideosIcon, ReelsPhotosAndVideosIcon } from "@/icons";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Checkbox, Spinner } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const ReportPhotoAndVideoPage = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const {
    data: reportsContentData,
    error: reportsContentError,
    isLoading: reportsContentIsLoading,
  } = useQuery({
    queryKey: [postKey, "reports"],
    queryFn: async () => await getAllReport(),
  });

  const posts = reportsContentData?.data.filter((report) => report?.type === ReportType.Post) || [];
  const reels = reportsContentData?.data.filter((report) => report?.type === ReportType.Reel) || [];

  const tabs = [
    { name: "posts", icon: <PostsPhotosAndVideosIcon />, label: "POSTS" },
    { name: "reels", icon: <ReelsPhotosAndVideosIcon />, label: "REELS" },
  ];

  if (reportsContentError) return <div>Error loading data</div>;

  return (
    <div className="flex flex-col mx-6">
      <div className="w-full flex items-center justify-evenly text-sm border-b mt-1">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`flex items-center space-x-2 cursor-pointer py-4 ${
              activeTab === tab.name ? "text-black border-b-1 border-black" : "text-[#737373]"
            }`}
            onClick={() => setActiveTab(tab.name)}>
            {tab.icon}
            <span>
              {tab.label} {tab.name === "reels" && reels.length > 0 && `(${reels.length})`}
              {tab.name === "posts" && posts.length > 0 && `(${posts.length})`}
            </span>
          </div>
        ))}
      </div>
      {reportsContentIsLoading ? (
        <div className="flex items-center justify-center h-[450px]">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="pt-4 overflow-y-auto max-h-[506px]">
          {activeTab === "posts" && posts && <PostsComponent data={posts} />}
          {activeTab === "reels" && reels && <ReelsComponent data={reels} />}
        </div>
      )}
    </div>
  );
};

export default ReportPhotoAndVideoPage;

const PostsComponent = ({ data }: { data: ReportWithTypeResponse[] }) => {
  const { mutate: updateStatusReportMutate } = useMutation<ApiSuccessResponse<boolean>, ApiErrorResponse, string>({
    mutationFn: async (params) => await updateStatusReport(params),
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.response?.data?.message || "update status report failed!");
    },
  });

  const handleClick = (report: ReportWithTypeResponse) => {
    if (report.status === ReportStatus.Pending) {
      updateStatusReportMutate(report?.id);
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-8 space-y-4">
        <Image src="/02ffe4dfdf20.png" width={500} height={500} alt="" className="w-24 h-24" />
        <span className="font-bold text-2xl">There haven&apos;t been any reports about the post yet.</span>
        <span className="text-sm text-[#8e8e8e]">When a report on a post is generated, it will appear here.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {data.map((report) => {
        const postFiles = report.post?.post_files || [];
        const firstFile = postFiles[0];
        return (
          <div key={report.id} className="flex flex-col my-2 mx-5 border-b">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Link href={`/${report.reporting_user?.username}`}>
                  <Avatar className="w-11 h-11">
                    <AvatarImage className="object-cover" src={getUserAvatarURL(report.reporting_user?.avatar)} />
                    <AvatarFallback>
                      <Spinner size="sm" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">
                  <span className="text-sm line-clamp-[1]">
                    <span className="font-bold">{report.reporting_user?.username}</span>{" "}
                    <span className="text-danger-500 font-medium">{ReportReasonDescriptions[report.reason]}</span>
                  </span>
                  <span className="text-xs text-[#737373]">
                    {" "}
                    Reported{" "}
                    {formatDistanceToNow(report.created_at || "", {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>

              <Link href={`/p/${report.post?.id}`} onClick={() => handleClick(report)}>
                <Image alt="" width={500} height={500} src={firstFile.url} className="w-12 h-12 object-cover" />
              </Link>
            </div>

            <div key={report?.post?.id} className="flex items-center justify-between my-2.5 py-2.5 ml-10">
              <div className="flex space-x-2">
                <Link href={`/${report.user?.username}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarImage className="object-cover" src={getUserAvatarURL(report.user?.avatar)} />
                    <AvatarFallback>
                      <Spinner size="sm" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">
                  <span className="text-sm line-clamp-[1]">
                    <span className="font-bold">{report.user?.username}</span> {report?.post?.caption}
                  </span>
                  <span className="text-xs text-[#737373]">
                    {formatDistanceToNow(report?.post?.created_at || "", {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Link
                  href={`/r/${report?.post?.id}`}
                  className="text-blue-400 text-xs font-bold"
                  onClick={() => handleClick(report)}>
                  Go to post
                </Link>
                <div className={`text-xs text-[#737373]`}>
                  {report.status === ReportStatus.Pending
                    ? "Pending"
                    : `Viewed at ${formatDistanceToNow(new Date(report.created_at), {
                        addSuffix: true,
                      })}`}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ReelsComponent = ({ data }: { data: ReportWithTypeResponse[] }) => {
  const { mutate: updateStatusReportMutate } = useMutation<ApiSuccessResponse<boolean>, ApiErrorResponse, string>({
    mutationFn: async (params) => await updateStatusReport(params),
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.response?.data?.message || "update status report failed!");
    },
  });

  const handleClick = (report: ReportWithTypeResponse) => {
    if (report.status === ReportStatus.Pending) {
      updateStatusReportMutate(report?.id);
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-8 space-y-4">
        <Image src="/02ffe4dfdf20.png" width={500} height={500} alt="" className="w-24 h-24" />
        <span className="font-bold text-2xl">There haven&apos;t been any reports about the reel yet.</span>
        <span className="text-sm text-[#8e8e8e]">When a report on a reel is generated, it will appear here.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {data.map((report) => {
        const postFiles = report.post?.post_files || [];
        const firstFile = postFiles[0];
        return (
          <div key={report.id} className="flex flex-col my-2 mx-5 border-b">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Link href={`/${report.reporting_user?.username}`}>
                  <Avatar className="w-11 h-11">
                    <AvatarImage className="object-cover" src={getUserAvatarURL(report.reporting_user?.avatar)} />
                    <AvatarFallback>
                      <Spinner size="sm" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">
                  <span className="text-sm line-clamp-[1]">
                    <span className="font-bold">{report.reporting_user?.username}</span>{" "}
                    <span className="text-danger-500 font-medium">{ReportReasonDescriptions[report.reason]}</span>
                  </span>
                  <span className="text-xs text-[#737373]">
                    {" "}
                    Reported{" "}
                    {formatDistanceToNow(report.created_at || "", {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>

              <Link href={`/r/${report.post?.id}`} onClick={() => handleClick(report)}>
                <video src={firstFile.url} controls={false} className="w-12 h-12 object-cover" />
              </Link>
            </div>

            <div key={report?.post?.id} className="flex items-center justify-between my-2.5 py-2.5 ml-10">
              <div className="flex space-x-2">
                <Link href={`/${report.user?.username}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarImage className="object-cover" src={getUserAvatarURL(report.user?.avatar)} />
                    <AvatarFallback>
                      <Spinner size="sm" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">
                  <span className="text-sm line-clamp-[1]">
                    <span className="font-bold">{report.user?.username}</span> {report?.post?.caption}
                  </span>
                  <span className="text-xs text-[#737373]">
                    {formatDistanceToNow(report?.post?.created_at || "", {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Link
                  href={`/r/${report?.post?.id}`}
                  className="text-blue-400 text-xs font-bold"
                  onClick={() => handleClick(report)}>
                  Go to post
                </Link>
                <div className={`text-xs text-[#737373]`}>
                  {report.status === ReportStatus.Pending
                    ? "Pending"
                    : `Viewed at ${formatDistanceToNow(new Date(report.created_at), {
                        addSuffix: true,
                      })}`}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
