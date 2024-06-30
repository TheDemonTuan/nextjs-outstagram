import ReelsView from "@/components/Reels/reels-view";
import React from "react";

const ReelsPage = ({ id }: { id: string }) => {
  return (
    <>
      <ReelsView id={id} />
    </>
  );
};

export default ReelsPage;
