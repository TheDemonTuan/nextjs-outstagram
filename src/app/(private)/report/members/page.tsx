"use client";
import { postKey } from "@/api/post";
import { ReportStatus, ReportType, ReportWithTypeResponse, getAllReport, updateStatusReport } from "@/api/report";
import { ReportReasonDescriptions } from "@/components/Report/reason";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { ClipIcon, ClipInteractionsIcon, CommentInteractionsIcon, MultiFileIcon, TymInteractionsIcon } from "@/icons";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Checkbox, Spinner } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import { TbUserHexagon } from "react-icons/tb";
import { toast } from "sonner";

const ReportMembersPage = () => {
  const [activeTab, setActiveTab] = useState("members");

  const {
    data: reportsMemberData,
    error: reportsMemberError,
    isLoading: reportsMemberIsLoading,
  } = useQuery({
    queryKey: [postKey, "reports"],
    queryFn: async () => await getAllReport(),
  });

  const filteredReports = reportsMemberData?.data.filter((report) => report?.type === ReportType.User) || [];

  const tabs = [{ name: "members", icon: <TbUserHexagon size={18} />, label: "MEMBERS" }];

  return (
    <div className="flex flex-col mx-6">
      <div className="w-full flex items-center justify-evenly text-sm border-b mt-1">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`flex items-center space-x-2 cursor-pointer py-4 ${
              activeTab === tab.name ? "text-black border-b-1 border-black" : "text-[#737373]"
            }`}>
            {tab.icon}
            <span>
              {tab.label} ({filteredReports.length > 0 && filteredReports.length})
            </span>
          </div>
        ))}
      </div>

      {reportsMemberIsLoading ? (
        <div className="flex items-center justify-center h-[450px]">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="pt-4 overflow-y-auto max-h-[506px]">
          {activeTab === "members" && filteredReports && <MembersComponent data={filteredReports} />}
        </div>
      )}
    </div>
  );
};

const MembersComponent = ({ data }: { data: ReportWithTypeResponse[] }) => {
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
        <span className="font-bold text-2xl">No reports related to members</span>
        <span className="text-sm text-[#8e8e8e]">When a member is reported, it will appear here.</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {data.map((report) => {
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
              <div className="flex flex-col items-end space-y-2">
                <Link
                  href={`/${report.user?.username}`}
                  className="text-blue-400 text-xs font-bold"
                  onClick={() => handleClick(report)}>
                  Go to profile
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

            <div key={report?.user?.id} className="flex items-center justify-between my-2.5 py-2.5 ml-10">
              <div className="flex space-x-2">
                <Link href={`/${report.user?.username}`} onClick={() => handleClick(report)}>
                  <Avatar className="w-8 h-8">
                    <AvatarImage className="object-cover" src={getUserAvatarURL(report.user?.avatar)} />
                    <AvatarFallback>
                      <Spinner size="sm" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">
                  <span className="text-sm line-clamp-[1]">
                    <span className="font-bold">
                      {report.user?.username} - <span className="text-[#737373]">{report.user?.full_name}</span>
                    </span>
                  </span>
                  <span className="text-xs text-[#737373]">
                    {formatDistanceToNow(report?.created_at || "", {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportMembersPage;
