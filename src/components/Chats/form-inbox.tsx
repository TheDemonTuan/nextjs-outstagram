"use client";

import { InboxResponse, InboxResponseParams, inboxKey, inboxSendMessages } from "@/api/inbox";
import { InboxGetAllBubbleQuery, InboxGetByUsernameQuery, UserByUsernameDocument } from "@/gql/graphql";
import { EmojiLookBottomIcon, ImgBoxIcon, MicIcon, UnLikeHeartIcon } from "@/icons";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { graphQLClient } from "@/lib/graphql";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { moveElementToFront } from "@/lib/utils";
import { useInboxStore } from "@/stores/inbox-store";
import { Input, Spinner } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const FormInbox = () => {
  const [value, setValue] = React.useState("");
  const { username } = useInboxStore();
  const queryClient = useQueryClient();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const {
    data: userProfileData,
    error: userProfileError,
    isLoading: userProfileIsLoading,
  } = useQuery({
    queryKey: [inboxKey, "profile", { username }],
    queryFn: () => graphQLClient.request(UserByUsernameDocument, { username }),
    enabled: !!username,
  });

  const { mutate: inboxSendMutate, isPending: inboxSendIsPending } = useMutation<
    ApiSuccessResponse<InboxResponse>,
    ApiErrorResponse,
    InboxResponseParams
  >({
    mutationFn: (params) => inboxSendMessages(params),
    onSuccess: (inbox) => {
      queryClient.setQueryData([inboxKey, { username }], (data: InboxGetByUsernameQuery) => {
        return { ...data, inboxGetByUsername: [...data.inboxGetByUsername, inbox.data] };
      });

      queryClient.setQueryData([inboxKey, "all"], (data: InboxGetAllBubbleQuery) => {
        let findUserNamePosition = data.inboxGetAllBubble.findIndex((inbox) => inbox.username === username);
        let cloneData = [...data.inboxGetAllBubble];

        if (findUserNamePosition === -1) {
          findUserNamePosition = 0;
          cloneData[findUserNamePosition] = {
            username: username,
            last_message: inbox.data.message,
            created_at: inbox.data.created_at,
            is_read: false,
            avatar: getUserAvatarURL(userProfileData?.userByUsername?.avatar),
            full_name: userProfileData?.userByUsername?.full_name || "",
          };
        } else {
          cloneData[findUserNamePosition].last_message = inbox.data.message;
          cloneData[findUserNamePosition].created_at = inbox.data.created_at;
          cloneData[findUserNamePosition].is_read = false;
        }
        findUserNamePosition >= 0 && moveElementToFront(cloneData, findUserNamePosition);
        if (!findUserNamePosition) {
          data.inboxGetAllBubble.shift();
          return {
            ...data,
            inboxGetAllBubble: [
              {
                ...cloneData[findUserNamePosition],
              },
              ...data.inboxGetAllBubble,
            ],
          };
        }
        return {
          ...data,
          inboxGetAllBubble: [...cloneData],
        };
      });
    },
    onError: (error) => {
      console.log("error", error);

      toast.error(error?.response?.data?.message || "Send inbox failed!");
    },
  });

  const handleSubmit = () => {
    if (!value) return;
    inboxSendMutate({ username, message: value });
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <Input
      className="p-4 bg-none"
      variant="bordered"
      radius="full"
      size="lg"
      ref={inputRef}
      startContent={<EmojiLookBottomIcon className="w-7 h-7" />}
      endContent={
        inboxSendIsPending ? (
          <Spinner size="sm" />
        ) : !value ? (
          <div className="flex items-center gap-4">
            <MicIcon className="w-6 h-6" />
            <ImgBoxIcon className="w-6 h-6" />
            <UnLikeHeartIcon className="w-6 h-6" />
          </div>
        ) : (
          <span
            onClick={handleSubmit}
            className="p-2 cursor-pointer transition font-bold text-primary-400 hover:text-primary-200">
            Send
          </span>
        )
      }
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      // isDisabled={inboxSendIsPending}
      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
    />
  );
};

export default FormInbox;
