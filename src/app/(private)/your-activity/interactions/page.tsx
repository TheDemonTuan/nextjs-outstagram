"use client";
import { redirectHard } from "@/actions";
import { PostResponse, PostType, PostWithUserResponse, postGetCommented, postGetLiked, postKey } from "@/api/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { ClipIcon, ClipInteractionsIcon, CommentInteractionsIcon, MultiFileIcon, TymInteractionsIcon } from "@/icons";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { Checkbox, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const InteractionsPage = () => {
  const [activeTab, setActiveTab] = useState("likes");
  const [selected, setSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const {
    data: postLikedData,
    error: postLikedError,
    isLoading: postLikedIsLoading,
  } = useQuery({
    queryKey: [postKey, "interactions-liked"],
    queryFn: async () => await postGetLiked(),
  });

  const {
    data: postCommentedData,
    error: postCommentedError,
    isLoading: postCommentedIsLoading,
  } = useQuery({
    queryKey: [postKey, "interactions-commented"],
    queryFn: async () => await postGetCommented(),
  });

  if (postLikedIsLoading || postCommentedIsLoading)
    return (
      <div className="flex items-center justify-center h-[564px]">
        {" "}
        <Spinner size="md" />
      </div>
    );

  if (postLikedError || postCommentedError) return <div>Error loading data</div>;

  const tabs = [
    { name: "likes", icon: <TymInteractionsIcon />, label: "LIKES" },
    { name: "comments", icon: <CommentInteractionsIcon />, label: "COMMENTS" },
  ];

  const handleSelectionChange = (postID: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(postID) ? prevSelected.filter((id) => id !== postID) : [...prevSelected, postID]
    );
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

      {((activeTab === "likes" && postLikedData && postLikedData.data?.length > 0) ||
        (activeTab === "comments" && postCommentedData && postCommentedData.data?.length > 0)) && (
        <button
          onClick={() => {
            setSelectedItems([]);
            setSelected(!selected);
          }}
          className="flex items-center justify-between mb-2 text-base mt-4">
          <div className={`text-[#737373] ${selected === false ? "text-transparent" : ""}`}>
            {selectedItems.length} selected
          </div>
          <div className="flex items-center space-x-3">
            {selected === true && (
              <span className="font-bold text-[#ed4956]">{activeTab === "likes" ? "Unlike" : "Delete"}</span>
            )}
            <div>
              {selected === true ? (
                <span className="text-[#737373]">Cancel</span>
              ) : (
                <span className="text-[#0095f6]">Select</span>
              )}
            </div>
          </div>
        </button>
      )}

      <div className="mt-4 overflow-y-auto max-h-[442px]">
        {activeTab === "likes" && postLikedData && (
          <LikesComponent
            data={postLikedData.data}
            isSelected={selected}
            selectedItems={selectedItems}
            onSelectionChange={handleSelectionChange}
          />
        )}
        {activeTab === "comments" && postCommentedData && (
          <CommentsComponent
            data={postCommentedData.data}
            isSelected={selected}
            selectedItems={selectedItems}
            onSelectionChange={handleSelectionChange}
          />
        )}
      </div>
    </div>
  );
};

const LikesComponent = ({
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
        <span className="font-bold text-2xl">You haven&apos;t made any reel/post</span>
        <span className="text-sm text-[#8e8e8e]">When you like a reel/post, it&apos;ll show up here.</span>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-5 gap-1">
      {data.map((post) => {
        const postFiles = post?.post_files || [];
        const firstFile = postFiles[0];
        const isSelectedItem = selectedItems.includes(post.id);
        return (
          <Link
            href={post.type === PostType.REEL ? `/r/${post.id}` : `/p/${post.id}`}
            onClick={(e) => {
              if (post.type !== PostType.REEL) {
                e.preventDefault();
                redirectHard(`/p/${post.id}`);
              }
            }}
            key={post.id}
            className="relative">
            {post.type && firstFile?.url ? (
              <video
                key={"video" + firstFile.id}
                src={firstFile?.url || "/camera-b.png"}
                controls={false}
                className="object-cover w-32 h-32"
              />
            ) : (
              <Image src={firstFile?.url || ""} width={500} height={500} loading="lazy" alt="" className="w-32 h-32" />
            )}
            {post.type === PostType.REEL && (
              <div className="absolute top-1 right-1 bg-transparent bg-opacity-75 p-1 rounded-full">
                <ClipInteractionsIcon />
              </div>
            )}
            {postFiles?.length > 1 && (
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

const CommentsComponent = ({
  data,
  isSelected,
  selectedItems,
  onSelectionChange,
}: {
  data: PostWithUserResponse[];
  isSelected: boolean;
  selectedItems: string[];
  onSelectionChange: (postId: string) => void;
}) => {
  const { authData } = useAuth();
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-8 space-y-4">
        <Image src="/02ffe4dfdf20.png" width={500} height={500} alt="" className="w-24 h-24" />
        <span className="font-bold text-2xl">You haven&apos;t commented on any posts</span>
        <span className="text-sm text-[#8e8e8e]">When you comment on a post, it will show up here.</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {data.map((post) => {
        const postFiles = post?.post.post_files || [];
        const firstFile = postFiles[0];
        const isSelectedItem = selectedItems.includes(post.post.id);
        return (
          <div key={post.post.id} className="flex flex-col my-3 mx-9">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Link href={`/${post.user.username}`}>
                  <Avatar className="w-11 h-11">
                    <AvatarImage className="object-cover" src={getUserAvatarURL(post.user.avatar)} />
                    <AvatarFallback>
                      <Spinner size="sm" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">
                  <span className="text-sm line-clamp-[1]">
                    <span className="font-bold">{post.user.username}</span> {post.post.caption}
                  </span>
                  <span className="text-xs text-[#737373]">
                    {formatDistanceToNow(post.post.created_at || "", {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              {post.post.type === PostType.DEFAULT ? (
                <Image alt="" width={500} height={500} src={firstFile.url} className="w-12 h-12 object-cover" />
              ) : (
                <video src={firstFile.url} controls={false} className="w-12 h-12 object-cover" />
              )}
            </div>
            {post.post.post_comments.map((comment) => (
              <div key={comment.id} className="flex items-center justify-between my-3 ml-[73px]">
                <div className="flex space-x-2">
                  <Link href={`/${authData?.username}`}>
                    <Avatar className="w-11 h-11">
                      <AvatarImage className="object-cover" src={getUserAvatarURL(authData?.avatar)} />
                      <AvatarFallback>
                        <Spinner size="sm" />
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex flex-col">
                    <span className="text-sm line-clamp-[1]">
                      <span className="font-bold">{authData?.username}</span> {comment.content}
                    </span>
                    <span className="text-xs text-[#737373]">
                      {formatDistanceToNow(comment.created_at || "", {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
                {isSelected === true && (
                  <div className=" bottom-1 right-0 bg-transparent group-hover:opacity-0 bg-opacity-75 p-1 rounded-full text-red-500 text-xs">
                    <Checkbox
                      isSelected={isSelectedItem}
                      radius="full"
                      size="md"
                      color="danger"
                      onClick={() => onSelectionChange(post.post.id)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default InteractionsPage;
