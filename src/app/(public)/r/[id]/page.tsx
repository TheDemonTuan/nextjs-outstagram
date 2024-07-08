"use client";

import { ReelDetailSkeleton } from "@/components/skeletons";
import dynamic from "next/dynamic";
import React from "react";

const ReelsView = dynamic(() => import("@/components/Reels/reels-view"), {
  loading: () => <ReelDetailSkeleton />,
});

type Props = {
  params: {
    id: string;
  };
};

const ReelsPage = ({ params: { id } }: Props) => {
  return <ReelsView id={id} />;
};

export default ReelsPage;
