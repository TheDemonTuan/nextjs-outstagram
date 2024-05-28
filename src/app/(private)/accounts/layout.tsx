import HeaderSettings from "@/components/Settings/header-settings";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserIcon } from "@/icons";
import { cn } from "@/lib/utils";
import { button } from "@nextui-org/react";
import React from "react";

const tabs = [
  { title: "Edit profile", value: "edit-profile", icon: UserIcon },
  { title: "Professional account", value: "professional-account", icon: UserIcon },
  { title: "Notifications", value: "notifications", icon: UserIcon },
  { title: "Privacy and security", value: "privacy-and-security", icon: UserIcon },
  { title: "Login activity", value: "login-activity", icon: UserIcon },
  { title: "Emails from Instagram", value: "emails-from-instagram", icon: UserIcon },
];

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <HeaderSettings />
      <div className=" bg-white dark:bg-neutral-950 mt-12">{children}</div>
    </div>
  );
}
