"use client";
import React from "react";
import AccountPrivacy from "@/components/Settings/account-privacy";

const PrivacySetting = () => {
  return (
    <div className="flex flex-col px-48">
      <h1 className="text-2xl font-medium">Account privacy</h1>
      <AccountPrivacy />
    </div>
  );
};

export default PrivacySetting;
