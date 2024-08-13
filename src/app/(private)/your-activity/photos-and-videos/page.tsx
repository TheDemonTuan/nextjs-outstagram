"use client";
import { redirectHard } from "@/actions";
import { PostResponse, PostType, RestorePostsParams, postGetAllFromMe, postKey, postMeDeleteList } from "@/api/post";
import { MultiFileIcon, PlayReelIcon, PostsPhotosAndVideosIcon, ReelsPhotosAndVideosIcon } from "@/icons";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { Checkbox, Spinner } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const PhotoAndVideoPage = () => {
  const [selected, setSelected] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const {
    data: contentData,
    error: contentError,
    isLoading: contentIsLoading,
  } = useQuery({
    queryKey: [postKey, "photos-videos"],
    queryFn: async () => await postGetAllFromMe(),
  });

  const { mutate: deletePostsMutate, isPending: deletePostsIsLoading } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    RestorePostsParams
  >({
    mutationFn: async (data) => await postMeDeleteList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [postKey, "photos-videos"],
      });

      toast.success("Delete posts successfully!");
      setSelectedItems([]);
      setSelected(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Delete posts failed!");
    },
  });

  const posts = contentData?.data.filter((item) => item.type === PostType.DEFAULT);
  const reels = contentData?.data.filter((item) => item.type === PostType.REEL);

  const tabs = [
    { name: "posts", icon: <PostsPhotosAndVideosIcon />, label: "POSTS" },
    { name: "reels", icon: <ReelsPhotosAndVideosIcon />, label: "REELS" },
  ];

  const handleSelectionChange = (postID: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(postID) ? prevSelected.filter((id) => id !== postID) : [...prevSelected, postID]
    );
  };

  if (contentIsLoading)
    return (
      <div className="flex items-center justify-center h-[564px]">
        {" "}
        <Spinner size="md" />
      </div>
    );

  if (contentError) return <div>Error loading data</div>;

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    setSelectedItems([]);
    setSelected(false);
  };

  const handleDelete = () => {
    deletePostsMutate({ post_ids: selectedItems });
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

      {deletePostsIsLoading ? (
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
              className="flex items-center justify-between mb-2 mt-4 text-base"
              disabled={deletePostsIsLoading}>
              <div className={`text-[#737373] ${selected === false ? "text-transparent" : ""}`}>
                {selectedItems.length} selected
              </div>
              <div className="flex items-center space-x-3">
                {selected === true && (
                  <span className="font-bold text-[#ed4956]" onClick={handleDelete}>
                    Delete
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

export default PhotoAndVideoPage;

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
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-8 space-y-4">
        <Image src="/02ffe4dfdf20.png" width={500} height={500} alt="" className="w-24 h-24" />
        <span className="font-bold text-2xl">You haven&apos;t made any posts</span>
        <span className="text-sm text-[#8e8e8e]">When you create a post, it&apos;ll show up here.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-1">
      {data.map((post) => {
        const isSelectedItem = selectedItems.includes(post.id);
        return (
          <Link
            href={`/p/${post.id}`}
            passHref
            key={post.id}
            className="relative"
            onClick={(e) => {
              e.preventDefault();
              redirectHard(`/p/${post.id}`);
            }}>
            <Image src={post.post_files[0].url} width={500} height={500} loading="lazy" alt="" className="w-32 h-32" />
            {post.post_files?.length > 1 && (
              <div className="absolute top-1 right-1 bg-transparent bg-opacity-75 p-1 rounded-full">
                <MultiFileIcon />
              </div>
            )}
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
          </Link>
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
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-8 space-y-4">
        <Image src="/02ffe4dfdf20.png" width={500} height={500} alt="" className="w-24 h-24" />
        <span className="font-bold text-2xl">You haven&apos;t made any reels</span>
        <span className="text-sm text-[#8e8e8e]">When you create a reel, it&apos;ll show up here.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-1">
      {data.map((reel) => {
        const isSelectedItem = selectedItems.includes(reel.id);
        return (
          <Link href={`/r/${reel.id}`} key={reel.id} className="relative">
            <video
              src={reel.post_files[0].url}
              width={500}
              height={500}
              controls={false}
              muted
              className="w-32 h-[230px] object-cover"
            />
            <div className="absolute bottom-1 left-1 bg-transparent group-hover:opacity-0 bg-opacity-75 p-1 rounded-full">
              <PlayReelIcon />
            </div>
            {isSelected === true && (
              <div className="absolute bottom-1 right-0 bg-transparent group-hover:opacity-0 bg-opacity-75 p-1 rounded-full text-red-500 text-xs">
                <Checkbox
                  isSelected={isSelectedItem}
                  radius="full"
                  size="md"
                  color="danger"
                  onClick={() => onSelectionChange(reel.id)}
                />
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
};
