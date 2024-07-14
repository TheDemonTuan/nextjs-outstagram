import React, { memo, useCallback, useMemo } from "react";
import Link from "next/link";
import { useModalStore } from "@/stores/modal-store";
import { Post } from "@/gql/graphql";

interface LikesViewProps {
  post: Post;
  current_userID: string;
  likesModalKey: string;
}

// eslint-disable-next-line react/display-name
const LikesView = memo(({ post, current_userID, likesModalKey }: LikesViewProps) => {
  const { modalOpen, setModalData } = useModalStore();

  const isCurrentUserPost = useMemo(() => post.user_id === current_userID, [current_userID, post.user_id]);

  const postLikes = post?.post_likes?.filter((like) => like?.is_liked);

  const handleLikesClick = useCallback(() => {
    setModalData({ post });
    modalOpen(likesModalKey);
  }, [setModalData, post, modalOpen, likesModalKey]);

  const renderLikesText = useCallback(() => {
    if (!postLikes || postLikes.length === 0) {
      return (
        <span className="text-sm">
          Be the first to <span className="text-sm font-semibold cursor-pointer hover:text-neutral-300">like this</span>
        </span>
      );
    }

    const likedByCurrentUser = postLikes.find((like) => like?.user?.id === current_userID);

    if (isCurrentUserPost) {
      const othersCount = postLikes.length - 1;
      const otherText = othersCount === 1 ? "other" : "others";
      const likedByUser = likedByCurrentUser ? likedByCurrentUser : postLikes[0];
      if (post.is_hide_like === false) {
        return (
          <span className="text-sm cursor-pointer" onClick={handleLikesClick}>
            {postLikes.length === 1 ? (
              <span className="font-semibold">1 like</span>
            ) : (
              <>
                Liked by{" "}
                <Link href={`/${post.user?.username}`} className="font-semibold cursor-pointer">
                  {likedByUser?.user?.username}
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
              <span className="font-semibold">1 like</span>
            ) : (
              <>
                Liked by{" "}
                <Link href={`/${post.user?.username}`} className="font-semibold cursor-pointer">
                  {likedByUser?.user?.username}
                </Link>{" "}
                and <span className="font-semibold cursor-pointer">{otherText}</span>
              </>
            )}
          </span>
        );
      }
    } else {
      if (post.is_hide_like === true) {
        return (
          <span className="text-sm cursor-pointer" onClick={handleLikesClick}>
            {postLikes.length === 1 ? (
              <span>
                Liked by <span className="font-semibold">{postLikes[0]?.user?.username}</span>
              </span>
            ) : (
              <span>
                Liked by{" "}
                <Link href={`/${post.user?.username}`} className="font-semibold cursor-pointer">
                  {postLikes[0]?.user?.username || ""}
                </Link>{" "}
                and <span className="font-semibold cursor-pointer">others</span>
              </span>
            )}
          </span>
        );
      } else {
        return (
          <span className="text-sm cursor-pointer font-semibold" onClick={handleLikesClick}>
            {postLikes.length === 1 ? (
              <span>1 like</span>
            ) : (
              <span>
                {postLikes.length} {""} likes
              </span>
            )}
          </span>
        );
      }
    }
  }, [current_userID, handleLikesClick, isCurrentUserPost, post.is_hide_like, post.user?.username, postLikes]);

  return <>{renderLikesText()}</>;
});

export default LikesView;
