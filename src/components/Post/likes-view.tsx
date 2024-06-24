import { PostResponse } from "@/api/post";
import { PostLikeResponse } from "@/api/post_like";
import { PostLike } from "@/gql/graphql";
import { useModalStore } from "@/stores/modal-store";
import Link from "next/link";
import React from "react";

const LikesView = ({
  postLikes,
  post_userID,
  current_userID,
  likesModalKey,
}: {
  postLikes: PostLike[];
  post_userID: string;
  current_userID: string;
  likesModalKey: string;
}) => {
  const { modalOpen, setModalData } = useModalStore();
  const isCurrentUserPost = post_userID === current_userID;

  return (
    <>
      {postLikes.length > 0 || !postLikes ? (
        <span
          className="text-sm cursor-pointer"
          onClick={() => {
            setModalData(postLikes);
            modalOpen(likesModalKey);
          }}>
          {isCurrentUserPost ? (
            <>
              {postLikes.length === 1 ? (
                <span className="font-semibold">1 like</span>
              ) : postLikes.length === 2 ? (
                postLikes[0]?.user_id !== current_userID ? (
                  <span>
                    Liked by{" "}
                    <Link href="/" className="font-semibold cursor-pointer">
                      {postLikes[0]?.user_id}
                    </Link>{" "}
                    and <span className="font-semibold cursor-pointer">1 other</span>{" "}
                  </span>
                ) : (
                  <span>
                    Liked by{" "}
                    <Link href="/" className="font-semibold cursor-pointer">
                      {postLikes[1]?.user_id}
                    </Link>{" "}
                    and <span className="font-semibold cursor-pointer">1 other</span>{" "}
                  </span>
                )
              ) : postLikes[0]?.user_id !== current_userID ? (
                <span>
                  Liked by{" "}
                  <Link href="/" className="font-semibold cursor-pointer">
                    {postLikes[0]?.user_id}
                  </Link>{" "}
                  and <span className="font-normal cursor-pointer">{postLikes.length - 1} others</span>{" "}
                </span>
              ) : (
                <span>
                  Liked by{" "}
                  <Link href="/" className="font-semibold cursor-pointer">
                    {postLikes[1]?.user_id}
                  </Link>{" "}
                  and <span className="font-semibold cursor-pointer">{postLikes.length - 1} others</span>{" "}
                </span>
              )}
            </>
          ) : (
            <>
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
                  and <span className="font-semibold cursor-pointer">others</span>{" "}
                </span>
              )}
            </>
          )}
        </span>
      ) : (
        <span className="text-sm">
          Be the first to <span className="text-sm font-semibold cursor-pointer hover:text-neutral-300">like this</span>
        </span>
      )}
    </>
  );
};

export default LikesView;
