import { Friend, UserProfileQuery } from "@/gql/graphql";
import { getUserAvatarURL } from "@/lib/get-user-avatar-url";
import { useModalStore } from "@/stores/modal-store";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AddFriendsRequestIcon, VerifiedIcon } from "@/icons";
import Link from "next/link";
import SummaryProfile from "../summary-profile";
import { IoIosSearch } from "react-icons/io";

export const FriendsModalKey = "Friends";

const Friends = ({ userData }: { userData: UserProfileQuery }) => {
  const { modalClose, modalKey } = useModalStore();
  const { user } = userData.userProfile;

  return (
    <>
      <Modal
        size="md"
        isOpen={modalKey === FriendsModalKey}
        onOpenChange={modalClose}
        scrollBehavior="inside"
        className="h-[400px]">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center my-[-5px] text-base">Friends</ModalHeader>
              <Divider />
              <div className="flex items-center mx-6 my-3">
                <Input
                  size="sm"
                  className="sticky top-0 z-10"
                  placeholder="Search"
                  startContent={<IoIosSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                />
              </div>
              <ModalBody className="flex flex-col max-h-80">
                {user?.friends && user.friends.length > 0 ? (
                  user.friends.map((friend) => {
                    const friendInfo =
                      user?.id === friend?.from_user_info?.id ? friend?.to_user_info : friend?.from_user_info;
                    return (
                      <div key={friend?.id} className="flex flex-row space-y-2 cursor-pointer justify-between my-2">
                        <div className="flex items-center">
                          <Tooltip
                            delay={1000}
                            content={
                              user && (
                                <SummaryProfile
                                  username={friendInfo?.username || ""}
                                  full_name={friendInfo?.full_name || ""}
                                  avatar={friendInfo?.avatar || ""}
                                  posts={[]}
                                  friends={friendInfo?.friends as Friend[]}
                                  role={friendInfo?.role || false}
                                  is_private={friendInfo?.is_private || false}
                                />
                              )
                            }
                            placement="bottom-start"
                            className="rounded-md shadow-lg">
                            <Link href={`/${friendInfo?.username}`} onClick={modalClose}>
                              <Avatar className="w-11 h-11">
                                <AvatarImage src={getUserAvatarURL(friendInfo?.avatar)} alt="User Avatar" />
                                <AvatarFallback>
                                  <Spinner size="sm" />
                                </AvatarFallback>
                              </Avatar>
                            </Link>
                          </Tooltip>

                          <div className="flex flex-col mx-2">
                            <div className="flex items-center space-x-1">
                              <Tooltip
                                delay={1000}
                                content={
                                  user && (
                                    <SummaryProfile
                                      username={friendInfo?.username || ""}
                                      full_name={friendInfo?.full_name || ""}
                                      avatar={friendInfo?.avatar || ""}
                                      posts={[]}
                                      friends={friendInfo?.friends as Friend[]}
                                      role={friendInfo?.role || false}
                                      is_private={friendInfo?.is_private || false}
                                    />
                                  )
                                }
                                placement="bottom-start"
                                className="rounded-md shadow-lg">
                                <Link
                                  href={`/${friendInfo?.username}`}
                                  className="text-sm font-bold"
                                  onClick={modalClose}>
                                  {friendInfo?.username}
                                </Link>
                              </Tooltip>
                              {friendInfo?.role && <VerifiedIcon className="w-3 h-3" />}
                            </div>
                            <div className="text-xs font-normal text-gray-500">{friendInfo?.full_name}</div>
                          </div>
                        </div>
                        <Button size="sm" className="bg-neutral-200 hover:bg-neutral-300 font-semibold text-sm px-4">
                          Remove
                        </Button>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col mt-5 items-center h-full text-center space-y-3 ">
                    <AddFriendsRequestIcon />
                    <span className="text-2xl font-bold">Friends</span>

                    <p className="text-sm">You&apos;ll see all of the people who friended you here.</p>
                  </div>
                )}
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
