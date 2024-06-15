"use client";

import { InboxResponse, InboxResponseParams, inboxKey, inboxSendMessages } from "@/api/inbox";
import { InboxGetAllBubbleQuery, InboxGetByUsernameQuery } from "@/gql/graphql";
import { EmojiLookBottomIcon, ImgBoxIcon, MicIcon, UnLikeHeartIcon } from "@/icons";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { moveElementToFront } from "@/lib/utils";
import { useInboxStore } from "@/stores/inbox-store";
import { Input, Spinner } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const FormInbox = () => {
  const [value, setValue] = React.useState("");
  const { username } = useInboxStore();
  const queryClient = useQueryClient();

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
        const findUserNamePosition = data.inboxGetAllBubble.findIndex((inbox) => inbox.username === username);
        const cloneData = [...data.inboxGetAllBubble];
        cloneData[findUserNamePosition].last_message = inbox.data.message;
        cloneData[findUserNamePosition].created_at = inbox.data.created_at;
        cloneData[findUserNamePosition].is_read = false;
        moveElementToFront(cloneData, findUserNamePosition);
        return { ...data, inboxGetAllBubble: cloneData };
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Send inbox failed!");
    },
  });

  const handleSubmit = () => {
    if (!value) return;
    inboxSendMutate({ username, message: value });
    setValue("");
  };

  return (
    <Input
      className="p-4 bg-none"
      variant="bordered"
      radius="full"
      size="lg"
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
            onKeyDownCapture={(e) => e.key === "Enter" && handleSubmit()}
            className="p-2 cursor-pointer transition font-bold text-primary-400 hover:text-primary-200">
            Send
          </span>
        )
      }
      value={value}
      onChange={(e) => setValue(e.target.value)}
      isDisabled={inboxSendIsPending}
    />
  );
};

export default FormInbox;
