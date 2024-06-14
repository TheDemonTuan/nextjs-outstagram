import { UserProfileQuery } from "@/gql/graphql";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useModalStore } from "@/stores/modal-store";
import { Avatar, Button, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export const FriendsModalKey = "Friends";

const Friends = ({ userData }: { userData: UserProfileQuery }) => {
  const { modalClose, modalKey } = useModalStore();
  const { friends } = userData.userProfile;

  return (
    <>
      <Modal size="md" isOpen={modalKey === FriendsModalKey} onOpenChange={modalClose} scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center my-[-5px] text-base">Friends</ModalHeader>
              <Divider />
              <div className="flex items-center mx-6 my-3">
                <Input size="sm" className="sticky top-0 z-10" />
              </div>
              <ModalBody className="flex flex-col max-h-80">
                {friends.map((friend, index) => (
                  <div
                    key={`${friend.id}-${index}`}
                    className="flex flex-row space-y-2 cursor-pointer justify-between my-2">
                    <div className="flex items-center">
                      <Avatar src={getUserAvatarURL(friend.from_user_info?.avatar)} className="w-11 h-11" />
                      <div className="flex flex-col mx-2">
                        <div className="text-sm font-bold">{friend.from_user_info?.username}</div>
                        <div className="text-xs font-normal text-gray-500">{friend.from_user_info?.full_name}</div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-neutral-200 hover:bg-neutral-300 font-semibold text-sm px-4">
                      Remove
                    </Button>
                  </div>
                ))}
                <div className="mt-1"></div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Friends;
