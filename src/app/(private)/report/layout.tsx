"use client";
import HeaderReport from "@/components/Report/header-report";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { notFound } from "next/navigation";
import React from "react";

export default function ReportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { authData } = useAuth();
  if (!authData?.role) {
    notFound();
  }

  return (
    <>
      <Card className="max-w-screen-2xl mx-[170px] mt-[30px] p-0 flex border h-[565px] w-[940px] rounded-none shadow-none">
        <HeaderReport />
        <div className=" bg-white dark:bg-neutral-950 w-3/4">{children}</div>
      </Card>
    </>
  );
}
