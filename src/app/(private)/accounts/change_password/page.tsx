"use client";
import ChangePasswordForm from "@/components/Settings/change-password-form";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@nextui-org/react";
import React from "react";

const ChangePassword = () => {
  const { authData, authIsLoading } = useAuth();
  if (authIsLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col mx-48">
      <div className="text-sm text-gray-500">{authData?.username} · Outstagram</div>
      <h1 className="text-2xl font-medium">Change password</h1>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePassword;
