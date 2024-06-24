import React from "react";
import Link from "next/link";
import { useModalStore } from "@/stores/modal-store";
import { PostLike } from "@/gql/graphql";

interface LikesViewProps {
  postLikes: PostLike[];
  post_userID: string;
  current_userID: string;
  likesModalKey: string;
}

const LikesView = ({ postLikes, post_userID, current_userID, likesModalKey }: LikesViewProps) => {
  const { modalOpen, setModalData } = useModalStore();

  const isCurrentUserPost = post_userID === current_userID;

  const handleLikesClick = () => {
    setModalData(postLikes);
    modalOpen(likesModalKey);
  };

  const renderLikesText = () => {
    if (postLikes.length === 0) {
      return (
        <span className="text-sm">
          Be the first to <span className="text-sm font-semibold cursor-pointer hover:text-neutral-300">like this</span>
        </span>
      );
    }

    const likedByCurrentUser = postLikes.find((like) => like.user_id === current_userID);

    if (isCurrentUserPost) {
      const othersCount = postLikes.length - 1;
      const otherText = othersCount === 1 ? "other" : "others";
      const likedByUser = likedByCurrentUser ? likedByCurrentUser : postLikes[0];

      return (
        <span className="text-sm cursor-pointer" onClick={handleLikesClick}>
          {postLikes.length === 1 ? (
            <span className="font-semibold">1 like</span>
          ) : (
            <>
              Liked by{" "}
              <Link href="/" className="font-semibold cursor-pointer">
                {likedByUser?.user_id}
              </Link>{" "}
              and{" "}
              <span className="font-semibold cursor-pointer">
                {othersCount} {otherText}
              </span>
            </>
          )}
        </span>
      );
    } else {
      return (
        <span className="text-sm cursor-pointer" onClick={handleLikesClick}>
          {postLikes.length === 1 ? (
            <span>
              Liked by <span className="font-semibold">{postLikes[0]?.user_id}</span>
            </span>
          ) : (
            <span>
              Liked by{" "}
              <Link href="/" className="font-semibold cursor-pointer">
                {postLikes[0]?.user_id}
              </Link>{" "}
              and <span className="font-semibold cursor-pointer">others</span>
            </span>
          )}
        </span>
      );
    }
  };

  return <>{renderLikesText()}</>;
};

export default LikesView;
