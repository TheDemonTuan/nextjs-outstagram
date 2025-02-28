"use client";
import { inboxDeleteById, inboxKey, InboxResponse } from "@/api/inbox";
import { InboxGetByUsernameDocument, InboxGetByUsernameQuery, UserByUsernameDocument } from "@/gql/graphql";
import { useAuth } from "@/hooks/useAuth";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { graphQLClient } from "@/lib/graphql";
import { UseMutateFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { animateScroll } from "react-scroll";
import { Avatar, AvatarImage } from "../ui/avatar";
import { FrameInboxSkeleton } from "../skeletons";
import { BsThreeDots } from "react-icons/bs";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { toast } from "sonner";

const ChatInbox = ({ username }: { username: string }) => {
  // const { user,username } = useInboxStore();
  const { authData } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: inboxData,
    error: inboxError,
    isLoading: inboxIsLoading,
  } = useQuery({
    queryKey: [inboxKey, { username }],
    queryFn: () => graphQLClient.request(InboxGetByUsernameDocument, { username }),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: userProfileData,
    error: userProfileError,
    isLoading: userProfileIsLoading,
  } = useQuery({
    queryKey: [inboxKey, "profile", { username }],
    queryFn: () => graphQLClient.request(UserByUsernameDocument, { username }),
    enabled: !!username,
  });

  const { mutate: inboxDeleteMutate, isPending: inboxDeleteIsPending } = useMutation<
    ApiSuccessResponse<string>,
    ApiErrorResponse,
    string
  >({
    mutationFn: async (params) => await inboxDeleteById(params),
    onSuccess: (res) => {
      // toast.success("Login successfully!");
      // queryClient.setQueryData(["auth"], res);
      queryClient.setQueryData([inboxKey, { username }], (data: InboxGetByUsernameQuery) => {
        return { ...data, inboxGetByUsername: data.inboxGetByUsername.filter((inbox) => inbox.id !== res.data) };
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Delete inbox failed!");
    },
  });

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: "chat-inbox",
      duration: 500,
      smooth: true,
    });
  }, [inboxData?.inboxGetByUsername]);

  const user = userProfileData?.userByUsername;

  if (inboxIsLoading || userProfileIsLoading) return <FrameInboxSkeleton />;

  if (!inboxData) return <div>No inbox data</div>;

  return (
    <div id="chat-inbox" className="flex-auto flex flex-col gap-10 overflow-y-auto p-4">
      <div className="flex flex-col items-center gap-4 mt-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={getUserAvatarURL(user?.avatar)} alt="User Avatar" />
        </Avatar>
        <div className="font-semibold text-lg text-black ">{user?.full_name}</div>
        <div className="text-sm text-gray-500 font-light">{user?.username} · Outstagram </div>
        <Link
          href={`/${user?.username}`}
          className="py-[6px] px-4 rounded-md font-semibold text-sm bg-gray-200 hover:bg-gray-300">
          View Profile
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-center text-xs text-gray-400 mb-4">21:34 Fri</span>

        {inboxData?.inboxGetByUsername?.map((inbox) => {
          return (
            <Fragment key={inbox.id}>
              {inbox.message &&
                (inbox.from_user_id === authData?.id
                  ? meMessage(inbox.id, inbox.message, inboxDeleteMutate, inboxDeleteIsPending)
                  : youMessage(inbox.message, user?.avatar ?? ""))}
            </Fragment>
          );
        })}

        {/* <div className="flex gap-3 p-3 justify-start">
        <div className="">
          <Avatar alt="avatar" src="/guest-avatar.webp" className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <div className="text-sm w-fit overflow-hidden bg-sky-500 text-white rounded-md py-0">
            <Image
              alt="Image"
              height="288"
              width="288"
              src="/guest-avatar.webp"
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 p-3 justify-start">
        <div className="flex">
          <Avatar alt="avatar" src="/guest-avatar.webp" className="w-8 h-8" />
        </div>
        <div className="flex gap-3 p-2justify-center">
          <div className="flex flex-col gap-2 items-center">
            <div className="text-sm w-fit overflow-hidden bg-[#EFEFEF] text-black rounded-full py-2 px-3">message</div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 p-3 justify-end">
        <div className="flex flex-col gap-2 items-end">
          <div className="text-sm w-fit overflow-hidden text-white rounded-md py-0">
            <Image
              alt="Image"
              height="288"
              width="288"
              src="/guest-avatar.webp"
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          </div>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default ChatInbox;

const meMessage = (
  id: string,
  message: string,
  inboxDeleteMutate: UseMutateFunction<ApiSuccessResponse<string>, ApiErrorResponse, string, unknown>,
  inboxDeleteIsPending: boolean
) => {
  return (
    <div className="flex justify-end items-center group gap-2">
      <Dropdown>
        <DropdownTrigger>
          <div className="hidden group-hover:flex items-center gap-1">
            <BsThreeDots className="cursor-pointer" />
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="edit" className="text-primary-500" color="primary">
            Edit
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger-500"
            color="danger"
            isReadOnly={inboxDeleteIsPending}
            onClick={() => {
              inboxDeleteMutate(id);
            }}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <span className="flex flex-col items-end gap-1 text-sm bg-primary text-white py-2 px-3 font-medium rounded-xl max-w-96 break-words">
        {message}
      </span>
    </div>
  );
};

const youMessage = (message: string, avatar: string) => {
  return (
    <div className="flex gap-2 justify-start items-center group">
      <Avatar className="w-8 h-8">
        <AvatarImage src={getUserAvatarURL(avatar)} alt="User Avatar" />
      </Avatar>

      <div className="text-sm overflow-hidden bg-[#EFEFEF] text-black rounded-xl py-2 px-3 max-w-96 break-words">
        {message}
      </div>
    </div>
  );
};
