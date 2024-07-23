"use client";
import { PostResponse, PostType, RestorePostsParams, postGetDeleted, postKey, postMeRestore } from "@/api/post";
import { MultiFileIcon, PlayReelIcon, PostsPhotosAndVideosIcon, ReelsPhotosAndVideosIcon } from "@/icons";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Checkbox, Spinner } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

const calculateRemainingTime = (deletedAt: string) => {
  const deleteDate = new Date(deletedAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - deleteDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const RecentlyDeletedPage = () => {
  const [selected, setSelected] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const {
    data: deletedData,
    error: deletedError,
    isLoading: deletedIsLoading,
  } = useQuery({
    queryKey: [postKey, "recently-deleted"],
    queryFn: async () => await postGetDeleted(),
  });

  const { mutate: restorePostsMutate, isPending: restorePostsIsLoading } = useMutation<
    ApiSuccessResponse<PostResponse[]>,
    ApiErrorResponse,
    RestorePostsParams
  >({
    mutationFn: async (data) => await postMeRestore(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [postKey, "recently-deleted"],
      });

      toast.success("Restore post successfully!");
      setSelectedItems([]);
      setSelected(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Restore post failed!");
    },
  });

  const tabs = [
    { name: "posts", icon: <PostsPhotosAndVideosIcon />, label: "POSTS" },
    { name: "reels", icon: <ReelsPhotosAndVideosIcon />, label: "REELS" },
  ];

  const handleSelectionChange = (postID: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(postID) ? prevSelected.filter((id) => id !== postID) : [...prevSelected, postID]
    );
  };

  if (deletedIsLoading)
    return (
      <div className="flex items-center justify-center h-[564px]">
        {" "}
        <Spinner size="md" />
      </div>
    );
  if (deletedError) return <div>Error loading data</div>;

  const posts = deletedData?.data.filter((item) => item.type === PostType.DEFAULT);
  const reels = deletedData?.data.filter((item) => item.type === PostType.REEL);

  const handleRestore = () => {
    restorePostsMutate({ post_ids: selectedItems });
  };

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    setSelectedItems([]);
    setSelected(false);
  };
  return (
    <div className="flex flex-col mx-6">
      <div className="w-full flex items-center justify-evenly text-sm border-b mt-1">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`flex items-center space-x-2 cursor-pointer py-4 ${
              activeTab === tab.name ? "text-black border-b-1 border-black" : "text-[#737373]"
            }`}
            onClick={() => handleTabChange(tab.name)}>
            {tab.icon}
            <span>{tab.label}</span>
          </div>
        ))}
      </div>
      <span className="text-center mt-4 mb-2 text-xs text-[#737373]">
        Only you can see these {activeTab === "posts" ? "posts" : "reels"}. They will be permanently
        <br /> deleted after the number of days shown. After that, you won&apos;t be able to restore them.
      </span>

      {restorePostsIsLoading ? (
        <div className="flex items-center justify-center h-[450px]">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {((activeTab === "posts" && posts && posts?.length > 0) ||
            (activeTab === "reels" && reels && reels?.length > 0)) && (
            <button
              onClick={() => {
                setSelectedItems([]);
                setSelected(!selected);
              }}
              className="flex items-center justify-between mb-2 text-base"
              disabled={restorePostsIsLoading}>
              <div className={`text-[#737373] ${selected === false ? "text-transparent" : ""}`}>
                {selectedItems.length} selected
              </div>
              <div className="flex items-center space-x-3">
                {selected === true && (
                  <span onClick={handleRestore} className="font-bold text-[#ed4956]">
                    Restore
                  </span>
                )}
                <div>
                  {selected === true ? (
                    <span className="text-[#737373]"> Cancel</span>
                  ) : (
                    <span className="text-[#0095f6]">Select</span>
                  )}
                </div>
              </div>
            </button>
          )}

          <div className="overflow-y-auto max-h-[442px] scrollbar-hide">
            {activeTab === "posts" && posts && (
              <PostsComponent
                data={posts}
                isSelected={selected}
                selectedItems={selectedItems}
                onSelectionChange={handleSelectionChange}
              />
            )}
            {activeTab === "reels" && reels && (
              <ReelsComponent
                data={reels}
                isSelected={selected}
                selectedItems={selectedItems}
                onSelectionChange={handleSelectionChange}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentlyDeletedPage;

const PostsComponent = ({
  data,
  isSelected,
  selectedItems,
  onSelectionChange,
}: {
  data: PostResponse[];
  isSelected: boolean;
  selectedItems: string[];
  onSelectionChange: (postId: string) => void;
}) => {
  return (
    <div className="grid grid-cols-5 gap-1">
      {data.map((post) => {
        const remainingDays = post.deleted_at && calculateRemainingTime(post.deleted_at?.toString());
        const isSelectedItem = selectedItems.includes(post.id);
        return (
          <div key={post.id} className="relative" onClick={() => onSelectionChange(post.id)}>
            <Image src={post.post_files[0].url} width={500} height={500} loading="lazy" alt="" className="w-32 h-32" />
            {post.post_files?.length > 1 && (
              <div className="absolute top-1 right-1 bg-transparent bg-opacity-75 p-1 rounded-full">
                <MultiFileIcon />
              </div>
            )}
            <div className="absolute bottom-1 left-1 bg-transparent group-hover:opacity-0 bg-opacity-75 p-1 rounded-full text-white text-xs">
              {remainingDays} {remainingDays === 1 ? "day" : "days"}
            </div>
            {isSelected === true && (
              <div className="absolute bottom-1 right-0 bg-transparent group-hover:opacity-0 bg-opacity-75 p-1 rounded-full text-red-500 text-xs">
                <Checkbox
                  isSelected={isSelectedItem}
                  radius="full"
                  size="md"
                  onClick={() => onSelectionChange(post.id)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const ReelsComponent = ({
  data,
  isSelected,
  selectedItems,
  onSelectionChange,
}: {
  data: PostResponse[];
  isSelected: boolean;
  selectedItems: string[];
  onSelectionChange: (postId: string) => void;
}) => {
  return (
    <div className="grid grid-cols-5 gap-1">
      {data.map((reel) => {
        const remainingDays = reel.deleted_at && calculateRemainingTime(reel.deleted_at?.toString());
        const isSelectedItem = selectedItems.includes(reel.id);
        return (
          <div key={reel.id} className="relative" onClick={() => onSelectionChange(reel.id)}>
            <video
              src={reel.post_files[0].url}
              width={500}
              height={500}
              controls={false}
              muted
              className="w-32 h-[230px] object-cover"
            />
            <div className="absolute top-1 right-1 bg-transparent group-hover:opacity-0 bg-opacity-75 p-1 rounded-full">
              <PlayReelIcon />
            </div>
            <div className="absolute bottom-1 left-1 bg-transparent group-hover:opacity-0 bg-opacity-75 p-1 rounded-full text-red-500 text-xs">
              {remainingDays} {remainingDays === 1 ? "day" : "days"}
            </div>
            {isSelected === true && (
              <div className="absolute bottom-1 right-0 bg-transparent group-hover:opacity-0 bg-opacity-75 p-1 rounded-full text-red-500 text-xs">
                <Checkbox
                  isSelected={isSelectedItem}
                  radius="full"
                  size="md"
                  onClick={() => onSelectionChange(reel.id)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
