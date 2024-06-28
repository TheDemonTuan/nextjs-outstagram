"use client";
import { CommentInteractionsIcon, TymInteractionsIcon } from "@/icons";
import React, { useState } from "react";

const InteractionsPage = () => {
  const [activeTab, setActiveTab] = useState("likes");

  const tabs = [
    { name: "likes", icon: <TymInteractionsIcon />, label: "LIKES" },
    { name: "comments", icon: <CommentInteractionsIcon />, label: "COMMENTS" },
  ];

  return (
    <div className="flex flex-col mx-6">
      <div className="w-full flex items-center justify-evenly text-sm border-b mt-1">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`flex items-center space-x-2 cursor-pointer py-4 ${
              activeTab === tab.name ? "text-black border-b-1 border-black" : "text-[#737373]"
            }`}
            onClick={() => setActiveTab(tab.name)}>
            {tab.icon}
            <span>{tab.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "likes" && <LikesComponent />}
        {activeTab === "comments" && <CommentsComponent />}
      </div>
    </div>
  );
};

const LikesComponent = () => {
  return <div>Likes content goes here.</div>;
};

const CommentsComponent = () => {
  return <div>Comments content goes here.</div>;
};

export default InteractionsPage;
