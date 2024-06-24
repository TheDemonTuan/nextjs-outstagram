import { UserProfileQuery } from "@/gql/graphql";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useModalStore } from "@/stores/modal-store";
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader, Spinner } from "@nextui-org/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const FriendsModalKey = "Friends";

const Friends = ({ userData }: { userData: UserProfileQuery }) => {
  const { modalClose, modalKey } = useModalStore();
  const { friends, user } = userData.userProfile;

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
                {friends.map((friend) => {
                  const friendInfo =
                    user?.id === friend.from_user_info?.id ? friend.to_user_info : friend.from_user_info;
                  return (
                    <div key={friend.id} className="flex flex-row space-y-2 cursor-pointer justify-between my-2">
                      <div className="flex items-center">
                        <Avatar className="w-11 h-11">
                          <AvatarImage src={getUserAvatarURL(friendInfo?.avatar)} alt="User Avatar" />
                          <AvatarFallback>
                            <Spinner size="sm" />
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col mx-2">
                          <div className="text-sm font-bold">{friendInfo?.username}</div>
                          <div className="text-xs font-normal text-gray-500">{friendInfo?.full_name}</div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-neutral-200 hover:bg-neutral-300 font-semibold text-sm px-4">
                        Remove
                      </Button>
                    </div>
                  );
                })}
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
