import React from "react";
import { Button, Divider } from "@nextui-org/react";
import { MessagesIcon, MessagesSummaryProfileIcon, VerifiedIcon } from "@/icons";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { UserResponse } from "@/api/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Friend, Post, User } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { redirectHard } from "@/actions";
import Image from "next/image";
import { PostType } from "@/api/post";

interface SummaryProfileProps {
  username: string;
  full_name: string;
  avatar: string;
  role: boolean;
  is_private?: boolean;
  friends: Friend[];
  posts: Post[];
}

const SummaryProfile = (props: SummaryProfileProps) => {
  const { authData } = useAuth();

  const isFriend = props.friends.some(
    (friend) => friend.from_user_id === authData?.id || friend.to_user_id === authData?.id
  );

  const isCurrentUser = authData?.username === props.username;

  const isViewerFriendOrOwner =
    authData?.username === props.username ||
    props.friends?.some(
      (friend) => friend?.to_user_info?.id === authData?.id || friend?.from_user_info?.id === authData?.id
    );

  const canViewPrivateProfile = props.is_private === false || isViewerFriendOrOwner;

  return (
    <div className="flex flex-col p-2 w-[360px]">
      <div className="flex flex-row items-center space-x-3">
        <Link href={`/${props.username}`}>
          <Avatar className="w-14 h-14">
            <AvatarImage src={getUserAvatarURL(props.avatar)} />
          </Avatar>
        </Link>
        <div>
          <div className="flex items-center">
            <Link href={`/${props.username}`} className="font-bold text-sm">
              {props.username}
            </Link>
            {props.role && <VerifiedIcon className="w-3 h-3 ml-1" />}
          </div>
          <p className="text-sm font-normal text-gray-400">{props.full_name}</p>
        </div>
      </div>
      <div className="flex mt-6 mb-3  justify-between mx-5">
        <div className="text-center font-extrabold">
          {props.posts.length || 0}
          <br />
          <span className="font-normal">posts</span>
        </div>
        <h3 className="text-center  font-extrabold">
          {props.friends.length || 0} <br />
          <span className="font-normal">friends</span>
        </h3>
        <h3 className="text-center  font-extrabold">
          285
          <br />
          <span className="font-normal">following</span>
        </h3>
      </div>

      {props.is_private === true && !canViewPrivateProfile ? (
        <div className="flex flex-col w-full h-32 justify-center items-center my-3">
          <Divider className="my-4" />
          <Image src="/padlock.png" alt="Private Account" width={500} height={500} className="my-2 w-12 h-12" />
          <div className="font-bold text-base">The account is private</div>
          <div className="text-sm text-gray-400 mx-2 text-center">
            Follow this account to see their photos and videos
          </div>
          <Divider className="my-4" />
        </div>
      ) : (
        <div className="flex flex-row items-center space-x-1 mx-[-18px]">
          {props.posts && props.posts.length > 0 ? (
            <>
              {props.posts.slice(0, 3).map((post) => {
                const postFile = post.post_files?.[0];
                if (!postFile) return null;

                return (
                  <div key={post.id} className="flex-1">
                    {post.type === PostType.DEFAULT ? (
                      <Link
                        href={`/p/${post.id}`}
                        passHref
                        onClick={(e) => {
                          e.preventDefault();
                          redirectHard(`/p/${post.id}`);
                        }}>
                        <Image
                          src={postFile.url || ""}
                          alt={`Image ${postFile.id + 1}`}
                          className="w-full h-32 bg-gray-200/70 object-cover rounded-md"
                          width={500}
                          height={500}
                          loading="lazy"
                        />
                      </Link>
                    ) : (
                      <Link
                        href={`/p/${post.id}`}
                        passHref
                        onClick={(e) => {
                          e.preventDefault();
                          redirectHard(`/p/${post.id}`);
                        }}>
                        <video
                          src={postFile.url || ""}
                          className="w-full h-32 bg-gray-200/70 object-cover rounded-md"
                        />
                      </Link>
                    )}
                  </div>
                );
              })}
              {Array.from({ length: 3 - props.posts.length }).map((_, index) => (
                <div key={`empty-${index}`} className="flex-1 h-32"></div>
              ))}
            </>
          ) : (
            <div className="flex flex-col w-full h-32 justify-center items-center my-3">
              <Divider className="my-4" />
              <Image src="/camera.png" alt="" width={500} height={500} className="my-2 w-12 h-12" />
              <div className="font-bold text-base">No posts yet</div>
              <div className="text-sm text-gray-400 mx-2 text-center">
                When {props.username} shares photos and reels, you&apos;ll see them here.
              </div>
              <Divider className="my-4" />
            </div>
          )}
        </div>
      )}

      <div className="flex flex-row items-center mt-4">
        {isCurrentUser ? (
          <Button className="w-full mx-1 h-9 font-semibold bg-gray-200 rounded-lg">
            <Link href="/accounts/edit" className="flex items-center space-x-2">
              Edit Profile
            </Link>
          </Button>
        ) : isFriend ? (
          <>
            <Button className="w-1/2 mx-1 h-9 text-white font-semibold bg-primary-400 rounded-lg">
              <Link href={`/direct/inbox/${props.username}`} className="flex items-center space-x-2">
                <MessagesSummaryProfileIcon stroke="#FFFFFF" className="w-5 h-5" />
                <span>Message</span>
              </Link>
            </Button>

            <Button className="w-1/2 mx-1 h-9 font-semibold bg-gray-200 rounded-lg">Friend</Button>
          </>
        ) : (
          <Button className="w-full mx-1 h-9 text-white font-semibold bg-primary-400 rounded-lg">Add friend</Button>
        )}
      </div>
    </div>
  );
};

export default SummaryProfile;
