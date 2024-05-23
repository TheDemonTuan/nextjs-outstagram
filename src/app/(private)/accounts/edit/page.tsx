"use client";
import { UserResponse, userGetMe, userKey } from "@/api/user";
import ProfileForm from "@/components/Profile/profile-form";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { get } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";

const EditProfile = () => {
  const { data: getProfile, isFetching: getIsFetching } = useQuery<
    ApiSuccessResponse<UserResponse>,
    ApiErrorResponse,
    UserResponse
  >({
    queryKey: [userKey, "me"],
    queryFn: async () => userGetMe(),
    select: (data) => data.data,
  });

  console.log(getProfile);

  return (
    <div className="px-12">
      <div className="flex items-center space-x-2">
        <FaArrowLeftLong className="text-xl" />
        <h1 className="text-2xl font-medium">Edit profile</h1>
      </div>
      {getIsFetching || !getProfile ? (
        <Spinner label="Loading" color="primary" labelColor="primary" />
      ) : (
        <ProfileForm profile={getProfile} />
      )}
      {}
    </div>
  );
};

export default EditProfile;
