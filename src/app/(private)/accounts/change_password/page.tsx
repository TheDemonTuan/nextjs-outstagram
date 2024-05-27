"use client";
import ChangePasswordForm from "@/components/Settings/change-password-form";
import React from "react";

const ChangePassword = () => {
  return (
    <div className="flex flex-col px-40">
      <h1 className="text-2xl font-medium">Change password</h1>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePassword;
