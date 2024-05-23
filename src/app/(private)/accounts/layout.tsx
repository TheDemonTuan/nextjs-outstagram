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
      <Tabs
        defaultValue="edit-profile"
        className="sticky h-dvh top-0 flex flex-col lg:border-r px-6 py-12"
        orientation="vertical">
        <h4 className="font-bold text-xl text-black ml-1">Settings</h4>
        <TabsList className="flex flex-col items-start justify-start h-full bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                button({ variant: "ghost", size: "lg" }),
                "hover:bg-[#F2F2F2] data-[state=active]:bg-[#E3E3E3] dark:data-[state=active]:bg-[#E3E3E3] dark:hover:bg-[#F2F2F2] w-full justify-start !px-3"
              )}>
              <tab.icon className="mr-2 w-7 h-6" />
              <span className="font-normal">{tab.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className=" w-full bg-white dark:bg-neutral-950 mt-12">
        {children}
      </div>
    </div>
  );
}
